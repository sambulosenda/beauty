'use client'

import { UserButton, SignInButton, useUser } from "@clerk/nextjs"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CalendarDays, User, LogIn } from 'lucide-react'
import React from "react"

export function NavbarAuth() {
  const { isSignedIn, user } = useUser()

  if (isSignedIn) {
    return (
      <div className="flex items-center gap-2 sm:gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm" 
              className="hidden sm:flex text-[15px] hover:bg-gradient-to-r hover:from-[#8AB861]/10 hover:to-[#E87C3E]/10"
            >
              <CalendarDays className="w-4 h-4 mr-2" />
              <span className="hidden md:inline">Bookings</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px] text-[15px]">
            <DropdownMenuLabel>My Bookings</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/bookings" className="w-full">
                View All Bookings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/services" className="w-full">
                Book New Service
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {user?.publicMetadata?.role === 'PROVIDER' && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="hidden sm:flex text-[15px] hover:bg-gradient-to-r hover:from-[#8AB861]/10 hover:to-[#E87C3E]/10"
            asChild
          >
            <Link href="/dashboard">
              <User className="w-4 h-4 mr-2" />
              <span className="hidden md:inline">Dashboard</span>
            </Link>
          </Button>
        )}

        <UserButton 
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: "h-8 w-8",
              userButtonPopoverCard: "w-[240px]",
              userButtonPopoverActionButton: 
                "hover:bg-gradient-to-r hover:from-[#8AB861]/10 hover:to-[#E87C3E]/10 text-[15px]",
              userButtonPopoverActionButtonText: "text-[15px]",
              userButtonPopoverFooter: "hidden",
            },
          }}
        />
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2 sm:gap-4">
      <SignInButton mode="modal">
        <Button 
          size="sm" 
          variant="ghost" 
          className="hidden sm:flex text-[15px] hover:bg-gradient-to-r hover:from-[#8AB861]/10 hover:to-[#E87C3E]/10"
        >
          <LogIn className="w-4 h-4 mr-2" />
          <span className="hidden md:inline">Sign In</span>
        </Button>
      </SignInButton>
      
      <div className="hidden sm:flex gap-2">
        <Link href="/sign-up">
          <Button 
            size="sm" 
            variant="outline" 
            className="text-[15px] border-[#8AB861] text-[#8AB861] hover:bg-[#8AB861]/10"
          >
            Sign Up
          </Button>
        </Link>
      </div>
    </div>
  )
}

