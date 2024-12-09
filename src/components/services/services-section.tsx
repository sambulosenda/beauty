'use client'

import { useServices } from '@/hooks/queries/use-services'
import { ServicesList } from './services-list'
import { ServicesPageSkeleton } from './services-page-skeleton'

export function ServicesSection() {
  const { data: services, isLoading, error } = useServices()

  if (isLoading) {
    return <ServicesPageSkeleton />
  }

  if (error) {
    return <div>Error loading services</div>
  }

  return <ServicesList initialServices={services || []} />
} 
