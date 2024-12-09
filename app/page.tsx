'use client'

import { useState, useEffect } from 'react'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/AppSidebar'
import LandingPage from '@/components/LandingPage'

export default function Home() {
  const [width, setWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 0);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWidth(window.innerWidth);
      window.addEventListener('resize', handleWindowSizeChange);
      return () => {
        window.removeEventListener('resize', handleWindowSizeChange);
      }
    }
  }, []);

  const isMobile = width <= 768;

  return (
    <SidebarProvider>
      <div className="flex">
        {isMobile && <AppSidebar />}
        <main className="flex-1">
          <LandingPage isMobile={isMobile} />
        </main>
      </div>
    </SidebarProvider>
  )
}

