import { formatCurrency } from "@/lib/utils"
import Link from "next/link"

interface ServiceCardProps {
  service: {
    id: string
    name: string
    description: string | null
    price: string
    duration: number
    category?: string
    image?: string | null
  }
  businessSlug: string
}

export function ServiceCard({ service, businessSlug }: ServiceCardProps) {
  return (
    <Link href={`/business/${businessSlug}/services/${service.id}`}>
      <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
        <h3 className="text-lg font-semibold">{service.name}</h3>
        <p className="text-gray-600 mt-2">{service.description}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-lg font-bold">
            {formatCurrency(parseFloat(service.price))}
          </span>
          <span className="text-sm text-gray-500">
            {service.duration} minutes
          </span>
        </div>
      </div>
    </Link>
  )
} 
