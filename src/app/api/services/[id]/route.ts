import { NextResponse } from "next/server"
import { db } from "@/db"
import { services, users } from "@/db/schema"
import { eq } from "drizzle-orm"
import { auth } from "@clerk/nextjs/server"


export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const serviceData = await db
      .select({
        id: services.id,
        name: services.name,
        description: services.description,
        price: services.price,
        duration: services.duration,
        category: services.category,
        image: services.image,
        providerId: services.providerId,
        provider: {
          id: users.id,
          name: users.name,
          businessName: users.businessName,
          description: users.description
        }
      })
      .from(services)
      .innerJoin(users, eq(users.id, services.providerId))
      .where(eq(services.id, params.id))
      .then(rows => rows[0])

    if (!serviceData) {
      return NextResponse.json(
        { error: 'Service not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(serviceData)
  } catch (error) {
    console.error('Error fetching service:', error)
    return NextResponse.json(
      { error: 'Failed to fetch service' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const [deleted] = await db
      .delete(services)
      .where(eq(services.id, params.id))
      .returning()

    return NextResponse.json(deleted)
  } catch (error) {
    console.error("Error deleting service:", error)
    return NextResponse.json(
      { error: "Failed to delete service" },
      { status: 500 }
    )
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    
    const [updated] = await db
      .update(services)
      .set({
        name: body.name,
        description: body.description,
        price: body.price,
        duration: body.duration,
        category: body.category,
        image: body.image,
      })
      .where(eq(services.id, params.id))
      .returning()

    return NextResponse.json(updated)
  } catch (error) {
    console.error("Error updating service:", error)
    return NextResponse.json(
      { error: "Failed to update service" },
      { status: 500 }
    )
  }
}
