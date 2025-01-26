'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Mail, Clock, MapPin, ArrowRight, Phone } from 'lucide-react'
import { Label } from '@/components/ui/label'

interface ContactInfoCardProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  content: string;
  description: string;
}

function ContactInfoCard({ icon: Icon, title, content, description }: ContactInfoCardProps) {
  return (
    <div className="flex gap-4 p-4 rounded-xl border border-gray-100 hover:border-[#8AB861]/50 transition-all duration-300 hover:shadow-lg">
      <div className="flex-shrink-0">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#8AB861]/20 to-[#E87C3E]/20 flex items-center justify-center">
          <Icon className="h-6 w-6 text-[#8AB861]" />
        </div>
      </div>
      <div>
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <p className="text-gray-600">{content}</p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
  )
}

function BusinessHours({ hours }: { hours: { day: string; time: string }[] }) {
  return (
    <div className="p-6 rounded-2xl bg-gradient-to-r from-[#8AB861]/10 to-[#E87C3E]/10">
      <div className="flex items-center gap-3 mb-4">
        <Clock className="h-5 w-5 text-[#8AB861]" />
        <h3 className="font-semibold text-gray-900">Business Hours</h3>
      </div>
      <div className="space-y-2">
        {hours.map((schedule, index) => (
          <div key={index} className="flex justify-between text-gray-600">
            <span>{schedule.day}</span>
            <span>{schedule.time}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="absolute inset-0 opacity-25">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            We&apos;re Here to Help
            <span className="block mt-2 bg-gradient-to-r from-[#8AB861] via-[#97C26B] to-[#E87C3E] bg-clip-text text-transparent">
              Let&apos;s Chat
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-8">
            Have questions or need assistance? Our team is here to support you every step of the way.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
            <form className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="first-name">First Name</Label>
                  <Input id="first-name" placeholder="First Name" />
                </div>
                <div>
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input id="last-name" placeholder="Last Name" />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="Email" type="email" />
              </div>
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="Subject" />
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Your message..." />
              </div>
              <Button className="w-full bg-gradient-to-r from-[#8AB861] to-[#E87C3E] text-white rounded-full">
                Send Message <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
            <div className="space-y-4">
              {[
                {
                  icon: Mail,
                  title: 'Email Us',
                  content: 'support@beautybook.com',
                  description: 'We respond within 24 hours',
                },
                {
                  icon: Phone,
                  title: 'Call Us',
                  content: '+1 (555) 123-4567',
                  description: 'Mon-Fri, 9am-6pm',
                },
                {
                  icon: MapPin,
                  title: 'Visit Us',
                  content: '123 Beauty Street, San Francisco, CA 94105',
                  description: 'Drop by our office!',
                },
              ].map((info, idx) => (
                <ContactInfoCard key={idx} {...info} />
              ))}
            </div>
            <BusinessHours
              hours={[
                { day: 'Monday - Friday', time: '9:00 AM - 6:00 PM' },
                { day: 'Saturday', time: '10:00 AM - 4:00 PM' },
                { day: 'Sunday', time: 'Closed' },
              ]}
            />
          </div>
        </div>
      </section>
    </div>
  )
}
