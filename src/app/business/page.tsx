import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle, ArrowRight, Star, Users, Calendar, Zap } from 'lucide-react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'List Your Beauty Business | AfroGlow',
  description: 'Join our platform and connect with clients looking for your beauty expertise. Manage bookings, payments, and grow your business.',
}

export default function BusinessLandingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Solid Background */}
      <section className="relative bg-rose-500">
        <div className="absolute inset-0 bg-black/20" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6">
                <span className="text-white/90 text-sm font-medium">
                  Join 500+ Beauty Professionals
                </span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                Transform Your Beauty Business
                <span className="text-amber-300">.</span>
              </h1>
              
              <p className="mt-6 text-xl text-white/80 max-w-xl">
                Streamline bookings, payments, and client management. All in one powerful platform.
              </p>
              
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link href="/business-signup">
                  <Button size="lg" className="w-full sm:w-auto bg-white text-rose-600 hover:bg-gray-100">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="w-full sm:w-auto bg-white text-rose-600 hover:bg-gray-100"
                >
                  Watch Demo
                </Button>
              </div>
            </div>
            
            {/* Hero Image/Mockup */}
            <div className="flex-1 relative">
              <div className="relative w-full aspect-square max-w-md mx-auto">
                <Image
                  src="/images/business-hero.png" // Add your dashboard preview image
                  alt="Dashboard Preview"
                  fill
                  className="object-cover rounded-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section with Cards */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { number: '10K+', label: 'Active Clients', icon: Users },
              { number: '500+', label: 'Beauty Pros', icon: Star },
              { number: '4.9/5', label: 'Rating', icon: CheckCircle },
            ].map((stat, index) => (
              <Card key={index} className="border-none bg-white">
                <CardContent className="p-6 text-center">
                  <stat.icon className="h-8 w-8 text-rose-600 mx-auto mb-4" />
                  <div className="text-4xl font-bold text-gray-900">{stat.number}</div>
                  <div className="mt-2 text-gray-600 font-medium">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid with Modern Cards */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">
              Everything You Need to Succeed
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Powerful tools to help you manage and grow your business
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Calendar,
                title: "Smart Scheduling",
                description: "AI-powered booking system that maximizes your availability"
              },
              {
                icon: Zap,
                title: "Instant Payments",
                description: "Secure, same-day payments with integrated payment processing"
              },
              {
                icon: Users,
                title: "Client Management",
                description: "Build lasting relationships with integrated CRM tools"
              }
            ].map((feature, index) => (
              <Card key={index} className="group transition-all duration-300">
                <CardContent className="p-8">
                  <div className="rounded-full bg-rose-50 p-3 w-fit group-hover:bg-rose-100 transition-colors">
                    <feature.icon className="h-8 w-8 text-rose-600" />
                  </div>
                  <h3 className="text-xl font-semibold mt-6 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of beauty professionals who are growing their business with us
            </p>
            <Link href="/business-signup">
              <Button size="lg" className="bg-rose-600 hover:bg-rose-700">
                Get Started Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <p className="mt-4 text-sm text-gray-600">
              No credit card required
            </p>
          </div>
        </div>
      </section>
    </div>
  )
} 
