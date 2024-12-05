import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/db";
import { bookings, services, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { formatCurrency } from "@/lib/utils";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, MoreHorizontal } from "lucide-react";

export default async function BookingsPage() {
    const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  // Keep existing data fetching
  const dbUser = await db
    .select()
    .from(users)
    .where(eq(users.clerkId, userId))
    .then((rows) => rows[0]);

  if (!dbUser) {
    return [];
  }

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
      },
    })
    .from(bookings)
    .innerJoin(services, eq(bookings.serviceId, services.id))
    .innerJoin(users, eq(bookings.providerId, users.id))
    .where(eq(bookings.customerId, dbUser.id))
    .orderBy(bookings.startTime);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <Button>New Booking</Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userBookings.length}</div>
          </CardContent>
        </Card>
        {/* Add more summary cards as needed */}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          {userBookings.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Calendar className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900">No bookings yet</h3>
              <p className="text-sm text-gray-500 mt-1">Your upcoming bookings will appear here</p>
            </div>
          ) : (
            <div className="rounded-md border">
              <div className="grid grid-cols-6 gap-4 p-4 text-sm font-medium text-gray-500">
                <div>Date</div>
                <div>Time</div>
                <div>Service</div>
                <div>Provider</div>
                <div>Status</div>
                <div className="text-right">Price</div>
              </div>
              <div className="divide-y">
                {userBookings.map((booking) => (
                  <div key={booking.id} className="grid grid-cols-6 gap-4 p-4 text-sm items-center hover:bg-gray-50">
                    <div>{format(new Date(booking.startTime), "MMM d, yyyy")}</div>
                    <div>{format(new Date(booking.startTime), "h:mm a")}</div>
                    <div className="font-medium text-gray-900">{booking.service.name}</div>
                    <div>{booking.provider.businessName || booking.provider.name}</div>
                    <div>
                      <Badge variant={
                        booking.status === "CONFIRMED" ? "outline" :
                        booking.status === "PENDING" ? "secondary" :
                        booking.status === "CANCELLED" ? "destructive" : "secondary"
                      }>
                        {booking.status}
                      </Badge>
                    </div>
                    <div className="text-right font-medium text-gray-900">
                      {formatCurrency(parseFloat(booking.service.price))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
