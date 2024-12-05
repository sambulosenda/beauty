// app/bookings/[id]/page.tsx
import { notFound } from 'next/navigation'
import { db } from '@/db'
import { bookings, services, users, reviews } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { formatCurrency } from '@/lib/utils'
import { format } from 'date-fns'
import { Metadata } from 'next'
import { ReviewForm } from '@/components/reviews/review-form'
import { ReviewsList } from '@/components/reviews/reviews-list'

interface PageProps {
  params: Promise<{ id: string }>
  searchParams: { [key: string]: string | string[] | undefined }
}

type BookingWithReview = {
  id: string
  startTime: Date
  endTime: Date
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED'
  service: {
    id: string
    name: string
    price: string
    duration: number
  }
  provider: {
    id: string
    name: string | null
    businessName: string | null
  }
  review?: {
    id: string
    rating: number
    comment: string
    createdAt: Date
    customer: {
      name: string | null
    }
  } | null
}

async function fetchBooking(bookingId: string): Promise<BookingWithReview | null> {
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
          customer: {
            name: users.name,
          },
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

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params
  const booking = await fetchBooking(params.id)

  if (!booking) {
    return {
      title: 'Booking Not Found',
    }
  }

  return {
    title: `Booking - ${booking.service.name}`,
    description: `Booking details for ${booking.service.name} on ${format(new Date(booking.startTime), 'MMMM d, yyyy')}`,
  }
}

export default async function BookingPage(props: PageProps) {
  const params = await props.params
  const booking = await fetchBooking(params.id)

  if (!booking) {
    notFound()
  }

  const isCompleted = booking.status === 'COMPLETED'
  const canReview = isCompleted && !booking.review

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-6">Booking Details</h1>
        
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Service</h2>
            <p className="text-gray-600">{booking.service.name}</p>
            <p className="text-gray-600">{formatCurrency(parseFloat(booking.service.price))}</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold">Appointment Time</h2>
            <p className="text-gray-600">
              {format(new Date(booking.startTime), 'MMMM d, yyyy h:mm aa')}
            </p>
            <p className="text-gray-600">Duration: {booking.service.duration} minutes</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold">Status</h2>
            <span className={`inline-block px-2 py-1 text-sm rounded-full 
              ${booking.status === 'CONFIRMED' ? 'bg-green-100 text-green-800' : 
                booking.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                booking.status === 'CANCELLED' ? 'bg-red-100 text-red-800' :
                booking.status === 'COMPLETED' ? 'bg-blue-100 text-blue-800' :
                'bg-gray-100 text-gray-800'}`}>
              {booking.status}
            </span>
          </div>

          <div className="pt-4 border-t">
            <h2 className="text-lg font-semibold mb-2">Provider Details</h2>
            <p className="text-gray-600">
              {booking.provider.businessName || booking.provider.name}
            </p>
          </div>

          {canReview && (
            <div className="pt-6 border-t">
              <h2 className="text-lg font-semibold mb-4">Leave a Review</h2>
              <ReviewForm bookingId={booking.id} />
            </div>
          )}

          {booking.review && (
            <div className="pt-6 border-t">
              <h2 className="text-lg font-semibold mb-4">Your Review</h2>
              <ReviewsList reviews={[booking.review]} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}