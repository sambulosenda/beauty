'use client'

import Link from "next/link"
import { motion } from "framer-motion"

export function Footer() {
  return (
    <motion.footer 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="border-t border-gray-100 bg-white/80 backdrop-blur-sm"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12">
          {/* Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="space-y-4">
              <Link href="/" className="inline-block">
                <span className="text-2xl font-bold bg-gradient-to-r from-amber-600 via-rose-600 to-rose-600 text-transparent bg-clip-text">
                  AfroGlow
                </span>
              </Link>
              <p className="text-gray-500 text-sm">
                Connecting beauty professionals with clients. Book your next appointment with ease.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {['Services', 'About', 'Contact'].map((item) => (
                  <li key={item}>
                    <Link 
                      href={`/${item.toLowerCase()}`}
                      className="text-gray-500 hover:text-rose-600 transition-colors text-sm"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* For Businesses */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">For Businesses</h3>
              <ul className="space-y-2">
                {['Join as Provider', 'Business Features', 'Pricing'].map((item) => (
                  <li key={item}>
                    <Link 
                      href={`/business${item === 'Join as Provider' ? '/register' : ''}`}
                      className="text-gray-500 hover:text-rose-600 transition-colors text-sm"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Legal</h3>
              <ul className="space-y-2">
                {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                  <li key={item}>
                    <Link 
                      href={`/legal/${item.toLowerCase().replace(/ /g, '-')}`}
                      className="text-gray-500 hover:text-rose-600 transition-colors text-sm"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-100 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} AfroGlow. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {['Twitter', 'Instagram', 'Facebook'].map((social) => (
                <Link 
                  key={social}
                  href={`https://${social.toLowerCase()}.com`}
                  className="text-gray-400 hover:text-rose-600 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  )
} 
