"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"

const categories = [
  { id: 'hair', name: 'Hair' },
  { id: 'nails', name: 'Nails' },
  { id: 'makeup', name: 'Makeup' },
  { id: 'skincare', name: 'Skincare' },
  { id: 'massage', name: 'Massage' },
  { id: 'spa', name: 'Spa' },
]

interface CategoriesProps {
  selectedCategory?: string
}

export function Categories({ selectedCategory }: CategoriesProps) {
  return (
    <div className="space-y-2">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/services?category=${category.id}`}
          className={cn(
            "block px-3 py-2 text-sm rounded-lg hover:bg-gray-100 transition-colors",
            selectedCategory === category.id && "bg-rose-50 text-rose-600 hover:bg-rose-50"
          )}
        >
          {category.name}
        </Link>
      ))}
    </div>
  )
} 
