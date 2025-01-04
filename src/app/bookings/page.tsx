// app/bookings/page.tsx
import { redirect } from 'next/navigation'
import { db } from '@/db'
import { bookings, services, users } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { auth } from '@clerk/nextjs/server'
import Link from 'next/link'
import { format } from 'date-fns'
import { formatCurrency } from '@/lib/utils'
import { Calendar, Clock, MapPin } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
  
  // Separate bookings by status
  const upcomingBookings = userBookings.filter(b => b.status === 'CONFIRMED')
  const pastBookings = userBookings.filter(b => b.status === 'COMPLETED')
  const pendingBookings = userBookings.filter(b => b.status === 'PENDING')

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
          <Link 
            href="/services" 
            className="inline-flex items-center px-4 py-2 rounded-md text-sm font-medium text-white bg-rose-600 hover:bg-rose-700"
          >
            Book New Service
          </Link>
        </div>

        {userBookings.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border">
            <Calendar className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No bookings</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by booking a service.</p>
            <div className="mt-6">
              <Link
                href="/services"
                className="inline-flex items-center px-4 py-2 rounded-md text-sm font-medium text-white bg-rose-600 hover:bg-rose-700"
              >
                Browse Services
              </Link>
            </div>
          </div>
        ) : (
          <Tabs defaultValue="upcoming" className="space-y-6">
            <TabsList className="bg-white border">
              <TabsTrigger value="upcoming">Upcoming ({upcomingBookings.length})</TabsTrigger>
              <TabsTrigger value="pending">Pending ({pendingBookings.length})</TabsTrigger>
              <TabsTrigger value="past">Past ({pastBookings.length})</TabsTrigger>
            </TabsList>

            {['upcoming', 'pending', 'past'].map((tab) => (
              <TabsContent key={tab} value={tab} className="space-y-4">
                {userBookings
                  .filter(booking => {
                    if (tab === 'upcoming') return booking.status === 'CONFIRMED'
                    if (tab === 'pending') return booking.status === 'PENDING'
                    if (tab === 'past') return booking.status === 'COMPLETED'
                  })
                  .map((booking) => (
                    <Link
                      key={booking.id}
                      href={`/bookings/${booking.id}`}
                      className="block bg-white rounded-lg border hover:border-gray-300 transition-colors"
                    >
                      <div className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {booking.service.name}
                            </h3>
                            <div className="mt-1 flex items-center text-sm text-gray-500">
                              <MapPin className="h-4 w-4 mr-1" />
                              <span>{booking.provider.businessName || booking.provider.name}</span>
                            </div>
                          </div>
                          <span className="text-lg font-semibold text-rose-600">
                            {formatCurrency(parseFloat(booking.service.price))}
                          </span>
                        </div>

                        <div className="mt-4 grid grid-cols-2 gap-4">
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="h-4 w-4 mr-2" />
                            {format(new Date(booking.startTime), 'MMM d, yyyy')}
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock className="h-4 w-4 mr-2" />
                            {format(new Date(booking.startTime), 'h:mm a')}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
              </TabsContent>
            ))}
          </Tabs>
        )}
      </div>
    </div>
  )
}
