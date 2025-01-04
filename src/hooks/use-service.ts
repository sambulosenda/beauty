import { useQuery } from '@tanstack/react-query'

export function useService(serviceId: string) {
  return useQuery({
    queryKey: ['service', serviceId],
    queryFn: async () => {
      const res = await fetch(`/api/services/${serviceId}`)
      if (!res.ok) {
        throw new Error('Failed to fetch service')
      }
      return res.json()
    }
  })
} 
