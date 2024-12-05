// app/api/availability/route.ts
import { NextResponse } from 'next/server'
import { db } from '@/db'
import { availability, users } from '@/db/schema'
import { currentUser } from '@clerk/nextjs/server'
import { eq, and } from 'drizzle-orm'

export async function GET(request: Request) {
  try {
    const user = await currentUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const dbUser = await db.query.users.findFirst({
      where: eq(users.clerkId, user.id)
    })

    if (!dbUser || dbUser.role !== 'PROVIDER') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const availabilitySettings = await db.query.availability.findMany({
      where: eq(availability.providerId, dbUser.id)
    })

    return NextResponse.json(availabilitySettings)
  } catch (error) {
    console.error('Error fetching availability:', error)
    return NextResponse.json(
      { error: 'Failed to fetch availability' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const user = await currentUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const dbUser = await db.query.users.findFirst({
      where: eq(users.clerkId, user.id)
    })

    if (!dbUser || dbUser.role !== 'PROVIDER') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { availability: availabilityData } = await request.json()

    // Delete existing availability settings
    await db.delete(availability).where(eq(availability.providerId, dbUser.id))

    // Insert new availability settings
    const availabilitySettings = await Promise.all(
      Object.entries(availabilityData).map(([day, data]: [string, any]) => {
        if (!data.enabled) return null

        return db.insert(availability).values({
          providerId: dbUser.id,
          dayOfWeek: day,
          startTime: data.start,
          endTime: data.end,
          enabled: data.enabled
        }).returning()
      })
    )

    return NextResponse.json(availabilitySettings.filter(Boolean))
  } catch (error) {
    console.error('Error updating availability:', error)
    return NextResponse.json(
      { error: 'Failed to update availability' },
      { status: 500 }
    )
  }
}