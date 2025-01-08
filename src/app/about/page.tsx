import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { 
  Heart, 
  Users, 
  Target, 
  Shield,
  ArrowRight,
  CheckCircle2
} from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import React from 'react'

export const metadata = {
  title: 'About Us | BeautyBook',
  description: 'Learn about our mission to transform the beauty industry and empower beauty professionals worldwide.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="absolute inset-0 opacity-25">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#8AB861]/20 to-[#E87C3E]/20 border border-[#8AB861]/20 backdrop-blur-sm mb-6">
              <span className="text-sm font-medium bg-gradient-to-r from-[#8AB861] to-[#E87C3E] bg-clip-text text-transparent">
                Our Story
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Transforming the Beauty Industry
              <span className="block mt-2 bg-gradient-to-r from-[#8AB861] via-[#97C26B] to-[#E87C3E] bg-clip-text text-transparent">
                One Booking at a Time
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 mb-8">
              We&apos;re on a mission to empower beauty professionals with the tools they need to succeed in the digital age.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-white relative">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#8AB861]/20 to-[#E87C3E]/20 border border-[#8AB861]/20 backdrop-blur-sm mb-6">
                <span className="text-sm font-medium bg-gradient-to-r from-[#8AB861] to-[#E87C3E] bg-clip-text text-transparent">
                  Our Mission
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Making Beauty Business Management Simple
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                We believe that every beauty professional deserves access to powerful tools that can help them grow their business. Our platform is designed to eliminate the complexities of business management, allowing you to focus on what you do best - creating beauty.
              </p>
              <div className="space-y-4">
                {[
                  "Empowering beauty professionals worldwide",
                  "Simplifying business management",
                  "Creating meaningful connections",
                  "Driving industry innovation"
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-[#8AB861]" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden">
                <Image
                  src="/images/about-mission.jpg"
                  alt="Our Mission"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl">
                <div className="text-4xl font-bold text-gray-900 mb-2">5000+</div>
                <div className="text-gray-600">Happy Professionals</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-gray-50/50 relative">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#8AB861]/20 to-[#E87C3E]/20 border border-[#8AB861]/20 backdrop-blur-sm mb-6">
              <span className="text-sm font-medium bg-gradient-to-r from-[#8AB861] to-[#E87C3E] bg-clip-text text-transparent">
                Our Values
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              What Drives Us
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our values shape everything we do, from product development to customer support.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Heart,
                title: "Customer First",
                description: "Every decision we make starts with our customers' needs",
                gradient: "from-[#8AB861] to-[#97C26B]"
              },
              {
                icon: Users,
                title: "Community",
                description: "Building strong connections within the beauty industry",
                gradient: "from-[#97C26B] to-[#E87C3E]"
              },
              {
                icon: Target,
                title: "Innovation",
                description: "Constantly improving and evolving our platform",
                gradient: "from-[#8AB861] to-[#E87C3E]"
              },
              {
                icon: Shield,
                title: "Trust",
                description: "Maintaining the highest standards of security and reliability",
                gradient: "from-[#E87C3E] to-[#8AB861]"
              }
            ].map((value, index) => (
              <div
                key={index}
                className="group p-8 rounded-2xl bg-white border border-gray-100 hover:border-[#8AB861]/50 transition-all duration-300 hover:shadow-xl"
              >
                <div className={cn(
                  "inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r mb-6 group-hover:scale-110 transition-transform duration-300",
                  value.gradient
                )}>
                  <value.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-white relative">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#8AB861]/20 to-[#E87C3E]/20 border border-[#8AB861]/20 backdrop-blur-sm mb-6">
              <span className="text-sm font-medium bg-gradient-to-r from-[#8AB861] to-[#E87C3E] bg-clip-text text-transparent">
                Our Team
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Meet the Team Behind BeautyBook
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              A diverse group of passionate individuals working together to revolutionize the beauty industry.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "CEO & Founder",
                image: "/team/sarah.jpg",
                gradient: "from-[#8AB861] to-[#97C26B]"
              },
              {
                name: "Michael Chen",
                role: "Chief Technology Officer",
                image: "/team/michael.jpg",
                gradient: "from-[#97C26B] to-[#E87C3E]"
              },
              {
                name: "Emma Davis",
                role: "Head of Customer Success",
                image: "/team/emma.jpg",
                gradient: "from-[#8AB861] to-[#E87C3E]"
              }
            ].map((member, index) => (
              <div
                key={index}
                className="group relative rounded-2xl bg-white border border-gray-100 overflow-hidden hover:border-[#8AB861]/50 transition-all duration-300 hover:shadow-xl"
              >
                <div className="aspect-[4/5] relative">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {member.name}
                  </h3>
                  <p className="text-gray-600">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="absolute inset-0 opacity-25">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Join Our Growing Community
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 mb-8">
              Be part of the beauty industry&apos;s digital transformation
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="group bg-gradient-to-r from-[#8AB861] to-[#E87C3E] hover:opacity-90 text-white rounded-full px-8 transition-all duration-300 hover:scale-105 w-full sm:w-auto"
                asChild
              >
                <Link href="/business-signup" className="flex items-center justify-center">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white/20 bg-white/5 text-white rounded-full px-8 hover:bg-white/10 transition-all duration-300 hover:scale-105 w-full sm:w-auto"
              >
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

