"use client";

import { notFound } from "next/navigation";
import { formatCurrency, formatDuration } from "@/lib/utils";
import BookingDialog from '@/components/bookings/booking-dialog'
import { Suspense } from "react";
import { Clock, DollarSign, MapPin, Star, Shield, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { ServiceDetailSkeleton } from "@/components/services/service-detail-skeleton";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function useService(serviceId: string) {
  return useQuery({
    queryKey: ["service", serviceId],
    queryFn: async () => {
      const serviceResponse = await fetch(`/api/services/${serviceId}`);
      const service = await serviceResponse.json();
      const availabilityResponse = await fetch(`/api/availability/${service.providerId}`);
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

  if (isLoading) return <ServiceDetailSkeleton />;
  if (error || !service) return notFound();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link href="/services" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Services
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Service Image and Basic Info */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
              {service.image && (
                <div className="relative h-[400px]">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <div className="p-8">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                      {service.name}
                    </h1>
                    <div className="mt-2 flex items-center space-x-4">
                      <Badge variant="secondary">{service.category}</Badge>
                      <div className="flex items-center text-amber-500">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="ml-1 text-sm text-gray-600">
                          {service.rating || '4.8'} ({service.reviewCount || '24'} reviews)
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-rose-600">
                      {formatCurrency(parseFloat(service.price))}
                    </div>
                    <div className="flex items-center text-gray-500 mt-1">
                      <Clock className="w-4 h-4 mr-1" />
                      {formatDuration(service.duration)}
                    </div>
                  </div>
                </div>

                <p className="mt-6 text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>

            {/* Provider Info */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">About the Provider</h2>
              <div className="flex items-start space-x-4">
                <div className="h-16 w-16 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0">
                  {service.provider?.image ? (
                    <img
                      src={service.provider.image}
                      alt={service.provider.name}
                      className="h-16 w-16 rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-2xl font-semibold text-rose-600">
                      {service.provider?.name?.[0]}
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {service.provider?.businessName || service.provider?.name}
                  </h3>
                  <div className="flex items-center mt-1 text-gray-500">
                    <MapPin className="w-4 h-4 mr-1" />
                    {service.provider?.address || 'Location available after booking'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-8">
              <h2 className="text-xl font-semibold mb-4">Book this Service</h2>
              <div className="mb-6 p-4 bg-rose-50 rounded-xl">
                <div className="flex items-center text-rose-700">
                  <Shield className="w-5 h-5 mr-2" />
                  <span className="text-sm font-medium">Secure Booking</span>
                </div>
              </div>
              <BookingDialog serviceId={params.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
