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
      <DashboardNav />
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <div className="mt-4">
          <DashboardStats providerId={provider.id} />
        </div>
      </main>
    </div>
  )
}