'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { NavbarAuth } from "./navbar-auth"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState, useEffect } from "react"
import React from "react"

const routes = [
  {
    href: "/services",
    label: "Services",
  },
  {
    href: "/about",
    label: "About",
  },
  {
    href: "/contact",
    label: "Contact",
  },
]

export default function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full border-b transition-colors duration-200",
      isScrolled ? "bg-white shadow-sm" : "bg-white"
    )}>
      <nav className="container mx-auto px-4 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-2"
          >
            <span className="text-xl font-bold bg-gradient-to-r from-[#8AB861] to-[#E87C3E] bg-clip-text text-transparent">
              BeautyBook
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-[#8AB861]",
                  pathname === route.href
                    ? "text-[#8AB861]"
                    : "text-gray-600"
                )}
              >
                {route.label}
              </Link>
            ))}
          </div>

          {/* Desktop Auth & Business Button */}
          <div className="hidden md:flex items-center space-x-4">
            <NavbarAuth />
            <Link href="/business">
              <Button 
                className="bg-gradient-to-r from-[#8AB861] to-[#E87C3E] hover:opacity-90 text-white"
              >
                For Business
              </Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4">
                  {routes.map((route) => (
                    <Link
                      key={route.href}
                      href={route.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "block px-2 py-1 text-lg transition-colors hover:text-[#8AB861]",
                        pathname === route.href
                          ? "text-[#8AB861]"
                          : "text-gray-600"
                      )}
                    >
                      {route.label}
                    </Link>
                  ))}
                  <div className="mt-4 space-y-4">
                    <NavbarAuth />
                    <Link href="/business" onClick={() => setIsOpen(false)}>
                      <Button 
                        className="w-full bg-gradient-to-r from-[#8AB861] to-[#E87C3E] hover:opacity-90 text-white"
                      >
                        For Business
                      </Button>
                    </Link>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  )
}
