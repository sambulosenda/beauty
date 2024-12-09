// app/page.tsx
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Sparkles, Clock, Shield, CheckCircle, Star, Users, Search, MapPin } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full min-h-screen bg-gradient-to-r from-slate-800 to-slate-600 overflow-hidden">
          <div className="container px-4 md:px-6 h-full">
            <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
              {/* Left Content */}
              <div className="flex flex-col space-y-8 py-20">
                {/* Brand Badge */}
                <div className="inline-block rounded-full bg-amber-50/10 px-4 py-1.5 w-fit">
                  <span className="text-sm font-medium text-amber-100">
                    ✨ Welcome to AfroGlow
                  </span>
                </div>

                {/* Main Headline */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                  Your Gateway to African Beauty & Wellness Excellence
                </h1>
                
                {/* Subheadline */}
                <p className="text-lg md:text-xl text-gray-200 max-w-[600px]">
                  AfroGlow connects you with exceptional African beauty professionals. Book your perfect hair, makeup, skincare, and wellness services seamlessly.
                </p>

                {/* Trust Indicators */}
                <div className="flex flex-wrap gap-4 text-sm text-gray-200">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-amber-400 mr-2" />
                    <span>Verified Professionals</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-amber-400 mr-2" />
                    <span>Top-Rated Services</span>
                  </div>
                  <div className="flex items-center">
                    <Shield className="h-5 w-5 text-amber-400 mr-2" />
                    <span>Secure Booking</span>
                  </div>
                </div>

                {/* Search Box */}
                <div className="bg-white p-2 rounded-lg flex flex-col sm:flex-row gap-2 max-w-[800px]">
                  <div className="flex-1 flex items-center px-4 border-b sm:border-b-0 sm:border-r border-gray-200">
                    <Search className="h-5 w-5 text-gray-400 mr-2" />
                    <input 
                      type="text"
                      placeholder="Search Services, Salons, Stylists"
                      className="w-full py-2 focus:outline-none"
                    />
                  </div>
                  <div className="flex-1 flex items-center px-4">
                    <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                    <input 
                      type="text"
                      placeholder="What location?"
                      className="w-full py-2 focus:outline-none"
                    />
                  </div>
                  <Button className="bg-amber-600 hover:bg-amber-700 text-white px-8">
                    Search
                  </Button>
                </div>

                <Button className="bg-amber-600 hover:bg-amber-700 text-white w-fit px-8 py-3">
                  Find Your Perfect Stylist
                </Button>
              </div>

              {/* Right Image */}
              <div className="relative hidden lg:block h-full">
                <Image
                  src="/images/home-banner.png" // Replace with your image path
                  alt="Woman smiling with phone and coffee"
                  fill
                  className="object-cover object-center"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </section>

        {/* How It Works section */}
        <section className="w-full py-12 md:py-24 bg-white border-b border-gray-100">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Book With Confidence
              </h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl">
                Supporting Black beauty entrepreneurs while getting exceptional service
              </p>
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-3 relative">
              {/* Step 1 */}
              <div className="flex flex-col items-center text-center relative bg-white p-8 rounded-2xl border border-gray-100 hover:border-amber-100 transition-all">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 text-amber-600 font-bold text-2xl">
                  1
                </div>
                <h3 className="mt-6 text-xl font-semibold">Discover Talent</h3>
                <p className="mt-2 text-gray-600 max-w-[250px]">
                  Browse our curated selection of skilled Black beauty professionals
                </p>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center text-center relative bg-white p-8 rounded-2xl border border-gray-100 hover:border-amber-100 transition-all">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 text-amber-600 font-bold text-2xl">
                  2
                </div>
                <h3 className="mt-6 text-xl font-semibold">Book Instantly</h3>
                <p className="mt-2 text-gray-600 max-w-[250px]">
                  Schedule your appointment with our easy booking system
                </p>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center text-center relative bg-white p-8 rounded-2xl border border-gray-100 hover:border-amber-100 transition-all">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 text-amber-600 font-bold text-2xl">
                  3
                </div>
                <h3 className="mt-6 text-xl font-semibold">Get Glowing</h3>
                <p className="mt-2 text-gray-600 max-w-[250px]">
                  Experience professional beauty services tailored to you
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Services */}
        <section className="w-full py-12 md:py-24 bg-amber-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Popular Services
              </h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl">
                Expert care for natural hair, protective styles, skincare, and wellness
              </p>
            </div>

            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {/* Service cards will be dynamically rendered here */}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 bg-gradient-to-r from-amber-500 to-rose-500 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Join Our Growing Community
              </h2>
              <p className="max-w-[600px] text-white/90 md:text-xl">
                Be part of a platform that celebrates and elevates Black beauty professionals
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/business-signup">
                  <Button size="lg" className="bg-white text-amber-600 hover:bg-gray-100">
                    List Your Business
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                    Sign Up as Client
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
