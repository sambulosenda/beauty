import { redirect } from 'next/navigation';
import { db } from '@/db';
import { bookings } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { CheckCircle2 } from 'lucide-react';

export default async function BookingConfirmationPage({
  params,
}: {
  params: { id: string };
}) {
  const booking = await db.query.bookings.findFirst({
    where: eq(bookings.id, params.id),
    with: {
      service: true,
      provider: true,
    },
  });

  if (!booking) {
    redirect('/bookings');
  }

  return (
    <div className="max-w-2xl mx-auto p-8 text-center">
      <div className="mb-8">
        <div className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
          <CheckCircle2 className="w-6 h-6 text-green-600" />
        </div>
      </div>
      <h1 className="text-2xl font-bold mb-4">Booking Confirmed!</h1>
      <p className="text-gray-600 mb-8">
        Your booking for {booking.service.name} has been confirmed.
      </p>
      {/* Add more booking details here */}
    </div>
  );
} 
