'use client'

import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import React from "react"

interface CustomBookingCalendarProps {
  selectedDate: Date | null
  onDateSelect: (date: Date) => void
  bookedDates?: Date[]
  fromDate?: Date
  toDate?: Date
  disabledDays?: (date: Date) => boolean
}

export default function CustomBookingCalendar({ 
  selectedDate, 
  onDateSelect, 
  bookedDates = [], 
  fromDate, 
  toDate,
  disabledDays 
}: CustomBookingCalendarProps) {
  return (
    <div className="p-6 border rounded-lg bg-white">
      <Calendar
        mode="single"
        selected={selectedDate as Date}
        onSelect={(date) => {
          if (date) {
            onDateSelect(date)
          }
        }}
        disabled={(date) => {
          const isBooked = bookedDates.some(
            bookedDate => 
              bookedDate.getFullYear() === date.getFullYear() &&
              bookedDate.getMonth() === date.getMonth() &&
              bookedDate.getDate() === date.getDate()
          )
          
          const isDisabled = disabledDays ? disabledDays(date) : false
          
          return isBooked || isDisabled
        }}
        fromDate={fromDate}
        toDate={toDate}
        initialFocus
        className="w-full"
        classNames={{
          months: "w-full space-y-4",
          month: "space-y-4",
          caption: "flex justify-center pt-1 relative items-center text-lg font-semibold",
          caption_label: "text-lg font-semibold",
          nav: "space-x-1 flex items-center",
          nav_button: cn(
            "h-9 w-9 bg-transparent p-0 opacity-50 hover:opacity-100 rounded-md",
            "hover:bg-gray-100 transition-colors"
          ),
          nav_button_previous: "absolute left-1",
          nav_button_next: "absolute right-1",
          table: "w-full border-collapse space-y-1",
          head_row: "flex w-full",
          head_cell: cn(
            "text-gray-500 rounded-md w-full font-medium text-[0.9rem]",
            "first:text-red-500 last:text-red-500"
          ),
          row: "flex w-full mt-2",
          cell: cn(
            "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-rose-50",
            "first:text-red-500 last:text-red-500 h-12 w-full"
          ),
          day: cn(
            "h-12 w-full p-0 font-normal aria-selected:opacity-100 hover:bg-gray-100 rounded-md transition-colors",
            "hover:bg-rose-100 aria-selected:bg-rose-600 aria-selected:text-white aria-selected:hover:bg-rose-600"
          ),
          day_today: "bg-gray-50 text-rose-600 font-semibold",
          day_outside: "text-gray-400 opacity-50",
          day_disabled: "text-gray-400 opacity-50 hover:bg-transparent",
          day_range_middle: "aria-selected:bg-rose-50 aria-selected:text-rose-600",
          day_hidden: "invisible",
        }}
      />
    </div>
  )
}

