"use client";

import { useProviders } from "@/hooks/queries/use-providers";
import { Star, MapPin, Award, Clock, Search, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Head from "next/head";
import { useState } from "react";
import { ProviderCard } from "@/components/provider-card";
import React from "react";

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
                  <span className="bg-gradient-to-r from-rose-300 via-rose-400 to-pink-500 bg-clip-text text-transparent">
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
                          className="w-full pl-12 h-14 bg-white/80 border-0 rounded-xl text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-rose-500"
                          value={treatment}
                          onChange={(e) => setTreatment(e.target.value)}
                        />
                      </div>
                      <div className="relative flex-1">
                        <MapPin className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                        <Input
                          type="text"
                          placeholder="Location"
                          className="w-full pl-12 h-14 bg-white/80 border-0 rounded-xl text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-rose-500"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                        />
                      </div>
                      <Button
                        type="submit"
                        className="h-14 px-8 bg-rose-500 hover:bg-rose-600 text-white font-semibold rounded-xl transition-colors sm:w-auto w-full"
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

        {/* Professional CTA Section - Improved Mobile Responsiveness */}
        <section className="relative bg-gray-900 py-12 sm:py-24 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
              <div className="relative z-10">
                <span className="inline-block rounded-full bg-white/10 px-3 sm:px-4 py-1.5 text-sm font-medium text-white mb-4 sm:mb-6">
                  For Professionals
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
                  Own a beauty business?
                  <span className="block mt-2">Let&apos;s grow together.</span>
                </h2>
                <p className="mt-4 sm:mt-6 text-base sm:text-lg text-gray-300 leading-relaxed">
                  Expand your client base and streamline your operations with
                  our intuitive salon management software.
                </p>
                <Button className="mt-6 sm:mt-8 bg-white text-gray-900 hover:bg-gray-100 font-semibold px-6 sm:px-8 py-2.5 sm:py-3 text-base sm:text-lg rounded-full transition-colors">
                  Partner with us
                </Button>
              </div>

              <div className="relative hidden lg:block">
                <div className="relative bg-white/10 p-8 rounded-xl border border-white/20">
                  <h3 className="text-2xl font-semibold mb-4 text-white">
                    Salon Dashboard
                  </h3>
                  <div className="space-y-4">
                    {[
                      "Appointments",
                      "Client Management",
                      "Inventory",
                      "Analytics",
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
                      >
                        <div className="w-4 h-4 rounded-full bg-white/40 mr-3"></div>
                        <span className="text-white">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
