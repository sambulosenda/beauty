'use client'

import { X } from 'lucide-react'
import Link from 'next/link'
import BookingSteps from '@/components/bookings/booking-steps'
import { useQuery } from '@tanstack/react-query'
import { Skeleton } from '@/components/ui/skeleton'

export default function BookServicePage({ params }: { params: { id: string } }) {
  // Fetch service details
  const { data: service, isLoading } = useQuery({
    queryKey: ['service', params.id],
    queryFn: async () => {
      const res = await fetch(`/api/services/${params.id}`)
      return res.json()
    }
  })

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold">Book Appointment</h1>
            <Link 
              href={`/services/${params.id}`}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 py-8">
        {isLoading ? (
          <ServiceSkeleton />
        ) : (
          <>
            {/* Service Summary */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="font-medium text-lg">{service?.name}</h2>
                  <p className="text-sm text-gray-500">
                    {service?.duration} minutes • {service?.provider?.businessName}
                  </p>
                </div>
                <span className="text-lg font-semibold text-rose-600">
                  ${service?.price}
                </span>
              </div>
            </div>

            {/* Booking Steps */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <BookingSteps 
                serviceId={params.id} 
                onComplete={() => {
                  // Handle completion (e.g., redirect to confirmation)
                }}
              />
            </div>
          </>
        )}
      </div>
    </main>
  )
}

function ServiceSkeleton() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex justify-between">
          <div className="space-y-2">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>
          <Skeleton className="h-6 w-16" />
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="space-y-4">
          <Skeleton className="h-8 w-full" />
          <div className="grid grid-cols-7 gap-2">
            {[...Array(35)].map((_, i) => (
              <Skeleton key={i} className="aspect-square w-full" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 
