import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { mainNavItems } from "@/lib/nav-items"
import React from 'react'
export function DesktopNav() {
  const pathname = usePathname()

  return (
    <div className="hidden md:flex md:items-center md:space-x-1">
      {mainNavItems.map((item) => (
        <div
          key={item.href}
          className="transform transition-transform duration-200 hover:scale-105 active:scale-95"
        >
          <Link
            href={item.href}
            className={cn(
              "px-3 py-2 text-[15px] font-medium rounded-md",
              "transition-all duration-200",
              "hover:bg-rose-50 hover:text-rose-700",
              "relative",
              pathname === item.href
                ? "bg-rose-50 text-rose-700"
                : "text-gray-600"
            )}
            aria-label={item.title}
          >
            {pathname === item.href && (
              <span
                className="absolute left-0 bottom-0 w-full h-0.5 bg-rose-700 transition-opacity duration-200 opacity-100"
              />
            )}
            {item.title}
          </Link>
        </div>
      ))}
    </div>
  )
}