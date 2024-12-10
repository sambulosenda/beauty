import { Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact Us | AfroGlow',
  description: 'Get in touch with AfroGlow - Your premier platform for African and Black beauty & wellness services.',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-amber-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h1 className="text-4xl font-bold text-white sm:text-5xl">
            Connect With Us
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-white">
            We're here to support our community of beauty professionals and clients.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card className="border-0 shadow-none">
            <CardHeader>
              <CardTitle>Send us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="text-sm font-medium">
                      First Name
                    </label>
                    <Input id="firstName" placeholder="Enter your first name" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="text-sm font-medium">
                      Last Name
                    </label>
                    <Input id="lastName" placeholder="Enter your last name" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input id="email" type="email" placeholder="Enter your email" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="userType" className="text-sm font-medium">
                    I am a
                  </label>
                  <select 
                    id="userType" 
                    className="w-full rounded-md border border-gray-200 p-2"
                  >
                    <option value="">Select your role</option>
                    <option value="client">Client</option>
                    <option value="professional">Beauty Professional</option>
                    <option value="business">Business Owner</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <Input id="subject" placeholder="Enter subject" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Enter your message"
                    rows={5}
                  />
                </div>
                <Button className="w-full bg-amber-600 hover:bg-amber-700">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="border-0 shadow-none">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Mail className="h-6 w-6 text-amber-600 mt-1" />
                  <div>
                    <h3 className="font-semibold">Email Us</h3>
                    <p className="text-gray-600 mt-1">
                      hello@afroglow.com
                    </p>
                    <p className="text-gray-600">
                      partners@afroglow.com
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-none">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 text-amber-600 mt-1" />
                  <div>
                    <h3 className="font-semibold">Call Us</h3>
                    <p className="text-gray-600 mt-1">
                      +1 (888) 234-5678
                    </p>
                    <p className="text-gray-600">
                      Available: 9:00 AM - 7:00 PM EST
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-none">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-amber-600 mt-1" />
                  <div>
                    <h3 className="font-semibold">Visit Our Office</h3>
                    <p className="text-gray-600 mt-1">
                      1234 Cultural Way
                    </p>
                    <p className="text-gray-600">
                      Atlanta, GA 30303
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-none">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Clock className="h-6 w-6 text-amber-600 mt-1" />
                  <div>
                    <h3 className="font-semibold">Business Hours</h3>
                    <p className="text-gray-600 mt-1">
                      Monday - Friday: 9:00 AM - 7:00 PM EST
                    </p>
                    <p className="text-gray-600">
                      Saturday: 10:00 AM - 5:00 PM EST
                    </p>
                    <p className="text-gray-600">
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

