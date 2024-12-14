import { db } from "@/db";
import { users } from "@/db/schema";
import { desc, eq, and, gte } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Fetch top providers (you might want to sort by rating or reviews in the future)
    const providers = await db.query.users.findMany({
      where: eq(users.role, 'PROVIDER'),
      orderBy: [desc(users.createdAt)],
      limit: 8,
    });

    // Fetch new providers (joined in last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const newProviders = await db.query.users.findMany({
      where: and(
        eq(users.role, 'PROVIDER'),
        gte(users.createdAt, thirtyDaysAgo)
      ),
      orderBy: [desc(users.createdAt)],
      limit: 4,
    });

    // Clean up sensitive data before sending
    const cleanProviders = providers.map(provider => ({
      id: provider.id,
      slug: provider.slug,
      businessName: provider.businessName,
      name: provider.name,
      address: provider.address,
      logo: provider.logo,
      createdAt: provider.createdAt,
      // Add any other non-sensitive fields you want to include
    }));

    const cleanNewProviders = newProviders.map(provider => ({
      id: provider.id,
      slug: provider.slug,
      businessName: provider.businessName,
      name: provider.name,
      address: provider.address,
      logo: provider.logo,
      createdAt: provider.createdAt,
      // Add any other non-sensitive fields you want to include
    }));

    return NextResponse.json({
      providers: cleanProviders,
      newProviders: cleanNewProviders,
    });
  } catch (error) {
    console.error('Failed to fetch providers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch providers' },
      { status: 500 }
    );
  }
} 
