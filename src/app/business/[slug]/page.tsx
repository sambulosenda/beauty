import { notFound } from 'next/navigation'
import { db } from '@/db'
import { users, services } from '@/db/schema'
import { eq } from 'drizzle-orm'
import Image from 'next/image'
import { MapPin, Star, Phone, Mail } from 'lucide-react'
import { ServiceList } from '@/components/services/service-list'
import { Separator } from '@/components/ui/separator'
import { BusinessGalleryClient } from '@/app/business/[slug]/business-gallery-client'

export default async function BusinessPage({ params }: { params: { slug: string } }) {
  const slug = await params.slug
  
  const business = await db.query.users.findFirst({
    where: eq(users.slug, slug),
    columns: {
      id: true,
      name: true,
      businessName: true,
      description: true,
      logo: true,
      role: true,
      address: true,
      phone: true,
      email: true,
      gallery: true,
    }
  })

  if (!business || business.role !== 'PROVIDER') {
    notFound()
  }

  const businessServices = await db.query.services.findMany({
    where: eq(services.providerId, business.id),
  })

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-64 bg-gradient-to-r from-pink-500 to-rose-500">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="relative flex items-center gap-6">
            {business.logo && (
              <div className="h-24 w-24 rounded-full overflow-hidden border-4 border-white shadow-xl">
                <Image
                  src={business.logo}
                  alt={business.businessName || ''}
                  width={96}
                  height={96}
                  className="object-cover"
                />
              </div>
            )}
            <div>
              <h1 className="text-3xl font-bold text-white">
                {business.businessName || business.name}
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center text-yellow-400">
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                </div>
                <span className="text-white/90">5.0 (6 reviews)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Business Info */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {business.address && (
              <div className="flex items-center gap-3 text-gray-600">
                <MapPin className="h-5 w-5 text-gray-400" />
                <span>{business.address}</span>
              </div>
            )}
            {business.phone && (
              <div className="flex items-center gap-3 text-gray-600">
                <Phone className="h-5 w-5 text-gray-400" />
                <span>{business.phone}</span>
              </div>
            )}
            {business.email && (
              <div className="flex items-center gap-3 text-gray-600">
                <Mail className="h-5 w-5 text-gray-400" />
                <span>{business.email}</span>
              </div>
            )}
          </div>
          {business.description && (
            <>
              <Separator className="my-6" />
              <p className="text-gray-600">{business.description}</p>
            </>
          )}
        </div>

        {/* Gallery Section */}
        {business.gallery && business.gallery.length > 0 && (
          <section className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <h2 className="text-2xl font-bold mb-6">Gallery</h2>
            <BusinessGalleryClient images={business.gallery} />
          </section>
        )}

        {/* Services Section */}
        <section className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-2xl font-bold mb-6">Our Services</h2>
          <ServiceList services={businessServices} businessSlug={slug} />
        </section>
      </div>
    </main>
  )
}
