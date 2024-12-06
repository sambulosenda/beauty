import { NextResponse } from 'next/server'
import { db } from '@/db'
import { availability } from '@/db/schema'
import { eq } from 'drizzle-orm'

export async function GET(
  req: Request,
  { params }: { params: { providerId: string } }
) {
  try {
    const availabilitySettings = await db
      .select({
        id: availability.id,
        dayOfWeek: availability.dayOfWeek,
        startTime: availability.startTime,
        endTime: availability.endTime,
        isAvailable: availability.isAvailable,
      })
      .from(availability)
      .where(eq(availability.providerId, params.providerId))

    return NextResponse.json(availabilitySettings)
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json([], { status: 200 }) // Return empty array instead of error
  }
} 
