'use client';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { PaymentForm } from './payment-form';
import { useEffect, useState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface PaymentWrapperProps {
  amount: number;
  onSuccess: (paymentIntentId: string) => void;
  bookingDetails: {
    service: any;
    date: Date | null;
    time: string | null;
  };
}

export function PaymentWrapper({ amount, onSuccess, bookingDetails }: PaymentWrapperProps) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/payments/create-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount,
        serviceId: bookingDetails.service.id,
        providerId: bookingDetails.service.providerId,
        date: bookingDetails.date,
        time: bookingDetails.time
      }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || 'Failed to create payment');
        }
        return data;
      })
      .then((data) => setClientSecret(data.clientSecret))
      .catch((err) => {
        console.error('Payment setup error:', err);
        setError(err.message);
      });
  }, [amount, bookingDetails]);

  const handlePaymentSuccess = async (paymentIntentId: string) => {
    onSuccess(paymentIntentId);
  };

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!clientSecret) {
    return <div>Loading payment form...</div>;
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow">
      <Elements
        stripe={stripePromise}
        options={{
          clientSecret,
          appearance: {
            theme: 'stripe',
            variables: {
              colorPrimary: '#e11d48',
            },
          },
        }}
      >
        <PaymentForm
          amount={amount}
          onSuccess={handlePaymentSuccess}
          bookingDetails={bookingDetails}
        />
      </Elements>
    </div>
  );
} 
