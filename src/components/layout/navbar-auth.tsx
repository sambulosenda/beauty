// components/layout/navbar-auth.tsx
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
import { CalendarDays, User, LogIn } from "lucide-react"

export function NavbarAuth() {
  const { isSignedIn, user } = useUser()

  if (isSignedIn) {
    return (
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="hidden md:flex">
              <CalendarDays className="w-4 h-4 mr-2" />
              Bookings
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px]">
            <DropdownMenuLabel>My Bookings</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/bookings">
                View All Bookings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/services">
                Book New Service
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {user?.publicMetadata?.role === 'PROVIDER' && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="hidden md:flex"
            asChild
          >
            <Link href="/dashboard">
              <User className="w-4 h-4 mr-2" />
              Dashboard
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
                "hover:bg-rose-50 hover:text-rose-600 text-sm",
              userButtonPopoverActionButtonText: "text-sm",
              userButtonPopoverFooter: "hidden",
            },
          }}
        />
      </div>
    )
  }

  return (
    <div className="flex items-center gap-4">
      <SignInButton mode="modal">
        <Button size="sm" variant="ghost" className="hidden md:flex">
          <LogIn className="w-4 h-4 mr-2" />
          Sign In
        </Button>
      </SignInButton>
      
      <div className="hidden md:flex gap-2">
        <Link href="/sign-up">
          <Button size="sm" variant="outline">
            Sign Up
          </Button>
        </Link>
        <Link href="/business-signup">
          <Button 
            size="sm" 
            variant="default" 
            className="bg-rose-600 hover:bg-rose-700"
          >
            List Your Business
          </Button>
        </Link>
      </div>
      
      {/* Mobile sign in button is handled in the Sheet menu */}
    </div>
  )
}
