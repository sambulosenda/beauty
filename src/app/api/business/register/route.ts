import { NextResponse } from 'next/server'
import { db } from '@/db'
import { users } from '@/db/schema'
import { auth } from '@clerk/nextjs/server'
import { clerkClient } from '@clerk/nextjs/server'

export async function POST(request: Request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await request.json()
    console.log('Received registration data:', data) // Debug log

    const client = await clerkClient()


    const user = await client.users.getUser(userId)
    const [business] = await db.insert(users).values({
      clerkId: userId,
      name: user.firstName || '',
      email: user.emailAddresses[0].emailAddress,
      role: 'PROVIDER',
      businessName: data.businessName,
      address: data.address,
      phone: data.phone,
      description: data.description,
    }).returning()

    console.log('Created business:', business) // Debug log
    return NextResponse.json(business)
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Registration failed' },
      { status: 500 }
    )
  }
} 
