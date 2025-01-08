import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { 
  Mail, 
  MessageSquare, 
  Clock, 
  MapPin,
  ArrowRight,
  Phone
} from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export const metadata = {
  title: 'Contact Us | BeautyBook',
  description: 'Get in touch with our team for support, inquiries, or partnership opportunities.',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="absolute inset-0 opacity-25">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#8AB861]/20 to-[#E87C3E]/20 border border-[#8AB861]/20 backdrop-blur-sm mb-6">
              <span className="text-sm font-medium bg-gradient-to-r from-[#8AB861] to-[#E87C3E] bg-clip-text text-transparent">
                Get in Touch
              </span>
            </div>
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
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-white relative">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              <form className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-900">First Name</label>
                    <Input placeholder="John" className="w-full" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-900">Last Name</label>
                    <Input placeholder="Doe" className="w-full" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-900">Email</label>
                  <Input type="email" placeholder="john@example.com" className="w-full" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-900">Subject</label>
                  <Input placeholder="How can we help?" className="w-full" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-900">Message</label>
                  <Textarea 
                    placeholder="Tell us more about your inquiry..." 
                    className="w-full min-h-[150px]"
                  />
                </div>
                <Button 
                  size="lg"
                  className="w-full bg-gradient-to-r from-[#8AB861] to-[#E87C3E] hover:opacity-90 text-white rounded-full transition-all duration-300 hover:scale-105"
                >
                  Send Message
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="lg:sticky lg:top-8">
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
                  <div className="space-y-4">
                    {[
                      {
                        icon: Mail,
                        title: "Email Us",
                        content: "support@beautybook.com",
                        description: "We'll respond within 24 hours"
                      },
                      {
                        icon: Phone,
                        title: "Call Us",
                        content: "+1 (555) 123-4567",
                        description: "Mon-Fri from 9am to 6pm"
                      },
                      {
                        icon: MapPin,
                        title: "Visit Us",
                        content: "123 Beauty Street, San Francisco, CA 94105",
                        description: "Come say hello at our office"
                      }
                    ].map((item, index) => (
                      <div 
                        key={index}
                        className="flex gap-4 p-4 rounded-xl border border-gray-100 hover:border-[#8AB861]/50 transition-all duration-300 hover:shadow-lg"
                      >
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#8AB861]/20 to-[#E87C3E]/20 flex items-center justify-center">
                            <item.icon className="h-6 w-6 text-[#8AB861]" />
                          </div>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{item.title}</h3>
                          <p className="text-gray-600">{item.content}</p>
                          <p className="text-sm text-gray-500">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Business Hours */}
                <div className="p-6 rounded-2xl bg-gradient-to-r from-[#8AB861]/10 to-[#E87C3E]/10">
                  <div className="flex items-center gap-3 mb-4">
                    <Clock className="h-5 w-5 text-[#8AB861]" />
                    <h3 className="font-semibold text-gray-900">Business Hours</h3>
                  </div>
                  <div className="space-y-2">
                    {[
                      { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM" },
                      { day: "Saturday", hours: "10:00 AM - 4:00 PM" },
                      { day: "Sunday", hours: "Closed" }
                    ].map((schedule, index) => (
                      <div key={index} className="flex justify-between text-gray-600">
                        <span>{schedule.day}</span>
                        <span>{schedule.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Support */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
                  <div className="flex items-center gap-3 mb-4">
                    <MessageSquare className="h-5 w-5" />
                    <h3 className="font-semibold">Need Quick Support?</h3>
                  </div>
                  <p className="text-gray-300 mb-4">
                    Check out our help center for quick answers to common questions.
                  </p>
                  <Button 
                    variant="outline"
                    className="w-full border-2 border-white/20 bg-white/5 text-white rounded-full hover:bg-white/10 transition-all duration-300 hover:scale-105"
                  >
                    Visit Help Center
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="relative py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="absolute inset-0 opacity-25">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 mb-8">
              Join thousands of beauty professionals already using our platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="group bg-gradient-to-r from-[#8AB861] to-[#E87C3E] hover:opacity-90 text-white rounded-full px-8 transition-all duration-300 hover:scale-105 w-full sm:w-auto"
                asChild
              >
                <Link href="/business-signup" className="flex items-center justify-center">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white/20 bg-white/5 text-white rounded-full px-8 hover:bg-white/10 transition-all duration-300 hover:scale-105 w-full sm:w-auto"
              >
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

