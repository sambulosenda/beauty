// app/api/bookings/check/route.ts
import { NextResponse } from 'next/server'
import { db } from '@/db'
import { bookings } from '@/db/schema'
import { eq, and, gte, lte } from 'drizzle-orm'
import { startOfDay, endOfDay } from 'date-fns'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const providerId = searchParams.get('providerId')
    const date = searchParams.get('date')

    if (!providerId || !date) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      )
    }

    const checkDate = new Date(date)
    
    const existingBookings = await db
      .select()
      .from(bookings)
      .where(
        and(
          eq(bookings.providerId, providerId),
          gte(bookings.startTime, startOfDay(checkDate)),
          lte(bookings.startTime, endOfDay(checkDate))
        )
      )

    return NextResponse.json(existingBookings)
  } catch (error) {
    console.error('Error checking bookings:', error)
    return NextResponse.json(
      { error: 'Failed to check bookings' },
      { status: 500 }
    )
  }
}