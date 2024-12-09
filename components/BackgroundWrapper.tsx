'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function BackgroundWrapper({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <>{children}</>
  }

  return (
    <>
      <div 
        className={`fixed inset-0 z-[-2] ${
          resolvedTheme === 'dark' 
            ? 'bg-neutral-950' 
            : 'bg-white'
        } bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]`}
      />
      {children}
    </>
  )
}

