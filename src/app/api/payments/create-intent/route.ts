import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { currentUser } from '@clerk/nextjs/server'
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(req: Request) {
  try {
    const user = await currentUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get the user from our database
    const dbUser = await db.query.users.findFirst({
      where: eq(users.clerkId, user.id)
    });

    if (!dbUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const body = await req.json();
    const { amount, serviceId, providerId, date, time } = body;

    // Get the provider's stripe account id
    const provider = await db.query.users.findFirst({
      where: eq(users.id, providerId)
    });

    if (!provider || !provider.stripeConnectAccountId || !provider.stripeAccountEnabled) {
      return NextResponse.json({ error: 'Provider not found or not connected to Stripe' }, { status: 404 });
    }

    // Calculate platform fee (20%)
    const platformFee = Math.round(amount * 100 * 0.2);

    // Create a payment intent with the booking details in metadata
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
      application_fee_amount: platformFee, // Platform fee
      transfer_data: {
        destination: provider.stripeConnectAccountId, // Transfer to provider's connected account
      },
      metadata: {
        userId: dbUser.id, // Use our database user ID
        serviceId,
        providerId,
        bookingDate: date,
        bookingTime: time
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Payment intent creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create payment intent' },
      { status: 500 }
    );
  }
} 
