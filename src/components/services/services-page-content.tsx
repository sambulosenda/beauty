'use client'

import { Suspense } from "react"
import { ServicesSection } from "./services-section"
import { SearchBar } from "./search-bar"

interface SearchParams {
  search?: string
  location?: string
  category?: string
}

interface ServicesPageContentProps {
  searchParams: SearchParams
}

export function ServicesPageContent({ searchParams }: ServicesPageContentProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <SearchBar 
            initialSearch={searchParams.search}
            initialLocation={searchParams.location}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="lg:grid lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-12">
            <Suspense fallback={<div className="text-center py-10">Loading services...</div>}>
              <ServicesSection 
                initialSearch={searchParams.search}
                initialLocation={searchParams.location}
                initialCategory={searchParams.category}
              >
                {(handleFilterChange) => (
                  <div> {/* Add filter UI here */} </div>
                )}
              </ServicesSection>
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
} 
