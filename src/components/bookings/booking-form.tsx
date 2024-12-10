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
import { BookingFormProps } from '../../../types'
import { CustomBookingCalendar } from './custom-booking-calendar'


export default function BookingForm({ service }: BookingFormProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
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
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm">
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-2">Book this Service</h2>
        <p className="text-gray-600 mb-6">Select a date and time to book your appointment</p>

      

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <CustomBookingCalendar
              selectedDate={selectedDate}
              onDateSelect={handleDateChange}
              bookedDates={[]} // You can pass booked dates from your availability check
              minDate={new Date()}
              maxDate={addDays(new Date(), 30)}
            />
          </motion.div>

          <AnimatePresence>
            {selectedDate && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-2 gap-2">
                  {generateTimeSlots().map((time) => {
                    const isAvailable = true // Replace with actual availability check
                    return (
                      <Button
                        key={time}
                        type="button"
                        variant={selectedTime === time ? "default" : "outline"}
                        className={cn(
                          "py-6",
                          selectedTime === time && "bg-primary text-primary-foreground",
                          !isAvailable && "opacity-50 cursor-not-allowed"
                        )}
                        disabled={!isAvailable}
                        onClick={() => handleTimeChange(time)}
                      >
                        {format(parse(time, 'HH:mm', new Date()), 'h:mm a')}
                      </Button>
                    )
                  }
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {(selectedDate || selectedTime) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 bg-muted rounded-lg"
            >
              <h3 className="font-medium mb-2">Booking Summary</h3>
              <div className="space-y-1 text-sm">
                {selectedDate && (
                  <p>Date: {format(selectedDate, 'EEEE, MMMM d, yyyy')}</p>
                )}
                {selectedTime && (
                  <p>Time: {format(parse(selectedTime, 'HH:mm', new Date()), 'h:mm a')}</p>
                )}
              </div>
            </motion.div>
          )}
        </div>

        {error && (
          <Alert variant="destructive" className="mt-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </div>

      <div className="border-t p-6">
        <Button
          type="submit"
          disabled={!selectedDate || !selectedTime || isLoading}
          className="w-full"
          size="lg"
        >
          {isLoading ? 'Booking...' : `Book Now - ${formatCurrency(parseFloat(service.price))}`}
        </Button>
      </div>
    </form>
  )
}

