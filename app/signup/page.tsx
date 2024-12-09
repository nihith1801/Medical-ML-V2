'use client'

import { SignupForm } from '@/components/SignupForm'
import { AppSidebar } from '@/components/AppSidebar'
import { SidebarProvider, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar'
import { IconBrandGoogle } from '@tabler/icons-react'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'

export default function SignupPage() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <AppSidebar />
        <SidebarInset className="flex-grow bg-transparent">
          <main className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-8 md:p-24">
            <SignupForm />
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>
              <Button
                variant="outline"
                className="mt-4 w-full"
                onClick={() => signInWithGoogle()}
              >
                <IconBrandGoogle className="mr-2 h-4 w-4" />
                Sign up with Google
              </Button>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}

