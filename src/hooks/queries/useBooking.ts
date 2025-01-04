import { db } from '@/db'
import { bookings, services, users, reviews } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { BookingWithReview } from '@/types/bookings'

export async function getBookingById(bookingId: string): Promise<BookingWithReview | null> {
  try {
    const result = await db
      .select({
        id: bookings.id,
        startTime: bookings.startTime,
        endTime: bookings.endTime,
        status: bookings.status,
        service: {
          id: services.id,
          name: services.name,
          price: services.price,
          duration: services.duration,
        },
        provider: {
          id: users.id,
          name: users.name,
          businessName: users.businessName,
        },
        review: {
          id: reviews.id,
          rating: reviews.rating,
          comment: reviews.comment,
          createdAt: reviews.createdAt,
        },
      })
      .from(bookings)
      .leftJoin(services, eq(services.id, bookings.serviceId))
      .leftJoin(users, eq(users.id, bookings.providerId))
      .leftJoin(reviews, eq(reviews.bookingId, bookings.id))
      .where(eq(bookings.id, bookingId))
      .then(rows => rows[0])

    return result as BookingWithReview
  } catch (error) {
    console.error('Error fetching booking:', error)
    return null
  }
}
