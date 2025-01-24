"use client"

import { useProviders } from "@/hooks/queries/use-providers";
import { Star, Award, Clock, Search, ArrowRight, Calendar, CreditCard } from "lucide-react";
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
          content="Find and book beauty treatments instantly at the best salons near you."
        />
      </Head>
      
      <main className="relative">
        {/* Hero Section */}
        <section className="py-16 sm:py-24 bg-gradient-to-br from-gray-900 to-gray-800">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                <span className="block mb-2">Discover and Book</span>
                <span className="bg-gradient-to-r from-[#8AB861] via-[#97C26B] to-[#E87C3E] bg-clip-text text-transparent">
                  Beauty & Wellness Services
                </span>
              </h1>

              <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-12">
                Connect with top-rated beauty professionals and book your perfect treatment in minutes
              </p>

              <div className="max-w-2xl mx-auto backdrop-blur-xl bg-white/10 p-3 rounded-xl shadow-lg">
                <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Search treatments..."
                      className="w-full pl-12 h-12 bg-white/80 border-0 rounded-lg text-gray-900 placeholder:text-gray-500"
                      value={treatment}
                      onChange={(e) => setTreatment(e.target.value)}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="h-12 px-6 bg-gradient-to-r from-[#8AB861] to-[#E87C3E] text-white font-medium rounded-lg"
                  >
                    Search
                  </Button>
                </form>
              </div>

              <div className="mt-12 flex flex-wrap justify-center gap-6 text-white">
                {[
                  { icon: Star, title: "4.9/5 Rating", subtitle: "From 10,000+ reviews" },
                  { icon: Award, title: "Top Professionals", subtitle: "Verified experts" },
                  { icon: Clock, title: "Instant Booking", subtitle: "Quick & easy" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-4 rounded-lg bg-white/5 border border-white/10"
                  >
                    <div className="p-2 rounded-full bg-white/10">
                      <item.icon className="h-5 w-5 text-rose-300" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold">{item.title}</div>
                      <div className="text-sm text-gray-400">{item.subtitle}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Providers Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Top Beauty Professionals
              <div className="mt-2 w-20 h-0.5 bg-gradient-to-r from-[#8AB861] to-[#E87C3E]" />
            </h2>

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="animate-pulse">
                    <div className="aspect-[4/3] bg-gray-200 rounded-lg mb-4" />
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-gray-500">Failed to load providers</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {data?.providers.map((provider) => (
                  <div key={provider.id}>
                    <ProviderCard provider={provider} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

{/* Business Section */}
<section className="py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
  <div className="container mx-auto px-4">
    <div className="flex flex-col lg:flex-row lg:items-start lg:gap-16">
      <div className="lg:w-1/2 space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20">
          <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-sm font-medium text-green-400">Now Available in Your Area</span>
        </div>

        <div className="space-y-4">
          <h2 className="text-4xl font-bold">
            Transform Your Beauty Business
            <span className="block mt-2 text-2xl text-gray-300">With Our All-in-One Platform</span>
          </h2>

          <p className="text-lg text-gray-300 max-w-xl">
            Join leading beauty professionals who have increased their bookings by 300% using our smart platform.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {[
            { number: '500+', label: 'Active Professionals', sub: 'In your city' },
            { number: '50K+', label: 'Monthly Bookings', sub: 'And growing' },
            { number: '4.9/5', label: 'Professional Rating', sub: 'From verified reviews' },
          ].map((stat) => (
            <div key={stat.label} className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
              <div className="text-2xl font-bold">{stat.number}</div>
              <div className="text-sm font-medium text-gray-300">{stat.label}</div>
              <div className="text-xs text-gray-400 mt-1">{stat.sub}</div>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <Button asChild className="w-full sm:w-auto bg-white hover:bg-gray-100 text-gray-900 rounded-full h-14 px-8 text-lg font-medium">
            <Link href="/business-signup">
              Start Your Free 30-Day Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          
          <div className="flex items-center gap-4 text-sm text-gray-300">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>5-minute setup</span>
            </div>
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              <span>No credit card required</span>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:w-1/2 mt-12 lg:mt-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            {
              icon: Calendar,
              title: "Smart Scheduling",
              description: "Reduce no-shows by 75% with AI-powered booking and automatic reminders",
              color: "text-green-400",
            },
            {
              icon: CreditCard,
              title: "Instant Payments",
              description: "Get paid faster with integrated payments and smart invoicing system",
              color: "text-blue-400",
            },
            {
              icon: Star,
              title: "Review Management",
              description: "Build trust with automated review collection and response tools",
              color: "text-yellow-400",
            },
            {
              icon: Award,
              title: "Marketing Suite",
              description: "Grow your client base with targeted campaigns and promotions",
              color: "text-purple-400",
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="p-6 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
            >
              <div className={`inline-flex p-3 rounded-lg bg-white/5 mb-4`}>
                <feature.icon className={`h-6 w-6 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
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

