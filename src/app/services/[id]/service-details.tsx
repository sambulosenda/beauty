'use client'

import { formatCurrency, formatDuration, cn } from "@/lib/utils";
import { Clock, MapPin, Star, Shield, ArrowLeft, Calendar, Check, Info, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ServiceDetailSkeleton } from "@/components/services/service-detail-skeleton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import { notFound } from "next/navigation";
import { useService } from "@/hooks/use-service";
import React from "react";


interface ServiceDetailsProps {
  id: string;
}

export function ServiceDetails({ id }: ServiceDetailsProps) {
  const { data: service, isLoading, error } = useService(id);

  if (isLoading) return <ServiceDetailSkeleton />;
  if (error || !service) return notFound();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            <div className="flex items-center justify-between">
              <Link 
                href="/services" 
                className="inline-flex items-center text-gray-300 hover:text-white transition-colors group text-sm"
              >
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Services
              </Link>
              <Link href={`/services/${id}/book`}>
                <Button 
                  size="sm"
                  className="bg-[#8AB861] hover:bg-[#7da456] text-white rounded-full px-6"
                >
                  Book Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Service Image */}
              <div className="bg-white rounded-2xl overflow-hidden border border-gray-100">
                {service.image ? (
                  <AspectRatio ratio={16 / 9} className="bg-muted">
                    <Image
                      src={service.image}
                      alt={service.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw"
                      priority
                    />
                  </AspectRatio>
                ) : (
                  <div className="bg-gradient-to-r from-[#8AB861]/10 to-[#E87C3E]/10 h-[400px] flex items-center justify-center">
                    <Info className="w-12 h-12 text-[#8AB861]" />
                  </div>
                )}
              </div>

              {/* Tabbed Content */}
              <div className="bg-white rounded-2xl border border-gray-100">
                <Tabs defaultValue="details" className="p-6">
                  <TabsList className="grid w-full grid-cols-3 mb-6">
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="included">What&apos;s Included</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="details" className="space-y-6">
                    <div className="prose prose-rose max-w-none">
                      <h2 className="text-xl font-semibold text-gray-900">About this service</h2>
                      <p className="text-gray-600 leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-r from-[#8AB861]/10 to-[#E87C3E]/10 border border-[#8AB861]/20">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-r from-[#8AB861]/20 to-[#E87C3E]/20 flex items-center justify-center flex-shrink-0">
                          <Clock className="w-5 h-5 text-[#8AB861]" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">Duration</h3>
                          <p className="text-sm text-gray-600">{formatDuration(service.duration)}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-r from-[#8AB861]/10 to-[#E87C3E]/10 border border-[#8AB861]/20">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-r from-[#8AB861]/20 to-[#E87C3E]/20 flex items-center justify-center flex-shrink-0">
                          <Calendar className="w-5 h-5 text-[#8AB861]" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">Availability</h3>
                          <p className="text-sm text-gray-600">
                            {(service.availableDays ?? []).length} days per week
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="included" className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-900 mb-3">What&apos;s Included</h2>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        "Professional consultation",
                        "Premium products used",
                        "Aftercare advice",
                        "Complimentary drinks"
                      ].map((item) => (
                        <li key={item} className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-[#8AB861]/10 to-[#E87C3E]/10 border border-[#8AB861]/20">
                          <div className="h-10 w-10 rounded-xl bg-gradient-to-r from-[#8AB861]/20 to-[#E87C3E]/20 flex items-center justify-center flex-shrink-0">
                            <Check className="w-5 h-5 text-[#8AB861]" />
                          </div>
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </TabsContent>
                  
                  <TabsContent value="reviews" className="space-y-4">
                    <div className="text-center py-12">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#8AB861]/20 to-[#E87C3E]/20 flex items-center justify-center mx-auto mb-4">
                        <Star className="w-6 h-6 text-[#8AB861]" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Reviews Coming Soon</h3>
                      <p className="text-gray-500 max-w-md mx-auto">
                        We&apos;re collecting reviews from verified customers. Check back soon to see what others are saying about this service.
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Booking Card */}
                <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-100">
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Book this Service</h2>
                    <div className="space-y-4">
                      <div className="p-4 rounded-xl bg-gradient-to-r from-[#8AB861]/10 to-[#E87C3E]/10 border border-[#8AB861]/20">
                        <div className="flex items-center text-[#8AB861]">
                          <Shield className="w-5 h-5 mr-2" />
                          <span className="text-sm font-medium">100% Secure Booking</span>
                        </div>
                      </div>
                      
                      {/* Available Days */}
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 mb-2">Available Days</h3>
                        {(service.availableDays ?? []).length > 0 ? (
                          <div className="grid grid-cols-3 gap-2">
                            {(service.availableDays ?? []).map((day: string) => (
                              <Badge
                                key={day}
                                variant="secondary"
                                className={cn(
                                  "justify-center py-2 hover:bg-gradient-to-r hover:from-[#8AB861]/20 hover:to-[#E87C3E]/20 transition-all cursor-pointer",
                                  "border border-[#8AB861]/20"
                                )}
                              >
                                {day.slice(0, 3)}
                              </Badge>
                            ))}
                          </div>
                        ) : (
                          <div className="text-sm text-gray-500 bg-gradient-to-r from-[#8AB861]/10 to-[#E87C3E]/10 p-4 rounded-xl border border-[#8AB861]/20">
                            No available days set for this service. Please contact the provider.
                          </div>
                        )}
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Service Price</span>
                        <span className="text-lg font-semibold text-gray-900">
                          {formatCurrency(parseFloat(service.price))}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <Link href={`/services/${id}/book`} className="block">
                      <Button 
                        size="lg" 
                        className="w-full group bg-gradient-to-r from-[#8AB861] to-[#E87C3E] hover:opacity-90 text-white rounded-full transition-all duration-300 hover:scale-105"
                      >
                        Book Now
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                    <p className="text-xs text-center text-gray-500 mt-3">
                      Free cancellation up to 24 hours before your appointment
                    </p>
                  </div>
                </div>

                {/* Provider Card */}
                <div className="bg-white rounded-2xl overflow-hidden border border-gray-100">
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">About the Provider</h2>
                    <div className="flex items-start space-x-4">
                      <div className="h-16 w-16 rounded-xl bg-gradient-to-r from-[#8AB861]/20 to-[#E87C3E]/20 flex items-center justify-center flex-shrink-0 overflow-hidden">
                        {service.provider?.image ? (
                          <Image
                            src={service.provider.image}
                            alt={service.provider.name}
                            width={64}
                            height={64}
                            className="h-16 w-16 rounded-xl object-cover"
                          />
                        ) : (
                          <span className="text-2xl font-semibold text-[#8AB861]">
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
                          <span className="text-sm">
                            {service.provider?.address || 'Location available after booking'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-6 py-4 bg-gradient-to-r from-[#8AB861]/10 to-[#E87C3E]/10 border-t border-[#8AB861]/20">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Response Time</span>
                      <span className="font-medium text-gray-900">Usually within 1 hour</span>
                    </div>
                  </div>
                </div>

                {/* Trust Indicators */}
                <div className="bg-white/50 rounded-2xl border border-[#8AB861]/20">
                  <ul className="space-y-4">
                    <li className="flex items-center gap-3 text-sm text-gray-600">
                      <div className="h-8 w-8 rounded-xl bg-gradient-to-r from-[#8AB861]/20 to-[#E87C3E]/20 flex items-center justify-center flex-shrink-0">
                        <Check className="w-4 h-4 text-[#8AB861]" />
                      </div>
                      <span>Verified Professional</span>
                    </li>
                    <li className="flex items-center gap-3 text-sm text-gray-600">
                      <div className="h-8 w-8 rounded-xl bg-gradient-to-r from-[#8AB861]/20 to-[#E87C3E]/20 flex items-center justify-center flex-shrink-0">
                        <Shield className="w-4 h-4 text-[#8AB861]" />
                      </div>
                      <span>Secure Payments</span>
                    </li>
                    <li className="flex items-center gap-3 text-sm text-gray-600">
                      <div className="h-8 w-8 rounded-xl bg-gradient-to-r from-[#8AB861]/20 to-[#E87C3E]/20 flex items-center justify-center flex-shrink-0">
                        <Star className="w-4 h-4 text-[#8AB861]" />
                      </div>
                      <span>Rated {service.rating || '4.8'}/5 by clients</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
