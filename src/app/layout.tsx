import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/layout/theme-provider'
import { Navbar } from '@/components/layout/nav'

const inter = Inter({ subsets: ['latin'] })

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
        <body className={inter.className}>
          <Navbar />
          
            {children}
        </body>
      </html>
    </ClerkProvider>
  )
}