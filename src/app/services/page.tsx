import { Suspense } from "react";
import { ServicesSection } from "@/components/services/services-section";
import { ServicesPageSkeleton } from "@/components/services/services-page-skeleton";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Discover Beauty Services",
  description:
    "Find and book professional beauty and wellness services near you",
  keywords: "beauty, wellness, spa, massage, salon, booking",
  openGraph: {
    title: "Discover Beauty Services",
    description:
      "Find and book professional beauty and wellness services near you",
    type: "website",
  },
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      <section className="relative bg-gradient-to-r from-rose-100 to-amber-100">
        <div className="absolute inset-0 bg-white/50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              Find Your Perfect Service
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
              Discover and book beauty services from talented professionals in
              your area
            </p>
          </div>
        </div>
      </section>

      <Suspense fallback={<ServicesPageSkeleton />}>
        <ServicesSection />
      </Suspense>
    </div>
  );
}
