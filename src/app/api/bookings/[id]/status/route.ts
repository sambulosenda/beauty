// app/api/bookings/[id]/status/route.ts
import { NextResponse } from 'next/server'
import { db } from '@/db'
import { bookings, users } from '@/db/schema'
import { currentUser } from '@clerk/nextjs/server'
import { eq } from 'drizzle-orm'
import { sendBookingUpdate } from '@/lib/emails'

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await currentUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await request.json()
    const { status } = data

    // Verify the booking
    const booking = await db.query.bookings.findFirst({
      where: eq(bookings.id, params.id),
      with: {
        customer: true,
        service: true,
        provider: true,
      }
    })

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
    }

    // Update booking status
    const [updatedBooking] = await db
      .update(bookings)
      .set({ 
        status,
        updatedAt: new Date()
      })
      .where(eq(bookings.id, params.id))
      .returning()

    // Send email notification
    if (booking.customer.email) {
      await sendBookingUpdate({
        customerEmail: booking.customer.email,
        customerName: booking.customer.name || 'Valued Customer',
        serviceName: booking.service.name,
        bookingId: booking.id,
        status: status,
        date: booking.startTime
      })
    }

    return NextResponse.json(updatedBooking)
  } catch (error) {
    console.error('Error updating booking status:', error)
    return NextResponse.json(
      { error: 'Failed to update booking status' },
      { status: 500 }
    )
  }
}