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
  selectedDate: Date | null | undefined
  onDateSelect: (date: Date) => void
  bookedDates?: Date[]
  minDate?: Date
  maxDate?: Date
}

export function CustomBookingCalendar({ selectedDate, onDateSelect, bookedDates = [], minDate, maxDate }: CustomBookingCalendarProps) {
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
    <div className="w-full max-w-sm mx-auto bg-white">
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

          return (
            <button
              key={day.toString()}
              onClick={() => onDateSelect && onDateSelect(day)}
              className={cn(
                "h-10 w-10 flex items-center justify-center rounded-full text-sm",
                !isCurrentMonth && "text-gray-300",
                isCurrentMonth && !isSelected && !isHighlightedDate && "text-gray-900",
                isSelected && "bg-blue-900 text-white",
                isHighlightedDate && !isSelected && "border border-gray-300",
                isCurrentMonth && !isSelected && "hover:bg-gray-100"
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

