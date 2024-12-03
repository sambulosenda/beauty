import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Beauty Booking Platform</h1>
      <div className="space-x-4">
        <Button>Book Now</Button>
        <Button variant="outline">Learn More</Button>
      </div>
    </main>
  )
}