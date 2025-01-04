export interface Booking {
  id: string;
  startTime: string;
  status: string;
  'service.name': string;
  'service.price': number;
  'provider.name': string;
  'provider.businessName': string;
}

export interface BookingsResponse {
  bookings: Booking[];
  totalPages: number;
  currentPage: number;
} 


interface PageProps {
  params: Promise<{ id: string }>
  searchParams: { [key: string]: string | string[] | undefined }
}

export type BookingWithReview = {
  id: string
  startTime: Date
  endTime: Date
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED'
  service: {
    id: string
    name: string
    price: string
    duration: number
  }
  provider: {
    id: string
    name: string | null
    businessName: string | null
  }
  review?: {
    id: string
    rating: number
    comment: string
    createdAt: Date
    customer: {
      name: string | null
    }
  } | null
}
