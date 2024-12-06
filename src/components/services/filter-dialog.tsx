'use client'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { SlidersHorizontal } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface FilterDialogProps {
  onFilterChange: (filters: any) => void
}

export function FilterDialog({ onFilterChange }: FilterDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className="hidden md:flex hover:bg-gray-50"
        >
          <SlidersHorizontal className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Filter Services</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          {/* Price Range */}
          <div className="space-y-4">
            <h4 className="font-medium">Price Range</h4>
            <RadioGroup defaultValue="all">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="all" />
                <Label htmlFor="all">All Prices</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="0-50" id="0-50" />
                <Label htmlFor="0-50">$0 - $50</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="51-100" id="51-100" />
                <Label htmlFor="51-100">$51 - $100</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="101+" id="101+" />
                <Label htmlFor="101+">$101+</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Duration */}
          <div className="space-y-4">
            <h4 className="font-medium">Duration</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="30min" />
                <label htmlFor="30min">Under 30 mins</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="60min" />
                <label htmlFor="60min">30-60 mins</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="90min" />
                <label htmlFor="90min">60-90 mins</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="90plus" />
                <label htmlFor="90plus">90+ mins</label>
              </div>
            </div>
          </div>

          {/* Apply Button */}
          <Button 
            className="w-full"
            onClick={() => {
              // Implement filter logic here
              onFilterChange({
                // Add filter values
              })
            }}
          >
            Apply Filters
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
} 
