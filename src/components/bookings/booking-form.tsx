'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { formatCurrency } from '@/lib/utils'

interface Provider {
  id: string
  name: string | null
  businessName: string | null
  description: string | null
}

interface ServiceWithProvider {
  id: string
  name: string
  description: string | null
  price: string
  duration: number
  providerId: string
  category: string
  provider: Provider
}

export default function BookingForm({ service }: { service: ServiceWithProvider }) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { user, isSignedIn } = useUser()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!selectedDate || !isSignedIn) {
      setError('Please select a date and time')
      return
    }

    setIsLoading(true)
    try {
      console.log('Sending booking request:', {
        serviceId: service.id,
        providerId: service.providerId,
        date: selectedDate,
      })

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
      console.error('Booking error:', error)
      setError(error instanceof Error ? error.message : 'Failed to create booking')
    } finally {
      setIsLoading(false)
    }
  }

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
          <span className="font-semibold">{formatCurrency(parseFloat(service.price))}</span>
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
          onChange={(date) => setSelectedDate(date)}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={30}
          dateFormat="MMMM d, yyyy h:mm aa"
          minDate={new Date()}
          className="w-full p-2 border rounded-md"
          placeholderText="Select date and time"
        />
      </div>

      {error && (
        <div className="mb-4 p-3 text-sm text-red-500 bg-red-50 rounded-md">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={!selectedDate || isLoading}
        className="w-full bg-rose-600 text-white py-2 px-4 rounded-md hover:bg-rose-700 disabled:bg-gray-400 transition-colors"
      >
        {isLoading ? 'Booking...' : 'Book Now'}
      </button>
    </form>
  )
}