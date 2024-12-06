// app/api/availability/route.ts
import { NextResponse } from 'next/server'
import { db } from '@/db'
import { availability, users } from '@/db/schema'
import { currentUser } from '@clerk/nextjs/server'
import { eq, and } from 'drizzle-orm'
import { auth } from '@clerk/nextjs/server'

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
    const { providerId, availabilityData } = await request.json()
    console.log('Received data:', { providerId, availabilityData })

    // Delete existing availability
    await db
      .delete(availability)
      .where(eq(availability.providerId, providerId))

    if (!availabilityData || availabilityData.length === 0) {
      return NextResponse.json([])
    }

    // Insert new availability settings
    const newSettings = await db
      .insert(availability)
      .values(
        availabilityData.map((setting: any) => ({
          providerId,
          dayOfWeek: setting.dayOfWeek,
          startTime: setting.startTime,
          endTime: setting.endTime,
          isAvailable: true
        }))
      )
      .returning()

    return NextResponse.json(newSettings)
  } catch (error) {
    console.error('API Error saving availability:', error)
    return NextResponse.json(
      { error: 'Failed to save availability' },
      { status: 500 }
    )
  }
}
