// components/dashboard/nav.tsx
'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

export function DashboardNav() {
  const pathname = usePathname()

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-gray-100 text-gray-800 w-64">
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
          Provider Dashboard
        </h2>
        <div className="space-y-1">
          <Link
            href="/dashboard"
            className={cn(
              'text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-gray-900 hover:bg-gray-200 rounded-lg transition',
              pathname === '/dashboard' ? 'text-gray-900 bg-gray-200' : 'text-gray-500',
            )}
          >
            <div className="flex items-center flex-1 text-sky-500">
              Dashboard
            </div>
          </Link>
          <Link
            href="/dashboard/calendar"
            className={cn(
              'text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-gray-900 hover:bg-gray-200 rounded-lg transition',
              pathname === '/dashboard/calendar' ? 'text-gray-900 bg-gray-200' : 'text-gray-500',
            )}
          >
            <div className="flex items-center flex-1 text-violet-500">
              Calendar
            </div>
          </Link>
          <Link
            href="/dashboard/services"
            className={cn(
              'text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-gray-900 hover:bg-gray-200 rounded-lg transition',
              pathname === '/dashboard/services' ? 'text-gray-900 bg-gray-200' : 'text-gray-500',
            )}
          >
            <div className="flex items-center flex-1 text-pink-700">
              Services
            </div>
          </Link>
          <Link
            href="/dashboard/availability"
            className={cn(
              'text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-gray-900 hover:bg-gray-200 rounded-lg transition',
              pathname === '/dashboard/availability' ? 'text-gray-900 bg-gray-200' : 'text-gray-500',
            )}
          >
            <div className="flex items-center flex-1 text-orange-700">
              Availability
            </div>
          </Link>
          <Link
            href="/dashboard/settings"
            className={cn(
              'text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-gray-900 hover:bg-gray-200 rounded-lg transition',
              pathname === '/dashboard/settings' ? 'text-gray-900 bg-gray-200' : 'text-gray-500',
            )}
          >
            <div className="flex items-center flex-1">
              Settings
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}