'use client'

import { Button } from "@/components/ui/button"
import { FilterIcon, X } from "lucide-react"
import { Categories } from "./categories"
import { DurationFilter, PriceRangeFilter, RatingFilter } from "./filters"

interface MobileFiltersProps {
  selectedCategory?: string
  onFilterChange: (type: string, value: any) => void
}

export function MobileFilters({ selectedCategory, onFilterChange }: MobileFiltersProps) {
  return (
    <>
      {/* Mobile Filter Button */}
      <div className="lg:hidden mb-6">
        <Button 
          variant="outline" 
          className="w-full flex items-center justify-center gap-2"
          onClick={() => (document.getElementById('filter-dialog') as HTMLDialogElement)?.showModal()}
        >
          <FilterIcon className="h-4 w-4" />
          Filters & Categories
        </Button>
      </div>

      {/* Mobile Filter Dialog */}
      <dialog id="filter-dialog" className="modal">
        <div className="modal-box w-11/12 max-w-3xl">
          <div className="sticky top-0 bg-white pb-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-lg">Filters & Categories</h3>
              <Button 
                variant="ghost" 
                onClick={() => (document.getElementById('filter-dialog') as HTMLDialogElement)?.close()}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <h2 className="font-semibold mb-4">Categories</h2>
              <Categories selectedCategory={selectedCategory} />
            </div>
            <div>
              <h2 className="font-semibold mb-4">Filters</h2>
              <PriceRangeFilter onFilterChange={onFilterChange} />
              <DurationFilter onFilterChange={onFilterChange} />
              <RatingFilter onFilterChange={onFilterChange} />
            </div>
          </div>
        </div>
      </dialog>
    </>
  )
} 
