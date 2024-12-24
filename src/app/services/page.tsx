import { Suspense } from "react";
import { ServicesSection } from "@/components/services/services-section";
import { ServicesPageSkeleton } from "@/components/services/services-page-skeleton";
import { SearchBar } from "@/components/services/search-bar";
import { Categories } from "@/components/services/categories";
import { Metadata } from "next";
import { PriceRangeFilter, DurationFilter, RatingFilter } from "@/components/services/filters";

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
        <div className="grid grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="col-span-3 space-y-6">
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
          <div className="col-span-9">
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
