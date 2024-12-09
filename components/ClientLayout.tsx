'use client'

import { DesktopNavbar } from '@/components/DesktopNavbar'
import { SidebarProvider } from '@/components/ui/sidebar'
import { BackgroundWrapper } from '@/components/BackgroundWrapper'
import { TooltipProvider } from '@/components/ui/tooltip'

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <TooltipProvider delayDuration={0}>
        <BackgroundWrapper>
          <div className="flex min-h-screen flex-col">
            <DesktopNavbar />
            <main className="flex-1 bg-background">
              {children}
            </main>
          </div>
        </BackgroundWrapper>
      </TooltipProvider>
    </SidebarProvider>
  )
}

