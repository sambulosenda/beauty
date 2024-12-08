import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { db } from '@/db'
import { users } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { CalendarView } from './calendar-view'
import { Spinner } from '@/components/ui/spinner'

// Define a type for the provider
type Provider = {
  id: string;
  role: string;
  // Add other relevant fields
};

export default async function CalendarPage() {
  const { userId } = await auth()
  if (!userId) {
    redirect('/sign-in')
  }

  let provider: Provider | null = null;

  try {
    provider = await db.query.users.findFirst({
      where: eq(users.clerkId, userId)
    }) as Provider | null;
  } catch (error) {
    console.error('Error fetching provider:', error);
    // Handle the error appropriately, maybe show an error message
    return <div>Error loading calendar. Please try again later.</div>;
  }

  if (!provider || provider.role !== 'PROVIDER') {
    redirect('/')
  }

  return (
    <div className="flex-1 p-8">
      <h1 className="text-2xl font-bold mb-8">Booking Calendar</h1>
      {provider ? (
        <CalendarView providerId={provider.id} />
      ) : (
        <Spinner />
      )}
    </div>
  )
}

