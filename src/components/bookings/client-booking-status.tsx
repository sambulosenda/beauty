// components/bookings/client-booking-status.tsx
'use client'

import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { BookingStatusUpdate } from './booking-status-update'
import React from 'react'

interface ClientBookingStatusProps {
  bookingId: string;
  currentStatus: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
}

export function ClientBookingStatus({ bookingId, currentStatus }: ClientBookingStatusProps) {
  const router = useRouter()
  const { user } = useUser()

  if (user?.publicMetadata?.role !== 'PROVIDER') {
    return null
  }

  return (
    <div className="mt-4">
      <BookingStatusUpdate 
        bookingId={bookingId} 
        currentStatus={currentStatus}
        onStatusUpdate={() => router.refresh()}
      />
    </div>
  )
}