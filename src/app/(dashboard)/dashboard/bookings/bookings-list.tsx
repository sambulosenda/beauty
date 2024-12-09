'use client'

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { format } from "date-fns";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";
import type { Booking } from '@/types/bookings';

interface BookingsListProps {
  bookings: Booking[];
  currentPage: number;
  totalPages: number;
  statusFilter?: string[];
}

export function BookingsList({ bookings: initialBookings, currentPage, totalPages, statusFilter }: BookingsListProps) {
  const handlePageChange = (newPage: number) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('page', newPage.toString());
    if (statusFilter) {
      searchParams.set('status', statusFilter.join(','));
    }
    window.location.href = `/bookings?${searchParams.toString()}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Bookings</CardTitle>
      </CardHeader>
      <CardContent>
        {initialBookings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Calendar className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900">No bookings yet</h3>
            <p className="text-sm text-gray-500 mt-1">Your upcoming bookings will appear here</p>
          </div>
        ) : (
          <>
            <div className="rounded-md border">
              <div className="hidden md:grid grid-cols-6 gap-4 p-4 text-sm font-medium text-gray-500">
                <div>Date</div>
                <div>Time</div>
                <div>Service</div>
                <div>Provider</div>
                <div>Status</div>
                <div className="text-right">Price</div>
              </div>
              <div className="divide-y">
                {initialBookings.map((booking) => (
                  <div key={booking.id} className="grid md:grid-cols-6 gap-4 p-4 text-sm items-center hover:bg-gray-50">
                    <div className="md:col-span-2 grid md:grid-cols-2">
                      <div className="font-medium text-gray-900 md:hidden">Date</div>
                      <div>{format(new Date(booking.startTime), "MMM d, yyyy")}</div>
                      <div className="font-medium text-gray-900 md:hidden">Time</div>
                      <div>{format(new Date(booking.startTime), "h:mm a")}</div>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 md:hidden">Service</div>
                      <div className="font-medium text-gray-900">{booking['service.name']}</div>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 md:hidden">Provider</div>
                      <div>{booking['provider.businessName'] || booking['provider.name'] || 'N/A'}</div>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 md:hidden">Status</div>
                      <Badge
                        variant={
                          booking.status === "CONFIRMED" ? "outline" :
                          booking.status === "PENDING" ? "secondary" :
                          booking.status === "CANCELLED" ? "destructive" : "secondary"
                        }
                        className="cursor-pointer"
                        onClick={() => {
                          alert(`Status change functionality not implemented. Current status: ${booking.status}`);
                        }}
                      >
                        {booking.status}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-gray-900 md:hidden">Price</div>
                      <div className="font-medium text-gray-900">
                        {formatCurrency(booking['service.price'])}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between space-x-2 py-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <div className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

