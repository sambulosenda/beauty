'use client'

import { Suspense } from "react"
import { ServicesSection } from "./services-section"
import { FiltersSection } from "./filters-section"
import { SearchBar } from "./search-bar"

interface ServicesPageContentProps {
  searchParams: {
    search?: string
    location?: string
    category?: string
  }
}

export function ServicesPageContent({ searchParams }: ServicesPageContentProps) {
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
          <Suspense fallback={<div>Loading...</div>}>
            <ServicesSection 
              initialSearch={searchParams.search}
              initialLocation={searchParams.location}
              initialCategory={searchParams.category}
            >
              {(handleFilterChange) => (
                <FiltersSection
                  selectedCategory={searchParams.category}
                  onFilterChange={handleFilterChange}
                />
              )}
            </ServicesSection>
          </Suspense>
        </div>
      </div>
    </div>
  )
} 
