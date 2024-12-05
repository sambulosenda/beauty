// components/dashboard/stats.tsx
import { db } from '@/db'
import { bookings } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, CheckCircle, Clock, XCircle } from 'lucide-react'

async function getStats(providerId: string) {
  const allBookings = await db.query.bookings.findMany({
    where: eq(bookings.providerId, providerId),
  })

  const stats = {
    total: allBookings.length,
    pending: allBookings.filter(b => b.status === 'PENDING').length,
    confirmed: allBookings.filter(b => b.status === 'CONFIRMED').length,
    cancelled: allBookings.filter(b => b.status === 'CANCELLED').length,
  }

  return stats
}

export async function DashboardStats({ providerId }: { providerId: string }) {
  const stats = await getStats(providerId)

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Bookings
          </CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.total}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Pending
          </CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.pending}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Confirmed
          </CardTitle>
          <CheckCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.confirmed}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Cancelled
          </CardTitle>
          <XCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.cancelled}</div>
        </CardContent>
      </Card>
    </div>
  )
}
