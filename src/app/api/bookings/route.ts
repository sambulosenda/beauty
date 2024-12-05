// app/api/bookings/route.ts
import { NextResponse } from 'next/server'
import { db } from '@/db'
import { bookings, users, services } from '@/db/schema'
import { currentUser } from '@clerk/nextjs/server'
import { addMinutes } from 'date-fns'
import { eq } from 'drizzle-orm'
import { sendBookingConfirmation, sendProviderNotification } from '@/lib/emails'

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


export async function GET(request: Request) {
  try {
    const clerkUser = await currentUser()
    if (!clerkUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const dbUser = await db.query.users.findFirst({
      where: eq(users.clerkId, clerkUser.id)
    })

    if (!dbUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const userBookings = await db.query.bookings.findMany({
      where: dbUser.role === 'PROVIDER' 
        ? eq(bookings.providerId, dbUser.id)
        : eq(bookings.customerId, dbUser.id),
      with: {
        service: true,
        customer: true,
        provider: true,
      }
    })

    return NextResponse.json(userBookings)
  } catch (error) {
    console.error('Error fetching bookings:', error)
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    )
  }
}
