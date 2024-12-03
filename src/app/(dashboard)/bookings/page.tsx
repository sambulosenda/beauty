import { BookingsList } from "../../../components/bookings/bookings-list";

export default function BookingsPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">My Bookings</h1>
      <BookingsList />
    </div>
  )
}