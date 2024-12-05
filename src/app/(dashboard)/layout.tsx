import { redirect } from 'next/navigation'
import { currentUser } from '@clerk/nextjs/server'
import { db } from '@/db'
import { users } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { DashboardNav } from '@/components/dashboard/nav'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
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
      <main className="flex-1 p-8 bg-gray-50">
        {children}
      </main>
    </div>
  )
} 
