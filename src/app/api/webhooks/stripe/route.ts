import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { db } from '@/db'
import { bookings, users, services } from '@/db/schema'
import { sendBookingConfirmation } from '@/lib/emails'
import { eq } from 'drizzle-orm'

export async function POST(req: Request) {
  console.log('Webhook received at:', new Date().toISOString())
  
  try {
    const body = await req.text()
    const signature = req.headers.get('stripe-signature')!

    if (!signature) {
      console.error('No stripe signature found')
      return NextResponse.json({ error: 'No signature' }, { status: 400 })
    }

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )

    console.log('Processing webhook event:', event.type)

    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object as any
      console.log('Payment succeeded, metadata:', paymentIntent.metadata)

      const startTime = new Date(paymentIntent.metadata.bookingDate)
      const [hours, minutes] = paymentIntent.metadata.bookingTime.split(':')
      startTime.setHours(parseInt(hours), parseInt(minutes))

      const service = await db.query.services.findFirst({ 
        where: eq(services.id, paymentIntent.metadata.serviceId) 
      })

      if (!service) {
        throw new Error('Service not found')
      }

      const [booking] = await db.insert(bookings).values({
        serviceId: paymentIntent.metadata.serviceId,
        providerId: paymentIntent.metadata.providerId,
        customerId: paymentIntent.metadata.userId,
        startTime,
        endTime: new Date(startTime.getTime() + service.duration * 60000),
        status: 'CONFIRMED',
        stripePaymentIntentId: paymentIntent.id,
      }).returning()

      console.log('Booking created:', booking)

      // Send confirmation email
      const [customer, provider] = await Promise.all([
        db.query.users.findFirst({ where: eq(users.id, booking.customerId) }),
        db.query.users.findFirst({ where: eq(users.id, booking.providerId) }),
      ])

      if (!customer || !provider) {
        throw new Error('Customer or provider not found')
      }

      await sendBookingConfirmation({
        customerEmail: customer.email,
        customerName: customer.name || 'Customer',
        serviceName: service.name,
        date: booking.startTime,
        providerName: provider.name || 'Provider',
        bookingId: booking.id
      })

      console.log('Confirmation email sent')
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 400 }
    )
  }
}
