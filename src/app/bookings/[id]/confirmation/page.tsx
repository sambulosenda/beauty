'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Check, X } from 'lucide-react';
import React from 'react'

export default function BookingConfirmationPage() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'success' | 'error' | 'loading'>('loading');

  useEffect(() => {
    const paymentIntent = searchParams.get('payment_intent');
    const redirectStatus = searchParams.get('redirect_status');

    if (redirectStatus === 'succeeded') {
      setStatus('success');
    } else {
      setStatus('error');
    }
  }, [searchParams]);

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow p-8 text-center">
        {status === 'success' ? (
          <>
            <Check className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-4">Booking Confirmed!</h1>
            <p className="text-gray-600">
              Thank you for your booking. You will receive a confirmation email shortly.
            </p>
          </>
        ) : (
          <>
            <X className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-4">Payment Failed</h1>
            <p className="text-gray-600">
              There was an issue processing your payment. Please try again.
            </p>
          </>
        )}
      </div>
    </div>
  );
} 
