'use client'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import Navbar from '@/components/layout/nav'
import { Outfit } from 'next/font/google'

// export const metadata = {
//   title: 'Beauty Booking',
//   description: 'Book beauty services with top professionals',
// }

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700']
})
import { usePathname } from 'next/navigation'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isDashboard = pathname?.startsWith('/dashboard')

  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning className={outfit.variable}>
        <body className={outfit.className}>
          {!isDashboard && <Navbar />}
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
