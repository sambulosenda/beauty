'use client'

import React from "react"
import { Suspense } from "react"
import { ServicesSection } from "./services-section"
import { SearchBar } from "./search-bar"
import { Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"
import { ErrorBoundary } from "react-error-boundary"

interface SearchParams {
  search?: string
  location?: string
  category?: string
}

interface ServicesPageContentProps {
  searchParams: SearchParams
}

interface FilterChangeHandler {
  (type: string, value: number[]): void;
}

interface FiltersProps {
  handleFilterChange: FilterChangeHandler;
}

function Filters({ handleFilterChange }: FiltersProps) {
  return (
    <>
      <div className="space-y-4">
        <h3 className="text-sm font-medium">Price Range</h3>
        <Slider
          defaultValue={[0, 500]}
          max={500}
          step={10}
          onValueChange={(value) => handleFilterChange('priceRange', value)}
        />
        <div className="flex justify-between text-sm text-gray-600">
          <span>$0</span>
          <span>$500+</span>
        </div>
      </div>
      <div className="space-y-4">
        <h3 className="text-sm font-medium">Duration (minutes)</h3>
        <Slider
          defaultValue={[30, 180]}
          max={180}
          step={15}
          onValueChange={(value) => handleFilterChange('duration', value)}
        />
        <div className="flex justify-between text-sm text-gray-600">
          <span>30 min</span>
          <span>180 min</span>
        </div>
      </div>
    </>
  )
}

function ErrorFallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
  return (
    <div className="text-center py-10">
      <h2 className="text-lg font-semibold text-gray-900">Something went wrong</h2>
      <p className="mt-2 text-gray-600">{error.message}</p>
      <Button onClick={resetErrorBoundary} className="mt-4">Try again</Button>
    </div>
  )
}

export function ServicesPageContent({ searchParams }: ServicesPageContentProps) {
  const [filterHandler, setFilterHandler] = React.useState<FilterChangeHandler | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <SearchBar 
                initialSearch={searchParams.search}
                initialLocation={searchParams.location}
              />
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="lg" className="hidden sm:flex">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filter Services</SheetTitle>
                  <SheetDescription>
                    Adjust filters to find the perfect service
                  </SheetDescription>
                </SheetHeader>
                <div className="py-6 space-y-6">
                  {filterHandler && <Filters handleFilterChange={filterHandler} />}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="lg:grid lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-12">
            <ErrorBoundary
              FallbackComponent={ErrorFallback}
              onReset={() => window.location.reload()}
            >
              <Suspense fallback={<div className="text-center py-10">Loading services...</div>}>
                <ServicesSection 
                  initialSearch={searchParams.search}
                  initialLocation={searchParams.location}
                  initialCategory={searchParams.category}
                >
                  {(handleFilterChange) => {
                    // Update the filter handler when ServicesSection provides it
                    React.useEffect(() => {
                      setFilterHandler(() => handleFilterChange);
                    }, [handleFilterChange]);

                    return (
                      <div className="lg:hidden">
                        <Sheet>
                          <SheetTrigger asChild>
                            <Button variant="outline" size="sm" className="w-full">
                              <Filter className="h-4 w-4 mr-2" />
                              Filters
                            </Button>
                          </SheetTrigger>
                          <SheetContent>
                            <SheetHeader>
                              <SheetTitle>Filter Services</SheetTitle>
                              <SheetDescription>
                                Adjust filters to find the perfect service
                              </SheetDescription>
                            </SheetHeader>
                            <div className="py-6 space-y-6">
                              <Filters handleFilterChange={handleFilterChange} />
                            </div>
                          </SheetContent>
                        </Sheet>
                      </div>
                    );
                  }}
                </ServicesSection>
              </Suspense>
            </ErrorBoundary>
          </div>
        </div>
      </div>
    </div>
  )
} 
