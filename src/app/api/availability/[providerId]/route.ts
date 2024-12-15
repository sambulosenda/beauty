import { NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'
import { db } from '@/db';
import { availability } from '@/db/schema';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ providerId: string }> }
) {
  try {
    const resolvedParams = await params;
    
    const availabilitySettings = await db
      .select({
        dayOfWeek: availability.dayOfWeek,
        isAvailable: availability.isAvailable,
      })
      .from(availability)
      .where(eq(availability.providerId, resolvedParams.providerId));

    return NextResponse.json(availabilitySettings);
  } catch (error) {
    console.error("Error fetching availability:", error);
    return NextResponse.json(
      { error: "Failed to fetch availability" },
      { status: 500 }
    );
  }
} 
