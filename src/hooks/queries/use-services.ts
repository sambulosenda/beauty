import { useQuery } from '@tanstack/react-query'

interface Service {
  id: string
  name: string
  description: string
  price: string
  duration: number
  category: string
  image?: string
  provider: {
    name: string
    address: string
  }
}

interface UseServicesParams {
  search?: string
  location?: string
  category?: string
  filters?: {
    priceRange: [number, number]
    duration: [number, number]
    rating: number | null
  }
}

export function useServices({ search, location, category, filters }: UseServicesParams) {
  return useQuery({
    queryKey: ['services', { search, location, category, filters }],
    queryFn: async () => {
      const params = new URLSearchParams()
      if (search) params.append('search', search)
      if (location) params.append('location', location)
      if (category) params.append('category', category)
      
      const response = await fetch(`/api/services?${params.toString()}`)
      if (!response.ok) throw new Error('Failed to fetch services')
      return response.json()
    }
  })
} 
