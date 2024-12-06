// components/bookings/client-status-update.tsx
'use client'

import { useRouter } from 'next/navigation'
import { BookingStatusUpdate } from './booking-status-update'

interface ClientStatusUpdateProps {
  bookingId: string
  currentStatus: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED'
}

export function ClientStatusUpdate({ bookingId, currentStatus }: ClientStatusUpdateProps) {
  const router = useRouter()
  
  return (
    <BookingStatusUpdate 
      bookingId={bookingId}
      currentStatus={currentStatus}
      onStatusUpdate={() => router.refresh()}
    />
  )
}