import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/db";
import { bookings, services } from "@/db/schema";
import { formatCurrency } from "@/lib/utils";
import { eq, count } from "drizzle-orm";
import { Calendar, DollarSign, Users } from 'lucide-react';

export async function BookingsStats({ userId, userRole }: { userId: string, userRole: string }) {


  const totalBookings = await db
    .select({ total: count(bookings.id) })
    .from(bookings)
    .where(
      userRole === 'PROVIDER' 
        ? eq(bookings.providerId, userId)
        : eq(bookings.customerId, userId)
    )
    .then((result) => result[0]?.total || 0);


  const totalRevenue = await db
    .select({ sum: services.price })
    .from(bookings)
    .innerJoin(services, eq(bookings.serviceId, services.id))
    .where(
      userRole === 'PROVIDER' 
        ? eq(bookings.providerId, userId)
        : eq(bookings.customerId, userId)
    )
    .then((result) => result[0]?.sum || 0);
    

  const uniqueCustomers = userRole === 'PROVIDER' 
    ? await db
        .select({ count: bookings.customerId })
        .from(bookings)
        .where(eq(bookings.providerId, userId))
        .groupBy(bookings.customerId)
        .then((result) => result.length)
    : 0;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalBookings}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
        <div className="text-2xl font-bold">{formatCurrency(Number(totalRevenue))}</div>  
        </CardContent>
      </Card>
      {userRole === 'PROVIDER' && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unique Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{uniqueCustomers}</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

