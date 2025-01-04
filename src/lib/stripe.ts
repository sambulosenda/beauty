import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not set in environment variables");
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-11-20.acacia',
  typescript: true,
});

// Calculate platform fee (commission)
export const calculatePlatformFee = (amount: number): number => {
  // 10% platform fee
  return Math.round(amount * 0.1);
}; 
