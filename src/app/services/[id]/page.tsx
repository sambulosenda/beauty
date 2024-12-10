'use client'

import { notFound } from 'next/navigation'
import { formatCurrency, formatDuration } from '@/lib/utils'
import BookingForm from '@/components/bookings/booking-form'
import { Suspense } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, DollarSign } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useQuery } from '@tanstack/react-query'
import { ServiceDetailSkeleton } from '@/components/services/service-detail-skeleton'
import { Service } from '../../../../types'

function useService(id: string) {
  return useQuery({
    queryKey: ['service', id],
    queryFn: async () => {
      const response = await fetch(`/api/services/${id}`)
      if (!response.ok) {
        if (response.status === 404) {
          notFound()
        }
        throw new Error('Failed to fetch service')
      }
      return response.json() as Promise<Service>
    }
  })
}

export default function ServicePage({ params }: { params: { id: string } }) {
  const { data: service, isLoading, error } = useService(params.id)

  if (isLoading) {
    return <ServiceDetailSkeleton />
  }

  if (error || !service) {
    return notFound()
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Service Details */}
          <div className="bg-white">
            {service.image && (
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-[400px] object-cover"
              />
            )}
            <div className="mt-6">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-medium text-gray-900">{service.name}</h1>
                  <p className="mt-2 text-gray-600">{service.description}</p>
                </div>
                <Badge className="bg-gray-100 text-gray-900 hover:bg-gray-200">
                  {service.category}
                </Badge>
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-6">
                <div className="flex items-center space-x-2">
                  <DollarSign className="text-gray-900" />
                  <span className="text-2xl font-medium text-gray-900">
                    {formatCurrency(parseFloat(service.price))}
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Clock className="w-5 h-5" />
                  <span>{formatDuration(service.duration)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Provider Details */}
          <div className="bg-white border-t border-gray-100 pt-8">
            <h2 className="text-2xl font-medium text-gray-900">About the Provider</h2>
            <div className="mt-6 flex items-start space-x-4">
              <Avatar className="w-16 h-16 border border-gray-200">
                <AvatarImage src={service.provider.image} alt={service.provider.name} />
                <AvatarFallback>{service.provider.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl font-medium text-gray-900">
                  {service.provider.businessName || service.provider.name}
                </h3>
                {service.provider.description && (
                  <p className="text-gray-600 mt-2">
                    {service.provider.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Booking Form */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-100 p-6">
            <div className="mt-1">
              <Suspense fallback={<div>Loading booking form...</div>}>
                <BookingForm service={service} />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
