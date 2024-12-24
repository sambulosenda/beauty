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
  search?: string;
  location?: string;
  category?: string;
}

export function useServices({ search, location, category }: UseServicesParams) {
  return useQuery({
    queryKey: ['services', search, location, category],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (location) params.append('location', location);
      if (category && category !== 'all') params.append('category', category);
      
      const response = await fetch(`/api/services?${params.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch services');
      return response.json();
    },
  });
} 
