// app/dashboard/calendar/calendar-view.tsx
'use client'

import { useState } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { addDays, format, isToday } from 'date-fns'
import { DayBookings } from './day-bookings';

interface CalendarViewProps {
  providerId: string;
}

export function CalendarView({ providerId }: CalendarViewProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
      <div>
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="rounded-md border w-full"
          disabled={{ before: new Date() }}
          modifiers={{
            today: (date) => isToday(date),
          }}
          modifiersClassNames={{
            today: "bg-rose-100 text-rose-900 font-bold",
          }}
        />
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        {selectedDate ? (
          <>
            <h2 className="text-lg font-semibold mb-4">
              Bookings for {format(selectedDate, 'MMMM d, yyyy')}
            </h2>
            <DayBookings 
              date={selectedDate} 
              providerId={providerId}
            />
          </>
        ) : (
          <p className="text-gray-500">Select a date to view bookings</p>
        )}
      </div>
    </div>
  )
}