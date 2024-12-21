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
    <div className="w-full">
      <div className="flex items-center justify-between px-2 mb-4">
        <button 
          onClick={previousMonth}
          className="p-1 hover:bg-gray-50 rounded-md"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <h2 className="text-base font-medium">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        <button 
          onClick={nextMonth}
          className="p-1 hover:bg-gray-50 rounded-md"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-7 text-center mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-sm text-muted-foreground">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 text-center gap-y-1">
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
                "aspect-square w-full flex items-center justify-center text-sm",
                "hover:bg-gray-50 transition-colors",
                !isCurrentMonth && "text-gray-300",
                isCurrentMonth && !isSelected && "text-gray-900",
                isSelected && "bg-blue-600 text-white rounded-full",
                isDisabled && "cursor-not-allowed opacity-50 hover:bg-transparent",
                isHighlightedDate && !isSelected && "border border-blue-600"
              )}
            >
              {format(day, 'd')}
            </button>
          )
        })}
      </div>

      {/* {selectedDate && (
        <div className="mt-6">
          <h3 className="text-sm font-medium mb-3">Available Times</h3>
          <div className="grid grid-cols-4 gap-2">
            {['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'].map((time) => (
              <button
                key={time}
                onClick={() => onDateSelect(selectedDate)}
                className={cn(
                  "py-2 px-4 text-sm rounded-lg border border-gray-200",
                  "hover:border-blue-600 transition-colors",
                  "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                )}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      )} */}
    </div>
  )
}

