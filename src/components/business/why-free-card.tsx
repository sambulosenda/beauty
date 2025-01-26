import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import React from "react"
interface WhyFreeCardProps {
  title: string
  description: string
  icon: LucideIcon
  gradient: string
}

export function WhyFreeCard({ title, description, icon: Icon, gradient }: WhyFreeCardProps) {
  return (
    <div className="group p-8 rounded-2xl bg-white border border-gray-100 hover:border-[#8AB861]/50 transition-all duration-300 hover:shadow-xl">
      <div
        className={cn(
          "inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r mb-6 group-hover:scale-110 transition-transform duration-300",
          gradient,
        )}
      >
        <Icon className="h-6 w-6 text-white" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

