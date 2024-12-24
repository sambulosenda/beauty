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
  initialCategory?: string;
}

export function ServicesList({ 
  initialServices, 
  initialSearch, 
  initialLocation, 
  initialCategory 
}: ServicesListProps) {
  return (
    <div className="space-y-6">
      {/* Results Summary and Sort */}
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {initialServices.map((service) => (
          <Link 
            href={`/services/${service.id}`} 
            key={service.id}
            className="group"
          >
            <div className="group relative bg-white rounded-2xl border border-gray-100 hover:border-rose-100 transition-all duration-300 overflow-hidden">
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
                        {service.provider.name}
                      </div>
                    )}
                  </div>
                  <Badge variant="secondary" className="ml-2">
                    {service.category}
                  </Badge>
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
                    ${service.price}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
