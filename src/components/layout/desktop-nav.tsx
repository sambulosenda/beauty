import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { mainNavItems } from "@/lib/nav-items"

export function DesktopNav() {
  const pathname = usePathname()

  return (
    <div className="hidden md:flex md:items-center md:space-x-1">
    {mainNavItems.map((item) => (
      <Link
        key={item.href}
        href={item.href}
        className={cn(
          "px-3 py-2 text-[15px] font-medium rounded-md transition-colors",
          "hover:bg-amber-50 hover:text-amber-600",
          "font-outfit",
          pathname === item.href
            ? "bg-amber-50 text-amber-600"
            : "text-gray-600"
        )}
      >
        {item.title}
      </Link>
    ))}
  </div>
  )
}

