// app/dashboard/services/page.tsx
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { services, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import React from "react";

export default async function ServicesPage() {
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

  const providerServices = await db.query.services.findMany({
    where: eq(services.providerId, provider.id),
    with: {
      provider: true,
    },
  });

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Services</h2>
        <Link href="/dashboard/services/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add New Service
          </Button>
        </Link>
      </div>
      <DataTable columns={columns} data={providerServices} />
    </div>
  );
}
