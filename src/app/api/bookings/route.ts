import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "@/db";
import { bookings, services, users } from "@/db/schema";
import { and, eq, inArray, gte, lt } from "drizzle-orm";
import { NextResponse } from "next/server";
import { sendBookingConfirmation, sendProviderNotification } from '@/lib/emails'
import { addMinutes } from 'date-fns'

export async function GET(request: Request) {
  const { userId } = await auth();
  const { searchParams } = new URL(request.url);
  
  const page = parseInt(searchParams.get('page') ?? '1', 10);
  const statusFilter = searchParams.get('status')?.split(',');
  const date = searchParams.get('date');
  const providerId = searchParams.get('providerId');
  const limit = 10;
  const offset = (page - 1) * limit;

  try {
    const dbUser = await db
      .select()
      .from(users)
      .where(eq(users.clerkId, userId!))
      .then((rows) => rows[0]);

    const whereClause = [
      dbUser.role === 'PROVIDER' 
        ? eq(bookings.providerId, dbUser.id)
        : eq(bookings.customerId, dbUser.id)
    ];

    if (statusFilter) {
      whereClause.push(inArray(bookings.status, statusFilter as Array<"PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED">));
    }

    if (date) {
      const selectedDate = new Date(date);
      const nextDay = new Date(selectedDate);
      nextDay.setDate(nextDay.getDate() + 1);
      
      whereClause.push(gte(bookings.startTime, selectedDate));
      whereClause.push(lt(bookings.startTime, nextDay));
    }

    if (providerId) {
      whereClause.push(eq(bookings.providerId, providerId));
    }

    const [userBookings, totalBookings] = await Promise.all([
      db.select({
        id: bookings.id,
        startTime: bookings.startTime,
        status: bookings.status,
        'service.name': services.name,
        'service.price': services.price,
        'provider.name': users.name,
        'provider.businessName': users.businessName
      })
      .from(bookings)
      .innerJoin(services, eq(bookings.serviceId, services.id))
      .innerJoin(users, eq(bookings.providerId, users.id))
      .where(and(...whereClause))
      .orderBy(bookings.startTime)
      .limit(limit)
      .offset(offset),
      
      db.select({ count: bookings.id })
        .from(bookings)
        .where(and(...whereClause))
        .then((result) => result[0]?.count || 0)
    ]);

    return NextResponse.json({
      bookings: userBookings,
      totalPages: Math.ceil(Number(totalBookings) / limit),
      currentPage: page
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const clerkUser = await currentUser()
    if (!clerkUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const dbUser = await db.query.users.findFirst({
      where: eq(users.clerkId, clerkUser.id)
    })

    if (!dbUser) {
      return NextResponse.json({ error: 'User not found in database' }, { status: 404 })
    }

    const data = await request.json()
    const { serviceId, providerId, date } = data

    if (!serviceId || !providerId || !date) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Get service and provider details
    const service = await db.query.services.findFirst({
      where: eq(services.id, serviceId),
    })

    const provider = await db.query.users.findFirst({
      where: eq(users.id, providerId),
    })

    if (!service || !provider) {
      return NextResponse.json(
        { error: 'Service or provider not found' },
        { status: 404 }
      )
    }

    const startTime = new Date(date)
    const endTime = addMinutes(startTime, service.duration)

    const [booking] = await db.insert(bookings).values({
      serviceId,
      providerId,
      customerId: dbUser.id,
      startTime,
      endTime,
      status: 'PENDING'
    }).returning()

    // Send confirmation emails
    await Promise.all([
      sendBookingConfirmation({
        customerEmail: dbUser.email,
        customerName: dbUser.name || 'Customer',
        serviceName: service.name,
        date: startTime,
        providerName: provider.name || 'Provider',
        bookingId: booking.id
      }),
      sendProviderNotification({
        providerEmail: provider.email,
        customerName: dbUser.name || 'Customer',
        serviceName: service.name,
        date: startTime,
        bookingId: booking.id
      })
    ])

    return NextResponse.json(booking)
  } catch (error) {
    console.error('Booking creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    )
  }
}
