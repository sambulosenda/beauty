"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CalendarIcon, MapPin, Search, Clock, Ticket, Award, Scissors, Star } from 'lucide-react'
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function Home() {
  const [treatment, setTreatment] = useState("")
  const [location, setLocation] = useState("")
  const [date, setDate] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle search logic here
    console.log({ treatment, location, date })
  }

  return (
    <div className="min-h-screen bg-[#FDF8F6] mx-auto">
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#FDF8F6] to-white py-20">
          <div className="container mx-auto px-4">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative z-10"
              >
                <span className="text-sm font-medium text-rose-500">Book Beauty & Wellness</span>
                <h1 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl xl:text-6xl/none">
                  Behind every perfect appointment
                </h1>
                <p className="mt-6 text-lg text-gray-600">
                  Find and book beauty treatments instantly at the best salons near you
                </p>

                <div className="mt-10 overflow-hidden rounded-3xl bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
                  <form onSubmit={handleSearch} className="divide-y divide-gray-100">
                    <div className="relative p-4">
                      <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                      <Input
                        type="text"
                        placeholder="Search treatments, services..."
                        className="border-0 pl-10 shadow-none focus-visible:ring-0"
                        value={treatment}
                        onChange={(e) => setTreatment(e.target.value)}
                      />
                    </div>
                    <div className="relative p-4">
                      <MapPin className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                      <Input
                        type="text"
                        placeholder="Enter postcode or area"
                        className="border-0 pl-10 shadow-none focus-visible:ring-0"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      />
                    </div>
                    <div className="relative p-4">
                      <CalendarIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                      <Input
                        type="text"
                        placeholder="Any date"
                        className="border-0 pl-10 shadow-none focus-visible:ring-0"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                      />
                    </div>
                    <div className="p-4">
                      <Button type="submit" className="w-full bg-rose-500 text-white hover:bg-rose-600">
                        Search Now
                      </Button>
                    </div>
                  </form>
                </div>
              </motion.div>

              {/* Right Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative hidden lg:block"
              >
                <div className="relative h-[600px] overflow-hidden rounded-3xl">
                  <Image
                    src="/images/home-banner.png"
                    alt="Beauty and wellness"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-[#F5EFFA] mix-blend-multiply" />
                </div>
              </motion.div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
        </section>

        {/* Features Section */}
        <section className="bg-white py-24">
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
            >
              The brighter way to book beauty
            </motion.h2>

            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: Ticket,
                  title: "Smart prices",
                  description: "Just book last-minute, or off-peak",
                  color: "bg-[#F3F0FF]",
                  iconColor: "text-[#7C3AED]",
                },
                {
                  icon: Clock,
                  title: "Book 24/7",
                  description: "From bed, or the bus",
                  color: "bg-[#ECFDF5]",
                  iconColor: "text-[#059669]",
                },
                {
                  icon: Award,
                  title: "Choice of top-rated salons",
                  description: "Thousands of venues (and reviews)",
                  color: "bg-[#FFF1F2]",
                  iconColor: "text-[#E11D48]",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center text-center"
                >
                  <div className={`rounded-2xl p-4 ${feature.color}`}>
                    <feature.icon className={`h-8 w-8 ${feature.iconColor}`} />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-gray-900">{feature.title}</h3>
                  <p className="mt-2 text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Services Section */}
        <section className="bg-[#FDF8F6] py-24">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Popular Services
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Discover our most booked treatments and services
              </p>
            </motion.div>

            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { title: "Haircut & Styling", image: "/placeholder.svg?height=300&width=400&text=Haircut+%26+Styling" },
                { title: "Manicure & Pedicure", image: "/placeholder.svg?height=300&width=400&text=Manicure+%26+Pedicure" },
                { title: "Facial Treatments", image: "/placeholder.svg?height=300&width=400&text=Facial+Treatments" },
                { title: "Massage Therapy", image: "/placeholder.svg?height=300&width=400&text=Massage+Therapy" },
              ].map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative overflow-hidden rounded-lg"
                >
                  <Image
                    src={service.image}
                    alt={service.title}
                    width={400}
                    height={300}
                    className="h-64 w-full object-cover transition duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-semibold text-white">{service.title}</h3>
                    <p className="mt-2 text-sm text-white/80">Book now</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Professional CTA Section - Clean theme */}
        <section className="relative bg-rose-50 py-24 overflow-hidden">
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(45deg,#00000003_1px,transparent_1px)] bg-[length:30px_30px]" />
          
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative z-10">
                <span className="inline-block rounded-full bg-rose-100 px-4 py-1.5 text-sm font-medium text-rose-600 mb-6">
                  For Professionals
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                  Own a hair & beauty business?
                  <span className="block mt-2">Bring it online.</span>
                </h2>
                <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                  We'll help you build your business (and client base) with our easy-to-use salon software.
                </p>
                <Button className="mt-8 bg-rose-500 hover:bg-rose-600 text-white font-semibold px-8 py-6 text-lg shadow-md hover:shadow-lg transition-all duration-200">
                  Partner with us
                </Button>
              </div>

              <div className="relative hidden lg:block">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="relative"
                >
                  <Image
                    src="/images/dashboard-preview.png"
                    alt="Salon software dashboard"
                    width={600}
                    height={400}
                    className="rounded-xl shadow-xl"
                  />
                  <div className="absolute -bottom-6 -left-6 bg-white rounded-lg p-4 shadow-lg border border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="h-3 w-3 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-gray-900 font-medium">Online Bookings Active</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>


    </div>
  )
}

