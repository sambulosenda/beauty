'use client'

import { useServices } from '@/hooks/queries/use-services'
import { ServicesList } from './services-list'
import { ServicesPageSkeleton } from './services-page-skeleton'
import { useState, ReactNode } from 'react'

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

  const { data: services, isLoading, error } = useServices({
    search: initialSearch,
    location: initialLocation,
    category: initialCategory,
    filters
  })

  const handleFilterChange = (type: string, value: any) => {
    setFilters(prev => ({ ...prev, [type]: value }))
  }

  if (isLoading) return <ServicesPageSkeleton />
  if (error) return <div>Error loading services</div>

  console.log('Search params:', { search: initialSearch, location: initialLocation })

  return (
    <>
      {children(handleFilterChange)}
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
