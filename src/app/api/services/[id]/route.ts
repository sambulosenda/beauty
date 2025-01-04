import { NextResponse } from "next/server"
import { db } from "@/db"
import { services, users, availability } from "@/db/schema"
import { eq } from "drizzle-orm"
import { auth } from "@clerk/nextjs/server"


export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;

    // First get the service with provider details
    const service = await db
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
      .where(eq(services.id, resolvedParams.id))
      .then(rows => rows[0]);

    if (!service) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }

    // Then get the availability
    const availabilityData = await db
      .select({
        dayOfWeek: availability.dayOfWeek,
        isAvailable: availability.isAvailable,
      })
      .from(availability)
      .where(eq(availability.providerId, service.providerId));

    // Transform the data to include availability
    const serviceWithAvailability = {
      ...service,
      availableDays: availabilityData
        .filter(a => a.isAvailable)
        .map(a => a.dayOfWeek),
    };

    console.log('Service with availability:', serviceWithAvailability); // Add this log

    return NextResponse.json(serviceWithAvailability);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch service' }, { status: 500 });
  }
}
// Update DELETE handler to use Promise params
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const [deleted] = await db
      .delete(services)
      .where(eq(services.id, id))
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

// Update PATCH handler to use Promise params
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
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
      .where(eq(services.id, id))
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