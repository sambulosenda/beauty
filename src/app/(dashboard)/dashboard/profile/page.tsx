// src/app/(dashboard)/dashboard/profile/page.tsx
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { db } from '@/db'
import { users } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { EditProfileForm } from './edit-profile-form'

export default async function ProfilePage() {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')

  const user = await db.query.users.findFirst({
    where: eq(users.clerkId, userId)
  })

  if (!user) redirect('/')

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-8">Edit Profile</h1>
      <EditProfileForm initialData={user} />
    </div>
  )
}
