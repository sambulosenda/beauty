// app/services/page.tsx
import { db } from '@/db'
import { ServicesList } from '@/components/services/services-list'

export default async function ServicesPage() {
  const servicesWithProvider = await db.query.services.findMany({
    with: {
      provider: true
    },
    orderBy: (services, { desc }) => [desc(services.createdAt)]
  })

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-7xl mx-auto px-4 py-8">
        <ServicesList initialServices={servicesWithProvider} />
      </main>
    </div>
  )
}
