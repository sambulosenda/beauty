import Link from "next/link"
import { mainNavItems } from "@/lib/nav-items"

export function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-rose-600 text-transparent bg-clip-text">
                AfroGlow
              </span>
            </Link>
            <p className="text-sm text-gray-600">
              Connecting talented beauty professionals with clients through seamless booking experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {mainNavItems.map((item) => (
                <li key={item.href}>
                  <Link 
                    href={item.href}
                    className="text-sm text-gray-600 hover:text-amber-600 transition-colors"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/services?category=Hair"
                  className="text-sm text-gray-600 hover:text-amber-600 transition-colors"
                >
                  Hair Styling
                </Link>
              </li>
              <li>
                <Link 
                  href="/services?category=Nails"
                  className="text-sm text-gray-600 hover:text-amber-600 transition-colors"
                >
                  Nail Care
                </Link>
              </li>
              <li>
                <Link 
                  href="/services?category=Facial"
                  className="text-sm text-gray-600 hover:text-amber-600 transition-colors"
                >
                  Facial Treatments
                </Link>
              </li>
              <li>
                <Link 
                  href="/services?category=Body"
                  className="text-sm text-gray-600 hover:text-amber-600 transition-colors"
                >
                  Body Treatments
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-sm text-gray-600">
                1234 Cultural Way
              </li>
              <li className="text-sm text-gray-600">
                Atlanta, GA 30303
              </li>
              <li className="text-sm text-gray-600">
                hello@afroglow.com
              </li>
              <li className="text-sm text-gray-600">
                +1 (888) 234-5678
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} AfroGlow. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link 
                href="/privacy" 
                className="text-sm text-gray-600 hover:text-amber-600 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link 
                href="/terms" 
                className="text-sm text-gray-600 hover:text-amber-600 transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 
