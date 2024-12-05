// lib/availability.ts
import { addMinutes, format, parseISO, isWithinInterval } from 'date-fns'

export async function checkAvailability(
  providerId: string,
  startTime: Date,
  duration: number
): Promise<{ available: boolean; reason?: string }> {
  try {
    // First, get all bookings for the day
    const bookingsResponse = await fetch(`/api/bookings/check?providerId=${providerId}&date=${startTime.toISOString()}`)
    if (!bookingsResponse.ok) {
      throw new Error('Failed to check existing bookings')
    }
    
    const existingBookings = await bookingsResponse.json()
    
    // Check for booking conflicts
    const endTime = addMinutes(startTime, duration)
    const hasConflict = existingBookings.some((booking: any) => {
      const bookingStart = new Date(booking.startTime)
      const bookingEnd = new Date(booking.endTime)
      return (
        isWithinInterval(startTime, { start: bookingStart, end: bookingEnd }) ||
        isWithinInterval(endTime, { start: bookingStart, end: bookingEnd }) ||
        isWithinInterval(bookingStart, { start: startTime, end: endTime })
      )
    })

    if (hasConflict) {
      return {
        available: false,
        reason: 'Time slot is already booked'
      }
    }

    // Basic time validation
    const hour = startTime.getHours()
    if (hour < 9 || hour > 17) {
      return {
        available: false,
        reason: 'Bookings are only available between 9 AM and 5 PM'
      }
    }

    // All checks passed
    return {
      available: true
    }
  } catch (error) {
    console.error('Error checking availability:', error)
    return {
      available: false,
      reason: 'Error checking availability. Please try again.'
    }
  }
}