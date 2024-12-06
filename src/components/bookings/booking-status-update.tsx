// components/bookings/booking-status-update.tsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'

interface BookingStatusUpdateProps {
  bookingId: string
  currentStatus: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED'
  onStatusUpdate: () => void
}

export function BookingStatusUpdate({
  bookingId,
  currentStatus,
  onStatusUpdate
}: BookingStatusUpdateProps) {
  const [status, setStatus] = useState(currentStatus)
  const [isLoading, setIsLoading] = useState(false)

  const handleStatusUpdate = async () => {

    if (status === currentStatus) return

    setIsLoading(true)
    try {
      const response = await fetch(`/api/bookings/${bookingId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      })

      if (!response.ok) throw new Error('Failed to update status')
      
      toast({
        title: 'Status Updated',
        description: `Booking status has been updated to ${status.toLowerCase()}`,
      })
      onStatusUpdate()
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update booking status',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const { toast } = useToast()

  return (
    <div className="flex items-center gap-4">
      <Select
        value={status}
        onValueChange={(value: typeof status) => setStatus(value)}
        disabled={isLoading}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="PENDING">Pending</SelectItem>
          <SelectItem value="CONFIRMED">Confirmed</SelectItem>
          <SelectItem value="COMPLETED">Completed</SelectItem>
          <SelectItem value="CANCELLED">Cancelled</SelectItem>
        </SelectContent>
      </Select>

      <Button 
        onClick={handleStatusUpdate}
        disabled={status === currentStatus || isLoading}
      >
        {isLoading ? 'Updating...' : 'Update Status'}
      </Button>
    </div>
  )
}