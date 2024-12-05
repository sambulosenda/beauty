// app/api/services/route.ts
import { NextResponse } from 'next/server'
import { db } from '@/db'
import { services, users } from '@/db/schema'
import { currentUser } from '@clerk/nextjs/server'
import { eq } from 'drizzle-orm'

export async function GET() {
  try {
    const allServices = await db.query.services.findMany({
      with: {
        provider: true
      }
    })
    return NextResponse.json(allServices)
  } catch (error) {
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

    const data = await req.json()
    const { name, description, price, duration, category } = data

    const [service] = await db.insert(services).values({
      name,
      description,
      price,
      duration,
      category,
      providerId: dbUser.id
    }).returning()

    return NextResponse.json(service)
  } catch (error) {
    console.error('Error creating service:', error)
    return NextResponse.json({ error: 'Failed to create service' }, { status: 500 })
  }
}