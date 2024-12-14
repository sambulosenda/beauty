export interface Provider {
  id: string;
  slug: string | null;
  businessName: string | null;
  name: string | null;
  address: string | null;
  logo: string | null;
  createdAt: Date;
  // Add any other relevant fields
} 
