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
