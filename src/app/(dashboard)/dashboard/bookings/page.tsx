import { Suspense } from 'react';
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { BookingsStats } from "./bookings-stats";
import { ErrorBoundary } from '@/components/error-boundary';
import { BookingsClient } from './bookings-client';
import React from 'react';

// Define the page props interface
interface SearchParams {
  status?: string;
  page?: string;
}

interface PageProps {
  searchParams: SearchParams;
}

const parseStatus = (status: string | undefined) => 
  status ? status.split(',') : undefined;

const parsePage = (page: string | undefined) => {
  const parsed = page ? parseInt(page, 10) : 1;
  return isNaN(parsed) ? 1 : parsed;
};

export default async function BookingsPage({ searchParams }: PageProps) {
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
          <BookingsStats userId={dbUser.id} userRole={dbUser.role} />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary fallback={<div>Error loading bookings. Please try again later.</div>}>
        <Suspense fallback={<div>Loading bookings...</div>}>
          <BookingsClient
            initialStatus={parseStatus(searchParams.status)}
            initialPage={parsePage(searchParams.page)}
          />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
