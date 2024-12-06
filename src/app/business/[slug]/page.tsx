import { notFound } from 'next/navigation'
import { db } from '@/db'
import { users, services } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { ServiceCard } from '@/components/services/service-card'

interface BusinessPageProps {
  params: { slug: string }
}

export default async function BusinessPage({ params }: BusinessPageProps) {
  const business = await db.query.users.findFirst({
    where: eq(users.slug, params.slug),
    columns: {
      id: true,
      name: true,
      businessName: true,
      description: true,
      logo: true,
      role: true, 
    }
  })

  if (!business || business.role !== 'PROVIDER') {
    notFound()
  }

  const businessServices = await db.query.services.findMany({
    where: eq(services.providerId, business.id),
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Business Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{business.businessName}</h1>
        <p className="mt-2 text-gray-600">{business.description}</p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {businessServices.map((service) => (
          <ServiceCard 
            key={service.id} 
            service={service}
            businessSlug={params.slug}
          />
        ))}
      </div>
    </div>
  )
} 
