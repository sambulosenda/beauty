'use client'

import React from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'

type Customer = {
  id: string
  name: string | null
  email: string
  createdAt: Date
  customerBookings: {
    id: string
    status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED'
  }[]
}

export const columns: ColumnDef<Customer>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'createdAt',
    header: 'Customer Since',
    cell: ({ row }) => {
      return format(new Date(row.original.createdAt), 'MMM d, yyyy')
    },
  },
  {
    accessorKey: 'customerBookings',
    header: 'Total Bookings',
    cell: ({ row }) => {
      return row.original.customerBookings.length
    },
  },
  {
    accessorKey: 'lastBooking',
    header: 'Last Booking',
    cell: ({ row }) => {
      const lastBooking = row.original.customerBookings[0]
      if (!lastBooking) return 'No bookings'
      
      return (
        <Badge 
          variant={
            lastBooking.status === 'COMPLETED' ? 'default' :
            lastBooking.status === 'CONFIRMED' ? 'outline' :
            lastBooking.status === 'CANCELLED' ? 'destructive' :
            'secondary'
          }
        >
          {lastBooking.status}
        </Badge>
      )
    },
  },
]
