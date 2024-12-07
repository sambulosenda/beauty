import { NextResponse } from 'next/server';
import { stripe, calculatePlatformFee } from '@/lib/stripe';
import { db } from '@/db';
import { bookings, users } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(request: Request) {
  try {
    const { bookingId } = await request.json();

    // Get booking details with service and provider info
    const booking = await db.query.bookings.findFirst({
      where: eq(bookings.id, bookingId),
      with: {
        service: true,
        provider: true,
      },
    });

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    // Get or create Stripe account for the provider
    let provider = await db.query.users.findFirst({
      where: eq(users.id, booking.providerId),
    });

    if (!provider?.stripeConnectAccountId) {
      return NextResponse.json(
        { error: 'Provider not setup for payments' },
        { status: 400 }
      );
    }

    const amount = Math.round(parseFloat(booking.service.price) * 100);
    const platformFee = calculatePlatformFee(amount);

    // Create a payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      application_fee_amount: platformFee,
      transfer_data: {
        destination: provider.stripeConnectAccountId,
      },
      metadata: {
        bookingId: booking.id,
        serviceId: booking.service.id,
        providerId: booking.providerId,
      },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Payment intent creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create payment intent' },
      { status: 500 }
    );
  }
} 
