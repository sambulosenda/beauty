"use client";

import { notFound } from "next/navigation";
import { formatCurrency, formatDuration } from "@/lib/utils";
import BookingDialog from '@/components/bookings/booking-dialog'
import { Suspense } from "react";
import { Clock, DollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { ServiceDetailSkeleton } from "@/components/services/service-detail-skeleton";
import { ServiceDetails } from "@/components/services/service-details";

function useService(serviceId: string) {
  return useQuery({
    queryKey: ["service", serviceId],
    queryFn: async () => {
      const serviceResponse = await fetch(`/api/services/${serviceId}`);
      const service = await serviceResponse.json();

      // Fetch availability using providerId from service
      const availabilityResponse = await fetch(
        `/api/availability/${service.providerId}`
      );
      const availability = await availabilityResponse.json();

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

  if (isLoading) {
    return <ServiceDetailSkeleton />;
  }

  if (error || !service) {
    return notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 gap-8">
        <div className="space-y-6">
          <ServiceDetails service={service} />
          <BookingDialog serviceId={params.id} />
        </div>
      </div>
    </div>
  );
}
