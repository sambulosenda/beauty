// app/api/bookings/[id]/route.ts
import { NextResponse } from 'next/server'
import { db } from '@/db'
import { bookings, users } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { currentUser } from '@clerk/nextjs/server'

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Await the params to get the id
    const { id } = await params
    
    const clerkUser = await currentUser()
    if (!clerkUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get the user from our database
    const dbUser = await db.query.users.findFirst({
      where: eq(users.clerkId, clerkUser.id)
    })

    if (!dbUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Get the booking
    const booking = await db.query.bookings.findFirst({
      where: eq(bookings.id, id)  // Use the awaited id
    })

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
    }

    // Verify the user owns this booking
    if (booking.customerId !== dbUser.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Update the booking status
    const { status } = await request.json()
    const [updatedBooking] = await db
      .update(bookings)
      .set({ status })
      .where(eq(bookings.id, id))  // Use the awaited id
      .returning()

    return NextResponse.json(updatedBooking)
  } catch (error) {
    console.error('Error updating booking:', error)
    return NextResponse.json({ error: 'Error updating booking' }, { status: 500 })
  }
}