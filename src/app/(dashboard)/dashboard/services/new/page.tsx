// app/dashboard/services/new/page.tsx
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { db } from '@/db'
import { users } from '@/db/schema'
import { eq } from 'drizzle-orm'
import ServiceForm from './service-form'

export default async function NewServicePage() {
  const { userId } = await auth()
  if (!userId) {
    redirect('/sign-in')
  }

  const provider = await db.query.users.findFirst({
    where: eq(users.clerkId, userId)
  })

  if (!provider || provider.role !== 'PROVIDER') {
    redirect('/')
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-8">Add New Service</h1>
      <ServiceForm providerId={provider.id} />
    </div>
  )
}