"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  CalendarIcon,
  MapPin,
  Search,
  Clock,
  Ticket,
  Award,
  Star,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";

import Head from "next/head";
import Image from "next/image";

export default function Home() {
  const [treatment, setTreatment] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search logic here
    console.log({ treatment, location });
  };

  const venues = [
    {
      id: "1",
      name: "Gould Barbers Stevenage",
      rating: 4.9,
      reviews: 1570,
      location: "Bedwell, Stevenage",
      type: "Barbershop",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: "2",
      name: "U.D Hair & Beauty Lounge",
      rating: 5.0,
      reviews: 3797,
      location: "Park, Watford",
      type: "Hair Salon",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: "3",
      name: "The Gentlemen's Lounge Biggleswade",
      rating: 5.0,
      reviews: 1495,
      location: "Biggleswade North, Biggleswade",
      type: "Barbershop",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: "4",
      name: "The Beauty Lounge Elmfield",
      rating: 5.0,
      reviews: 1588,
      location: "South Croydon, London",
      type: "Beauty Salon",
      image: "/placeholder.svg?height=300&width=400",
    },
  ];

  const newVenues = [
    {
      id: "5",
      name: "Serenity Spa & Salon",
      rating: 4.8,
      reviews: 32,
      location: "Cambridge",
      type: "Spa & Salon",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: "6",
      name: "The Barber's Chair",
      rating: 4.9,
      reviews: 18,
      location: "Norwich",
      type: "Barbershop",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: "7",
      name: "Glow Up Beauty Studio",
      rating: 5.0,
      reviews: 25,
      location: "Ipswich",
      type: "Beauty Studio",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: "8",
      name: "Tranquil Touch Massage",
      rating: 4.7,
      reviews: 41,
      location: "Colchester",
      type: "Massage Therapy",
      image: "/placeholder.svg?height=300&width=400",
    },
  ];

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
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="text-center"
              >
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
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-12 flex flex-wrap justify-center gap-8 text-white"
                >
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
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Recommended Section - Improved Mobile Responsiveness */}
        <section className="py-12 sm:py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 relative">
              <span>Recommended for You</span>
              <div className="absolute -bottom-2 left-0 w-20 h-0.5 bg-gray-900"></div>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {venues.map((venue, index) => (
                <motion.div
                  key={venue.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="group cursor-pointer overflow-hidden rounded-xl border border-gray-200 transition-colors duration-300 hover:border-gray-300">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={venue.image}
                        alt={venue.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <div className="p-4 space-y-2">
                      <h3 className="font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
                        {venue.name}
                      </h3>

                      <div className="flex items-center space-x-1">
                        <span className="font-medium text-gray-900">
                          {venue.rating}
                        </span>
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-gray-500">
                          ({venue.reviews.toLocaleString()})
                        </span>
                      </div>

                      <p className="text-gray-500 text-sm">{venue.location}</p>

                      <div className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                        {venue.type}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* New to Platform Section - Improved Mobile Responsiveness */}
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
              <Button className="mt-4 sm:mt-0 flex items-center space-x-2 bg-white text-gray-700 hover:text-gray-900 border border-gray-200 hover:border-gray-300 px-4 sm:px-6 py-2 rounded-full transition-all duration-300">
                <span>View all</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {newVenues.map((venue, index) => (
                <motion.div
                  key={venue.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="h-full"
                >
                  <div className="group cursor-pointer h-full bg-white rounded-xl border border-gray-200 overflow-hidden transition-all duration-300 hover:border-gray-300">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <div className="absolute top-3 left-3 z-10">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/90 text-gray-700">
                          New
                        </span>
                      </div>
                      <Image
                        src={venue.image}
                        alt={venue.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    <div className="p-5 space-y-3">
                      <h3 className="font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
                        {venue.name}
                      </h3>
                      <div className="flex items-center space-x-1">
                        <span className="font-medium text-gray-900">{venue.rating}</span>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(venue.rating)
                                  ? "fill-gray-900 text-gray-900"
                                  : "fill-gray-200 text-gray-200"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-gray-500">({venue.reviews} reviews)</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-500">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{venue.location}</span>
                      </div>
                      <div className="pt-2">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700">
                          {venue.type}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Professional CTA Section - Improved Mobile Responsiveness */}
        <section className="relative bg-gray-900 py-12 sm:py-24 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                className="relative z-10"
              >
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
              </motion.div>

              <div className="relative hidden lg:block">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="relative bg-white/10 p-8 rounded-xl border border-white/20"
                >
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
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
