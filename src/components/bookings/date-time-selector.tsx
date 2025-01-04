'use client'

import CustomBookingCalendar from './custom-booking-calendar'
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import React from 'react'

interface DateTimeSelectorProps {
  selectedDate: Date | null
  selectedTime: string | null
  onDateSelect: (date: Date) => void
  onTimeSelect: (time: string) => void
  availableDays: string[]
}

export function DateTimeSelector({
  selectedDate,
  selectedTime,
  onDateSelect,
  onTimeSelect,
  availableDays
}: DateTimeSelectorProps) {
  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00'
  ]

  const disabledDays = (date: Date) => {
    const dayIndex = date.getDay()
    const days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY']
    return !availableDays?.includes(days[dayIndex])
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <CustomBookingCalendar
          selectedDate={selectedDate}
          onDateSelect={onDateSelect}
          bookedDates={[]}
          fromDate={new Date()}
          toDate={new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)}
          disabledDays={disabledDays}
        />
      </div>

      <div>
        {selectedDate ? (
          <div>
            <h3 className="text-sm font-medium mb-3">Available Times</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {timeSlots.map((time) => (
                <Button
                  key={time}
                  variant={selectedTime === time ? "default" : "outline"}
                  className={cn(
                    "w-full",
                    selectedTime === time && "bg-rose-600 hover:bg-rose-700"
                  )}
                  onClick={() => onTimeSelect(time)}
                >
                  {time}
                </Button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Please select a date to view available times
          </div>
        )}
      </div>
    </div>
  )
} 
