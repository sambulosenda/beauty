'use client'

import { Search } from 'lucide-react'
import { FilterDialog } from './filter-dialog'

export function ServicesHeader({ onFilterChange }: { onFilterChange: (filters: any) => void }) {
  return (
    <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4">
      <div className="max-w-7xl mx-auto py-4">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search services, treatments, or specialists..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
          <FilterDialog onFilterChange={onFilterChange} />
        </div>
      </div>
    </div>
  )
} 
