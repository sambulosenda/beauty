'use client'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { Skeleton } from '@/components/ui/skeleton'
import { ModernBookingFlow } from '@/components/bookings/modern-booking-flow'
import { BookingSkeletonLoader } from '@/components/bookings/booking-skeleton'
import { useRouter } from 'next/navigation'
import React from "react";

interface BookServicePageProps {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default function BookServicePage({ params }: BookServicePageProps) {
  const id = (params as any).id;
  
  const { data: service, isLoading } = useQuery({
    queryKey: ['service', id],
    queryFn: async () => {
      const res = await fetch(`/api/services/${id}`)
      return res.json()
    }
  })
  
  const router = useRouter()

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <Link href={`/services/${id}`} className="text-gray-500 hover:text-gray-700">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-lg font-medium">Book {service?.name}</h1>
            <div className="w-5" />
          </div>
        </div>
      </header>
      <div className="container py-8">
        {isLoading ? (
          <BookingSkeletonLoader />
        ) : (
          <ModernBookingFlow
            service={service}
            onComplete={(bookingId: string) => {
              router.push(`/bookings/${bookingId}/confirmation`)
            }}
          />
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
