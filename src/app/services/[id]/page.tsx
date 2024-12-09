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

interface Service {
  id: string
  name: string
  description: string | null
  price: string
  duration: number
  category: string
  image: string | null
  providerId: string
  provider: {
    id: string
    name: string
    businessName: string | null
    description: string | null
    image?: string
  }
}

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
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardContent className="p-0">
              {service.image && (
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-[400px] object-cover rounded-t-lg"
                />
              )}
            </CardContent>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-3xl">{service.name}</CardTitle>
                  <CardDescription className="mt-2">{service.description}</CardDescription>
                </div>
                <Badge variant="secondary">{service.category}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <DollarSign className="text-rose-600" />
                  <span className="text-2xl font-semibold text-rose-600">
                    {formatCurrency(parseFloat(service.price))}
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Clock className="w-5 h-5" />
                  <span>{formatDuration(service.duration)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>About the Provider</CardTitle>
            </CardHeader>
            <CardContent className="flex items-start space-x-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={service.provider.image} alt={service.provider.name} />
                <AvatarFallback>{service.provider.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl font-semibold">
                  {service.provider.businessName || service.provider.name}
                </h3>
                {service.provider.description && (
                  <p className="text-gray-600 mt-2">
                    {service.provider.description}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle>Book this Service</CardTitle>
              <CardDescription>Select a date and time to book your appointment</CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<div>Loading booking form...</div>}>
                <BookingForm service={service} />
              </Suspense>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
