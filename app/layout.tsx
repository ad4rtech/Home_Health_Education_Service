import type { Metadata } from 'next'
import { Lexend, Funnel_Sans, Courier_Prime } from 'next/font/google'
import './globals.css'
import StoreProvider from '@/store/StoreProvider'

const lexend = Lexend({ subsets: ['latin'], variable: '--font-lexend' })
const funnelSans = Funnel_Sans({ subsets: ['latin'], variable: '--font-funnel' })
const courierPrime = Courier_Prime({ weight: ['400', '700'], subsets: ['latin'], variable: '--font-courier' })

export const metadata: Metadata = {
  title: 'HHES Lesson Ordering System',
  description: 'Lesson Book Ordering System for HHES Kenya',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${lexend.variable} ${funnelSans.variable} ${courierPrime.variable}`}>
      <body className={`${funnelSans.className} antialiased`}>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  )
}
