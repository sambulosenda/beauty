import { NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'
import { db } from '@/db'
import { users } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { stripe } from '@/lib/stripe'

export async function POST(request: Request) {
  try {
    const clerkUser = await currentUser()
    if (!clerkUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get provider
    const provider = await db.query.users.findFirst({
      where: eq(users.clerkId, clerkUser.id),
    })

    if (!provider || provider.role !== 'PROVIDER') {
      return NextResponse.json(
        { error: 'Only providers can connect Stripe' },
        { status: 403 }
      )
    }

    // Create Stripe Connect account for provider
    const account = await stripe.accounts.create({
      type: 'standard',
      email: provider.email,
      metadata: {
        userId: provider.id
      }
    })

    await db.update(users)
      .set({ stripeConnectAccountId: account.id })
      .where(eq(users.id, provider.id))

    // Create account link for onboarding
    const accountLink = await stripe.accountLinks.create({
      account: account.id,
      refresh_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/settings?tab=payments`,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/settings?tab=payments&success=true`,
      type: 'account_onboarding',
    })

    return NextResponse.json({ url: accountLink.url })
  } catch (error) {
    console.error('Stripe Connect setup failed:', error)
    return NextResponse.json(
      { error: 'Unable to setup payment account' },
      { status: 500 }
    )
  }
} 
