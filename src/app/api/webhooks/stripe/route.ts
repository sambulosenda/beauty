import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { db } from '@/db'
import { bookings, users } from '@/db/schema'
import { eq } from 'drizzle-orm'

export async function POST(req: Request) {
  const body = await req.text()
  const headersList = await headers()
  const signature = headersList.get('stripe-signature') as string
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string

  try {
    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret)

    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object
        await db
          .update(bookings)
          .set({ 
            stripePaymentStatus: 'succeeded',
            status: 'CONFIRMED',
          })
          .where(eq(bookings.stripePaymentIntentId, paymentIntent.id))
        break

      case 'payment_intent.payment_failed':
        const failedPayment = event.data.object
        await db
          .update(bookings)
          .set({ 
            stripePaymentStatus: 'failed',
            status: 'CANCELLED',
          })
          .where(eq(bookings.stripePaymentIntentId, failedPayment.id))
        break

      case 'account.updated': {
        const account = event.data.object
        
        // Update user's Stripe account status
        await db
          .update(users)
          .set({ 
            stripeAccountEnabled: account.charges_enabled,
          })
          .where(eq(users.stripeConnectAccountId, account.id))
        break
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 400 }
    )
  }
}
