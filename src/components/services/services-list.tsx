'use client'

import { useState, useMemo } from 'react'
import { Search, MapPin, Clock, Star } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Service {
  id: string
  name: string
  description: string
  location: string
  rating: number | null
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
  initialServices: any[];
  initialSearch?: string;
  initialLocation?: string;
}
export function ServicesList({ initialServices }: ServicesListProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('default')

  const categories = ['All', 'Massage', 'Hair', 'Nails', 'Facial', 'Body', 'Spa']

  const filteredAndSortedServices = useMemo(() => {
    let services = initialServices.filter(service => 
      (selectedCategory === 'All' || service.category === selectedCategory) &&
      (service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
       service.provider.name.toLowerCase().includes(searchQuery.toLowerCase()))
    )

    switch (sortBy) {
      case 'price-low':
        return services.sort((a, b) => a.price - b.price)
      case 'price-high':
        return services.sort((a, b) => b.price - a.price)
      case 'rating':
        return services.sort((a, b) => (b.rating || 0) - (a.rating || 0))
      default:
        return services
    }
  }, [initialServices, selectedCategory, searchQuery, sortBy])

  return (
    <div className="container mx-auto px-4">
      <div className="space-y-8">
        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex flex-col gap-6">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search services or providers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-6 text-lg rounded-full border-gray-200 focus:border-rose-500 focus:ring-rose-500"
              />
            </div>

            {/* Filters Row */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex gap-2 overflow-x-auto pb-2 flex-1 w-full md:w-auto">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={category === selectedCategory ? 'default' : 'outline'}
                    onClick={() => setSelectedCategory(category)}
                    className={`rounded-full px-6 whitespace-nowrap ${
                      category === selectedCategory 
                        ? 'bg-rose-500 hover:bg-rose-600 text-white' 
                        : 'hover:bg-rose-50'
                    }`}
                  >
                    {category}
                  </Button>
                ))}
              </div>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[200px] min-w-[200px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Top Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredAndSortedServices.map((service) => (
            <Link href={`/services/${service.id}`} key={service.id}>
              <div className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden border border-gray-100 flex">
                {/* Service Image */}
                <div className="w-48 h-48 flex-shrink-0">
                  {service.image ? (
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                      <span className="text-gray-400">No image</span>
                    </div>
                  )}
                </div>

                {/* Service Details */}
                <div className="flex-1 p-6">
                  <div className="flex flex-col h-full justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold group-hover:text-rose-600 transition-colors">
                          {service.name}
                        </h3>
                        <Badge variant="secondary" className="ml-2">
                          {service.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{service.provider.name}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{service.duration} mins</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span className="truncate">{service.provider.address}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        {service.rating !== null ? (
                          <>
                            <Star
                              className="h-4 w-4 text-yellow-400 fill-yellow-400"
                              aria-hidden="true"
                            />
                            {/* <span className="text-sm font-medium">{service.rating.toFixed(1)}</span> */}
                          </>
                        ) : (
                          <span className="text-sm text-gray-500">No ratings yet</span>
                        )}
                      </div>
                      <p className="text-sm font-medium text-gray-900">
                        {/* ${service.price.toFixed(2)} */}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
