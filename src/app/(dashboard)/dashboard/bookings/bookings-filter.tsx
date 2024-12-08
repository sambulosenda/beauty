'use client'

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Filter } from 'lucide-react'
import { useState } from "react"
import { useRouter } from "next/navigation"

interface BookingsFilterProps {
  initialStatus?: string[];
}

type StatusType = 'CONFIRMED' | 'PENDING' | 'CANCELLED';

export function BookingsFilter({ initialStatus = [] }: BookingsFilterProps) {
  const router = useRouter()
  const [status, setStatus] = useState<StatusType[]>(initialStatus as StatusType[])

  const handleStatusChange = (value: string) => {
    // setStatus((prev) =>
    //   prev.includes(value)
    //     ? prev.filter((item) => item !== value)
    //     : [...prev, value]
    // )
  }

  const applyFilters = () => {
    const searchParams = new URLSearchParams()
    if (status.length > 0) {
      searchParams.set('status', status.join(','))
    }
    router.push(`/bookings?${searchParams.toString()}`)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" aria-label="Filter bookings">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={status.includes('CONFIRMED')}
          onCheckedChange={() => handleStatusChange('CONFIRMED')}
        >
          Confirmed
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={status.includes('PENDING')}
          onCheckedChange={() => handleStatusChange('PENDING')}
        >
          Pending
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={status.includes('CANCELLED')}
          onCheckedChange={() => handleStatusChange('CANCELLED')}
        >
          Cancelled
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <Button onClick={applyFilters} className="w-full">Apply Filters</Button>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

