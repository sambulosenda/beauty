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
    priceRange: [0, 500],
    duration: [30, 180],
    rating: null
  })

  const handleFilterChange = (type: string, value: any) => {
    setFilters(prev => ({ ...prev, [type]: value }))
  }

  const { data: services, isLoading, error } = useServices({
    search: initialSearch,
    location: initialLocation,
    category: initialCategory,
    filters
  })

  if (isLoading) return <ServicesPageSkeleton />
  if (error) return <div>Error loading services</div>

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
