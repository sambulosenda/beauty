// app/services/[id]/page.tsx
import { notFound } from 'next/navigation'
import { db } from '@/db'
import { services, users } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { formatCurrency, formatDuration } from '@/lib/utils'
import BookingForm from '@/components/bookings/booking-form'
import { Suspense } from 'react'

interface ServicePageProps {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

async function getService(id: string) {
  const serviceData = await db
    .select({
      id: services.id,
      name: services.name,
      description: services.description,
      price: services.price,
      duration: services.duration,
      category: services.category,
      image: services.image,
      providerId: services.providerId,
      provider: {
        id: users.id,
        name: users.name,
        businessName: users.businessName,
        description: users.description
      }
    })
    .from(services)
    .innerJoin(users, eq(users.id, services.providerId))
    .where(eq(services.id, id))

  return serviceData[0]
}

export default async function ServicePage({ params }: ServicePageProps) {
  const service = await getService(params.id)

  if (!service) {
    notFound()
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          {service.image && (
            <img
              src={service.image}
              alt={service.name}
              className="w-full h-96 object-cover rounded-lg shadow-md"
            />
          )}
          <h1 className="text-3xl font-bold mt-6 mb-4">{service.name}</h1>
          <p className="text-gray-600 mb-6">{service.description}</p>
          <div className="flex items-center justify-between mb-6">
            <div className="text-2xl font-semibold text-rose-600">
              {formatCurrency(parseFloat(service.price))}
            </div>
            <div className="text-gray-600">
              Duration: {formatDuration(service.duration)}
            </div>
          </div>
          
          <div className="mt-8 p-6 bg-gray-50 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">
              {service.provider.businessName || service.provider.name}
            </h2>
            {service.provider.description && (
              <p className="text-gray-600">
                {service.provider.description}
              </p>
            )}
          </div>
        </div>
        <Suspense fallback={<div>Loading booking form...</div>}>
          <div>
            <BookingForm service={service} />
          </div>
        </Suspense>
      </div>
    </div>
  )
}

export async function generateMetadata({ params }: ServicePageProps) {
  const service = await getService(params.id)

  if (!service) {
    return {
      title: 'Service Not Found',
      description: 'The requested service could not be found.'
    }
  }
  return {
    title: `${service.name} | Beauty Services`,
    description: service.description || `Book ${service.name} service now`
  }
}
