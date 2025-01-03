import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { CheckCircle, ArrowRight, Star, Users, Calendar, Zap } from 'lucide-react'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'List Your Beauty Business | AfroGlow',
  description: 'Join our platform and connect with clients looking for your beauty expertise. Manage bookings, payments, and grow your business.',
}

export default function BusinessLandingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Solid Background */}
      <section className="bg-rose-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center px-4 py-2 bg-rose-400 rounded-full mb-6">
                <span className="text-white text-sm font-medium">
                  Join 500+ Beauty Professionals
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Transform Your Beauty Business
              </h1>
              
              <p className="mt-6 text-xl text-white max-w-xl">
                Streamline bookings, payments, and client management. All in one powerful platform.
              </p>
              
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link href="/business-signup">
                  <Button size="lg" className="w-full sm:w-auto bg-white text-rose-600 hover:bg-rose-50">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="w-full sm:w-auto bg-transparent text-white border-white hover:bg-rose-400"
                >
                  Watch Demo
                </Button>
              </div>
            </div>
            
            {/* Hero Image/Mockup */}
            <div className="flex-1 relative mt-12 md:mt-0">
              <div className="relative w-full aspect-square max-w-md mx-auto">
                <Image
                  src="/images/business-hero.png"
                  alt="Dashboard Preview"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { number: '10K+', label: 'Active Clients', icon: Users },
              { number: '500+', label: 'Beauty Pros', icon: Star },
              { number: '4.9/5', label: 'Rating', icon: CheckCircle },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="h-10 w-10 text-rose-500 mx-auto mb-4" />
                <div className="text-4xl font-bold text-gray-900">{stat.number}</div>
                <div className="mt-2 text-lg text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Everything You Need to Succeed
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Powerful tools to help you manage and grow your business
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
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
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-rose-100 mb-6">
                  <feature.icon className="h-8 w-8 text-rose-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
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
            <p className="mt-4 text-sm text-gray-500">
              No credit card required
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

