'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { addDays, setHours, setMinutes, format, parse, isSameDay } from 'date-fns'
import { formatCurrency } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Calendar } from '@/components/ui/calendar'
import { DayPicker } from "react-day-picker"
import { checkAvailability } from '@/lib/availability'
import { CalendarIcon, Clock, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'
import { PaymentWrapper } from '@/components/payments/payment-wrapper'
import CustomBookingCalendar from './custom-booking-calendar'

interface BookingFormProps {
  service: any;  // Update this type based on your service type
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
  selectedTime: string | null;
  setSelectedTime: (time: string | null) => void;
  onComplete: () => void;
}

export default function BookingForm({ service, selectedDate, setSelectedDate, selectedTime, setSelectedTime, onComplete }: BookingFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { user, isSignedIn } = useUser()
  const router = useRouter()
  const [showPayment, setShowPayment] = useState(false)
  const [bookingId, setBookingId] = useState<string | null>(null)
  const [bookedDates, setBookedDates] = useState<Date[]>([])

  useEffect(() => {
    async function fetchBookedDates() {
      try {
        const response = await fetch(`/api/bookings/check?providerId=${service.providerId}`)
        const data = await response.json()
        setBookedDates(data.map((booking: any) => new Date(booking.startTime)))
      } catch (error) {
        console.error('Error fetching booked dates:', error)
      }
    }

    fetchBookedDates()
  }, [service.providerId])

  const handleDateChange = (date: Date | null) => {
    setError(null)
    setSelectedDate(date)
    setSelectedTime(null)
  }

  const handleTimeChange = async (time: string) => {
    setError(null)
    setSelectedTime(time)

    if (selectedDate) {
      const [hours, minutes] = time.split(':').map(Number)
      const dateTime = setMinutes(setHours(selectedDate, hours), minutes)

      try {
        const availability = await checkAvailability(
          service.providerId,
          dateTime,
          service.duration
        )

        if (!availability.available) {
          setError(availability.reason || 'Time slot not available')
          setSelectedTime(null)
        }
      } catch (error) {
        setError('Error checking availability')
        setSelectedTime(null)
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedDate || !selectedTime || !isSignedIn) return

    try {
      const startTime = parse(selectedTime, 'HH:mm', selectedDate)

      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceId: service.id,
          providerId: service.providerId,
          date: startTime,
        }),
      })

      const booking = await response.json()
      if (booking.error) throw new Error(booking.error)

      setBookingId(booking.id)
      setShowPayment(true)
    } catch (error) {
      console.error('Booking error:', error)
      // Handle error...
    }
  }

  const generateTimeSlots = () => {
    const slots = []
    for (let hour = 9; hour < 17; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        slots.push(
          format(setMinutes(setHours(new Date(), hour), minute), 'HH:mm')
        )
      }
    }
    return slots
  }

  if (!isSignedIn) {
    return (
      <div className="text-center">
        <p className="text-gray-600 mb-4">
          Please sign in to book this service
        </p>
        <Button onClick={() => router.push('/sign-in')}>Sign In</Button>
      </div>
    )
  }

  if (showPayment && bookingId) {
    return (
      <PaymentWrapper
        bookingId={bookingId}
        amount={parseFloat(service.price)}
      />
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium mb-2">Selected Appointment</h3>
          <p>Date: {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : 'Not selected'}</p>
          <p>Time: {selectedTime || 'Not selected'}</p>
        </div>
        
        {/* Add your booking form fields here */}
        
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Confirming...' : 'Confirm Booking'}
        </Button>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </form>
  )
}

