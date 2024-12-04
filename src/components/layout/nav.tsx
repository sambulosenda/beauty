import Link from "next/link"
import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <header className="border-b">
      <div className="container flex h-16 items-center px-4">
        <Link href="/" className="font-bold">
          Beauty Booking
        </Link>
        
        <nav className="ml-auto flex items-center gap-4">
          <Link href="/services">
            <Button variant="ghost">Services</Button>
          </Link>
          
          <SignedIn>
            <Link href="/dashboard">
              <Button variant="ghost">Dashboard</Button>
            </Link>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          
          <SignedOut>
            <Link href="/sign-in">
              <Button variant="ghost">Sign in</Button>
            </Link>
            <Link href="/sign-up">
              <Button>Sign up</Button>
            </Link>
          </SignedOut>
        </nav>
      </div>
    </header>
  )
}