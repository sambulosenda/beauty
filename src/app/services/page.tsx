import { Metadata } from "next"
import { ServicesPageContent } from "@/components/services/services-page-content"

export const metadata: Metadata = {
  title: "Discover Beauty Services",
  description: "Find and book professional beauty and wellness services near you",
  keywords: "beauty, wellness, spa, massage, salon, booking",
}

interface SearchParams {
  search?: string
  location?: string
  category?: string
}

interface ServicesPageProps {
  searchParams: Promise<SearchParams>
}

export default async function ServicesPage({ searchParams }: ServicesPageProps) {
  // Await the searchParams
  const rawParams = await searchParams

  // Ensure searchParams are handled properly
  const validatedParams: SearchParams = {
    search: typeof rawParams.search === 'string' ? rawParams.search : undefined,
    location: typeof rawParams.location === 'string' ? rawParams.location : undefined,
    category: typeof rawParams.category === 'string' ? rawParams.category : undefined,
  }

  return <ServicesPageContent searchParams={validatedParams} />
}