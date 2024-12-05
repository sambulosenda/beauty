// components/layout/navbar.tsx
import Link from "next/link"
import { NavbarAuth } from "./navbar-auth"

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-semibold text-gray-800">
              BeautyBook
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link 
              href="/services" 
              className="text-gray-600 hover:text-gray-900"
            >
              Services
            </Link>
            <NavbarAuth />
          </div>
        </div>
      </div>
    </nav>
  )
}
