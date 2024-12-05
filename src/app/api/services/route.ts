// app/api/services/route.ts
import { NextResponse } from 'next/server'
import { db } from '@/db'
import { services } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { currentUser } from '@clerk/nextjs/server'

export async function GET() {
  try {
    const allServices = await db.query.services.findMany()
    return NextResponse.json(allServices)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const user = await currentUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await request.json()
    const { name, description, price, duration, category } = data

    const service = await db.insert(services).values({
      name,
      description,
      price,
      duration,
      providerId: user.id,
      category
    }).returning()

    return NextResponse.json(service[0])
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create service' }, { status: 500 })
  }
}