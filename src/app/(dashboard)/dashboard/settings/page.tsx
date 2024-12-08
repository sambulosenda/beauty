import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { db } from '@/db'
import { users } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { StripeConnectButton } from '@/components/payments/stripe-connect-button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { stripe } from "@/lib/stripe"

export default async function SettingsPage() {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')

  const user = await db.query.users.findFirst({
    where: eq(users.clerkId, userId),
  })

  if (!user) redirect('/')

  // Get Stripe account status
  let isConnected = false
  let accountEnabled = false
  
  if (user.stripeConnectAccountId) {
    try {
      const account = await stripe.accounts.retrieve(user.stripeConnectAccountId)
      isConnected = true
      accountEnabled = account.charges_enabled && account.details_submitted
    } catch (error) {
      console.error('Error fetching Stripe account:', error)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Payment Settings</CardTitle>
          <CardDescription>
            {!isConnected 
              ? 'Connect your Stripe account to start accepting payments'
              : !accountEnabled 
                ? 'Complete your Stripe account setup to start accepting payments'
                : 'Your Stripe account is fully configured'
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <StripeConnectButton 
            isConnected={isConnected} 
            accountEnabled={accountEnabled} 
          />
        </CardContent>
      </Card>
    </div>
  )
} 

