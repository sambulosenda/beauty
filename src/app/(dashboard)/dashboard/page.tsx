// app/dashboard/page.tsx
import { redirect } from 'next/navigation'
import { db } from '@/db'
import { users } from '@/db/schema'
import { currentUser } from '@clerk/nextjs/server'
import { eq } from 'drizzle-orm'
import { DashboardNav } from '@/components/dashboard/nav'
import { DashboardStats } from '@/components/dashboard/stats'

export default async function DashboardPage() {
  const user = await currentUser()
  if (!user) {
    redirect('/sign-in')
  }

  // Get provider details from database
  const provider = await db.query.users.findFirst({
    where: eq(users.clerkId, user.id)
  })

  if (!provider || provider.role !== 'PROVIDER') {
    redirect('/')
  }

  return (
    <div className="flex min-h-screen">
      <main className="flex-1 p-8 bg-gray-50">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Welcome back, {provider.businessName}</h1>
            <p className="text-gray-500 mt-2">Here's what's happening with your business today.</p>
          </div>

          <DashboardStats providerId={provider.id} />

        
        </div>
      </main>
    </div>
  )
}
