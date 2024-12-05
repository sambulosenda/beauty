// app/bookings/[id]/page.tsx
import { notFound } from 'next/navigation'
import { db } from '@/db'
import { bookings, services, users } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { formatCurrency } from '@/lib/utils'
import { format } from 'date-fns'
import { CancelButton } from '@/components/bookings/cancel-button'

async function getBooking(id: string) {
  const booking = await db
    .select({
      id: bookings.id,
      startTime: bookings.startTime,
      endTime: bookings.endTime,
      status: bookings.status,
      service: {
        id: bookings.serviceId,
        name: services.name,
        price: services.price,
        duration: services.duration,
      },
      provider: {
        id: users.id,
        name: users.name,
        businessName: users.businessName,
      }
    })
    .from(bookings)
    .innerJoin(services, eq(bookings.serviceId, services.id))
    .innerJoin(users, eq(bookings.providerId, users.id))
    .where(eq(bookings.id, id))
    .then(rows => rows[0])

  return booking
}

export default async function BookingPage({ params }: { params: { id: string } }) {
  const booking = await getBooking(params.id)

  if (!booking) {
    notFound()
  }

  const canCancel = booking.status === 'PENDING' || booking.status === 'CONFIRMED'

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-2xl font-bold">Booking Details</h1>
          {canCancel && <CancelButton bookingId={booking.id} />}
        </div>
        
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
        </div>
      </div>
    </div>
  )
}