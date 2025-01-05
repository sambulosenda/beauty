import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { currentUser } from '@clerk/nextjs/server'
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { Stripe } from 'stripe';

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

    // Validate required fields
    if (!amount || !serviceId || !providerId || !date || !time) {
      return NextResponse.json({ 
        error: 'Missing required fields',
        details: { amount, serviceId, providerId, date, time }
      }, { status: 400 });
    }

    // Get the provider's stripe account id
    const provider = await db.query.users.findFirst({
      where: eq(users.id, providerId)
    });

    if (!provider) {
      return NextResponse.json({ error: 'Provider not found' }, { status: 404 });
    }

    if (!provider.stripeConnectAccountId) {
      return NextResponse.json({ error: 'Provider has not connected their Stripe account' }, { status: 400 });
    }

    if (!provider.stripeAccountEnabled) {
      return NextResponse.json({ error: 'Provider\'s Stripe account is not fully set up' }, { status: 400 });
    }

    // Calculate platform fee (20%)
    const platformFee = Math.round(amount * 100 * 0.2);
    const amountInCents = Math.round(amount * 100);

    console.log('Creating payment intent:', {
      amount: amountInCents,
      fee: platformFee,
      provider: provider.id,
      customer: dbUser.id
    });

    // Create a payment intent with the booking details in metadata
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
      application_fee_amount: platformFee,
      transfer_data: {
        destination: provider.stripeConnectAccountId,
      },
      metadata: {
        userId: dbUser.id,
        serviceId,
        providerId,
        bookingDate: date,
        bookingTime: time
      },
    });

    console.log('Payment intent created:', paymentIntent.id);

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Payment intent creation error:', error);
    
    // Handle Stripe errors specifically
    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.statusCode || 500 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create payment intent', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 
