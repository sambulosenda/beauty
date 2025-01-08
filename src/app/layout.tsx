'use client'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import Navbar from '@/components/layout/nav'
import { Outfit } from 'next/font/google'
import { Toaster } from 'sonner'

const metadata = {
  title: 'Beauty Booking',
  description: 'Book beauty services with top professionals',
}

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700']
})
import { usePathname } from 'next/navigation'
import { Footer } from '@/components/layout/footer'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import React
 from 'react'
export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isDashboard = pathname?.startsWith('/dashboard')
  const [queryClient] = useState(() => new QueryClient())

  return (
    <ClerkProvider>
     <QueryClientProvider client={queryClient}>
      <html lang="en" suppressHydrationWarning className={outfit.variable}>
        <body className={outfit.className}>
          {!isDashboard && <Navbar />}
          {children}
          {!isDashboard && <Footer />}
          <Toaster />
        </body>
      </html>
      </QueryClientProvider>
    </ClerkProvider>
  )
}
