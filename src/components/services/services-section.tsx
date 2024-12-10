'use client'

import { useServices } from '@/hooks/queries/use-services'
import { ServicesList } from './services-list'
import { ServicesPageSkeleton } from './services-page-skeleton'

interface ServicesSectionProps {
  initialSearch?: string;
  initialLocation?: string;
}

export function ServicesSection({ initialSearch, initialLocation }: ServicesSectionProps) {
  const { data: services, isLoading, error } = useServices({
    search: initialSearch,
    location: initialLocation
  });

  if (isLoading) {
    return <ServicesPageSkeleton />;
  }

  if (error) {
    return <div>Error loading services</div>;
  }

  return <ServicesList 
    initialServices={services || []} 
    initialSearch={initialSearch}
    initialLocation={initialLocation}
  />;
} 
