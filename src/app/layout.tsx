import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/navbar/Navbar'
import Container from '@/components/global/Container'
import Providers from './providers'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Mrewel Koora ⚽ ',
  description: 'A nifty Store for Football Fans built with Next.js',
}

// FIX: Renamed the function and added 'params' to the type definition.
export default function ProductsLayout({
  children,
  params, // Even if unused, it must be here to match the props passed by Next.js
}: {
  children: React.ReactNode
  params: { id: string }
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Navbar />
          <Container className=" py-20">{children}</Container>
        </Providers>
      </body>
    </html>
  )
}
