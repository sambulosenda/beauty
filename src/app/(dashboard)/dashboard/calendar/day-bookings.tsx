'use client'

import { useCallback, useMemo } from 'react'
import { format } from 'date-fns'
import { useQuery } from '@tanstack/react-query'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ClientStatusUpdate } from '@/components/bookings/client-status-update'
import Link from 'next/link'
import { Spinner } from '@/components/ui/spinner'
import type { Booking } from '@/types/bookings';

interface DayBookingsProps {
  date: Date
  providerId: string
}

export function DayBookings({ date, providerId }: DayBookingsProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['bookings', date.toISOString(), providerId],
    queryFn: async () => {
      const response = await fetch(
        `/api/bookings?date=${date.toISOString()}&providerId=${providerId}`
      );
      if (!response.ok) throw new Error('Failed to fetch bookings');
      const result = await response.json();
      console.log('API Response:', result);
      return result;
    },
  });

  if (isLoading) return <div>Loading bookings...</div>;
  if (error) return <div>Error loading bookings: {(error as Error).message}</div>;
  
  const bookings = data?.bookings ?? [];
  console.log('Bookings:', bookings);

  if (bookings.length === 0) {
    return <div>No bookings for {format(date, 'MMMM d, yyyy')}</div>;
  }

  return (
    <div className="space-y-4">
      {bookings.map((booking: Booking) => (
        <Card key={booking.id}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{booking['service.name']}</CardTitle>
                <CardDescription>
                  {format(new Date(booking.startTime), 'h:mm a')}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}

