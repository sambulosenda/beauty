// app/services/page.tsx
import { Suspense } from 'react'
import { db } from '@/db'
import ServiceCard from '@/components/services/services-card'
import { services, users } from '@/db/schema'
import { eq, desc } from 'drizzle-orm'
import { Search, Sparkles } from 'lucide-react'

export default async function ServicesPage() {
  const servicesWithProvider = await db
    .select()
    .from(services)
    .leftJoin(users, eq(users.id, services.providerId))
    .orderBy(desc(services.createdAt))

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-16 lg:py-20 border-b border-gray-100 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="inline-block rounded-full bg-rose-50 px-4 py-1.5 mb-4">
              <span className="text-sm font-medium text-rose-600">
                Discover Beauty Services
              </span>
            </div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Find Your Perfect <span className="text-rose-600">Beauty Service</span>
            </h1>
            <p className="mt-4 max-w-[700px] text-gray-600 md:text-xl">
              Browse our curated selection of professional beauty services tailored to your needs
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="w-full py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Categories and Search - You can make these functional later */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-rose-600" />
              <h2 className="text-xl font-semibold">Featured Services</h2>
            </div>
            <div className="relative w-full md:w-auto">
              <input
                type="text"
                placeholder="Search services..."
                className="w-full md:w-[300px] px-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Suspense 
              fallback={
                <div className="col-span-full flex justify-center items-center py-12">
                  <div className="animate-pulse flex space-x-4">
                    <div className="h-12 w-12 rounded-full bg-gray-200"></div>
                    <div className="space-y-3">
                      <div className="h-4 w-[200px] bg-gray-200 rounded"></div>
                      <div className="h-4 w-[160px] bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </div>
              }
            >
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
      </section>
    </div>
  )
}
