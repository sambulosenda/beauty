import { NextResponse } from 'next/server'
import { db } from '@/db'
import { users } from '@/db/schema'
import { auth } from '@clerk/nextjs/server'
import { eq } from 'drizzle-orm'

export async function PUT(request: Request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { images } = await request.json()
    
    const [updated] = await db
      .update(users)
      .set({ gallery: images })
      .where(eq(users.clerkId, userId))
      .returning()

    return NextResponse.json(updated)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update gallery' },
      { status: 500 }
    )
  }
} 
