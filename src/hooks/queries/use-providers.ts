import { useQuery } from "@tanstack/react-query";
import { Provider } from "@/types/provider";

async function getProviders() {
  const response = await fetch('/api/providers');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}

export function useProviders() {
  return useQuery<{ providers: Provider[]; newProviders: Provider[] }>({
    queryKey: ['providers'],
    queryFn: getProviders,
  });
} 
