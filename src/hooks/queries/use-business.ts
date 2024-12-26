import { useQuery } from '@tanstack/react-query'

export function useBusiness(slug: string) {
  return useQuery({
    queryKey: ['business', slug],
    queryFn: async () => {
      try {
        const response = await fetch(`/api/business/${slug}`)
        console.log('API Response:', response) // Debug log
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        console.log('API Data:', data) // Debug log
        
        return data
      } catch (error) {
        console.error('Fetch error:', error)
        throw error
      }
    },
    retry: false // Disable retries to see errors immediately
  })
} 
