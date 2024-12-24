import { Metadata } from "next"
import { ServicesPageContent } from "@/components/services/services-page-content"

export const metadata: Metadata = {
  title: "Discover Beauty Services",
  description: "Find and book professional beauty and wellness services near you",
  keywords: "beauty, wellness, spa, massage, salon, booking",
}

export default function ServicesPage({
  searchParams,
}: {
  searchParams: { search?: string; location?: string; category?: string }
}) {
  return <ServicesPageContent searchParams={searchParams} />
}
