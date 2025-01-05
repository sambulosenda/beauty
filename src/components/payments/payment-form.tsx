'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface PaymentFormProps {
  amount: number;
  onSuccess: (paymentIntentId: string) => void;
  bookingDetails?: {
    service: {
      id: string;
      providerId: string;
    };
    date: Date;
  };
}

export function PaymentForm({ amount, onSuccess, bookingDetails }: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  // Ensure amount is a valid number
  const formattedAmount = typeof amount === 'number' ? amount : parseFloat(amount);
  if (isNaN(formattedAmount)) {
    console.error('Invalid amount provided:', amount);
  }

  useEffect(() => {
    if (!stripe) return;

    const clientSecret = new URLSearchParams(window.location.search).get('payment_intent_client_secret');
    if (!clientSecret) return;

    stripe.retrievePaymentIntent(clientSecret).then(async ({ paymentIntent }) => {
      if (paymentIntent?.status === 'succeeded') {
        try {
          if (bookingDetails) {
            const bookingResponse = await fetch('/api/bookings', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                serviceId: bookingDetails.service.id,
                providerId: bookingDetails.service.providerId,
                date: bookingDetails.date,
                paymentIntentId: paymentIntent.id,
              }),
            });

            if (!bookingResponse.ok) {
              throw new Error('Failed to create booking');
            }

            const booking = await bookingResponse.json();
            onSuccess(booking.id);
          } else {
            onSuccess(paymentIntent.id);
          }
          router.push('/bookings/confirmation');
        } catch (err) {
          console.error('Booking creation error:', err);
          setError('Payment successful but booking creation failed. Please contact support.');
        }
      }
    });
  }, [stripe, bookingDetails, onSuccess, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements || processing) return;

    setProcessing(true);
    setError(null);

    try {
      const { error: submitError } = await elements.submit();
      if (submitError) throw submitError;

      const result = await stripe.confirmPayment({
        elements,
        redirect: "always",
        confirmParams: {
          return_url: `${window.location.origin}/bookings/confirmation`,
        },
      });

      // This code will only run if the redirect fails for some reason
      if (result.error) {
        throw result.error;
      }
    } catch (err) {
      console.error('Payment error:', err);
      setError(err instanceof Error ? err.message : 'Payment failed. Please try again.');
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="text-red-500 text-sm mb-4">{error}</div>
      )}
      <PaymentElement />
      <Button
        type="submit"
        disabled={!stripe || processing}
        className="w-full"
      >
        {processing ? 'Processing...' : `Pay $${(formattedAmount || 0).toFixed(2)}`}
      </Button>
    </form>
  );
} 
