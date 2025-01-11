import Image from 'next/image'
import { MapPin, Clock, Star } from 'lucide-react'
import React from 'react'

interface BusinessHeroProps {
  business: {
    businessName: string
    coverImage: string
    address: string
  }
}

export function BusinessHero({ business }: BusinessHeroProps) {
  return (
    <div className="relative h-80 bg-gray-900">
      <Image
        src={business.coverImage}
        alt={business.businessName}
        fill
        className="object-cover opacity-70"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <h1 className="text-4xl font-bold mb-2">{business.businessName}</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <MapPin className="h-5 w-5 mr-1" />
            <span>{business.address}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-5 w-5 mr-1" />
            <span>Open Today: 10:30 AM - 9:00 PM</span>
          </div>
          <div className="flex items-center">
            <Star className="h-5 w-5 mr-1 text-yellow-400" />
            <span>4.8 (234 reviews)</span>
          </div>
        </div>
      </div>
    </div>
  )
}

