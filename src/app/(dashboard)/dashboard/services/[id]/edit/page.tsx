import { notFound, redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/db'
import { services } from '@/db/schema'
import { eq } from 'drizzle-orm'
import ServiceForm from '../../new/service-form'
import React from 'react'

interface EditServicePageProps {
  params: Promise<{
    id: string
  }>
}

export default async function EditServicePage({ params }: EditServicePageProps) {
  // Await the params to get the id
  const { id } = await params
  
  const { userId } = await auth()
  if (!userId) {
    redirect('/sign-in')
  }

  const service = await db.query.services.findFirst({
    where: eq(services.id, id)
  })

  if (!service) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-8">Edit Service</h1>
      <ServiceForm
        providerId={service.providerId}
        initialData={{
          name: service.name,
          description: service.description || '',
          price: service.price,
          duration: service.duration.toString(),
          category: service.category,
          image: service.image || '',
        }}
        serviceId={service.id}
      />
    </div>
  )
}