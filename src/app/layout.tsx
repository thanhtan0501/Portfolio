import React from 'react'
import { Inter } from 'next/font/google'

import './app.css'
import '../styles/panda.css'

import StoreProvider from './redux/Provider'
import { LogoIcon } from '../assets/icon'
import Nav from './_components/Nav'
import Footer from './_components/Footer'

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' })

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'https://payloadcms.com'),
  title: 'Tan Thanh - Developer',
  icons: {
    icon: '/favicon.svg',
  },
  content: 'width=device-width,initial-scale=1,shrink-to-fit=no',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`min-h-screen h-full font-sans antialiased ${inter.className}`}>
        <StoreProvider>
          <LogoIcon w="990" h="955" className="watermark-panda" />
          <Nav />
          <main className="relative flex flex-col min-h-screen">
            <div className="flex-grow flex-1 flex flex-col h-full">{children}</div>
          </main>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  )
}
