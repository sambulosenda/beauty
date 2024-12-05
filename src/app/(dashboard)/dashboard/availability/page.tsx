// app/dashboard/availability/page.tsx
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { db } from '@/db'
import { users } from '@/db/schema'
import { eq } from 'drizzle-orm'
import AvailabilityForm from './availability-form'

export default async function AvailabilityPage() {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')

  const provider = await db.query.users.findFirst({
    where: eq(users.clerkId, userId)
  })

  if (!provider || provider.role !== 'PROVIDER') redirect('/')

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-8">Manage Availability</h1>
      <AvailabilityForm providerId={provider.id} />
    </div>
  )
}