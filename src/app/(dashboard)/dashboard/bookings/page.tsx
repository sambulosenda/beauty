import { Suspense } from 'react';
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { bookings, services, users } from "@/db/schema";
import { and, eq, inArray } from "drizzle-orm";
import { BookingsStats } from "./bookings-stats";
import { ErrorBoundary } from '@/components/error-boundary';
import { BookingsClient } from './bookings-client';

export default async function BookingsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const dbUser = await db
    .select()
    .from(users)
    .where(eq(users.clerkId, userId))
    .then((rows) => rows[0]);

  if (!dbUser) {
    redirect("/onboarding");
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      
      <ErrorBoundary fallback={<div>Error loading stats. Please try again later.</div>}>
        <Suspense fallback={<div>Loading stats...</div>}>
          {/* @ts-expect-error Async Server Component */}
          <BookingsStats userId={dbUser.id} userRole={dbUser.role} />
        </Suspense>
      </ErrorBoundary>

      <BookingsClient 
        initialStatus={typeof searchParams.status === 'string' ? searchParams.status.split(',') : undefined}
        initialPage={typeof searchParams.page === 'string' ? parseInt(searchParams.page, 10) : 1}
      />
    </div>
  );
}
