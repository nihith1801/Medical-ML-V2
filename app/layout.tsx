import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/ThemeProvider'
import { AuthProvider } from '@/contexts/AuthContext'
import { ClientWrapper } from '@/components/ClientWrapper'
import { NextUIProvider } from '@nextui-org/react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Medical ML - Advanced Medical Image Classification',
  description: 'Cutting-edge AI models for precise medical diagnostics and early disease detection.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <NextUIProvider>
              <ClientWrapper>{children}</ClientWrapper>
            </NextUIProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

