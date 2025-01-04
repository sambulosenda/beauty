'use client';

import { useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';

import React from 'react';
interface PaymentFormProps {
  amount: number;
  onSuccess: (paymentIntentId: string) => void;
}

export function PaymentForm({ amount, onSuccess }: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);

    try {
      const { error: submitError } = await elements.submit();
      if (submitError) throw submitError;

      const result = await stripe.confirmPayment({
        elements,
        redirect: "if_required",
        confirmParams: {
          return_url: `${window.location.origin}/bookings/confirmation`,
        },
      });

      if (result.error) {
        throw result.error;
      }

      if (result.paymentIntent) {
        onSuccess(result.paymentIntent.id);
      }
    } catch (err: unknown) {
      if (err instanceof Error ) {
        setError('An error occurred');
      }
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      <Button
        type="submit"
        disabled={!stripe || processing}
        className="w-full"
      >
        {processing ? 'Processing...' : `Pay ${amount}`}
      </Button>
    </form>
  );
} 
