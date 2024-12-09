import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { NavbarAuth } from "./navbar-auth"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu } from 'lucide-react'
import { mainNavItems } from "@/lib/nav-items"

export function MobileNav() {
  const pathname = usePathname()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <nav className="flex flex-col space-y-4 mt-4">
          {mainNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-rose-600 p-2 rounded-lg",
                "font-outfit",
                pathname === item.href
                  ? "bg-rose-50 text-rose-600"
                  : "text-gray-600"
              )}
            >
              {item.title}
            </Link>
          ))}
          <div className="border-t pt-4">
            <NavbarAuth />
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  )
}

