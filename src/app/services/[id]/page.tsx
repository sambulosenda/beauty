"use client";

import { notFound } from "next/navigation";
import { formatCurrency, formatDuration } from "@/lib/utils";
import { Suspense } from "react";
import { Clock, MapPin, Star, Shield, ArrowLeft, Calendar, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { ServiceDetailSkeleton } from "@/components/services/service-detail-skeleton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function useService(serviceId: string) {
  return useQuery({
    queryKey: ["service", serviceId],
    queryFn: async () => {
      console.log('Fetching service data for:', serviceId);
      
      // First fetch the service to get the providerId
      const serviceResponse = await fetch(`/api/services/${serviceId}`);
      const service = await serviceResponse.json();
      
      if (!service.providerId) {
        throw new Error('Service provider ID not found');
      }

      // Then fetch availability using the providerId
      const availabilityResponse = await fetch(`/api/availability/${service.providerId}`);
      const availability = await availabilityResponse.json();

      console.log('Raw availability data:', availability);
      
      const availableDays = Array.isArray(availability) 
        ? availability
            .filter((a: any) => a.isAvailable)
            .map((a: any) => a.dayOfWeek)
        : [];
      
      console.log('Filtered available days:', availableDays);

      return {
        ...service,
        availableDays,
      };
    },
    staleTime: 0, // Disable stale time to always fetch fresh data
    refetchOnMount: true, // Ensure data is refetched when component mounts
    retry: 2, // Retry failed requests twice
  });
}

export default function ServicePage({ params }: { params: { id: string } }) {
  const { data: service, isLoading, error } = useService(params.id);

  if (isLoading) return <ServiceDetailSkeleton />;
  if (error || !service) return notFound();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/services" className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Services
            </Link>
            <div className="flex items-center gap-4">
              <span className="text-2xl font-bold text-rose-600">
                {formatCurrency(parseFloat(service.price))}
              </span>
              <Link href={`/services/${params.id}/book`}>
                <Button size="lg">Book Now</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
              )}
              
              <div className="p-8">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="secondary">{service.category}</Badge>
                      <div className="flex items-center text-amber-500">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="ml-1 text-sm text-gray-600">
                          {service.rating || '4.8'} ({service.reviewCount || '24'} reviews)
                        </span>
                      </div>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                      {service.name}
                    </h1>
                    <div className="flex items-center gap-4 text-gray-600">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {formatDuration(service.duration)}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {service.provider?.businessName || service.provider?.name}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabbed Content */}
            <div className="bg-white rounded-2xl shadow-sm">
              <Tabs defaultValue="details" className="p-6">
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="included">What's Included</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>
                
                <TabsContent value="details" className="space-y-4">
                  <h2 className="text-xl font-semibold mb-3">About this service</h2>
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <div className="flex items-start gap-3 p-4 rounded-lg bg-gray-50">
                      <Clock className="w-5 h-5 text-gray-400 mt-1" />
                      <div>
                        <h3 className="font-medium">Duration</h3>
                        <p className="text-sm text-gray-600">{formatDuration(service.duration)}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 rounded-lg bg-gray-50">
                      <Calendar className="w-5 h-5 text-gray-400 mt-1" />
                      <div>
                        <h3 className="font-medium">Availability</h3>
                        <p className="text-sm text-gray-600">
                          {service.availableDays?.length} days per week
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="included" className="space-y-4">
                  <h2 className="text-xl font-semibold mb-3">What's Included</h2>
                  <ul className="grid grid-cols-2 gap-4">
                    {[
                      "Professional consultation",
                      "Premium products used",
                      "Aftercare advice",
                      "Complimentary drinks"
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <Check className="w-5 h-5 text-green-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </TabsContent>
                
                <TabsContent value="reviews" className="space-y-4">
                  {/* Reviews component here */}
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Booking Card */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Book this Service</h2>
                <div className="space-y-4">
                  <div className="p-4 bg-rose-50 rounded-xl">
                    <div className="flex items-center text-rose-700">
                      <Shield className="w-5 h-5 mr-2" />
                      <span className="text-sm font-medium">Secure Booking</span>
                    </div>
                  </div>
                  
                  {/* Available Days */}
                  <div>
                    <h3 className="text-sm font-medium mb-2">Available Days</h3>
                    {service.availableDays?.length > 0 ? (
                      <div className="grid grid-cols-3 gap-2">
                        {service.availableDays.map((day) => (
                          <Badge
                            key={day}
                            variant="secondary"
                            className="justify-center"
                          >
                            {day.slice(0, 3)}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <div className="text-sm text-gray-500">
                        No available days set for this service. Please contact the provider.
                      </div>
                    )}
                  </div>
                  
                  <Link href={`/services/${params.id}/book`} className="block">
                    <Button size="lg" className="w-full">
                      Book Now
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Provider Card */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
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
          </div>
        </div>
      </div>
    </div>
  );
}
