'use client'

import Link from "next/link"
import { NavbarAuth } from "./navbar-auth"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Search } from 'lucide-react'
import { useState } from "react"
import { DesktopNav } from "./desktop-nav"
import { MobileNav } from "./mobile-nav"
import { motion } from "framer-motion"
import { useScroll } from "framer-motion"
import { useMotionValueEvent } from "framer-motion"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 0)
  })

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "sticky top-0 z-50 w-full",
        isScrolled 
          ? "bg-white/95 backdrop-blur-md border-b border-gray-200" 
          : "bg-white border-b border-gray-200",
        "font-outfit"
      )}
      aria-label="Main Navigation"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo & Brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-amber-600 via-rose-600 to-rose-600 text-transparent bg-clip-text">
                AfroGlow
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <DesktopNav />

          {/* Search & Auth */}
          <div className="flex items-center space-x-4">
            {/* Search Button */}
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:flex hover:bg-rose-100 text-rose-700"
              onClick={() => setIsOpen(true)}
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Desktop Auth */}
            <div className="hidden md:block">
              <NavbarAuth />
            </div>

            {/* Mobile Menu */}
            <MobileNav />
          </div>
        </div>
      </div>
    </motion.nav>
  )
}

