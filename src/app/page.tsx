"use client";

import { useProviders } from "@/hooks/queries/use-providers";
import {
  Star,
  Award,
  Clock,
  Search,
  ArrowRight,
  Calendar,
  CreditCard,
  Loader2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useCallback } from "react";
import { ProviderCard } from "@/components/provider-card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useRouter } from "next/navigation";
import Link from "next/link";
import React from "react";

export default function Home() {
  const router = useRouter();
  const [searchParams, setSearchParams] = useState({
    treatment: "",
    location: "",
  });
  const [isSearching, setIsSearching] = useState(false);

  const { data, isLoading, isError } = useProviders();

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setSearchParams((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    []
  );

  const handleSearch = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSearching(true);
      try {
        const queryString = new URLSearchParams({
          treatment: searchParams.treatment,
          location: searchParams.location,
        }).toString();
        router.push(`/services?${queryString}`);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setIsSearching(false);
      }
    },
    [searchParams, router]
  );

  return (
    <div className="min-h-screen bg-white">
      <main className="relative">
        {/* Hero Section */}
        <section className="py-20 sm:py-32 bg-gradient-to-br from-gray-900 to-gray-800">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl sm:text-6xl font-bold text-white mb-8 tracking-tight">
                <span className="block mb-3">Your Beauty Journey</span>
                <span className="bg-gradient-to-r from-[#8AB861] via-[#97C26B] to-[#E87C3E] bg-clip-text text-transparent">
                  Starts Here
                </span>
              </h1>

              <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-12 leading-relaxed">
                Book appointments with top beauty professionals in your area,
                hassle-free
              </p>

              <div className="max-w-2xl mx-auto backdrop-blur-xl bg-white/10 p-4 rounded-2xl shadow-lg">
                <form
                  onSubmit={handleSearch}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    <Input
                      type="text"
                      name="treatment"
                      placeholder="What service are you looking for?"
                      className="w-full pl-12 h-14 bg-white/90 border-0 rounded-xl text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-[#8AB861]"
                      value={searchParams.treatment}
                      onChange={handleInputChange}
                      aria-label="Search treatments"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isSearching}
                    className="h-14 px-8 bg-gradient-to-r from-[#8AB861] to-[#E87C3E] text-white font-medium rounded-xl hover:opacity-90 transition-opacity disabled:opacity-70"
                  >
                    {isSearching ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      "Search"
                    )}
                  </Button>
                </form>
              </div>

              {/* Stats Section - Enhanced with animations */}
              <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 text-white max-w-4xl mx-auto">
                {[
                  {
                    icon: Star,
                    title: "4.9/5 Rating",
                    subtitle: "From verified reviews",
                    delay: "0",
                  },
                  {
                    icon: Award,
                    title: "Expert Professionals",
                    subtitle: "Carefully vetted",
                    delay: "150",
                  },
                  {
                    icon: Clock,
                    title: "24/7 Booking",
                    subtitle: "Book anytime",
                    delay: "300",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 animate-fade-in"
                    style={{ animationDelay: `${item.delay}ms` }}
                  >
                    <div className="p-3 rounded-full bg-white/10">
                      <item.icon className="h-6 w-6 text-[#97C26B]" />
                    </div>
                    <div>
                      <div className="font-semibold text-lg">{item.title}</div>
                      <div className="text-sm text-gray-400">
                        {item.subtitle}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Providers Section - Enhanced with better error and loading states */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">
                Featured Professionals
                <div className="mt-2 w-24 h-1 bg-gradient-to-r from-[#8AB861] to-[#E87C3E]" />
              </h2>
              <Button asChild variant="outline" className="hidden sm:flex">
                <Link href="/services">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="animate-pulse">
                    <div className="aspect-[4/3] bg-gray-200 rounded-xl mb-4" />
                    <div className="space-y-3">
                      <div className="h-4 bg-gray-200 rounded w-3/4" />
                      <div className="h-4 bg-gray-200 rounded w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : isError ? (
              <Alert variant="destructive">
                <AlertDescription>
                  Unable to load providers. Please try again later.
                </AlertDescription>
              </Alert>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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

        {/* Business Section */}
        <section className="py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row lg:items-start lg:gap-20">
              <div className="lg:w-1/2 space-y-10">
                <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 border border-white/20 hover:bg-white/15 transition-colors">
                  <span className="h-2.5 w-2.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-sm font-semibold text-green-400">
                    Join 500+ Beauty Professionals
                  </span>
                </div>

                <div className="space-y-6">
                  <h2 className="text-5xl font-bold leading-tight">
                    Scale Your Beauty Business
                    <span className="block mt-3 text-3xl text-gray-300 font-medium">
                      With Smart Tools
                    </span>
                  </h2>

                  <p className="text-xl text-gray-300 max-w-xl leading-relaxed">
                    Join beauty professionals who have grown their revenue by
                    300% using our intelligent booking and management platform.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-6">
                  {[
                    {
                      number: "10K+",
                      label: "Monthly Bookings",
                      sub: "Processed securely",
                    },
                    {
                      number: "95%",
                      label: "Client Retention",
                      sub: "Average rate",
                    },
                    {
                      number: "4.9/5",
                      label: "Customer Rating",
                      sub: "From real clients",
                    },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="p-6 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
                    >
                      <div className="text-3xl font-bold bg-gradient-to-r from-[#8AB861] to-[#E87C3E] bg-clip-text text-transparent">
                        {stat.number}
                      </div>
                      <div className="text-sm font-medium text-gray-300 mt-2">
                        {stat.label}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        {stat.sub}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-6">
                  <Button
                    asChild
                    className="w-full sm:w-auto bg-white hover:bg-gray-50 text-gray-900 rounded-xl h-14 px-8 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Link href="/business-signup">
                      Start Free Trial
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>

                  <div className="flex items-center gap-6 text-sm text-gray-300">
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-[#8AB861]" />
                      <span>Quick 5-minute setup</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-[#E87C3E]" />
                      <span>No credit card needed</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:w-1/2 mt-16 lg:mt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    {
                      icon: Calendar,
                      title: "Smart Scheduling",
                      description:
                        "AI-powered booking system with automated reminders to reduce no-shows",
                      color: "text-[#8AB861]",
                      delay: "0",
                    },
                    {
                      icon: CreditCard,
                      title: "Instant Payments",
                      description:
                        "Secure payment processing with instant transfers to your account",
                      color: "text-[#97C26B]",
                      delay: "150",
                    },
                    {
                      icon: Star,
                      title: "Client Reviews",
                      description:
                        "Automated review collection with response management tools",
                      color: "text-[#CAB364]",
                      delay: "300",
                    },
                    {
                      icon: Award,
                      title: "Growth Tools",
                      description:
                        "Marketing suite with campaign management and analytics",
                      color: "text-[#E87C3E]",
                      delay: "450",
                    },
                  ].map((feature) => (
                    <div
                      key={feature.title}
                      className="p-8 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
                      style={{ animationDelay: `${feature.delay}ms` }}
                    >
                      <div
                        className={`inline-flex p-3 rounded-lg bg-white/5 mb-6`}
                      >
                        <feature.icon className={`h-7 w-7 ${feature.color}`} />
                      </div>
                      <h3 className="text-xl font-bold mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-gray-300 leading-relaxed">
                        {feature.description}
                      </p>
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
