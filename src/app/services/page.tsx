import { Suspense } from 'react'
import { db } from '@/db'
import { ServicesList } from '@/components/services/services-list'
import { Metadata } from 'next'
import { ServicesPageSkeleton } from '@/components/services/services-page-skeleton'

export const metadata: Metadata = {
  title: 'Our Services',
  description: 'Explore our wide range of beauty and wellness services',
}

async function getServices() {
  try {
    return await db.query.services.findMany({
      with: {
        provider: true
      },
      orderBy: (services, { desc }) => [desc(services.createdAt)]
    })
  } catch (error) {
    console.error('Failed to fetch services:', error)
    return []
  }
}

export default async function ServicesPage() {
  const services = await getServices()

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Our Services</h1>
        <Suspense fallback={<ServicesPageSkeleton />}>
          <ServicesList initialServices={services} />
        </Suspense>
      </main>
    </div>
  )
}
