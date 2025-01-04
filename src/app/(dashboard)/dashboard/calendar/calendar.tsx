"use client";

import React from "react";
import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { formatCurrency } from "@/lib/utils";
import { format, isSameDay } from "date-fns";
import { Spinner } from "@/components/ui/spinner";

interface Booking {
  id: string;
  startTime: string;
  endTime: string;
  status: "CONFIRMED" | "PENDING" | "CANCELLED";
  service: {
    name: string;
    price: string;
  };
  customer: {
    name: string;
    email: string;
  };
}

async function fetchBookings(providerId: string): Promise<Booking[]> {
  const response = await fetch(`/api/bookings?providerId=${providerId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch bookings");
  }
  return response.json();
}

export function Calendar({ providerId }: { providerId: string }) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const {
    data: bookings,
    isLoading,
    error,
  } = useQuery<Booking[], Error>({
    queryKey: ["bookings", providerId],
    queryFn: () => fetchBookings(providerId),
  });

  const getDayBookings = useMemo(
    () => (date: Date) => {
      if (!bookings) return [];
      return bookings.filter((booking) =>
        isSameDay(new Date(booking.startTime), date)
      );
    },
    [bookings]
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <div className="text-red-500">
        Error loading bookings: {error.message}
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="w-full md:w-auto md:max-w-md">
        <CalendarComponent
          mode="single"
          selected={selectedDate}
          onSelect={(date) => date && setSelectedDate(date)}
          modifiers={{
            booked: (date) => getDayBookings(date).length > 0,
          }}
          modifiersStyles={{
            booked: { fontWeight: "bold", textDecoration: "underline" },
          }}
          className="rounded-md border"
        />
      </div>

      <div className="flex-1">
        <h2 className="text-lg font-semibold mb-4">
          Bookings for {format(selectedDate, "MMMM d, yyyy")}
        </h2>
        <div className="space-y-4">
          {getDayBookings(selectedDate).map((booking) => (
            <HoverCard key={booking.id}>
              <HoverCardTrigger asChild>
                <div className="p-4 bg-white rounded-lg shadow cursor-pointer">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{booking.service.name}</h3>
                      <p className="text-sm text-gray-500">
                        {format(new Date(booking.startTime), "h:mm a")} -
                        {format(new Date(booking.endTime), "h:mm a")}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        booking.status === "CONFIRMED"
                          ? "bg-green-100 text-green-800"
                          : booking.status === "PENDING"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>
                </div>
              </HoverCardTrigger>
              <HoverCardContent>
                <div>
                  <h4 className="font-semibold">Customer Details</h4>
                  <p className="text-sm">{booking.customer.name}</p>
                  <p className="text-sm text-gray-500">
                    {booking.customer.email}
                  </p>
                  <div className="mt-2">
                    <span className="text-sm font-medium">
                      Price: {formatCurrency(parseFloat(booking.service.price))}
                    </span>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          ))}
          {getDayBookings(selectedDate).length === 0 && (
            <p className="text-gray-500">No bookings for this day</p>
          )}
        </div>
      </div>
    </div>
  );
}
