import { NextResponse } from 'next/server'
import { db } from '@/db'
import { users } from '@/db/schema'
import { auth } from '@clerk/nextjs/server'
import { eq } from 'drizzle-orm'
import slugify from 'slugify'

export async function POST(request: Request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await request.json()
    
    // Generate slug from business name
    let slug = slugify(data.businessName, { lower: true })
    
    // Check if slug exists and append number if needed
    let slugExists = true
    let counter = 0
    let finalSlug = slug
    
    while (slugExists) {
      const existing = await db.query.users.findFirst({
        where: eq(users.slug, finalSlug)
      })
      if (!existing) {
        slugExists = false
      } else {
        counter++
        finalSlug = `${slug}-${counter}`
      }
    }

    // Update user with business details and slug
    const [updated] = await db
      .update(users)
      .set({
        role: 'PROVIDER',
        businessName: data.businessName,
        slug: finalSlug,
        address: data.address,
        phone: data.phone,
        description: data.description,
      })
      .where(eq(users.clerkId, userId))
      .returning()

    return NextResponse.json(updated)
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Registration failed' },
      { status: 500 }
    )
  }
} 
