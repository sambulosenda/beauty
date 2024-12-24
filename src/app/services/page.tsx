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

export default async function ServicesPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  // Ensure searchParams are handled properly
  const validatedParams: SearchParams = {
    search: typeof searchParams.search === 'string' ? searchParams.search : undefined,
    location: typeof searchParams.location === 'string' ? searchParams.location : undefined,
    category: typeof searchParams.category === 'string' ? searchParams.category : undefined,
  }

  return <ServicesPageContent searchParams={validatedParams} />
}
