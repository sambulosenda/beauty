export interface Provider {
  id: string
  name: string
  businessName: string | null
  description: string | null
  image?: string
  }
  
  export interface Service {
    id: string;
    name: string;
    description: string | null;
    price: string;
    duration: number;
    category: string;
    image: string | null;
    providerId: string;
    provider: Provider;
    availableDays: string[];
  }

  export interface Booking {
    id: string;
    startTime: Date;
    endTime: Date;
    status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
    service: {
      id: string;
      name: string;
      price: string;
      duration: number;
    };
    provider: {
      id: string;
      name: string | null;
      businessName: string | null;
    };
  }

  export interface BookingFormProps {
    service: {
      id: string
      name: string
      price: string
      duration: number
      providerId: string
    }
  }
  

  