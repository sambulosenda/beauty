'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import DatePicker from 'react-datepicker'
import { addDays, setHours, setMinutes } from 'date-fns'
import "react-datepicker/dist/react-datepicker.css"
import { formatCurrency } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { checkAvailability } from '@/lib/availability'

interface BookingFormProps {
  service: {
    id: string
    name: string
    price: string
    duration: number
    providerId: string
  }
}

export default function BookingForm({ service }: BookingFormProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { user, isSignedIn } = useUser()
  const router = useRouter()

  const handleDateChange = async (date: Date | null) => {
    setError(null)
    setSelectedDate(date)

    if (date) {
      try {
        const availability = await checkAvailability(
          service.providerId,
          date,
          service.duration
        )

        if (!availability.available) {
          setError(availability.reason || 'Time slot not available')
          setSelectedDate(null)
        }
      } catch (error) {
        setError('Error checking availability')
        setSelectedDate(null)
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedDate || !isSignedIn) {
      setError('Please select a date and time')
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          serviceId: service.id,
          providerId: service.providerId,
          date: selectedDate,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create booking')
      }

      router.push(`/bookings/${data.id}`)
      router.refresh()
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to create booking'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }

  const minTime = setHours(setMinutes(new Date(), 0), 9)
  const maxTime = setHours(setMinutes(new Date(), 0), 17)

  if (!isSignedIn) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <p className="text-center text-gray-600">
          Please sign in to book this service
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Book Appointment</h2>
      
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Price</span>
          <span className="font-semibold">
            {formatCurrency(parseFloat(service.price))}
          </span>
        </div>
        <div className="flex justify-between text-sm text-gray-600 mb-4">
          <span>Duration</span>
          <span>{service.duration} minutes</span>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Select Date and Time</label>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={30}
          dateFormat="MMMM d, yyyy h:mm aa"
          minDate={new Date()}
          maxDate={addDays(new Date(), 30)}
          minTime={minTime}
          maxTime={maxTime}
          className="w-full p-2 border rounded-md"
          placeholderText="Select date and time"
        />
      </div>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Button
        type="submit"
        disabled={!selectedDate || isLoading}
        className="w-full"
      >
        {isLoading ? 'Booking...' : 'Book Now'}
      </Button>
    </form>
  )
}
