"use client"

import React from "react"1  
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { useAuth } from "@/contexts/AuthContext"
import { Around } from "@theme-toggles/react"
import "@theme-toggles/react/css/Around.css"
import { SignInOverlay } from '@/components/SignInOverlay'
import { SignUpOverlay } from '@/components/SignUpOverlay'
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Settings, LogOut } from 'lucide-react'

export function NextUINavbar() {
  const { theme, setTheme } = useTheme()
  const [currentTheme, setCurrentTheme] = React.useState<string | undefined>(undefined)

  React.useEffect(() => {
    setCurrentTheme(theme)
  }, [theme])

  const { user, signOut } = useAuth()
  const [showSignIn, setShowSignIn] = React.useState(false)
  const [showSignUp, setShowSignUp] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)
  const router = useRouter()

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const menuItems = [
    { name: "Ultrasound Analysis", href: "/ultrasound" },
    { name: "X-Ray Analysis", href: "/xray" },
    { name: "MRI Analysis", href: "/mri" },
  ]

  if (!mounted) {
    return null
  }

  const isDarkMode = currentTheme === 'dark'

  const handleSignOut = async () => {
    try {
      await signOut()
      router.push('/')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
      <>
        <nav className={cn(
            "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4",
            isDarkMode ? "bg-black" : "bg-white"
        )}>
          <div className="flex items-center space-x-12">
            <Link href="/" className="flex items-center space-x-2">
              <svg className={cn("w-8 h-8", isDarkMode ? "text-white" : "text-black")} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 4L4 8L12 12L20 8L12 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4 12L12 16L20 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4 16L12 20L20 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className={cn("text-xl font-bold", isDarkMode ? "text-white" : "text-black")}>Medical ML</span>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              {menuItems.map((item) => (
                  <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                          "transition-colors duration-200",
                          isDarkMode ? "text-white hover:text-gray-300" : "text-black hover:text-gray-600"
                      )}
                  >
                    {item.name}
                  </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <Around
                duration={750}
                toggled={currentTheme === 'dark'}
                className={cn("w-6 h-6", currentTheme === 'dark' ? "text-white" : "text-black")}
                onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')}
            />

            {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger className="focus:outline-none">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar || undefined} />
                      <AvatarFallback>{user.name?.[0]}</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className={cn(
                      "mt-2 w-56 rounded-md shadow-lg",
                      isDarkMode ? "bg-gray-800" : "bg-white"
                  )}>
                    <DropdownMenuItem onClick={() => router.push('/settings')} className="flex items-center">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleSignOut} className="flex items-center">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sign out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                <>
                  <button
                      onClick={() => setShowSignIn(true)}
                      className={cn(
                          "transition-colors duration-200",
                          isDarkMode ? "text-white hover:text-gray-300" : "text-black hover:text-gray-600"
                      )}
                  >
                    Login
                  </button>
                  <button
                      onClick={() => setShowSignUp(true)}
                      className={cn(
                          "px-4 py-2 rounded-md",
                          "transition-colors duration-200",
                          "focus:outline-none focus:ring-2 focus:ring-opacity-50",
                          isDarkMode
                              ? "bg-white text-black hover:bg-gray-100 focus:ring-white"
                              : "bg-black text-white hover:bg-gray-800 focus:ring-black"
                      )}
                  >
                    Sign Up
                  </button>
                </>
            )}
          </div>
        </nav>

        {showSignIn && <SignInOverlay onClose={() => setShowSignIn(false)} />}
        {showSignUp && <SignUpOverlay onClose={() => setShowSignUp(false)} />}
      </>
  )
}

