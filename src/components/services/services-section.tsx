'use client'

import { useServices } from '@/hooks/queries/use-services'
import { ServicesList } from './services-list'
import { ServicesPageSkeleton } from './services-page-skeleton'
import { useState, useCallback, ReactNode } from 'react'
import { useDebounce } from '@/hooks/use-debounce'

interface ServicesSectionProps {
  initialSearch?: string
  initialLocation?: string
  initialCategory?: string
  children: (handleFilterChange: (type: string, value: any) => void) => ReactNode
}

export function ServicesSection({ 
  initialSearch, 
  initialLocation, 
  initialCategory,
  children 
}: ServicesSectionProps) {
  const [filters, setFilters] = useState({
    priceRange: [0, 500] as [number, number],
    duration: [30, 180] as [number, number],
    rating: null as number | null
  })

  // Increase debounce delay to prevent rapid refetches
  const debouncedFilters = useDebounce(filters, 800)

  const { data: services, isLoading, error } = useServices({
    search: initialSearch,
    location: initialLocation,
    category: initialCategory,
    filters: debouncedFilters
  })

  const handleFilterChange = useCallback((type: string, value: any) => {
    setFilters(prev => ({ ...prev, [type]: value }))
  }, [])

  // Show loading state only for initial load, not filter changes
  if (isLoading && !services) return <ServicesPageSkeleton />
  if (error) {
    console.error('ServicesSection - Error:', error)
    return <div>Error loading services</div>
  }

  return (
    <>

      <div className="lg:col-span-9">
        <ServicesList 
          initialServices={services || []}
          initialSearch={initialSearch}
          initialLocation={initialLocation}
          initialCategory={initialCategory}
        />
      </div>
    </>
  )
} 
