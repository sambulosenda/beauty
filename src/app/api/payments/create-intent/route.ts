import { NextResponse } from 'next/server';
import { stripe, calculatePlatformFee } from '@/lib/stripe';
import { db } from '@/db';
import { bookings, users } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(request: Request) {
  try {
    const { bookingId } = await request.json();
    
    // Get booking with service details
    const booking = await db.query.bookings.findFirst({
      where: eq(bookings.id, bookingId),
      with: {
        service: true,
        provider: true,
        customer: true,
      },
    });

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    // Ensure provider has Stripe account
    if (!booking.provider.stripeConnectAccountId) {
      return NextResponse.json(
        { error: 'Provider not setup for payments' },
        { status: 400 }
      );
    }

    // Calculate amount and fee
    const amount = Math.round(parseFloat(booking.service.price) * 100);
    const platformFee = calculatePlatformFee(amount);

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      application_fee_amount: platformFee,
      transfer_data: {
        destination: booking.provider.stripeConnectAccountId,
      },
      metadata: {
        bookingId: booking.id,
        providerId: booking.providerId,
        customerId: booking.customerId,
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    // Update booking with payment intent ID
    await db
      .update(bookings)
      .set({ 
        stripePaymentIntentId: paymentIntent.id,
        stripePaymentStatus: 'processing',
        amount: booking.service.price,
      })
      .where(eq(bookings.id, bookingId));

    return NextResponse.json({ 
      clientSecret: paymentIntent.client_secret 
    });
  } catch (error) {
    console.error('Payment intent creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create payment intent' },
      { status: 500 }
    );
  }
} 
