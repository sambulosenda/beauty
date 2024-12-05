// app/services/[id]/page.tsx
import { notFound } from 'next/navigation'
import { db } from '@/db'
import { services, users } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { formatCurrency, formatDuration } from '@/lib/utils'
import BookingForm from '@/components/bookings/booking-form'
import { Suspense } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, DollarSign } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

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
                <AvatarImage src={service.provider.image || undefined} alt={service.provider.name} />
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
