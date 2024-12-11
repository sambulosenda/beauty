"use client";

import { notFound } from "next/navigation";
import { formatCurrency, formatDuration } from "@/lib/utils";
import BookingForm from "@/components/bookings/booking-form";
import { Suspense } from "react";
import { Clock, DollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { ServiceDetailSkeleton } from "@/components/services/service-detail-skeleton";

function useService(id: string) {
  return useQuery({
    queryKey: ["service", id],
    queryFn: async () => {
      const serviceResponse = await fetch(`/api/services/${id}`);
      const service = await serviceResponse.json();

      // Fetch availability using providerId from service
      const availabilityResponse = await fetch(
        `/api/availability/${service.providerId}`
      );
      const availability = await availabilityResponse.json();

      console.log("Service:", service);
      console.log("Availability:", availability);

      return {
        ...service,
        availableDays: availability
          .filter((a: any) => a.isAvailable)
          .map((a: any) => a.dayOfWeek),
      };
    },
  });
}

export default function ServicePage({ params }: { params: { id: string } }) {
  const { data: service, isLoading, error } = useService(params.id);

  console.log("Rendered service:", service);

  if (isLoading) {
    return <ServiceDetailSkeleton />;
  }

  if (error || !service) {
    return notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Service Details */}
          <div className="bg-white">
            {service.image && (
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-[400px] object-cover"
              />
            )}
            <div className="mt-6">
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
        </div>

        {/* Right Column - Booking Form */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-100 p-6">
            <div className="mt-1">
              <Suspense fallback={<div>Loading booking form...</div>}>
                <BookingForm service={service} />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
