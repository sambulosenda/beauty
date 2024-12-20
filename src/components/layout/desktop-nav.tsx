"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { mainNavItems } from "@/lib/nav-items"

export function DesktopNav() {
  const pathname = usePathname()

  return (
    <div className="hidden md:flex md:items-center md:space-x-1">
      {mainNavItems.map((item) => (
        <motion.div
          key={item.href}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            href={item.href}
            className={cn(
              "px-3 py-2 text-[15px] font-medium rounded-md",
              "transition-all duration-200",
              "hover:bg-amber-50 hover:text-amber-600",
              "relative",
              pathname === item.href
                ? "bg-amber-50 text-amber-600"
                : "text-gray-600"
            )}
          >
            {pathname === item.href && (
              <motion.span
                layoutId="underline"
                className="absolute left-0 bottom-0 w-full h-0.5 bg-amber-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
            )}
            {item.title}
          </Link>
        </motion.div>
      ))}
    </div>
  )
}

