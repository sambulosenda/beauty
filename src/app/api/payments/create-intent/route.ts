import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get the user from our database
    const dbUser = await db.query.users.findFirst({
      where: eq(users.clerkId, userId)
    });

    if (!dbUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const body = await req.json();
    const { amount, serviceId, providerId, date, time } = body;

    if (!amount || !serviceId || !providerId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    try {
      // Create a payment intent with the booking details in metadata
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convert to cents
        currency: 'usd',
        automatic_payment_methods: {
          enabled: true,
        },
        metadata: {
          userId: dbUser.id, // Use our database user ID
          serviceId,
          providerId,
          bookingDate: date,
          bookingTime: time
        },
      });

      console.log('Payment intent created:', {
        id: paymentIntent.id,
        amount: paymentIntent.amount,
        metadata: paymentIntent.metadata
      });

      return NextResponse.json({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (stripeError) {
      console.error('Stripe error:', stripeError);
      return NextResponse.json(
        { error: 'Failed to create payment intent with Stripe' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Payment intent creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create payment intent' },
      { status: 500 }
    );
  }
} 
