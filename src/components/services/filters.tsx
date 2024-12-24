'use client'

import { Label } from "@/components/ui/label"
import { Star } from "lucide-react"
import { Slider } from "../ui/slider"

export function PriceRangeFilter() {
  return (
    <div className="space-y-2">
      <Label>Price Range</Label>
      <Slider
        defaultValue={[0, 500]}
        max={500}
        step={10}
        className="my-4"
      />
      <div className="flex justify-between text-sm text-gray-500">
        <span>$0</span>
        <span>$500+</span>
      </div>
    </div>
  )
}

export function DurationFilter() {
  return (
    <div className="space-y-2 mt-6">
      <Label>Duration (mins)</Label>
      <Slider
        defaultValue={[30, 180]}
        max={180}
        step={15}
        className="my-4"
      />
      <div className="flex justify-between text-sm text-gray-500">
        <span>30m</span>
        <span>3h</span>
      </div>
    </div>
  )
}

export function RatingFilter() {
  return (
    <div className="space-y-2 mt-6">
      <Label>Minimum Rating</Label>
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((rating) => (
          <button
            key={rating}
            className="p-2 hover:bg-rose-50 rounded-md transition-colors"
          >
            <Star className={`h-5 w-5 ${rating <= 4 ? 'fill-amber-400' : 'stroke-gray-300'}`} />
          </button>
        ))}
      </div>
    </div>
  )
} 
