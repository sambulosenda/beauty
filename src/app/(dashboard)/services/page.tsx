import { ServicesList } from "@/components/services/services-list"

export default function ServicesPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Beauty Services</h1>
      </div>
      <ServicesList />
    </div>
  )
}