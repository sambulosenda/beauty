'use client'

import { Categories } from "./categories"
import { DurationFilter, PriceRangeFilter, RatingFilter } from "./filters"
import { MobileFilters } from "./mobile-filters"

interface FiltersSectionProps {
  selectedCategory?: string
  onFilterChange: (type: string, value: any) => void
}

export function FiltersSection({ selectedCategory, onFilterChange }: FiltersSectionProps) {
  return (
    <>
      <MobileFilters 
        selectedCategory={selectedCategory} 
        onFilterChange={onFilterChange}
      />
      <div className="hidden lg:block lg:col-span-3 space-y-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="font-semibold mb-4">Categories</h2>
          <Categories selectedCategory={selectedCategory} />
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="font-semibold mb-4">Filters</h2>
          <PriceRangeFilter onFilterChange={onFilterChange} />
          <DurationFilter onFilterChange={onFilterChange} />
          <RatingFilter onFilterChange={onFilterChange} />
        </div>
      </div>
    </>
  )
} 
