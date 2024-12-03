"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"

// Temporary mock data - we'll replace with real data later
const bookings = [
  {
    id: 1,
    serviceName: "Hair Cut & Style",
    date: new Date("2024-12-10T10:00:00"),
    status: "upcoming",
    price: 50,
  },
  {
    id: 2,
    serviceName: "Manicure",
    date: new Date("2024-12-15T14:30:00"),
    status: "upcoming",
    price: 35,
  },
  {
    id: 3,
    serviceName: "Facial Treatment",
    date: new Date("2024-11-30T11:00:00"),
    status: "completed",
    price: 75,
  },
]

export function BookingsList() {
  return (
    <div className="grid gap-6">
      {bookings.map((booking) => (
        <Card key={booking.id}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{booking.serviceName}</CardTitle>
                <p className="text-sm text-gray-500 mt-1">
                  {format(booking.date, "PPP")} at {format(booking.date, "p")}
                </p>
              </div>
              <Badge variant={booking.status === "upcoming" ? "default" : "secondary"}>
                {booking.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="font-semibold">£{booking.price}</p>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2">
            {booking.status === "upcoming" && (
              <>
                <Button variant="outline" onClick={() => console.log("Reschedule", booking.id)}>
                  Reschedule
                </Button>
                <Button variant="destructive" onClick={() => console.log("Cancel", booking.id)}>
                  Cancel
                </Button>
              </>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}