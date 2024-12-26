'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Clock, CreditCard, ArrowRight, LucideIcon } from 'lucide-react'
import { format, parse } from 'date-fns'
import { cn } from '@/lib/utils'
import { Button } from "@/components/ui/button"
import { DateTimeSelector } from './date-time-selector'
import { BookingSummary } from './booking-summary'
import { PaymentWrapper } from '../payments/payment-wrapper'
import { Alert, AlertDescription } from "@/components/ui/alert"

interface Step {
  id: number
  title: string
  subtitle: string
  icon: LucideIcon
}

const steps: Step[] = [
  {
    id: 1,
    title: "Select Date",
    subtitle: "Choose your preferred day",
    icon: Calendar
  },
  {
    id: 2,
    title: "Choose Time",
    subtitle: "Pick available time slot",
    icon: Clock
  },
  {
    id: 3,
    title: "Confirm & Pay",
    subtitle: "Review and complete booking",
    icon: CreditCard
  }
]

export function ModernBookingFlow({ service, onComplete }) {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [bookingId, setBookingId] = useState<string | null>(null)

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
  }

  const canProceedToNextStep = () => {
    switch (currentStep) {
      case 1:
        return selectedDate !== null && selectedTime !== null
      case 2:
        return true
      case 3:
        return true
      default:
        return false
    }
  }

  const handleNext = () => {
    if (canProceedToNextStep()) {
      if (currentStep === 3) {
        onComplete?.()
      } else {
        setCurrentStep(prev => prev + 1)
      }
    }
  }

  const handleBack = () => {
    setCurrentStep(prev => Math.max(1, prev - 1))
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
        onComplete(booking.id);
      }
    } catch (error) {
      console.error('Booking error:', error);
      setError('Failed to create booking. Please try again.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Top Progress Bar */}
      <div className="relative mb-8">
        <div className="absolute top-0 left-0 h-1 bg-gray-200 w-full">
          <motion.div 
            className="absolute h-full bg-rose-600"
            initial={{ width: "0%" }}
            animate={{ width: `${(currentStep / steps.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        
        <div className="relative flex justify-between pt-6">
          {steps.map((step) => (
            <div key={step.id} className="flex flex-col items-center">
              <motion.div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center",
                  currentStep >= step.id ? "bg-rose-600 text-white" : "bg-gray-100"
                )}
                animate={{
                  scale: currentStep === step.id ? 1.1 : 1,
                  backgroundColor: currentStep >= step.id ? "#e11d48" : "#f3f4f6"
                }}
              >
                <step.icon className="w-5 h-5" />
              </motion.div>
              <div className="mt-2 text-center">
                <span className="text-sm font-medium block">{step.title}</span>
                <span className="text-xs text-gray-500">{step.subtitle}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          {currentStep === 1 && (
            <DateTimeSelector 
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              onDateSelect={handleDateSelect}
              onTimeSelect={handleTimeSelect}
              availableDays={service.availableDays || []}
            />
          )}
          
          {currentStep === 2 && (
            <BookingSummary
              service={service}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
            />
          )}

          {currentStep === 3 && (
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

          {/* Error Display */}
          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Navigation Buttons */}
          <div className="mt-6 flex justify-between">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
            >
              Back
            </Button>
            <Button
              onClick={handleNext}
              disabled={!canProceedToNextStep()}
            >
              {currentStep === 3 ? 'Pay Now' : 'Next'}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Floating Summary Bar */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg md:hidden"
      >
        <div className="container p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">{service.name}</p>
              <p className="text-sm text-gray-500">
                {selectedDate && format(selectedDate, 'MMM d, yyyy')}
                {selectedTime && ` at ${selectedTime}`}
              </p>
            </div>
            <Button
              onClick={() => setCurrentStep(prev => prev + 1)}
              disabled={!canProceedToNextStep()}
            >
              Next
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  )
} 
