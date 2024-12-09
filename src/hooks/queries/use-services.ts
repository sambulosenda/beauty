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

export function useServices() {
  return useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const response = await fetch('/api/services')
      if (!response.ok) {
        throw new Error('Failed to fetch services')
      }
      return response.json() as Promise<Service[]>
    }
  })
} 
