import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import Image from 'next/image'
import { Clock } from 'lucide-react'

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
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      {service.image && (
        <div className="relative h-48 w-full">
          <Image
            src={service.image}
            alt={service.name}
            fill
            className="object-cover"
          />
        </div>
      )}
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{service.name}</span>
          <span className="text-xl font-bold">{service.price}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">{service.description}</p>
        <div className="flex items-center text-sm text-gray-500">
          <Clock className="h-4 w-4 mr-1" />
          <span>{service.duration} minutes</span>
        </div>
      </CardContent>
      <CardFooter>
        <Link 
          href={`/book/${businessSlug}/${service.id}`} 
          className="w-full"
        >
          <Button className="w-full">Book Now</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

