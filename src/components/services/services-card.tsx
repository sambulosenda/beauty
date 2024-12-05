import Link from 'next/link'
import { formatCurrency } from '@/lib/utils'
import { Clock, MapPin } from 'lucide-react'

interface ServiceCardProps {
  service: {
    id: string
    name: string
    description: string | null
    price: string
    duration: number
    providerId: string
    category: string
    image: string | null
    createdAt: Date
    updatedAt: Date
    provider: {
      id: string
      name: string | null
      businessName: string | null
    } | null
  }
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const priceAsNumber = parseFloat(service.price)

  return (
    <Link href={`/services/${service.id}`}>
      <div className="group relative bg-white rounded-2xl border border-gray-100 hover:border-rose-100 hover:shadow-lg transition-all duration-300 overflow-hidden">
        {service.image ? (
          <div className="relative h-48 overflow-hidden">
            <img
              src={service.image}
              alt={service.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        ) : (
          <div className="h-48 bg-rose-50 flex items-center justify-center">
            <span className="text-rose-600 text-lg">No image available</span>
          </div>
        )}
        
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-rose-600 transition-colors">
                {service.name}
              </h3>
              {service.provider && (
                <div className="flex items-center mt-1 text-sm text-gray-500">
                  <MapPin className="h-4 w-4 mr-1" />
                  {service.provider.businessName || service.provider.name || 'Unknown Provider'}
                </div>
              )}
            </div>
          </div>
          
          {service.description && (
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {service.description}
            </p>
          )}

          <div className="flex items-center justify-between pt-4 border-t border-gray-50">
            <div className="flex items-center text-gray-500 text-sm">
              <Clock className="h-4 w-4 mr-1" />
              {service.duration} mins
            </div>
            <span className="text-lg font-semibold text-rose-600">
              {formatCurrency(priceAsNumber)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
