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
import Image from 'next/image'

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
  return (
    <div className="space-y-6">
      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          Showing {initialServices.length} services
        </p>
        <Select defaultValue="recommended">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recommended">Recommended</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="rating">Top Rated</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {initialServices.map((service) => (
          <Link 
            href={`/services/${service.id}`} 
            key={service.id}
            className="group"
          >
            <div className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-rose-100 hover:shadow-lg transition-all duration-300">
              <div className="relative h-48">
                {service.image ? (
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="h-full bg-rose-50 flex items-center justify-center">
                    <span className="text-rose-600">No image available</span>
                  </div>
                )}
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-white/90">
                    {service.category}
                  </Badge>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold group-hover:text-rose-600 transition-colors">
                      {service.name}
                    </h3>
                    <div className="flex items-center mt-1 text-sm text-gray-500">
                      <MapPin className="h-4 w-4 mr-1" />
                      {service.provider.name}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-rose-600">
                      ${service.price}
                    </div>
                    <div className="text-sm text-gray-500">
                      {service.duration} mins
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-amber-400 fill-current" />
                    <span className="ml-1 text-sm text-gray-600">
                      {service.rating || '4.8'} ({service.reviewCount || '24'})
                    </span>
                  </div>
                  <Button variant="ghost" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
