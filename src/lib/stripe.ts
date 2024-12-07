import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
  typescript: true,
});

// Calculate platform fee (commission)
export const calculatePlatformFee = (amount: number): number => {
  // 10% platform fee
  return Math.round(amount * 0.1);
}; 
