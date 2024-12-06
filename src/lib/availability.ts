// lib/availability.ts
import { addMinutes, isWithinInterval, parseISO } from 'date-fns'

export async function checkAvailability(
  providerId: string,
  startTime: Date,
  duration: number
): Promise<{ available: boolean; reason?: string }> {
  try {
    // Add console.log for debugging
    console.log('Checking availability for:', {
      providerId,
      startTime,
      duration
    })

    const availabilityResponse = await fetch(`/api/availability/${providerId}`)
    const availabilitySettings = await availabilityResponse.json()
    
    // Handle empty or invalid response
    if (!Array.isArray(availabilitySettings)) {
      return {
        available: false,
        reason: 'No availability settings found'
      }
    }

    // Add console.log for debugging
    console.log('Availability settings:', availabilitySettings)

    const dayOfWeek = startTime.toLocaleString('en-US', { weekday: 'long' }).toUpperCase()
    console.log('Day of week:', dayOfWeek)

    // Check if provider works this day
    const dayAvailability = availabilitySettings.find(
      (a: any) => a.dayOfWeek === dayOfWeek
    )
    
    console.log('Day availability:', dayAvailability)

    if (!dayAvailability) {
      return {
        available: false,
        reason: `Provider is not available on ${dayOfWeek}`
      }
    }

    // Rest of the function remains the same
    const workStart = parseISO(`${startTime.toISOString().split('T')[0]}T${dayAvailability.startTime}`)
    const workEnd = parseISO(`${startTime.toISOString().split('T')[0]}T${dayAvailability.endTime}`)
    
    if (!isWithinInterval(startTime, { start: workStart, end: workEnd })) {
      return {
        available: false,
        reason: `Time is outside provider's working hours (${dayAvailability.startTime}-${dayAvailability.endTime})`
      }
    }

    return { available: true }
  } catch (error) {
    console.error('Error checking availability:', error)
    return {
      available: false,
      reason: 'Error checking availability. Please try again.'
    }
  }
}
