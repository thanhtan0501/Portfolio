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
  title: 'Tan Thanh - Developer',
  icons: {
    icon: '/favicon.svg',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`relative h-full font-sans antialiased ${inter.className}`}>
        <StoreProvider>
          <main className="relative flex flex-col min-h-screen">
            <Nav />
            <LogoIcon w="990" h="955" className="watermark-panda" />
            <div className="flex-grow flex-1 flex flex-col h-full">{children}</div>
            <Footer />
          </main>
        </StoreProvider>
      </body>
    </html>
  )
}
