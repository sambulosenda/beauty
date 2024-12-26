'use client'

import { format } from 'date-fns';
import { formatCurrency } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock } from "lucide-react";

interface BookingSummaryProps {
  service: {
    name: string;
    price: string;
    duration: number;
  };
  selectedDate: Date | null;
  selectedTime: string | null;
}

export function BookingSummary({ service, selectedDate, selectedTime }: BookingSummaryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Booking Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-medium">{service.name}</h3>
          <p className="text-sm text-gray-500">{service.duration} minutes</p>
        </div>

        {selectedDate && (
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-2" />
            {format(selectedDate, 'MMMM d, yyyy')}
          </div>
        )}

        {selectedTime && (
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="h-4 w-4 mr-2" />
            {selectedTime}
          </div>
        )}

        <div className="pt-4 border-t">
          <div className="flex justify-between">
            <span>Total</span>
            <span className="font-medium">{formatCurrency(parseFloat(service.price))}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 
