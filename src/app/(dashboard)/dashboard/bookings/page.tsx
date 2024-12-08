import { Suspense } from 'react';
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { bookings, services, users } from "@/db/schema";
import { and, eq, inArray } from "drizzle-orm";
import { BookingsList } from "./bookings-list";
import { BookingsFilter } from "./bookings-filter";
import { BookingsStats } from "./bookings-stats";
import { ErrorBoundary } from '@/components/error-boundary';

export default async function BookingsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const page = typeof searchParams.page === 'string' ? parseInt(searchParams.page, 10) : 1;
  const limit = 10;
  const offset = (page - 1) * limit;

  const statusFilter = typeof searchParams.status === 'string' 
    ? searchParams.status.split(',') 
    : undefined;

  try {
    // Fetch user data
    const dbUser = await db
      .select()
      .from(users)
      .where(eq(users.clerkId, userId))
      .then((rows) => rows[0]);

    if (!dbUser) {
      redirect("/onboarding");
    }

    // Prepare the where clause for bookings query
    const whereClause = [
      dbUser.role === 'PROVIDER' 
        ? eq(bookings.providerId, dbUser.id)
        : eq(bookings.customerId, dbUser.id)
    ];

    if (statusFilter) {
      whereClause.push(inArray(bookings.status, statusFilter as Array<"PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED">));
    }

    // Fetch bookings with pagination and filtering
    const userBookings = await db
      .select({
        id: bookings.id,
        startTime: bookings.startTime,
        status: bookings.status,
        'service.name': services.name,
        'service.price': services.price,
        'provider.name': users.name,
        'provider.businessName': users.businessName
      })
      .from(bookings)
      .innerJoin(services, eq(bookings.serviceId, services.id))
      .innerJoin(users, eq(bookings.providerId, users.id))
      .where(and(...whereClause))
      .orderBy(bookings.startTime)
      .limit(limit)
      .offset(offset);

    // Count total bookings for pagination
    const totalBookings = await db
      .select({ count: bookings.id })
      .from(bookings)
      .where(and(...whereClause))
      .then((result) => result[0]?.count || 0);

    const totalPages = Math.ceil(Number(totalBookings) / limit);

    return (
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <BookingsFilter initialStatus={statusFilter} />
        </div>
        
        <ErrorBoundary fallback={<div>Error loading stats. Please try again later.</div>}>
          <Suspense fallback={<div>Loading stats...</div>}>
            {/* @ts-expect-error Async Server Component */}
            <BookingsStats userId={dbUser.id} userRole={dbUser.role} />
          </Suspense>
        </ErrorBoundary>

        <ErrorBoundary fallback={<div>Error loading bookings. Please try again later.</div>}>
          <Suspense fallback={<div>Loading bookings...</div>}>
            <BookingsList 
              bookings={userBookings} 
              currentPage={page} 
              totalPages={totalPages}
              statusFilter={statusFilter}
            />
          </Suspense>
        </ErrorBoundary>
      </div>
    );
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return <div>An error occurred while fetching your bookings. Please try again later.</div>;
  }
}
