// app/bookings/page.tsx
import { redirect } from 'next/navigation'
import { db } from '@/db'
import { bookings, services, users } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { auth } from '@clerk/nextjs/server'
import { formatCurrency } from '@/lib/utils'
import { format } from 'date-fns'
import Link from 'next/link'

async function getBookings(userId: string) {
  // First get the database user id
  const dbUser = await db
    .select()
    .from(users)
    .where(eq(users.clerkId, userId))
    .then(rows => rows[0])

  if (!dbUser) {
    return []
  }

  // Then get their bookings
  const userBookings = await db
    .select({
      id: bookings.id,
      startTime: bookings.startTime,
      status: bookings.status,
      service: {
        name: services.name,
        price: services.price,
        duration: services.duration,
      },
      provider: {
        name: users.name,
        businessName: users.businessName,
      }
    })
    .from(bookings)
    .innerJoin(services, eq(bookings.serviceId, services.id))
    .innerJoin(users, eq(bookings.providerId, users.id))
    .where(eq(bookings.customerId, dbUser.id))
    .orderBy(bookings.startTime)

  return userBookings
}

export default async function BookingsPage() {
    const { userId } = await auth()
  
  if (!userId) {
    redirect('/sign-in')
  }

  const userBookings = await getBookings(userId)

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Bookings</h1>

      {userBookings.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">You don't have any bookings yet.</p>
          <Link 
            href="/services" 
            className="text-rose-600 hover:text-rose-700"
          >
            Browse Services
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {userBookings.map((booking) => (
            <Link 
              key={booking.id} 
              href={`/bookings/${booking.id}`}
              className="block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <h3 className="font-semibold text-gray-900 mb-1">
                  {booking.service.name}
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  with {booking.provider.businessName || booking.provider.name}
                </p>
                
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-600">
                    {format(new Date(booking.startTime), 'MMM d, h:mm a')}
                  </span>
                  <span className="text-rose-600 font-medium">
                    {formatCurrency(parseFloat(booking.service.price))}
                  </span>
                </div>

                <div>
                  <span className={`inline-block px-2 py-1 text-xs rounded-full
                    ${booking.status === 'CONFIRMED' ? 'bg-green-100 text-green-800' : 
                      booking.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                      booking.status === 'CANCELLED' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'}`}>
                    {booking.status}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
