"use client";

import { useProviders } from "@/hooks/queries/use-providers";
import { Star, Award, Clock, Search, ArrowRight, Play, Calendar, CreditCard } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Head from "next/head";
import { useState } from "react";
import { ProviderCard } from "@/components/provider-card";
import React from "react";
import Link from "next/link";

export default function Home() {
  const [treatment, setTreatment] = useState("");
  const [location, setLocation] = useState("");
  const { data, isLoading, error } = useProviders();

  console.log(data)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ treatment, location });
  };

  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>Beauty & Wellness Booking | Find and Book Treatments</title>
        <meta
          name="description"
          content="Find and book beauty treatments instantly at the best salons near you. Discover our popular services including haircuts, manicures, facials, and massages."
        />
      </Head>
      <main id="main-content">
        {/* Hero Section - Improved Mobile Responsiveness */}
        <section className="relative overflow-hidden py-20 sm:py-32 bg-gray-900">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-[linear-gradient(45deg,#F43F5E22,#FB718522)] opacity-40" />
          <div className="absolute inset-0">
            <div className="h-full w-full" style={{
              backgroundImage: `radial-gradient(circle at center, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }} />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-5xl mx-auto">
              <div className="text-center">
                {/* Main Heading */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6">
                  <span className="block mb-2">Discover and Book</span>
                  <span className="bg-gradient-to-r from-[#8AB861] via-[#97C26B] to-[#E87C3E] bg-clip-text text-transparent">
                    Beauty & Wellness Services
                  </span>
                </h1>

                {/* Subheading */}
                <p className="mt-6 text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
                  Connect with top-rated beauty professionals and book your perfect treatment in minutes
                </p>

                {/* Search Form */}
                <div className="mt-12 max-w-3xl mx-auto">
                  <div className="backdrop-blur-xl bg-white/10 p-3 rounded-2xl">
                    <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
                      <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                        <Input
                          type="text"
                          placeholder="Search treatments..."
                          className="w-full pl-12 h-14 bg-white/80 border-0 rounded-xl text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-[#8AB861]"
                          value={treatment}
                          onChange={(e) => setTreatment(e.target.value)}
                        />
                      </div>
                      <Button 
                        type="submit" 
                        className="h-14 px-8 bg-gradient-to-r from-[#8AB861] to-[#E87C3E] hover:from-[#7BA754] hover:to-[#D66F37] text-white font-medium rounded-xl"
                      >
                        Search
                      </Button>
                    </form>
                  </div>
                </div>

                {/* Trust Indicators */}
                <div className="mt-12 flex flex-wrap justify-center gap-8 text-white">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-white/10">
                      <Star className="h-6 w-6 text-rose-300 fill-rose-300" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold">4.9/5 Rating</div>
                      <div className="text-sm text-gray-400">From 10,000+ reviews</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-white/10">
                      <Award className="h-6 w-6 text-rose-400" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold">Top Professionals</div>
                      <div className="text-sm text-gray-400">Verified experts</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-white/10">
                      <Clock className="h-6 w-6 text-rose-300" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold">Instant Booking</div>
                      <div className="text-sm text-gray-400">Quick & easy process</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Recommended Section */}
        <section className="py-12 sm:py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 relative">
              <span>Top Beauty Professionals</span>
              <div className="absolute -bottom-2 left-0 w-20 h-0.5 bg-gray-900"></div>
            </h2>

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="animate-pulse">
                    <div className="aspect-[4/3] bg-gray-200 rounded-xl mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-gray-500">Failed to load providers</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                {data?.providers.map((provider, index) => (
                  <ProviderCard 
                    key={provider.id}
                    provider={provider}
                    index={index}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* New Providers Section */}
        <section className="py-12 sm:py-16 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 relative">
                  <span>New to Platform</span>
                  <div className="absolute -bottom-2 left-0 w-20 h-0.5 bg-gray-900"></div>
                </h2>
                <p className="mt-2 text-gray-600 text-sm sm:text-base">
                  Discover our newest beauty and wellness partners
                </p>
              </div>
              <Button className="mt-4 sm:mt-0 flex items-center space-x-2 bg-white text-gray-700 hover:text-gray-900 border border-gray-200 hover:border-gray-300">
                <span>View all</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="animate-pulse">
                    <div className="aspect-[4/3] bg-gray-200 rounded-xl mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-gray-500">Failed to load new providers</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                {data?.newProviders.map((provider, index) => (
                  <ProviderCard 
                    key={provider.id}
                    provider={provider}
                    index={index}
                    isNew={true}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Business Section */}
        <section className="relative py-24 sm:py-32 overflow-hidden">
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />
          
          {/* Decorative Elements */}
          <div className="absolute inset-0 opacity-25">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 25px 25px, rgba(255,255,255,0.2) 2px, transparent 0)`,
              backgroundSize: '50px 50px'
            }} />
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Left Column - Content */}
              <div className="space-y-8">
                {/* Animated Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#8AB861]/20 to-[#E87C3E]/20 border border-[#8AB861]/20 backdrop-blur-sm">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8AB861] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-[#8AB861]"></span>
                  </span>
                  <span className="text-sm font-medium bg-gradient-to-r from-[#8AB861] to-[#E87C3E] bg-clip-text text-transparent">
                    For Beauty Professionals
                  </span>
                </div>

                {/* Main Content */}
                <div className="space-y-6">
                  <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-[1.1] tracking-tight">
                    Ready to grow your
                    <span className="block mt-2 bg-gradient-to-r from-[#8AB861] via-[#97C26B] to-[#E87C3E] bg-clip-text text-transparent">
                      beauty business?
                    </span>
                  </h2>

                  <p className="text-xl text-gray-300 leading-relaxed max-w-xl">
                    Join thousands of beauty professionals who are scaling their business with our all-in-one platform.
                  </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-6">
                  {[
                    { number: '500+', label: 'Active Pros' },
                    { number: '50K+', label: 'Bookings' },
                    { number: '4.9/5', label: 'Rating' },
                  ].map((stat, index) => (
                    <div key={index} className="text-center p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                      <div className="text-2xl font-bold text-white">{stat.number}</div>
                      <div className="text-sm text-gray-400">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    asChild
                    size="lg"
                    className="bg-gradient-to-r from-[#8AB861] to-[#E87C3E] hover:opacity-90 text-white rounded-full px-8 py-6"
                  >
                    <Link href="/business-signup">
                      Start Free Trial
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  
                  <Button 
                    size="lg"
                    variant="outline"
                    className="border-2 border-white/20 bg-white/5 text-white rounded-full px-8 py-6 hover:bg-white/10"
                  >
                    <Play className="mr-2 h-5 w-5" />
                    Watch Demo
                  </Button>
                </div>
              </div>

              {/* Right Column - Feature Cards */}
              <div className="relative">
                <div className="grid gap-4">
                  {[
                    {
                      title: 'Smart Scheduling',
                      description: 'AI-powered booking system that maximizes your availability',
                      icon: Calendar,
                      gradient: 'from-[#8AB861] to-[#97C26B]'
                    },
                    {
                      title: 'Instant Payments',
                      description: 'Secure payment processing with same-day deposits',
                      icon: CreditCard,
                      gradient: 'from-[#97C26B] to-[#E87C3E]'
                    },
                    // Add more features as needed
                  ].map((feature, index) => (
                    <div
                      key={index}
                      className="group p-6 rounded-2xl bg-white/[0.03] border border-white/[0.05] backdrop-blur-sm hover:bg-white/[0.08] transition-all duration-300"
                    >
                      <div className="flex gap-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-r ${feature.gradient} group-hover:scale-110 transition-transform duration-300`}>
                          <feature.icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-white text-lg mb-2">{feature.title}</h3>
                          <p className="text-gray-400">{feature.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
