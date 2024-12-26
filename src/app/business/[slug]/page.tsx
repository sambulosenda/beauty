import { notFound } from 'next/navigation'
import { db } from '@/db'
import { users, services } from '@/db/schema'
import { eq } from 'drizzle-orm'
import Image from 'next/image'
import { MapPin, Star, Phone, Mail, ArrowRight, Share2, Heart, Calendar, Clock, Check } from 'lucide-react'
import { ServiceList } from '@/components/services/service-list'
import { Separator } from '@/components/ui/separator'
import { BusinessGalleryClient } from '@/app/business/[slug]/business-gallery-client'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import Map from '@/components/map'

const businessHours = [
  { day: 'Monday', open: '9:00 AM', close: '6:00 PM', isClosed: false },
  { day: 'Tuesday', open: '9:00 AM', close: '6:00 PM', isClosed: false },
  { day: 'Wednesday', open: '9:00 AM', close: '6:00 PM', isClosed: false },
  { day: 'Thursday', open: '9:00 AM', close: '6:00 PM', isClosed: false },
  { day: 'Friday', open: '9:00 AM', close: '6:00 PM', isClosed: false },
  { day: 'Saturday', open: '10:00 AM', close: '4:00 PM', isClosed: false },
  { day: 'Sunday', open: '', close: '', isClosed: true },
]

const availableSlots = [
  '10:00 AM',
  '11:30 AM',
  '2:00 PM',
  '3:30 PM',
  '5:00 PM'
]

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
      latitude: true,
      longitude: true,
      area: true,
      city: true,
    }
  })

  if (!business || business.role !== 'PROVIDER') {
    notFound()
  }

    // Get the first gallery image or fallback
  const coverImage = business.gallery?.[0] || '/images/default-cover.jpg'

  const businessServices = await db.query.services.findMany({
    where: eq(services.providerId, business.id),
  })

  return (
    <main className="min-h-screen bg-gray-50">
          {/* Hero Section with Gallery Preview */}
          <div className="relative h-[480px]">
        {/* Main Cover Image */}
        <div className="absolute inset-0">
          <Image
            src={coverImage}
            alt={business.businessName || ''}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        </div>

        {/* Gallery Grid Preview */}
        {business.gallery && business.gallery.length > 1 && (
          <div className="absolute bottom-6 right-6 flex gap-2">
            {business.gallery.slice(1, 4).map((image, index) => (
              <div 
                key={index}
                className={cn(
                  "relative h-20 w-20 rounded-lg overflow-hidden",
                  index === 2 && business.gallery!.length > 4 && "relative"
                )}
              >
                <Image
                  src={image}
                  alt={`Gallery image ${index + 1}`}
                  fill
                  className="object-cover"
                />
                {index === 2 && business.gallery!.length > 4 && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      +{business.gallery!.length - 3}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Business Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="max-w-7xl mx-auto flex items-end justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-4">
                {business.businessName || business.name}
              </h1>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span>{business.rating || '5.0'}</span>
                  <span className="text-white/80">
                    ({business.reviewCount || '6'} reviews)
                  </span>
                </div>
                {business.address && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    <span>{business.address}</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button size="sm" variant="outline" className="bg-white/10 border-white/20">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button size="sm" variant="outline" className="bg-white/10 border-white/20">
                <Heart className="h-4 w-4 mr-2" />
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>



      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-8">
          {/* Contact Info Cards */}
          <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {business.address && (
                <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="flex-shrink-0">
                    <MapPin className="h-6 w-6 text-rose-500" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-500">Location</div>
                    <div className="text-gray-900">{business.address}</div>
                  </div>
                </div>
              )}
              {business.phone && (
                <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="flex-shrink-0">
                    <Phone className="h-6 w-6 text-rose-500" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-500">Phone</div>
                    <div className="text-gray-900">{business.phone}</div>
                  </div>
                </div>
              )}
              {business.email && (
                <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="flex-shrink-0">
                    <Mail className="h-6 w-6 text-rose-500" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-500">Email</div>
                    <div className="text-gray-900">{business.email}</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Services Section */}
          <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Our Services</h2>
              <Button variant="outline" size="sm">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <ServiceList services={businessServices} businessSlug={slug} />
          </div>

          {/* About and Location Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">About Us</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                {business.description}
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <Check className="h-5 w-5 text-rose-500" />
                  <span>Professional Staff</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Check className="h-5 w-5 text-rose-500" />
                  <span>Quality Products</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Check className="h-5 w-5 text-rose-500" />
                  <span>Comfortable Environment</span>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Map Card */}
              <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Location</h2>
                <div className="h-[300px] rounded-xl overflow-hidden mb-4">
                  <Map 
                    address={business.address}
                    lat={business.latitude}
                    lng={business.longitude}
                  />
                </div>
                <p className="text-gray-600 mb-2">{business.address}</p>
                <Button variant="link" className="text-rose-600 p-0 h-auto">
                  Get directions
                </Button>
              </div>

              {/* Opening Hours Card */}
              <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Opening Hours</h2>
                <div className="space-y-3">
                  {[
                    { day: 'Monday', hours: '10:00 - 18:00', isOpen: true },
                    { day: 'Tuesday', hours: '10:00 - 18:00', isOpen: true },
                    { day: 'Wednesday', hours: '10:00 - 18:00', isOpen: true },
                    { day: 'Thursday', hours: '10:00 - 18:00', isOpen: true },
                    { day: 'Friday', hours: '10:00 - 18:00', isOpen: true },
                    { day: 'Saturday', hours: '10:00 - 16:00', isOpen: true },
                    { day: 'Sunday', hours: 'Closed', isOpen: false },
                  ].map((schedule) => (
                    <div 
                      key={schedule.day}
                      className="flex items-center justify-between py-2"
                    >
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "w-2 h-2 rounded-full",
                          schedule.isOpen ? "bg-green-500" : "bg-gray-300"
                        )} />
                        <span className="font-medium text-gray-900">
                          {schedule.day}
                        </span>
                      </div>
                      <span className={cn(
                        "text-sm",
                        schedule.isOpen ? "text-gray-600" : "text-gray-400"
                      )}>
                        {schedule.hours}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Book Now Button */}
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 sm:hidden">
          <Button 
            size="lg" 
            className="bg-rose-600 hover:bg-rose-700 shadow-lg rounded-full px-8"
          >
            Book Now
          </Button>
        </div>
      </div>
    </main>
  )
}
