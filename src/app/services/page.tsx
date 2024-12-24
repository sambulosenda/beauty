import { Suspense } from "react";
import { ServicesSection } from "@/components/services/services-section";
import { ServicesPageSkeleton } from "@/components/services/services-page-skeleton";
import { SearchBar } from "@/components/services/search-bar";
import { Categories } from "@/components/services/categories";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { FilterIcon, X } from "lucide-react";
import { DurationFilter, PriceRangeFilter, RatingFilter } from "@/components/services/filters";
import { MobileFilters } from "@/components/services/mobile-filters";

export const metadata: Metadata = {
  title: "Discover Beauty Services",
  description: "Find and book professional beauty and wellness services near you",
  keywords: "beauty, wellness, spa, massage, salon, booking",
};

export default async function ServicesPage({
  searchParams,
}: {
  searchParams: { search?: string; location?: string; category?: string }
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky Header with Search */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <SearchBar 
            initialSearch={searchParams.search}
            initialLocation={searchParams.location}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <MobileFilters selectedCategory={searchParams.category} />

          {/* Sidebar - Hidden on Mobile */}
          <div className="hidden lg:block lg:col-span-3 space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="font-semibold mb-4">Categories</h2>
              <Categories 
                selectedCategory={searchParams.category}
              />
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="font-semibold mb-4">Filters</h2>
              <PriceRangeFilter />
              <DurationFilter />
              <RatingFilter />
            </div>
          </div>

          {/* Services Grid */}
          <div className="lg:col-span-9">
            <Suspense fallback={<ServicesPageSkeleton />}>
              <ServicesSection 
                initialSearch={searchParams.search}
                initialLocation={searchParams.location}
                initialCategory={searchParams.category}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
