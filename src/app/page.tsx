// app/page.tsx
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Sparkles, Clock, Shield, CheckCircle, Star, Users } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-amber-50 to-rose-50 overflow-hidden border-b border-gray-100">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 right-0 h-96 w-96 -translate-y-1/2 translate-x-1/2 rounded-full bg-amber-100/20 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 h-96 w-96 translate-y-1/2 -translate-x-1/2 rounded-full bg-rose-50/20 blur-3xl"></div>
          </div>
          
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-8 text-center">
              <div className="inline-block rounded-full bg-amber-50 px-4 py-1.5">
                <span className="text-sm font-medium text-amber-600">
                  Celebrating Black Beauty & Wellness
                </span>
              </div>
              
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none max-w-3xl mx-auto">
                  Your Crown Deserves <span className="text-amber-600 inline-block">Royal Treatment</span>
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl dark:text-gray-400 leading-relaxed">
                  Connect with skilled Black beauty professionals specializing in natural hair, protective styles, skincare, and holistic wellness services.
                </p>
              </div>

              <div className="flex flex-col items-center space-y-4">
                <div className="flex items-center space-x-8 text-sm text-gray-600">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-amber-500 mr-2" />
                    <span>500+ Black-Owned Businesses</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-amber-400 mr-2" />
                    <span>4.9/5 Rating</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-amber-500 mr-2" />
                    <span>10k+ Happy Clients</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                <Link href="/services" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full bg-amber-600 hover:bg-amber-700">
                    Find Your Stylist
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/business-signup" className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="w-full">
                    List Your Business
                  </Button>
                </Link>
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
