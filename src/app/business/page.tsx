import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  ArrowUpRight,
  Calendar,
  CheckCircle2,
  MessageSquare,
  Shield,
  Smartphone,
  Star,
  Users,
  Zap,
} from "lucide-react"
import React from "react"
import { FAQAccordion } from "@/components/business/faq-accordion"
import { StatCard } from "@/components/business/stat-card"
import { WhyFreeCard } from "@/components/business/why-free-card"
import { FeatureCard } from "@/components/business/feature-card"

export const metadata = {
  title: "List Your Beauty Business | BeautyBook",
  description:
    "Join our platform and connect with clients looking for your beauty expertise. Manage bookings, payments, and grow your business.",
}

export default function BusinessLandingPage() {
  return (
    <div className="min-h-screen w-full">
      {/* ========== Hero Section ========== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        {/* Animated background */}
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Left Column: Headline & CTA */}
            <div className="flex-1 text-center lg:text-left">
              {/* Animated Badge */}
              <div className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#8AB861]/20 to-[#E87C3E]/20 border border-[#8AB861]/20 backdrop-blur-sm mb-6 sm:mb-8 hover:scale-105 transition-transform">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8AB861] opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#8AB861]" />
                </span>
                <span className="text-sm font-medium bg-gradient-to-r from-[#8AB861] to-[#E87C3E] bg-clip-text text-transparent">
                  500+ Beauty Professionals Trust Us
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-4 sm:mb-6">
                Transform Your
                <span className="block mt-2 bg-gradient-to-r from-[#8AB861] via-[#97C26B] to-[#E87C3E] bg-clip-text text-transparent animate-gradient">
                  Beauty Business
                </span>
              </h1>

              <p className="mx-auto lg:mx-0 max-w-xl text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8">
                Join thousands of beauty professionals who are scaling their business with our all-in-one platform.
              </p>

              {/* Call-to-action buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                <Button
                  size="lg"
                  className="group bg-gradient-to-r from-[#8AB861] to-[#E87C3E] hover:opacity-90 text-white rounded-full px-6 sm:px-8 transition-all duration-300 hover:scale-105 w-full sm:w-auto"
                  asChild
                >
                  <Link href="/business-signup" className="flex items-center justify-center">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white/20 bg-white/5 text-white rounded-full px-6 sm:px-8 hover:bg-white/10 transition-all duration-300 hover:scale-105 w-full sm:w-auto"
                >
                  Schedule Demo
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="mt-8 sm:mt-12 flex flex-wrap gap-4 sm:gap-6 justify-center lg:justify-start">
                {["Instant Setup", "24/7 Support", "No Credit Card Required"].map((item, index) => (
                  <div key={index} className="flex items-center gap-2 text-gray-400 text-sm sm:text-base">
                    <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-[#8AB861]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Image */}
            <div className="flex-1 relative w-full max-w-sm lg:max-w-lg mx-auto mt-8 lg:mt-0">
              <div className="relative w-full aspect-square">
                {/* Slight background layer for mockup styling */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#8AB861]/10 to-[#E87C3E]/10" />
                <Image
                  src="/images/business-hero.jpg"
                  alt="BeautyBook Dashboard"
                  fill
                  className="object-cover rounded-2xl border border-white/10 shadow-2xl transition-transform duration-500 hover:scale-105"
                  priority
                />

                {/* Floating Stats Cards (hidden on small) */}
                <div className="hidden sm:block absolute -left-8 top-1/4 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 hover:scale-105 transition-transform duration-300">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-green-500/20">
                      <ArrowUpRight className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <div className="text-sm text-white/60">Today&apos;s Bookings</div>
                      <div className="text-xl font-bold text-white">12</div>
                    </div>
                  </div>
                </div>
                <div className="hidden sm:block absolute -right-8 bottom-1/4 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 hover:scale-105 transition-transform duration-300">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-[#E87C3E]/20">
                      <Star className="h-5 w-5 text-[#E87C3E]" />
                    </div>
                    <div>
                      <div className="text-sm text-white/60">Client Rating</div>
                      <div className="text-xl font-bold text-white">4.9/5</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ========== Stats Section ========== */}
      <section className="relative bg-gray-50 py-20 sm:py-24">
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_bottom,rgba(0,0,0,0.02),transparent)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StatCard number="50K+" label="Monthly Bookings" icon="Calendar" />
            <StatCard number="500+" label="Active Businesses" icon="Users" />
            <StatCard number="4.9" label="Provider Rating" icon="Star" />
          </div>
        </div>
      </section>

      {/* ========== Features Grid ========== */}
      <section className="relative bg-gray-50 py-20 sm:py-28">
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_bottom,rgba(0,0,0,0.02),transparent)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#8AB861]/20 to-[#E87C3E]/20 border border-[#8AB861]/20 backdrop-blur-sm mb-6">
              <span className="text-sm font-medium bg-gradient-to-r from-[#8AB861] to-[#E87C3E] bg-clip-text text-transparent">
                Powerful Features
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Everything You Need to Succeed</h2>
            <p className="max-w-3xl mx-auto text-lg text-gray-600">
              Our comprehensive platform provides all the tools you need to manage and grow your beauty business.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: Calendar,
                title: "Smart Scheduling",
                description: "AI-powered booking system that maximizes your availability and reduces no-shows",
                gradient: "from-[#8AB861] to-[#97C26B]",
              },
              {
                icon: Zap,
                title: "Instant Payments",
                description: "Secure payment processing with same-day deposits and detailed financial reporting",
                gradient: "from-[#97C26B] to-[#E87C3E]",
              },
              {
                icon: Users,
                title: "Client Management",
                description: "Build lasting relationships with integrated CRM tools and automated communications",
                gradient: "from-[#8AB861] to-[#E87C3E]",
              },
              {
                icon: Shield,
                title: "Secure Platform",
                description: "Enterprise-grade security to protect your business and client data",
                gradient: "from-[#E87C3E] to-[#8AB861]",
              },
              {
                icon: MessageSquare,
                title: "Client Messaging",
                description: "Built-in chat and automated notifications to keep clients informed",
                gradient: "from-[#97C26B] to-[#8AB861]",
              },
              {
                icon: Smartphone,
                title: "Mobile App",
                description: "Manage your business on the go with our powerful mobile application",
                gradient: "from-[#8AB861] to-[#E87C3E]",
              },
            ].map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>


      {/* ========== Why It's Free Section ========== */}
      <section className="relative bg-gray-50 py-24">
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_bottom,rgba(0,0,0,0.02),transparent)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#8AB861]/20 to-[#E87C3E]/20 border border-[#8AB861]/20 backdrop-blur-sm mb-6">
              <span className="text-sm font-medium bg-gradient-to-r from-[#8AB861] to-[#E87C3E] bg-clip-text text-transparent">
                100% Free Platform
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why BeautyBook is Free</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We believe in empowering beauty professionals. Our platform is completely free because we succeed when you
              succeed.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "No Hidden Fees",
                description: "Access all features without any subscription costs or hidden charges.",
                icon: Shield,
                gradient: "from-[#8AB861] to-[#97C26B]",
              },
              {
                title: "Fair Revenue Share",
                description: "We only make money when you make money — a small percentage of successful bookings.",
                icon: Users,
                gradient: "from-[#97C26B] to-[#E87C3E]",
              },
              {
                title: "Unlimited Access",
                description: "Get full access to all features, unlimited bookings, and customer support.",
                icon: Zap,
                gradient: "from-[#8AB861] to-[#E87C3E]",
              },
            ].map((item, index) => (
              <WhyFreeCard key={index} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* ========== FAQ Section ========== */}
      <section className="relative bg-white py-24">
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_bottom,rgba(0,0,0,0.02),transparent)]" />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">

          <FAQAccordion />
        </div>
      </section>

      {/* ========== CTA Section ========== */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-24">
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_bottom,rgba(255,255,255,0.03),transparent)]" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Grow Your Business?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of beauty professionals already using our free platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="group bg-gradient-to-r from-[#8AB861] to-[#E87C3E] hover:opacity-90 text-white rounded-full px-8 transition-all duration-300 hover:scale-105"
                asChild
              >
                <Link href="/business-signup" className="flex items-center">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white/20 bg-white/5 text-white rounded-full px-8 hover:bg-white/10 transition-all duration-300 hover:scale-105"
              >
                Learn More
              </Button>
            </div>
            <p className="mt-4 text-sm text-gray-400">No credit card required &bull; Instant access to all features</p>
          </div>
        </div>
      </section>
    </div>
  )
}

