import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <header className="border-b">
      <div className="container flex h-16 items-center px-4">
        <Link href="/" className="font-bold">
          Beauty Booking
        </Link>
        
        <nav className="ml-auto flex gap-4">
          <Link href="/services">
            <Button variant="ghost">Services</Button>
          </Link>
          <Link href="/bookings">
            <Button variant="ghost">My Bookings</Button>
          </Link>
          <Link href="/login">
            <Button variant="ghost">Login</Button>
          </Link>
          <Link href="/register">
            <Button>Sign up</Button>
          </Link>
        </nav>
      </div>
    </header>
  )
}