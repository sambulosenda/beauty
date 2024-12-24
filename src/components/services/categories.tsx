"use client"

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'

const categories = [
  { id: 'all', name: 'All Services', icon: '✨' },
  { id: 'massage', name: 'Massage', icon: '💆' },
  { id: 'hair', name: 'Hair', icon: '💇' },
  { id: 'nails', name: 'Nails', icon: '💅' },
  { id: 'facial', name: 'Facial', icon: '👩' },
  { id: 'makeup', name: 'Makeup', icon: '💄' },
  { id: 'spa', name: 'Spa', icon: '🧖' },
  { id: 'body', name: 'Body', icon: '🧴' },
]

export function Categories({ selectedCategory }: { selectedCategory?: string }) {
  const router = useRouter()

  return (
    <div className="space-y-2">
      {categories.map((category) => (
        <Button
          key={category.id}
          variant="ghost"
          className={cn(
            'w-full justify-start text-gray-600 hover:text-rose-600 hover:bg-rose-50',
            selectedCategory === category.id && 'bg-rose-50 text-rose-600'
          )}
          onClick={() => {
            router.push(`/services?category=${category.id}`)
          }}
        >
          <span className="mr-2">{category.icon}</span>
          {category.name}
        </Button>
      ))}
    </div>
  )
} 
