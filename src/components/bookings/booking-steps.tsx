// src/components/bookings/booking-steps.tsx
import { useState } from 'react';
import { Check, Clock, Calendar, CreditCard } from 'lucide-react'
import { Button } from "@/components/ui/button"
import CustomBookingCalendar from './custom-booking-calendar'
import BookingForm from './booking-form'
import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns';
import { Alert, AlertDescription } from '@/components/ui/alert'
import { parse, parseISO } from 'date-fns';
import { PaymentWrapper } from '../payments/payment-wrapper';

interface BookingStepsProps {
  serviceId: string
  onComplete?: () => void
}

export default function BookingSteps({ serviceId, onComplete }: BookingStepsProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [canProceed, setCanProceed] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch service data
  const { data: service, isLoading } = useQuery({
    queryKey: ["service", serviceId],
    queryFn: async () => {
      const response = await fetch(`/api/services/${serviceId}`);
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      console.log('Fetched service data:', data);
      
      // Ensure availableDays is always an array
      return {
        ...data,
        availableDays: data.availableDays || []
      };
    },
  });

  const steps = [
    { id: 1, name: 'Select Time', icon: Clock },
    { id: 2, name: 'Your Details', icon: Calendar },
    { id: 3, name: 'Payment', icon: CreditCard },
    { id: 4, name: 'Confirmation', icon: Check }
  ]

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
      setCanProceed(false);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      if (currentStep === 1) {
        setCanProceed(selectedTime !== null);
      } else {
        setCanProceed(true);
      }
    }
  };

  const handleDateSelect = (date: Date) => {
    if (service?.availableDays) {
      const dayOfWeek = format(date, 'EEEE').toUpperCase();
      if (!service.availableDays.includes(dayOfWeek)) {
        setError('This day is not available for booking');
        return;
      }
    }
    
    setError(null);
    setSelectedDate(date);
    setSelectedTime(null);
    setCanProceed(false);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setCanProceed(true);
  };

  const handleFormComplete = () => {
    setCanProceed(true);
    handleNextStep(); // Move to payment step
  };

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
      handleNextStep(); // Move to confirmation step
    } catch (error) {
      console.error('Booking error:', error);
      setError('Failed to create booking. Please try again.');
    }
  };

  const getDisabledDays = (date: Date) => {
    if (isLoading || !service) return true;
    
    if (!Array.isArray(service.availableDays) || service.availableDays.length === 0) {
      return true;
    }
    
    const dayOfWeek = format(date, 'EEEE').toUpperCase();
    return !service.availableDays.includes(dayOfWeek);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <nav aria-label="Progress" className="mb-8">
          <ol className="flex items-center justify-between w-full">
            {steps.map((step) => (
              <li key={step.id} className={`flex items-center ${
                currentStep >= step.id - 1 ? 'text-rose-600' : 'text-gray-400'
              }`}>
                <span className={`flex items-center justify-center w-8 h-8 rounded-full border-2 
                  ${currentStep >= step.id - 1 ? 'border-rose-600 bg-rose-50' : 'border-gray-200'}`}>
                  <step.icon className="w-4 h-4" />
                </span>
                <span className="ml-2 text-sm font-medium hidden sm:inline">
                  {step.name}
                </span>
              </li>
            ))}
          </ol>
        </nav>

        {/* Step Content */}
        <div className="mt-8">
          {currentStep === 0 && (
            <div className="space-y-4">
              {service ? (
                <CustomBookingCalendar
                  selectedDate={selectedDate}
                  onDateSelect={handleDateSelect}
                  bookedDates={[]}
                  minDate={new Date()}
                  maxDate={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)}
                  disabledDays={getDisabledDays}
                />
              ) : (
                <div className="text-center text-gray-500">
                  Unable to load service details
                </div>
              )}
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
            </div>
          )}
          {currentStep === 1 && service && (
            <div>
              <BookingForm 
                service={service}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                selectedTime={selectedTime}
                setSelectedTime={setSelectedTime}
                onComplete={handleFormComplete}
              />
            </div>
          )}
          {currentStep === 2 && (
            <div>
              <PaymentWrapper
                amount={service?.price ? parseFloat(service.price) : 0}
                onSuccess={handlePaymentSuccess}
                bookingDetails={{
                  date: selectedDate,
                  time: selectedTime,
                  service: service
                }}
              />
            </div>
          )}
          {currentStep === 3 && (
            <div className="text-center">
              <Check className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium">Booking Confirmed!</h3>
              <p className="text-gray-500">
                Your appointment has been scheduled for{' '}
                {selectedDate && format(selectedDate, 'MMMM d, yyyy')} at {selectedTime}
              </p>
            </div>
          )}
        </div>
      </div>
      
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="flex justify-between mt-6">
        {currentStep > 0 && (
          <Button variant="outline" onClick={handlePrevStep}>
            Back
          </Button>
        )}
        <Button 
          onClick={currentStep === steps.length - 1 ? onComplete : handleNextStep}
          disabled={!canProceed}
        >
          {currentStep === steps.length - 1 ? 'Close' : 'Next'}
        </Button>
      </div>
    </div>
  )
}
