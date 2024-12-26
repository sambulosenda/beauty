'use client'
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

interface Service {
  id: string
  name: string
  description?: string
  price: number
  duration: number
  category: string
  image: string | null
}

interface ServiceListProps {
  services?: Service[]
  businessSlug: string
}

export function ServiceList({ services = [], businessSlug }: ServiceListProps) {
  console.log('ServiceList received services:', services)
  
  const [openItems, setOpenItems] = useState<Set<string>>(new Set())

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id)
    } else {
      newOpenItems.add(id)
    }
    setOpenItems(newOpenItems)
  }

  if (!Array.isArray(services) || services.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No services available at the moment.</p>
      </div>
    )
  }

  return (
    <div className="divide-y divide-gray-100">
      {services.map((service) => (
        <Collapsible
          key={service.id}
          open={openItems.has(service.id)}
          onOpenChange={() => toggleItem(service.id)}
        >
          <div className="py-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="text-base font-medium">{service.name}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>{service.duration} mins</span>
                  <CollapsibleTrigger className="text-primary hover:underline">
                    {openItems.has(service.id) ? "Hide Details" : "Show Details"}
                  </CollapsibleTrigger>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <span className="text-base font-medium">
                      from £{service.price}
                    </span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="h-8 px-4 text-pink-500 border-pink-500 hover:bg-pink-50"
                  asChild
                >
                  <a href={`/services/${service.id}`}>View Details</a>
                </Button>
              </div>
            </div>
            <CollapsibleContent className="mt-2 text-sm text-gray-600">
              {service.description || "No additional details available."}
            </CollapsibleContent>
          </div>
        </Collapsible>
      ))}
    </div>
  )
}
