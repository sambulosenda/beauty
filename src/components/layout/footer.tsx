import Link from "next/link"
import { mainNavItems } from "@/lib/nav-items"

export function Footer() {
  return (
    <footer className="bg-gray-900 py-12 text-white">
    <div className="container mx-auto px-4">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="text-lg font-semibold">About Us</h3>
          <ul className="mt-4 space-y-2">
            <li><Link href="/about" className="text-gray-400 hover:text-white">Our Story</Link></li>
            <li><Link href="/team" className="text-gray-400 hover:text-white">Team</Link></li>
            <li><Link href="/careers" className="text-gray-400 hover:text-white">Careers</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold">For Clients</h3>
          <ul className="mt-4 space-y-2">
            <li><Link href="/how-it-works" className="text-gray-400 hover:text-white">How It Works</Link></li>
            <li><Link href="/safety" className="text-gray-400 hover:text-white">Safety</Link></li>
            <li><Link href="/faq" className="text-gray-400 hover:text-white">FAQ</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold">For Professionals</h3>
          <ul className="mt-4 space-y-2">
            <li><Link href="/join" className="text-gray-400 hover:text-white">Join as Pro</Link></li>
            <li><Link href="/resources" className="text-gray-400 hover:text-white">Resources</Link></li>
            <li><Link href="/pro-faq" className="text-gray-400 hover:text-white">Pro FAQ</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Connect</h3>
          <ul className="mt-4 space-y-2">
            <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact Us</Link></li>
            <li><Link href="/support" className="text-gray-400 hover:text-white">Support</Link></li>
            <li><Link href="/blog" className="text-gray-400 hover:text-white">Blog</Link></li>
          </ul>
        </div>
      </div>
      <div className="mt-12 border-t border-gray-800 pt-8 text-center">
        <p>&copy; {new Date().getFullYear()} BeautyBook. All rights reserved.</p>
      </div>
    </div>
  </footer>
  )
} 
