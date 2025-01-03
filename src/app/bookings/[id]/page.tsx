// app/bookings/[id]/page.tsx
import { notFound } from 'next/navigation'
import { getBookingById } from '@/hooks/queries/useBooking'
import { formatCurrency } from '@/lib/utils'
import { format } from 'date-fns'
import { Metadata } from 'next'
import { ReviewForm } from '@/components/reviews/review-form'
import { ReviewsList } from '@/components/reviews/reviews-list'
import { Clock, MapPin, Calendar, CheckCircle2, AlertCircle } from 'lucide-react'
import { ClientBookingStatus } from '@/components/bookings/client-booking-status'
import React from 'react'

export async function generateMetadata(props: { params: { id: string } }): Promise<Metadata> {
  const booking = await getBookingById(props.params.id)

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

export default async function BookingPage({ params }: { params: { id: string } }) {
  const booking = await getBookingById(params.id)

  if (!booking) {
    notFound()
  }

  const isCompleted = booking.status === 'COMPLETED'
  const canReview = isCompleted && !booking.review

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Status Banner */}
        <div className={`mb-8 rounded-2xl p-4 ${
          booking.status === 'CONFIRMED' ? 'bg-green-50 text-green-700' :
          booking.status === 'PENDING' ? 'bg-yellow-50 text-yellow-700' :
          booking.status === 'CANCELLED' ? 'bg-red-50 text-red-700' :
          'bg-blue-50 text-blue-700'
        }`}>
          <div className="flex items-center">
            {booking.status === 'CONFIRMED' ? (
              <CheckCircle2 className="h-5 w-5 mr-2" />
            ) : (
              <AlertCircle className="h-5 w-5 mr-2" />
            )}
            <div>
              <h2 className="font-semibold">
                Booking {booking.status.toLowerCase()}
              </h2>
              <p className="text-sm mt-1">
                {booking.status === 'CONFIRMED' ? 'Your appointment is confirmed' :
                 booking.status === 'PENDING' ? 'Waiting for confirmation' :
                 booking.status === 'CANCELLED' ? 'This booking has been cancelled' :
                 'Service completed'}
              </p>
            </div>
          </div>
        </div>

        {/* Add the Status Update Component here */}
        <ClientBookingStatus bookingId={booking.id} currentStatus={booking.status} />


        {/* Main Content */}
        <div className="bg-white rounded-2xl p-8 shadow-sm space-y-8">
          {/* Service Details */}
          <div>
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {booking.service.name}
                </h1>
                <div className="mt-1 flex items-center text-gray-500">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>
                    {booking.provider.businessName || booking.provider.name}
                  </span>
                </div>
              </div>
              <span className="text-2xl font-bold text-rose-600">
                {formatCurrency(parseFloat(booking.service.price))}
              </span>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center space-x-3 text-gray-600">
                <Calendar className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="font-medium">Appointment Time</p>
                  <p>{format(new Date(booking.startTime), 'MMMM d, yyyy h:mm aa')}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <Clock className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="font-medium">Duration</p>
                  <p>{booking.service.duration} minutes</p>
                </div>
              </div>
            </div>
          </div>

          {/* Provider Details */}
          <div className="pt-6 border-t">
            <h2 className="text-xl font-semibold mb-4">Provider Details</h2>
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-full bg-rose-100 flex items-center justify-center">
                <span className="text-lg font-medium text-rose-600">
                  {booking.provider.name?.[0] || 'P'}
                </span>
              </div>
              <p className="text-gray-600">
                {booking.provider.businessName || booking.provider.name}
              </p>
            </div>
          </div>

          {/* Review Section */}
          {canReview && (
            <div className="pt-6 border-t">
              <h2 className="text-xl font-semibold mb-4">Leave a Review</h2>
              <ReviewForm bookingId={booking.id} />
            </div>
          )}

          {booking.review && (
            <div className="pt-6 border-t">
              <h2 className="text-xl font-semibold mb-4">Your Review</h2>
              <ReviewsList reviews={[booking.review]} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
