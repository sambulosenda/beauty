import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { users, bookings } from "@/db/schema";
import { eq } from "drizzle-orm";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import React from "react";

export default async function CustomersPage() {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const provider = await db.query.users.findFirst({
    where: eq(users.clerkId, userId),
  });

  if (!provider || provider.role !== "PROVIDER") {
    redirect("/");
  }

  // Get all customers who have made bookings with this provider
  const customers = await db.query.users.findMany({
    where: eq(users.role, "CUSTOMER"),
    with: {
      customerBookings: {
        where: eq(bookings.providerId, provider.id),
      },
    },
  });

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Customers</h2>
      </div>
      <DataTable columns={columns} data={customers} />
    </div>
  );
}
