// app/dashboard/calendar/page.tsx
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { db } from '@/db'
import { users } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { Calendar } from './calendar'

export default async function CalendarPage() {
  const { userId } = await auth()
  if (!userId) {
    redirect('/sign-in')
  }

  const provider = await db.query.users.findFirst({
    where: eq(users.clerkId, userId)
  })

  if (!provider || provider.role !== 'PROVIDER') {
    redirect('/')
  }

  return (
    <div className="flex-1 p-8">
      <h1 className="text-2xl font-bold mb-8">Booking Calendar</h1>
      <Calendar providerId={provider.id} />
    </div>
  )
}