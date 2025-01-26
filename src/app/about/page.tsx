'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Heart, Users, Target, Shield, ArrowRight, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import React from 'react'

interface ValueCardProps {
  icon: React.ElementType
  title: string
  description: string
  gradient: string
}

const ValueCard = ({ icon: Icon, title, description, gradient }: ValueCardProps) => (
  <div className="group p-6 rounded-xl bg-white border border-gray-100 hover:border-[#8AB861]/30 transition-all duration-300">
    <div className={cn(
      "inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r mb-4",
      gradient
    )}>
      <Icon className="h-6 w-6 text-white" />
    </div>
    <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </div>
)

const StatCard = ({ value, label }: { value: string, label: string }) => (
  <div className="text-center px-6 py-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
    <div className="text-2xl font-bold text-white mb-1">{value}</div>
    <div className="text-sm text-gray-300">{label}</div>
  </div>
)

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="absolute inset-0 opacity-25">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-white mb-4">
                About BeautyBook
              </h1>
              <p className="text-xl text-gray-300">
                Connecting Black and African beauty professionals with clients through a platform that celebrates culture and expertise.
              </p>
            </div>
            <div className="flex gap-4">
              <StatCard value="100+" label="Partner Businesses" />
              <StatCard value="4.9/5" label="Client Rating" />
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block px-4 py-2 rounded-full bg-[#8AB861]/10 text-[#8AB861] text-sm font-medium mb-6">
                Our Mission
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Redefining Beauty Access for Our Communities
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                We're dedicated to empowering Black and African beauty businesses by providing innovative tools and fostering a supportive community that celebrates cultural beauty traditions.
              </p>
              <div className="grid gap-4">
                {[
                  "Connecting clients with skilled professionals",
                  "Preserving cultural beauty traditions",
                  "Providing growth tools for businesses",
                  "Creating seamless booking experiences"
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                    <CheckCircle2 className="h-5 w-5 text-[#8AB861] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 -left-4 -top-4 bg-[#8AB861]/10 rounded-lg transform rotate-3" />
              <div className="relative rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/images/home-banner.png"
                  alt="Our Mission"
                  width={600}
                  height={400}
                  className="w-full h-[400px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 rounded-full bg-[#8AB861]/10 text-[#8AB861] text-sm font-medium mb-6">
              Our Values
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Drives Us Forward</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our values are rooted in empowering beauty businesses through community, innovation, and trust.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Heart,
                title: "Cultural Pride",
                description: "Celebrating and preserving the rich traditions of Black and African beauty.",
                gradient: "from-[#8AB861] to-[#97C26B]"
              },
              {
                icon: Users,
                title: "Community",
                description: "Building strong connections between professionals and clients.",
                gradient: "from-[#97C26B] to-[#E87C3E]"
              },
              {
                icon: Target,
                title: "Innovation",
                description: "Creating tools tailored to unique cultural beauty needs.",
                gradient: "from-[#8AB861] to-[#E87C3E]"
              },
              {
                icon: Shield,
                title: "Trust",
                description: "Ensuring a safe and reliable platform for all users.",
                gradient: "from-[#E87C3E] to-[#8AB861]"
              }
            ].map((value, index) => (
              <ValueCard key={index} {...value} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Join Our Community?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Be part of a movement that's transforming beauty access for Black and African professionals and clients.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-[#8AB861] hover:bg-[#7da556] text-white rounded-xl px-8"
            >
              <Link href="/business-signup" className="flex items-center">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              className="border-gray-300 text-gray-700 rounded-xl px-8 hover:bg-gray-50"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
