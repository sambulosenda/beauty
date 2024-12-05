import Link from 'next/link'
import { formatCurrency } from '@/lib/utils'

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
  // Convert the string price to a number for formatting
  const priceAsNumber = parseFloat(service.price)

  return (
    <Link href={`/services/${service.id}`}>
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6">
        {service.image && (
          <img
            src={service.image}
            alt={service.name}
            className="w-full h-48 object-cover rounded-md mb-4"
          />
        )}
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.name}</h3>
        <p className="text-gray-500 mb-4">{service.description}</p>
        <div className="flex items-center justify-between mb-2">
          <span className="text-rose-600 font-semibold">
            {formatCurrency(priceAsNumber)}
          </span>
          <span className="text-gray-500">
            {service.duration} mins
          </span>
        </div>
        {service.provider && (
          <div className="text-sm text-gray-500">
            By: {service.provider.businessName || service.provider.name || 'Unknown Provider'}
          </div>
        )}
      </div>
    </Link>
  )
}