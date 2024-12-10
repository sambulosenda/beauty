import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Heart, Shield, Users, Clock, Star } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Us | BeautyBook',
  description: 'Learn more about BeautyBook and our mission to connect beauty professionals with clients.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-rose-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl">
            Transforming Beauty Services
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-white">
            Connecting talented beauty professionals with clients through seamless booking experiences.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            We're on a mission to revolutionize the beauty industry by making professional beauty services 
            more accessible than ever. Our platform empowers both service providers and clients to connect 
            and create beautiful experiences together.
          </p>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <Card className="border-0 shadow-none">
              <CardContent className="p-6 text-center">
                <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-rose-100 mb-4">
                  <Heart className="h-6 w-6 text-rose-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Passion for Beauty</h3>
                <p className="text-gray-600">
                  We believe in the transformative power of beauty services and their ability to boost confidence.
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-none">
              <CardContent className="p-6 text-center">
                <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-rose-100 mb-4">
                  <Shield className="h-6 w-6 text-rose-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Quality First</h3>
                <p className="text-gray-600">
                  We carefully vet all professionals to ensure the highest standards of service.
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-none">
              <CardContent className="p-6 text-center">
                <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-rose-100 mb-4">
                  <Clock className="h-6 w-6 text-rose-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Convenience</h3>
                <p className="text-gray-600">
                  Book appointments easily and manage your beauty routine on your schedule.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="flex items-center justify-center">
                <Users className="h-6 w-6 text-rose-600 mr-2" />
                <span className="text-4xl font-bold text-gray-900">1000+</span>
              </div>
              <p className="mt-2 text-lg text-gray-600">Beauty Professionals</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center">
                <Star className="h-6 w-6 text-rose-600 mr-2" />
                <span className="text-4xl font-bold text-gray-900">4.9</span>
              </div>
              <p className="mt-2 text-lg text-gray-600">Average Rating</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center">
                <Heart className="h-6 w-6 text-rose-600 mr-2" />
                <span className="text-4xl font-bold text-gray-900">50K+</span>
              </div>
              <p className="mt-2 text-lg text-gray-600">Happy Clients</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Join Our Growing Community
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/business-signup">
              <Button size="lg" className="bg-rose-600 hover:bg-rose-700">
                List Your Business
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/services">
              <Button variant="outline" size="lg">
                Browse Services
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

