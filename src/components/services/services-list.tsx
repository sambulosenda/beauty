'use client'

import { useState } from 'react'
import { Search, MapPin, Clock, Star } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface Service {
  id: string
  name: string
  description: string
  location: string
  rating: number
  reviewCount: number
  price: number
  duration: number
  image?: string
  provider: {
    name: string
    address: string
  }
  category: string
}

interface ServicesListProps {
  initialServices: Service[]
}

export function ServicesList({ initialServices }: ServicesListProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const categories = ['All', 'Massage', 'Hair', 'Nails', 'Facial', 'Body', 'Spa']

  const filteredServices = initialServices.filter(service => 
    (selectedCategory === 'All' || service.category === selectedCategory) &&
    (service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
     service.provider.name.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 z-10 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search services or salons..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={category === selectedCategory ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="whitespace-nowrap"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
            >
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 lg:w-1/4">
                  {service.image ? (
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-48 md:h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-48 md:h-full bg-gray-100 flex items-center justify-center">
                      <span className="text-gray-400">No image available</span>
                    </div>
                  )}
                </div>
                <div className="flex-1 p-6">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-gray-900">{service.name}</h3>
                      <p className="text-gray-600">{service.provider.name}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <MapPin className="h-4 w-4" />
                        <span>{service.provider.address}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                          {service.category}
                        </Badge>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{service.rating}</span>
                          <span className="text-sm text-gray-500">
                            ({service.reviewCount} reviews)
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-start gap-2">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="h-4 w-4" />
                        <span>{service.duration} mins</span>
                      </div>
                      <p className="text-2xl font-bold text-gray-900">${service.price}</p>
                      <Button className="w-full md:w-auto">Book Now</Button>
                    </div>
                  </div>
                  <p className="mt-4 text-gray-600 line-clamp-2">{service.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

