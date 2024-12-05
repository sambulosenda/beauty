export interface Provider {
    id: string;
    name: string | null;
    businessName: string | null;
    description: string | null;
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