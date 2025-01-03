import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { GalleryClient } from './gallery-client'
import { db } from '@/db'
import { users } from '@/db/schema'
import { eq } from 'drizzle-orm'
import React from 'react'

export default async function GalleryPage() {
  const { userId } = await auth()
  if (!userId) {
    redirect('/sign-in')
  }

  const user = await db.query.users.findFirst({
    where: eq(users.clerkId, userId),
    columns: {
      id: true,
      gallery: true,
    }
  })

  if (!user) {
    redirect('/')
  }

  // Only pass the initial data, no functions
  return <GalleryClient initialGallery={user.gallery || []} />
} 
