// app/dashboard/calendar/calendar.tsx
'use client'

import { useState, useEffect } from 'react'
import { Calendar as CalendarIcon } from 'lucide-react'
import { Calendar as CalendarComponent } from '@/components/ui/calendar'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { formatCurrency } from '@/lib/utils'
import { format } from 'date-fns'

interface Booking {
  id: string
  startTime: Date
  endTime: Date
  status: string
  service: {
    name: string
    price: string
  }
  customer: {
    name: string
    email: string
  }
}

export function Calendar({ providerId }: { providerId: string }) {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('/api/bookings')
        const data = await response.json()
        setBookings(data)
      } catch (error) {
        console.error('Error fetching bookings:', error)
      }
    }

    fetchBookings()
  }, [providerId])

  const getDayBookings = (date: Date) => {
    return bookings.filter(booking => {
      const bookingDate = new Date(booking.startTime)
      return (
        bookingDate.getDate() === date.getDate() &&
        bookingDate.getMonth() === date.getMonth() &&
        bookingDate.getFullYear() === date.getFullYear()
      )
    })
  }

  return (
    <div className="flex gap-4">
      <div className="w-full max-w-md">
        <CalendarComponent
          mode="single"
          selected={selectedDate}
          onSelect={(date) => date && setSelectedDate(date)}
          modifiers={{
            booked: (date) => getDayBookings(date).length > 0
          }}
          modifiersStyles={{
            booked: { fontWeight: 'bold', textDecoration: 'underline' }
          }}
        />
      </div>

      <div className="flex-1">
        <h2 className="text-lg font-semibold mb-4">
          Bookings for {format(selectedDate, 'MMMM d, yyyy')}
        </h2>
        <div className="space-y-4">
          {getDayBookings(selectedDate).map((booking) => (
            <HoverCard key={booking.id}>
              <HoverCardTrigger asChild>
                <div className="p-4 bg-white rounded-lg shadow cursor-pointer">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{booking.service.name}</h3>
                      <p className="text-sm text-gray-500">
                        {format(new Date(booking.startTime), 'h:mm a')} - 
                        {format(new Date(booking.endTime), 'h:mm a')}
                      </p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      booking.status === 'CONFIRMED' ? 'bg-green-100 text-green-800' :
                      booking.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                </div>
              </HoverCardTrigger>
              <HoverCardContent>
                <div>
                  <h4 className="font-semibold">Customer Details</h4>
                  <p className="text-sm">{booking.customer.name}</p>
                  <p className="text-sm text-gray-500">{booking.customer.email}</p>
                  <div className="mt-2">
                    <span className="text-sm font-medium">
                      Price: {formatCurrency(parseFloat(booking.service.price))}
                    </span>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          ))}
        </div>
      </div>
    </div>
  )
}