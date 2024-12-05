// components/layout/navbar-auth.tsx
'use client'

import { UserButton, SignInButton, useUser } from "@clerk/nextjs"
import Link from "next/link"

export function NavbarAuth() {
  const { isSignedIn } = useUser()

  if (isSignedIn) {
    return (
      <>
        <Link 
          href="/bookings" 
          className="text-gray-600 hover:text-gray-900"
        >
          My Bookings
        </Link>
        <UserButton 
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: "w-10 h-10"
            }
          }}
        />
      </>
    )
  }

  return (
    <SignInButton mode="modal">
      <button className="bg-rose-600 text-white px-4 py-2 rounded-md hover:bg-rose-700">
        Sign In
      </button>
    </SignInButton>
  )
}