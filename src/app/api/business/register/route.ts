import { NextResponse } from 'next/server'
import { db } from '@/db'
import { users } from '@/db/schema'
import { auth } from '@clerk/nextjs/server'
import { clerkClient } from '@clerk/nextjs/server'
import { eq } from 'drizzle-orm'

export async function POST(request: Request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await request.json()
    console.log('Received registration data:', data)

    // Update existing user with business details
    const [updated] = await db
      .update(users)
      .set({
        role: 'PROVIDER',
        businessName: data.businessName,
        address: data.address,
        phone: data.phone,
        description: data.description,
      })
      .where(eq(users.clerkId, userId))
      .returning()

    if (!updated) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }



    return NextResponse.json(updated)
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Registration failed' },
      { status: 500 }
    )
  }
} 
