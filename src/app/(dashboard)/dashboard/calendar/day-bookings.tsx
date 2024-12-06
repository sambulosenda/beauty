// app/dashboard/calendar/day-bookings.tsx
'use client'

import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { BookingStatusUpdate } from '@/components/bookings/booking-status-update'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ClientStatusUpdate } from '@/components/bookings/client-status-update'

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
  const [bookings, setBookings] = useState<Booking[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  const fetchBookings = async () => {
    setIsLoading(true)
    try {
      console.log('Fetching bookings for:', date.toISOString())
      const response = await fetch(
        `/api/bookings?date=${date.toISOString()}&providerId=${providerId}`
      )
      if (!response.ok) throw new Error('Failed to fetch bookings')
      const data = await response.json()
      console.log('Received bookings:', data)
      setBookings(data)
    } catch (error) {
      console.error('Error fetching bookings:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchBookings()
  }, [date, providerId])

  if (isLoading) {
    return <p>Loading bookings...</p>
  }

  if (bookings.length === 0) {
    return <p className="text-gray-500">No bookings for this day</p>
  }

  return (
    <div className="space-y-4">
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