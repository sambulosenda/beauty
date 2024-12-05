// app/services/page.tsx
import { Suspense } from 'react'
import { db } from '@/db'
import ServiceCard from '@/components/services/services-card'
import { services, users } from '@/db/schema'
import { eq, desc } from 'drizzle-orm'

export default async function ServicesPage() {
  // Get services with provider information
  const servicesWithProvider = await db
    .select()
    .from(services)
    .leftJoin(
      users,
      eq(users.id, services.providerId)
    )
    .orderBy(desc(services.createdAt))

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Beauty Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Suspense fallback={<div>Loading...</div>}>
          {servicesWithProvider.map((result) => (
            <ServiceCard 
              key={result.services.id} 
              service={{
                ...result.services,
                provider: result.users
              }} 
            />
          ))}
        </Suspense>
      </div>
    </div>
  )
}