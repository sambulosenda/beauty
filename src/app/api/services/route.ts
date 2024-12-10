// app/api/services/route.ts
import { NextResponse } from 'next/server'
import { db } from '@/db'
import { services, users } from '@/db/schema'
import { currentUser } from '@clerk/nextjs/server'
import { eq, like, or, and } from 'drizzle-orm'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')
    const location = searchParams.get('location')

    let query = db.query.services.findMany({
      with: {
        provider: {
          columns: {
            id: true,
            name: true,
            businessName: true,
            address: true
          }
        }
      },
      where: search ? 
        or(
          like(services.name, `%${search}%`),
          like(services.description, `%${search}%`)
        ) : undefined
    })

    const allServices = await query
    return NextResponse.json(allServices)
  } catch (error) {
    console.error('Error fetching services:', error)
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 })
  }
}

export async function POST(req: Request) {
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

    const { name, description, price, duration, category, image, providerId } = await req.json()

    const service = await db.insert(services).values({
      name,
      description,
      price,
      duration,
      category,
      providerId,
      image
    }).returning()

    return NextResponse.json(service)
  } catch (error) {
    console.error('Error creating service:', error)
    return NextResponse.json({ error: 'Failed to create service' }, { status: 500 })
  }
}
