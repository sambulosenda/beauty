// app/api/bookings/route.ts
import { NextResponse } from 'next/server'
import { db } from '@/db'
import { bookings, users, services } from '@/db/schema'
import { currentUser } from '@clerk/nextjs/server'
import { addMinutes } from 'date-fns'
import { eq } from 'drizzle-orm'

export async function POST(request: Request) {
  try {
    // Get the authenticated user from Clerk
    const clerkUser = await currentUser()
    if (!clerkUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Find the user in our database
    const dbUser = await db.query.users.findFirst({
      where: eq(users.clerkId, clerkUser.id)
    })

    if (!dbUser) {
      return NextResponse.json({ error: 'User not found in database' }, { status: 404 })
    }

    // Get request body
    const data = await request.json()
    const { serviceId, providerId, date } = data

    if (!serviceId || !providerId || !date) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Get service to use its duration
    const service = await db.query.services.findFirst({
      where: eq(services.id, serviceId)
    })

    if (!service) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 })
    }

    const startTime = new Date(date)
    const endTime = addMinutes(startTime, service.duration)

    // Create the booking
    const [booking] = await db.insert(bookings).values({
      serviceId,
      providerId,
      customerId: dbUser.id,
      startTime,
      endTime,
      status: 'PENDING'
    }).returning()

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
      where: eq(bookings.customerId, dbUser.id),
      with: {
        service: true,
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

