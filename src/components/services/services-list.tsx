'use client'

import { useState } from 'react'
import { Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ServicesListProps {
  initialServices: any[] // Type this properly based on your schema
}

export function ServicesList({ initialServices }: ServicesListProps) {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [filteredServices, setFilteredServices] = useState(initialServices)

  const categories = ['All', 'Hair', 'Nails', 'Massage', 'Facial', 'Makeup', 'Spa']

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    if (category === 'All') {
      setFilteredServices(initialServices)
    } else {
      const filtered = initialServices.filter(service => 
        service.category?.toLowerCase() === category.toLowerCase()
      )
      setFilteredServices(filtered)
    }
  }

  return (
    <div>
      {/* Categories */}
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {categories.map((category) => (
          <Button
            key={category}
            variant={category === selectedCategory ? 'default' : 'outline'}
            className="rounded-full whitespace-nowrap"
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Services Grid */}
      <div className="mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredServices.map((service) => (
            <div key={service.id} className="group cursor-pointer bg-white rounded-xl p-4 border hover:shadow-lg transition-all duration-300">
              <div className="rounded-lg overflow-hidden mb-4 aspect-video">
                {service.image ? (
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full bg-rose-50 flex items-center justify-center">
                    <Sparkles className="h-8 w-8 text-rose-300" />
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <h3 className="font-medium text-lg line-clamp-1">{service.name}</h3>
                <p className="text-gray-600 text-sm line-clamp-1">{service.provider?.businessName || service.provider?.name}</p>
                <div className="flex items-center justify-between pt-2 border-t">
                  <span className="font-semibold text-rose-600">${service.price}</span>
                  <span className="text-sm text-gray-500">{service.duration} mins</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
