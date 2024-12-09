// components/dashboard/nav.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { 
  LayoutDashboard, 
  Calendar, 
  Scissors, 
  Clock, 
  Settings,
  Users,
  Bell,
  BookOpen,
  BarChart,
  HelpCircle
} from 'lucide-react'
import { UserButton } from '@clerk/nextjs'

const mainNavItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    color: 'text-sky-500'
  },
  {
    title: 'Calendar',
    href: '/dashboard/calendar',
    icon: Calendar,
    color: 'text-violet-500'
  },
  {
    title: 'Bookings',
    href: '/dashboard/bookings',
    icon: BookOpen,
    color: 'text-indigo-500'
  },
]

const businessNavItems = [
  {
    title: 'Services',
    href: '/dashboard/services',
    icon: Scissors,
    color: 'text-pink-500'
  },
  {
    title: 'Availability',
    href: '/dashboard/availability',
    icon: Clock,
    color: 'text-orange-500'
  },
  {
    title: 'Customers',
    href: '/dashboard/customers',
    icon: Users,
    color: 'text-green-500'
  },
  {
    title: 'Analytics',
    href: '/dashboard/analytics',
    icon: BarChart,
    color: 'text-blue-500'
  },
]

const bottomNavItems = [
  {
    title: 'Notifications',
    href: '/dashboard/notifications',
    icon: Bell,
    color: 'text-yellow-500'
  },
  {
    title: 'Help & Support',
    href: '/dashboard/support',
    icon: HelpCircle,
    color: 'text-purple-500'
  },
  {
    title: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
    color: 'text-gray-500'
  }
]

export function DashboardNav() {
  const pathname = usePathname()

  return (
    <div className="w-64 min-h-screen bg-white border-r border-gray-200">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">
            BeautyBook Pro
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Business Dashboard
          </p>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 px-3 py-4">
          <div className="space-y-8">
            {/* Main Menu */}
            <div>
              <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Main Menu
              </p>
              <div className="mt-2 space-y-1">
                {mainNavItems.map((item) => (
                  <NavItem key={item.href} item={item} pathname={pathname} />
                ))}
              </div>
            </div>

            {/* Business Management */}
            <div>
              <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Business
              </p>
              <div className="mt-2 space-y-1">
                {businessNavItems.map((item) => (
                  <NavItem key={item.href} item={item} pathname={pathname} />
                ))}
              </div>
            </div>
          </div>
        </nav>

        {/* Bottom Section */}
        <div className="p-4 border-t border-gray-200 space-y-4">
          {/* Bottom Navigation */}
          <div className="space-y-1">
            {bottomNavItems.map((item) => (
              <NavItem key={item.href} item={item} pathname={pathname} />
            ))}
          </div>

          {/* User Profile */}
          <div className="pt-4 border-t">
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50">
              <UserButton afterSignOutUrl="/" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  Account Settings
                </p>
                <p className="text-xs text-gray-500 truncate">
                  Manage your profile
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

type NavItemProps = {
  item: {
    title: string
    href: string
    icon: any
    color: string
  }
  pathname: string
}

function NavItem({ item, pathname }: NavItemProps) {
  const isActive = pathname === item.href
  
  return (
    <Link
      href={item.href}
      prefetch={true}
      className={cn(
        'flex items-center gap-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
        isActive 
          ? 'bg-gray-100 text-gray-900' 
          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
      )}
    >
      <item.icon className={cn('h-5 w-5', item.color)} />
      {item.title}
    </Link>
  )
}
