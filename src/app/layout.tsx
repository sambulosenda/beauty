import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import { Outfit } from 'next/font/google'
import Navbar from '@/components/layout/nav'

const outfit = Outfit({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-outfit',
})

export const metadata = {
  title: 'Beauty Booking',
  description: 'Book beauty services with top professionals',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${outfit.variable} ${outfit.className} font-sans`}>
          <Navbar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
