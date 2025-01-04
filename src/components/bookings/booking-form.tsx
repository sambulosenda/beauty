'use client'
import React from 'react'

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
import { CalendarIcon, Clock, CheckCircle2, Loader2 } from 'lucide-react'
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
  onStripeStatusChange: (status: { isConnected: boolean; accountEnabled: boolean; } | null) => void;
}

export default function BookingForm({ 
  service, 
  selectedDate, 
  selectedTime, 
  setSelectedDate, 
  setSelectedTime, 
  onComplete,
  onStripeStatusChange 
}: BookingFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { user, isSignedIn } = useUser()
  const router = useRouter()
  const [showPayment, setShowPayment] = useState(false)
  const [bookingId, setBookingId] = useState<string | null>(null)
  const [bookedDates, setBookedDates] = useState<Date[]>([])
  const [providerStripeStatus, setProviderStripeStatus] = useState<{
    isConnected: boolean;
    accountEnabled: boolean;
  } | null>(null)
  const [isCheckingStripe, setIsCheckingStripe] = useState(true)

  // Reset form state when provider changes
  useEffect(() => {
    setError(null)
    setShowPayment(false)
    setBookingId(null)
    setBookedDates([])
    setProviderStripeStatus(null)
    setIsCheckingStripe(true)
    setIsLoading(false)
  }, [service.providerId])

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

  useEffect(() => {
    async function checkProviderStripeStatus() {
      setIsCheckingStripe(true);
      try {
        const response = await fetch(`/api/providers/${service.providerId}/stripe-status`);
        const data = await response.json();
        setProviderStripeStatus(data);
      } catch (error) {
        console.error('Error checking provider stripe status:', error);
        setError('Unable to verify payment setup');
      } finally {
        setIsCheckingStripe(false);
      }
    }

    checkProviderStripeStatus();
  }, [service.providerId]);

  const isProviderStripeReady = providerStripeStatus?.isConnected && providerStripeStatus?.accountEnabled;

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
    if (!selectedDate || !selectedTime || !isSignedIn) return;

    try {
      setIsLoading(true);
      
      // Create payment intent first
      const response = await fetch('/api/payments/create-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: parseFloat(service.price) * 100,
          currency: 'gbp',
          serviceId: service.id,
          date: selectedDate,
          time: selectedTime,
        }),
      });

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      setBookingId(data.id);
      setShowPayment(true);
    } catch (error) {
      console.error('Booking error:', error)
      setError('Failed to process booking. Please try again.')
    } finally {
      setIsLoading(false);
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
        amount={parseFloat(service.price)}
        onSuccess={() => {}}
        bookingDetails={{
          service,
          date: selectedDate,
          time: selectedTime
        }}
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
        
        {/* Add any additional form fields here */}
        
        <Button 
          type="submit" 
          disabled={
            !selectedDate || 
            !selectedTime || 
            isLoading || 
            isCheckingStripe || 
            !isProviderStripeReady
          }
          className="w-full"
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : isCheckingStripe ? (
            'Checking availability...'
          ) : !isProviderStripeReady ? (
            'Provider not available'
          ) : (
            'Book Now'
          )}
        </Button>
      </div>

      {!isCheckingStripe && !isProviderStripeReady && (
        <Alert variant="destructive" className="mt-4">
          <AlertDescription>
            This provider is not yet setup to accept bookings. Please try again later.
          </AlertDescription>
        </Alert>
      )}
    </form>
  )
}

