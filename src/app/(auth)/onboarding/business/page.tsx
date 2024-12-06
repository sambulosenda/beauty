import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/db'
import { users } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { BusinessOnboardingForm } from '@/components/onboarding/business-form'

export default async function BusinessOnboardingPage() {
  const { userId } = await auth()
  if (!userId) {
    redirect('/sign-in')
  }

  // Check if user has already completed onboarding
  const existingUser = await db.query.users.findFirst({
    where: eq(users.clerkId, userId)
  })

  if (existingUser?.role === 'PROVIDER') {
    redirect('/dashboard')
  }

  return (
    <div className="max-w-2xl mx-auto p-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Complete Your Business Profile</h1>
          <p className="text-gray-500 mt-2">
            Tell us more about your business to get started
          </p>
        </div>
        <BusinessOnboardingForm />
      </div>
    </div>
  )
} 
