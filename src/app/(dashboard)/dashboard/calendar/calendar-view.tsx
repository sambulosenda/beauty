"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Calendar } from "@/components/ui/calendar";
import { isToday } from "date-fns";
import { DayBookings } from "./day-bookings";
import React from "react";

interface CalendarViewProps {
  providerId: string;
}

const queryClient = new QueryClient();

export function CalendarView({ providerId }: CalendarViewProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );

  return (
    <QueryClientProvider client={queryClient}>
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
            aria-label="Select a date to view bookings"
          />
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          {selectedDate ? (
            <DayBookings date={selectedDate} providerId={providerId} />
          ) : (
            <p className="text-gray-500">Select a date to view bookings</p>
          )}
        </div>
      </div>
    </QueryClientProvider>
  );
}
