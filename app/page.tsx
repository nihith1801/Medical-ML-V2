'use client'

import { useState, useEffect } from 'react'
import { ClientWrapper } from '@/components/ClientWrapper'
import LandingPage from '@/components/LandingPage'

export default function Home() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <ClientWrapper>
      <LandingPage isMobile={isMobile} />
    </ClientWrapper>
  )
}


