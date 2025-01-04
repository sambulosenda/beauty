// src/components/bookings/booking-steps.tsx
'use client'

import { useState, useEffect } from 'react'
import { Check, Clock, User, CreditCard, Loader2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import CustomBookingCalendar from './custom-booking-calendar'
import BookingForm from './booking-form'
import { useQuery } from '@tanstack/react-query'
import { format, parse } from 'date-fns'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { PaymentWrapper } from '../payments/payment-wrapper'
import { BookingSummary } from './booking-summary'
import { cn } from '@/lib/utils'
import React  from 'react'
interface BookingStepsProps {
  serviceId: string
  onComplete?: () => void
}

const steps = [
  { id: 1, name: 'Select Time', icon: Clock },
  { id: 2, name: 'Your Details', icon: User },
  { id: 3, name: 'Payment', icon: CreditCard },
  { id: 4, name: 'Confirmation', icon: Check }
]

export default function BookingSteps({ serviceId, onComplete }: BookingStepsProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [providerStripeStatus, setProviderStripeStatus] = useState<{
    isConnected: boolean;
    accountEnabled: boolean;
  } | null>(null)
  const [isCheckingStripe, setIsCheckingStripe] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [bookingId, setBookingId] = useState<string | null>(null)

  const { data: service, isLoading: isServiceLoading } = useQuery({
    queryKey: ['service', serviceId],
    queryFn: async () => {
      const res = await fetch(`/api/services/${serviceId}`)
      return res.json()
    }
  })

  useEffect(() => {
    async function checkProviderStripeStatus() {
      if (!service?.providerId) return;
      
      setIsCheckingStripe(true);
      try {
        const response = await fetch(`/api/providers/${service.providerId}/stripe-status`, {
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache'
          }
        });
        const data = await response.json();
        setProviderStripeStatus(data);
      } catch (error) {
        console.error('Error checking provider stripe status:', error);
        setProviderStripeStatus(null);
      } finally {
        setIsCheckingStripe(false);
      }
    }

    checkProviderStripeStatus();
  }, [service?.providerId]);

  useEffect(() => {
    setProviderStripeStatus(null);
    setIsCheckingStripe(true);
    setSelectedDate(null);
    setSelectedTime(null);
    setCurrentStep(0);
  }, [serviceId]);

  if (isServiceLoading) {
    return (
      <div className="flex items-center justify-center p-6">
        <Loader2 className="h-6 w-6 animate-spin" />
        <span className="ml-2">Loading service details...</span>
      </div>
    );
  }

  const isProviderStripeReady = providerStripeStatus?.isConnected && providerStripeStatus?.accountEnabled;

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    setSelectedTime(null)
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
  }

  const handleFormComplete = () => {
    setCurrentStep(2) // Move to payment step
  }

  const handlePaymentSuccess = async (paymentIntentId: string) => {
    if (!selectedDate || !selectedTime || !service) return;

    try {
      const startTime = parse(selectedTime, 'HH:mm', selectedDate);
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceId: service.id,
          providerId: service.providerId,
          date: startTime,
          paymentIntentId,
        }),
      });

      const booking = await response.json();
      if (booking.error) throw new Error(booking.error);
      
      setBookingId(booking.id);
      setCurrentStep(3);
      if (onComplete) {
        onComplete();
      }
    } catch (error) {
      console.error('Booking error:', error);
      setError('Failed to create booking. Please try again.');
    }
  };

  return (
    <div className="space-y-8">
      {/* Progress Steps */}
      <nav>
        <ol className="flex items-center justify-between">
          {steps.map((step) => (
            <li 
              key={step.id} 
              className={cn(
                "flex flex-col items-center gap-2",
                currentStep >= step.id - 1 ? "text-rose-600" : "text-gray-400"
              )}
            >
              <span className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center",
                currentStep >= step.id - 1 ? "bg-rose-600 text-white" : "bg-gray-100"
              )}>
                <step.icon className="w-5 h-5" />
              </span>
              <span className="text-xs font-medium whitespace-nowrap">
                {step.name}
              </span>
            </li>
          ))}
        </ol>
      </nav>

      {/* Step Content */}
      <div className="mt-8">
        {currentStep === 0 && (
          <div className="space-y-6">
            {isCheckingStripe ? (
              <div className="flex items-center justify-center p-6">
                <Loader2 className="h-6 w-6 animate-spin" />
                <span className="ml-2">Checking availability...</span>
              </div>
            ) : !isProviderStripeReady ? (
              <div className="rounded-lg bg-destructive/10 p-6 text-center">
                <h3 className="font-semibold text-destructive mb-2">Provider Not Available</h3>
                <p className="text-sm text-muted-foreground">
                  This provider is not yet setup to accept bookings. Please try again later.
                </p>
              </div>
            ) : (
              <>
                <CustomBookingCalendar
                  selectedDate={selectedDate}
                  onDateSelect={handleDateSelect}
                  bookedDates={[]}
                  fromDate={new Date()}
                  toDate={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)}
                />
                {selectedDate && (
                  <div className="grid grid-cols-4 gap-2">
                    {['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'].map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? 'default' : 'outline'}
                        onClick={() => handleTimeSelect(time)}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {currentStep === 1 && service && (
          <BookingForm
            service={service}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            setSelectedDate={setSelectedDate}
            setSelectedTime={setSelectedTime}
            onComplete={handleFormComplete}
            onStripeStatusChange={(status) => setProviderStripeStatus(status)}
          />
        )}

        {currentStep === 2 && service && (
          <PaymentWrapper
            amount={parseFloat(service.price)}
            onSuccess={handlePaymentSuccess}
            bookingDetails={{
              service,
              date: selectedDate,
              time: selectedTime
            }}
          />
        )}

        {currentStep === 3 && (
          <div className="text-center space-y-4">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-medium">Booking Confirmed!</h3>
            <p className="text-gray-500">
              Your appointment has been scheduled for{' '}
              {selectedDate && format(selectedDate, 'MMMM d, yyyy')} at {selectedTime}
            </p>
          </div>
        )}
      </div>

      {/* Error Display */}
      {error && (
        <Alert variant="destructive" className="mt-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Navigation */}
      <div className="flex justify-between pt-6 border-t">
        <Button
          variant="outline"
          onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
          disabled={currentStep === 0}
        >
          Back
        </Button>
        <Button
          onClick={() => setCurrentStep(prev => prev + 1)}
          disabled={
            isCheckingStripe ||
            !isProviderStripeReady ||
            (currentStep === 0 && (!selectedDate || !selectedTime)) ||
            currentStep === steps.length - 1
          }
        >
          Continue
        </Button>
      </div>

      {/* Service Summary */}
      {service && (
        <BookingSummary
          service={service}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
        />
      )}
    </div>
  )
}
