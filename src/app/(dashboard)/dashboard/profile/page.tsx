// src/app/(dashboard)/dashboard/profile/page.tsx
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { db } from '@/db'
import { users } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { EditProfileForm } from './edit-profile-form'
import React from 'react'

export default async function ProfilePage() {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')

  const user = await db.query.users.findFirst({
    where: eq(users.clerkId, userId)
  })

  if (!user) redirect('/')

      // Transform the database user object to match EditProfileForm's expected shape
  const formattedUser = {
    name: user.name || "", // Convert null to empty string
    businessName: user.businessName || undefined,
    description: user.description || undefined,
    address: user.address || undefined,
    phone: user.phone || undefined,
    logo: user.logo || undefined,
    role: user.role, // This is already non-nullable from your schema
  }


  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-8">Edit Profile</h1>
      <EditProfileForm initialData={formattedUser} />
    </div>
  )
}
