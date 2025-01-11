import React from "react"

interface BusinessInfoProps {
  business: {
    description: string | null

  }
}

export function BusinessInfo({ business }: BusinessInfoProps) {
  return (
    <section className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">About Us</h2>
      <p className="text-gray-600">{business.description}</p>
    </section>
  )
}

