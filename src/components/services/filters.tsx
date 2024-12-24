'use client'

import { Label } from "@/components/ui/label"
import { Star } from "lucide-react"
import { Slider } from "../ui/slider"
import { useState } from 'react'

interface FilterProps {
  onFilterChange: (type: string, value: any) => void
}

export function PriceRangeFilter({ onFilterChange }: FilterProps) {
  const [priceRange, setPriceRange] = useState([0, 500])

  const handleValueChange = (value: number[]) => {
    setPriceRange(value)
    onFilterChange('priceRange', value)
  }

  return (
    <div className="space-y-2">
      <Label>Price Range</Label>
      <Slider
        defaultValue={[0, 500]}
        max={500}
        step={10}
        className="my-4"
        onValueChange={handleValueChange}
      />
      <div className="flex justify-between text-sm text-gray-500">
        <span>${priceRange[0]}</span>
        <span>${priceRange[1]}+</span>
      </div>
    </div>
  )
}

export function DurationFilter({ onFilterChange }: FilterProps) {
  const [duration, setDuration] = useState([30, 180])

  const handleValueChange = (value: number[]) => {
    setDuration(value)
    onFilterChange('duration', value)
  }

  return (
    <div className="space-y-2 mt-6">
      <Label>Duration (mins)</Label>
      <Slider
        defaultValue={[30, 180]}
        max={180}
        step={15}
        className="my-4"
        onValueChange={handleValueChange}
      />
      <div className="flex justify-between text-sm text-gray-500">
        <span>{duration[0]}m</span>
        <span>{duration[1]}m</span>
      </div>
    </div>
  )
}

export function RatingFilter({ onFilterChange }: FilterProps) {
  const [selectedRating, setSelectedRating] = useState<number | null>(null)

  return (
    <div className="space-y-2 mt-6">
      <Label>Minimum Rating</Label>
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((rating) => (
          <button
            key={rating}
            className={`p-2 hover:bg-rose-50 rounded-md transition-colors ${
              rating <= (selectedRating || 0) ? 'bg-rose-50' : ''
            }`}
            onClick={() => {
              setSelectedRating(rating)
              onFilterChange('rating', rating)
            }}
          >
            <Star className={`h-5 w-5 ${rating <= (selectedRating || 0) ? 'fill-amber-400' : 'stroke-gray-300'}`} />
          </button>
        ))}
      </div>
    </div>
  )
} 
