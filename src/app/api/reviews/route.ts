// app/api/reviews/route.ts
import { NextResponse } from 'next/server'
import { db } from '@/db'
import { reviews, bookings } from '@/db/schema'
import { currentUser } from '@clerk/nextjs/server'
import { eq } from 'drizzle-orm'

export async function POST(request: Request) {
  try {
    const user = await currentUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await request.json()
    const { bookingId, rating, comment } = data

    // Verify booking exists and belongs to user
    const booking = await db.query.bookings.findFirst({
      where: eq(bookings.id, bookingId),
      columns: {
        id: true,
        customerId: true,
        providerId: true,
      }
    })

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
    }

    // Check if review already exists
    const existingReview = await db.query.reviews.findFirst({
      where: eq(reviews.bookingId, bookingId)
    })

    if (existingReview) {
      return NextResponse.json(
        { error: 'Review already exists for this booking' },
        { status: 400 }
      )
    }

    // Create review
    const [review] = await db.insert(reviews).values({
      bookingId,
      rating,
      comment,
      customerId: booking.customerId,
      providerId: booking.providerId,
    }).returning()

    return NextResponse.json(review)
  } catch (error) {
    console.error('Error creating review:', error)
    return NextResponse.json(
      { error: 'Failed to create review' },
      { status: 500 }
    )
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const providerId = searchParams.get('providerId')

  if (!providerId) {
    return NextResponse.json(
      { error: 'Provider ID is required' },
      { status: 400 }
    )
  }

  try {
    const providerReviews = await db.query.reviews.findMany({
      where: eq(reviews.providerId, providerId),
      orderBy: (reviews, { desc }) => [desc(reviews.createdAt)],
      with: {
        customer: {
          columns: {
            name: true
          }
        }
      }
    })

    return NextResponse.json(providerReviews)
  } catch (error) {
    console.error('Error fetching reviews:', error)
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    )
  }
}