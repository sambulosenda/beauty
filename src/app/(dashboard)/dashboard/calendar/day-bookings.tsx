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

interface DayBookingsProps {
  date: Date
  providerId: string
}

type Booking = {
  id: string
  startTime: string
  endTime: string
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED'
  service: {
    name: string
  }
  customer: {
    name: string | null
  }
}

export function DayBookings({ date, providerId }: DayBookingsProps) {
  const fetchBookings = useCallback(async () => {
    const response = await fetch(
      `/api/bookings?date=${date.toISOString()}&providerId=${providerId}`
    )
    if (!response.ok) throw new Error('Failed to fetch bookings')
    return response.json()
  }, [date, providerId])

  const { data: bookings, isLoading, error } = useQuery<Booking[], Error>({
    queryKey: ['bookings', date.toISOString(), providerId],
    queryFn: fetchBookings,
  })

  const formattedDate = useMemo(() => format(date, 'MMMM d, yyyy'), [date])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-red-500" role="alert">
        Error loading bookings: {error.message}
      </div>
    )
  }

  if (!bookings || bookings.length === 0) {
    return (
      <p className="text-gray-500" role="status">
        No bookings for {formattedDate}
      </p>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="sr-only">Bookings for {formattedDate}</h2>
      {bookings.map((booking) => (
        <Card key={booking.id}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{booking.service.name}</CardTitle>
                <CardDescription>
                  {format(new Date(booking.startTime), 'h:mm a')} - 
                  {format(new Date(booking.endTime), 'h:mm a')}
                </CardDescription>
              </div>
              <Link 
                href={`/bookings/${booking.id}`}
                className="text-sm text-blue-600 hover:text-blue-800"
                aria-label={`View details for ${booking.service.name} booking`}
              >
                View Details
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Customer</p>
                <p>{booking.customer.name || 'Anonymous'}</p>
              </div>
              <ClientStatusUpdate 
                bookingId={booking.id}
                currentStatus={booking.status}
              />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

