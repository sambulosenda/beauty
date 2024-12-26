export interface BusinessWithAvailability {
  id: string
  name: string | null
  slug: string | null
  clerkId: string
  role: "CUSTOMER" | "PROVIDER" | "ADMIN"
  email: string
  businessName: string | null
  description: string | null
  address: string | null
  phone: string | null
  logo: string | null
  gallery: string[] | null
  latitude: string
  longitude: string
  rating: string
  reviewCount: number
  availability: {
    dayOfWeek: string
    startTime: string
    endTime: string
    isAvailable: boolean
  }[]
  services?: any[]
} 
