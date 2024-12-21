import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { db } from "@/db";
import { users } from '@/db/schema'
import { eq } from 'drizzle-orm'

export async function GET(
  request: Request,
  { params }: { params: { providerId: string } }
) {
  try {
    // Get the provider's stripe account ID from the database
    const [provider] = await db
      .select({ stripe_account_id: users.stripeConnectAccountId })
      .from(users)
      .where(eq(users.id, params.providerId))
      .execute();

    if (!provider?.stripe_account_id) {
      return NextResponse.json(
        { isConnected: false, accountEnabled: false },
        { status: 200 }
      );
    }

    // Get the account details from Stripe
    const account = await stripe.accounts.retrieve(provider.stripe_account_id);

    return NextResponse.json(
      {
        isConnected: true,
        accountEnabled: account.charges_enabled && account.details_submitted,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error checking stripe status:", error);
    return NextResponse.json(
      { error: "Failed to check provider stripe status" },
      { status: 500 }
    );
  }
} 
