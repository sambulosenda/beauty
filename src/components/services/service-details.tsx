import { Badge } from "@/components/ui/badge";
import { Clock, DollarSign } from "lucide-react";
import { formatCurrency, formatDuration } from "@/lib/utils";
import React from "react";


interface ServiceDetailsProps {
  service: {
    image?: string;
    name: string;
    description: string;
    category: string;
    price: string;
    duration: number;
    availableDays?: string[];
  };
}

export function ServiceDetails({ service }: ServiceDetailsProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      {service.image && (
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-[400px] object-cover rounded-t-lg"
        />
      )}
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-medium text-gray-900">
              {service.name}
            </h1>
            <p className="mt-2 text-gray-600">{service.description}</p>
          </div>
          <Badge className="bg-gray-100 text-gray-900 hover:bg-gray-200">
            {service.category}
          </Badge>
        </div>
        <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-6">
          <div className="flex items-center space-x-2">
            <DollarSign className="text-gray-900" />
            <span className="text-2xl font-medium text-gray-900">
              {formatCurrency(parseFloat(service.price))}
            </span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <Clock className="w-5 h-5" />
            <span>{formatDuration(service.duration)}</span>
          </div>
        </div>
        {service?.availableDays && service.availableDays.length > 0 ? (
          <div className="mt-6 border-t border-gray-100 pt-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Available Days
            </h2>
            <div className="flex flex-wrap gap-2">
              {service.availableDays.map((day: string) => (
                <Badge
                  key={day}
                  variant="secondary"
                  className="px-3 py-1"
                >
                  {day.charAt(0) + day.slice(1).toLowerCase()}
                </Badge>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-6 border-t border-gray-100 pt-6">
            <p className="text-gray-500">No availability set</p>
          </div>
        )}
      </div>
    </div>
  );
} 
