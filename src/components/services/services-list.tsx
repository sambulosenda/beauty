import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// This is temporary mock data - we'll replace it with real data later
const services = [
  {
    id: 1,
    name: "Hair Cut & Style",
    price: 50,
    duration: 60,
    description: "Professional haircut and styling service"
  },
  {
    id: 2,
    name: "Manicure",
    price: 35,
    duration: 45,
    description: "Classic manicure with polish of your choice"
  },
  {
    id: 3,
    name: "Facial Treatment",
    price: 75,
    duration: 90,
    description: "Rejuvenating facial with premium products"
  }
]

export function ServicesList() {
  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <Card key={service.id}>
          <CardHeader>
            <CardTitle>{service.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">{service.description}</p>
            <div className="mt-4">
              <p className="font-semibold">£{service.price}</p>
              <p className="texsat-sm text-gray-500">{service.duration} minutes</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Book Now</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
