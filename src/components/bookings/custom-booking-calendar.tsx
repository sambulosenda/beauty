'use client'

import { useState } from 'react'
import { 
  addMonths, 
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameMonth,
  isSameDay
} from 'date-fns'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CustomBookingCalendarProps {
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
  bookedDates?: Date[];
  minDate?: Date;
  maxDate?: Date;
  disabledDays?: (date: Date) => boolean;
}

export default function CustomBookingCalendar({ 
  selectedDate, 
  onDateSelect, 
  bookedDates = [], 
  minDate, 
  maxDate,
  disabledDays 
}: CustomBookingCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(monthStart)
  const calendarStart = startOfWeek(monthStart)
  const calendarEnd = endOfWeek(monthEnd)

  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd })

  const previousMonth = () => setCurrentMonth(subMonths(currentMonth, 1))
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1))

  const isHighlighted = (date: Date) => 
    bookedDates.some(d => isSameDay(d, date))

  return (
    <div className="rounded-lg border p-4">
      <div className="flex items-center justify-between mb-4">
        <button onClick={previousMonth} className="p-2">
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>
        <h2 className="text-1xl font-bold">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        <button onClick={nextMonth} className="p-2">
          <ChevronRight className="w-6 h-6 text-gray-600" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-2 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {days.map(day => {
          const isCurrentMonth = isSameMonth(day, currentMonth)
          const isSelected = selectedDate && isSameDay(day, selectedDate)
          const isHighlightedDate = isHighlighted(day)
          const isDisabled = disabledDays ? disabledDays(day) : false

          return (
            <button
              key={day.toString()}
              onClick={() => !isDisabled && onDateSelect(day)}
              disabled={isDisabled}
              className={cn(
                "h-10 w-10 flex items-center justify-center rounded-full text-sm",
                !isCurrentMonth && "text-gray-300",
                isCurrentMonth && !isSelected && !isHighlightedDate && "text-gray-900",
                isSelected && "bg-blue-900 text-white",
                isHighlightedDate && !isSelected && "border border-gray-300",
                isCurrentMonth && !isSelected && !isDisabled && "hover:bg-gray-100",
                isDisabled && "opacity-50 cursor-not-allowed bg-gray-100"
              )}
            >
              {format(day, 'd')}
            </button>
          )
        })}
      </div>
    </div>
  )
}

