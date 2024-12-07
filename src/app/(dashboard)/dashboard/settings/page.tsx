import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { db } from '@/db'
import { users } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { StripeConnectButton } from '@/components/payments/stripe-connect-button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default async function SettingsPage() {
  const { userId } = await auth()
  if (!userId) {
    redirect('/sign-in')
  }

  const provider = await db.query.users.findFirst({
    where: eq(users.clerkId, userId),
  })

  if (!provider || provider.role !== 'PROVIDER') {
    redirect('/')
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Payment Settings</CardTitle>
            <CardDescription>
              Connect your Stripe account to start accepting payments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <StripeConnectButton 
              isConnected={!!provider.stripeConnectAccountId}
              accountEnabled={provider.stripeAccountEnabled ?? false}
            />
          </CardContent>
        </Card>
        
        {/* Add other settings cards here */}
      </div>
    </div>
  )
} 
