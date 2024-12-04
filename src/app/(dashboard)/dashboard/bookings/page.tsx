import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function BookingsPage() {
    const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold tracking-tight">Bookings</h2>
      
      <Card>
        <CardHeader>
          <CardTitle>All Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-5 gap-4 p-4 font-medium">
              <div>Date</div>
              <div>Service</div>
              <div>Customer</div>
              <div>Status</div>
              <div>Actions</div>
            </div>
            {/* We'll add actual booking data here later */}
            <div className="p-4 text-sm text-gray-500">
              No bookings found
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}