"use client";

import { BusinessWithAvailability } from "@/types/business";
import Image from "next/image";
import {
  MapPin,
  Star,
  Phone,
  Mail,
  ArrowRight,
  Share2,
  Check,
  Calendar,
} from "lucide-react";
import { ServiceList } from "@/components/services/service-list";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Map from "@/components/map";
import React, { useState } from "react";
import { SimpleService } from "@/components/services/service-list";
import { toast } from "sonner";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface BusinessContentProps {
  business: BusinessWithAvailability;
  services?: SimpleService[];
}

// Helper function to format time
const formatTime = (time: string) => {
  return new Date(`2000-01-01T${time}`).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
};

export function BusinessContent({
  business,
  services = [],
}: BusinessContentProps) {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const businessUrl = `${window.location.origin}/business/${business.slug}`;

  function shareBusiness() {
    if (navigator.share) {
      navigator
        .share({
          title: business.businessName || "Check out this beauty business!",
          text: business.description || "Book beauty services here",
          url: businessUrl,
        })
        .then(() => toast.success("Successfully shared business"))
        .catch((error) => {
          console.error("Error sharing:", error);
          toast.error("Failed to share business");
        });
    } else {
      navigator.clipboard.writeText(businessUrl)
        .then(() => toast.success("Link copied to clipboard"))
        .catch(() => toast.error("Failed to copy link"));
    }
  }

  const coverImage = business.gallery?.[0] || "/images/default-cover.jpg";

  const daysOfWeek = [
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
    "SUNDAY",
  ] as const;

  const openingHours = daysOfWeek.map((day) => {
    const schedule = business.availability?.find((a) => a.dayOfWeek === day);
    return {
      day: day.charAt(0) + day.slice(1).toLowerCase(),
      hours: schedule?.isAvailable
        ? `${formatTime(schedule.startTime)} - ${formatTime(schedule.endTime)}`
        : "Closed",
      isOpen: schedule?.isAvailable ?? false,
    };
  });

  const isOpen = () => {
    const now = new Date();
    const currentDay = daysOfWeek[now.getDay() === 0 ? 6 : now.getDay() - 1];
    const schedule = business.availability?.find((a) => a.dayOfWeek === currentDay);
    
    if (!schedule?.isAvailable) return false;
    
    const currentTime = now.toLocaleTimeString('en-US', { hour12: false });
    return currentTime >= schedule.startTime && currentTime <= schedule.endTime;
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[480px]">
        <div className="absolute inset-0">
          <Image
            src={coverImage}
            alt={business.businessName || "Business cover"}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        </div>

        {/* Gallery Grid Preview */}
        {business.gallery && business.gallery.length > 1 && (
          <Sheet open={isGalleryOpen} onOpenChange={setIsGalleryOpen}>
            <SheetTrigger asChild>
              <div className="absolute bottom-6 right-6 flex gap-2 cursor-pointer">
                {business.gallery.slice(1, 4).map((image, index) => (
                  <div
                    key={index}
                    className={cn(
                      "relative h-20 w-20 rounded-lg overflow-hidden",
                      index === 2 && business.gallery!.length > 4 && "relative"
                    )}
                  >
                    <Image
                      src={image}
                      alt={`Gallery image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                    {index === 2 && business.gallery!.length > 4 && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <span className="text-white text-sm font-medium">
                          +{business.gallery!.length - 3}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-xl">
              <SheetHeader>
                <SheetTitle>Gallery</SheetTitle>
              </SheetHeader>
              <div className="grid grid-cols-2 gap-4 mt-6">
                {business.gallery.map((image, index) => (
                  <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                    <Image
                      src={image}
                      alt={`Gallery image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        )}

        {/* Business Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="max-w-7xl mx-auto flex items-end justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge 
                  variant="secondary"
                  className={cn(
                    isOpen() && "bg-green-500/10 text-green-500 hover:bg-green-500/20 border-green-500/20"
                  )}
                >
                  {isOpen() ? "Open Now" : "Closed"}
                </Badge>
              </div>
              <h1 className="text-4xl font-bold mb-4">
                {business.businessName || business.name}
              </h1>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span>{business.rating}</span>
                  <span className="text-white/80">
                    ({business.reviewCount} reviews)
                  </span>
                </div>
                {business.address && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    <span>{business.address}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                size="sm"
                variant="outline"
                className="bg-white/10 border-white/20 hover:bg-white/20"
                onClick={shareBusiness}
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="bg-white/10 border-white/20 hover:bg-white/20"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Book Now
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-8">
          {/* Contact Info Cards */}
          <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {business.address && (
                <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="flex-shrink-0">
                    <MapPin className="h-6 w-6 text-rose-500" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-500">
                      Location
                    </div>
                    <div className="text-gray-900">{business.address}</div>
                  </div>
                </div>
              )}
              {business.phone && (
                <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="flex-shrink-0">
                    <Phone className="h-6 w-6 text-rose-500" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-500">
                      Phone
                    </div>
                    <a href={`tel:${business.phone}`} className="text-gray-900 hover:text-rose-600">
                      {business.phone}
                    </a>
                  </div>
                </div>
              )}
              {business.email && (
                <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="flex-shrink-0">
                    <Mail className="h-6 w-6 text-rose-500" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-500">
                      Email
                    </div>
                    <a href={`mailto:${business.email}`} className="text-gray-900 hover:text-rose-600">
                      {business.email}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Services Section */}
          <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Our Services
              </h2>
              {services.length > 4 && (
                <Button variant="outline" size="sm">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
            <ServiceList
              services={services}
              businessSlug={business.slug || ""}
            />
          </div>

          {/* About and Opening Hours */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* About Section */}
            <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                About Us
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                {business.description || "Welcome to our beauty business!"}
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <Check className="h-5 w-5 text-rose-500" />
                  <span>Professional Staff</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Check className="h-5 w-5 text-rose-500" />
                  <span>Quality Products</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Check className="h-5 w-5 text-rose-500" />
                  <span>Satisfaction Guaranteed</span>
                </div>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Opening Hours
              </h2>
              <div className="space-y-4">
                {openingHours.map(({ day, hours, isOpen }) => (
                  <div
                    key={day}
                    className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                  >
                    <span className="font-medium text-gray-900">{day}</span>
                    <span className={cn(
                      "text-sm",
                      isOpen ? "text-gray-900" : "text-gray-500"
                    )}>
                      {hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Map Section */}
          {business.address && (
            <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Location
              </h2>
              <div className="h-[400px] rounded-xl overflow-hidden">
                <Map address={business.address} />
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
