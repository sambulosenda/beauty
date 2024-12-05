// app/page.tsx
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Sparkles, Clock, Shield, CheckCircle, Star, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-white to-gray-50 overflow-hidden border-b border-gray-100">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 right-0 h-96 w-96 -translate-y-1/2 translate-x-1/2 rounded-full bg-rose-100/20 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 h-96 w-96 translate-y-1/2 -translate-x-1/2 rounded-full bg-rose-50/20 blur-3xl"></div>
          </div>
          
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-8 text-center">
              <div className="inline-block rounded-full bg-rose-50 px-4 py-1.5">
                <span className="text-sm font-medium text-rose-600">
                  Beauty Services Made Simple
                </span>
              </div>
              
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none max-w-3xl mx-auto">
                  Your Beauty Journey <span className="text-rose-600 inline-block">Starts Here</span>
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl dark:text-gray-400 leading-relaxed">
                  Connect with top beauty professionals. Book appointments instantly and experience the best in beauty services.
                </p>
              </div>
              
              <div className="flex flex-col items-center space-y-4">
                <div className="flex items-center space-x-8 text-sm text-gray-600">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>1000+ Professionals</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-400 mr-2" />
                    <span>4.9/5 Rating</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-blue-500 mr-2" />
                    <span>10k+ Happy Clients</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                <Link href="/services" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full bg-rose-600 hover:bg-rose-700">
                    Browse Services
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/providers" className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="w-full">
                    View Providers
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works section */}
        <section className="w-full py-12 md:py-24 bg-white border-b border-gray-100">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                How It Works
              </h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl">
                Book your beauty service in three simple steps
              </p>
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-3 relative">
              {/* Step 1 */}
              <div className="flex flex-col items-center text-center relative bg-white p-8 rounded-2xl border border-gray-100 hover:border-rose-100 transition-all">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-rose-100 text-rose-600 font-bold text-2xl">
                  1
                </div>
                <h3 className="mt-6 text-xl font-semibold">Browse Services</h3>
                <p className="mt-2 text-gray-600 max-w-[250px]">
                  Explore our curated selection of beauty services and find the perfect match
                </p>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center text-center relative bg-white p-8 rounded-2xl border border-gray-100 hover:border-rose-100 transition-all">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-rose-100 text-rose-600 font-bold text-2xl">
                  2
                </div>
                <h3 className="mt-6 text-xl font-semibold">Choose Your Time</h3>
                <p className="mt-2 text-gray-600 max-w-[250px]">
                  Select your preferred date and time slot that works best for you
                </p>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center text-center relative bg-white p-8 rounded-2xl border border-gray-100 hover:border-rose-100 transition-all">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-rose-100 text-rose-600 font-bold text-2xl">
                  3
                </div>
                <h3 className="mt-6 text-xl font-semibold">Get Beautiful</h3>
                <p className="mt-2 text-gray-600 max-w-[250px]">
                  Enjoy your professional beauty service and feel amazing
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials section */}
        <section className="w-full py-12 md:py-24 bg-gray-50 border-b border-gray-100">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Loved by Clients
              </h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl">
                Join thousands of satisfied customers who love our service
              </p>
            </div>
            
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {/* Testimonial 1 */}
              <blockquote className="rounded-2xl border border-gray-100 p-8 hover:border-rose-100 transition-colors">
                <div className="flex items-center gap-4">
                  <img
                    alt="Sarah Johnson"
                    src="https://randomuser.me/api/portraits/women/1.jpg"
                    className="h-12 w-12 rounded-full object-cover border-2 border-rose-100"
                  />
                  <div>
                    <p className="font-semibold">Sarah Johnson</p>
                    <p className="text-sm text-gray-500">Regular Client</p>
                  </div>
                </div>
                <div className="mt-4 flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-4 text-gray-600 leading-relaxed">
                  "The booking experience was seamless, and the service exceeded my expectations. 
                  Highly recommend!"
                </p>
              </blockquote>

              {/* Testimonial 2 */}
              <blockquote className="rounded-2xl border border-gray-100 p-8 hover:border-rose-100 transition-colors">
                <div className="flex items-center gap-4">
                  <img
                    alt="Emily Chen"
                    src="https://randomuser.me/api/portraits/women/2.jpg"
                    className="h-12 w-12 rounded-full object-cover border-2 border-rose-100"
                  />
                  <div>
                    <p className="font-semibold">Emily Chen</p>
                    <p className="text-sm text-gray-500">Beauty Enthusiast</p>
                  </div>
                </div>
                <div className="mt-4 flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-4 text-gray-600 leading-relaxed">
                  "Found my go-to beauty salon through this platform. The quality of service is consistently excellent!"
                </p>
              </blockquote>

              {/* Testimonial 3 */}
              <blockquote className="rounded-2xl border border-gray-100 p-8 hover:border-rose-100 transition-colors">
                <div className="flex items-center gap-4">
                  <img
                    alt="Maria Garcia"
                    src="https://randomuser.me/api/portraits/women/3.jpg"
                    className="h-12 w-12 rounded-full object-cover border-2 border-rose-100"
                  />
                  <div>
                    <p className="font-semibold">Maria Garcia</p>
                    <p className="text-sm text-gray-500">First-time Client</p>
                  </div>
                </div>
                <div className="mt-4 flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-4 text-gray-600 leading-relaxed">
                  "Amazing first experience! The booking process was easy and the service was professional."
                </p>
              </blockquote>

              {/* Testimonial 4 */}
              <blockquote className="rounded-2xl border border-gray-100 p-8 hover:border-rose-100 transition-colors">
                <div className="flex items-center gap-4">
                  <img
                    alt="Jessica Williams"
                    src="https://randomuser.me/api/portraits/women/4.jpg"
                    className="h-12 w-12 rounded-full object-cover border-2 border-rose-100"
                  />
                  <div>
                    <p className="font-semibold">Jessica Williams</p>
                    <p className="text-sm text-gray-500">Monthly Subscriber</p>
                  </div>
                </div>
                <div className="mt-4 flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-4 text-gray-600 leading-relaxed">
                  "Been using this service for months now. The convenience and quality keep me coming back!"
                </p>
              </blockquote>
            </div>
          </div>
        </section>

        {/* Add a CTA section before footer */}
        <section className="w-full py-12 md:py-24 bg-rose-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Get Started?
              </h2>
              <p className="max-w-[700px] text-gray-600 md:text-xl">
                Join thousands of satisfied customers who have transformed their beauty routine
              </p>
              <Button size="lg" className="mt-6 bg-rose-600 hover:bg-rose-700">
                Book Your First Appointment
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
