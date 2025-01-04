import { NextResponse } from 'next/server'
import { db } from '@/db'
import { users, services } from '@/db/schema'
import { eq } from 'drizzle-orm'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    // Await the params to get the slug
    const { slug } = await params
    
    const business = await db.query.users.findFirst({
      where: eq(users.slug, slug),
      columns: {
        id: true,
        name: true,
        slug: true,
        clerkId: true,
        role: true,
        email: true,
        businessName: true,
        description: true,
        address: true,
        phone: true,
        logo: true,
        gallery: true,
        rating: true,
        reviewCount: true,
      },
      with: {
        availability: {
          columns: {
            dayOfWeek: true,
            startTime: true,
            endTime: true,
            isAvailable: true,
          },
        },
      },
    })

    if (!business || business.role !== 'PROVIDER') {
      return NextResponse.json(
        { error: 'Business not found' },
        { status: 404 }
      )
    }

    // Fetch services for this business
    const businessServices = await db.query.services.findMany({
      where: eq(services.providerId, business.id),
    })

    return NextResponse.json({
      business,
      services: businessServices
    })
  } catch (error) {
    console.error('Error fetching business:', error)
    return NextResponse.json(
      { error: 'Failed to fetch business data' },
      { status: 500 }
    )
  }
}