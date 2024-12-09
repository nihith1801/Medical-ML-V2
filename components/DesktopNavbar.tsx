"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import { Menu } from 'lucide-react'
import { useTheme } from "next-themes"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/contexts/AuthContext"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState, useEffect } from "react"
import "@theme-toggles/react/css/Around.css"
import { Around } from "@theme-toggles/react"
import { IconBrandGoogle } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'

const sidebarItems = [
  {
    title: 'Our Models',
    items: [
      { title: 'Ultrasound Analysis', href: '/ultrasound', description: 'Breast Cancer Detection using advanced deep learning techniques.' },
      { title: 'X-Ray Analysis', href: '/xray', description: 'Bone Fracture Detection with high accuracy and rapid results.' },
      { title: 'MRI Analysis', href: '/mri', description: 'Brain Tumor Detection to support early diagnosis and treatment planning.' },
    ],
  },
]


export function Navbar() {
  const { theme, setTheme } = useTheme()
  const { user, signOut, signInWithGoogle } = useAuth()
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const [showSignIn, setShowSignIn] = useState(false)
  const [showSignUp, setShowSignUp] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="h-20 flex justify-between items-center px-4 sm:px-8 bg-background border-b">
      <div className="flex items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Icons.logo className="h-6 w-6" />
          <span className="font-bold text-xl">Medical ML</span>
        </Link>
      </div>
      <div className="hidden md:flex items-center space-x-4">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Our Models</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {sidebarItems[0].items.map((item) => (
                    <ListItem
                      key={item.title}
                      title={item.title}
                      href={item.href}
                    >
                      {item.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                onClick={(e) => {
                  e.preventDefault();
                  if (user) {
                    router.push('/settings');
                  } else {
                    setShowSignIn(true);
                  }
                }}
              >
                Settings
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <Around 
          duration={750}
          toggled={theme === 'dark'}
          className="w-6 h-6"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        />
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="h-8 w-8 cursor-pointer">
                <AvatarImage src={user.avatar || undefined} alt={user.name} />
                <AvatarFallback>{user.name?.[0]}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuItem asChild>
                <Link href="/settings">
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => signOut()}>
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => setShowSignIn(true)}>
              Sign In
            </Button>
            <Button onClick={() => setShowSignUp(true)}>
              Sign Up
            </Button>
          </div>
        )}
      </div>
      <div className="md:hidden">
        <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <Menu className="h-6 w-6" />
        </Button>
      </div>
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm md:hidden" onClick={() => setMobileMenuOpen(false)}>
          <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-background p-6 shadow-lg" onClick={(e) => e.stopPropagation()}>
            <div className="flex flex-col space-y-4">
              <Link href="/ultrasound" className="text-lg font-medium">Ultrasound Analysis</Link>
              <Link href="/xray" className="text-lg font-medium">X-Ray Analysis</Link>
              <Link href="/mri" className="text-lg font-medium">MRI Analysis</Link>
              <Link href="/settings" className="text-lg font-medium">Settings</Link>
              {user ? (
                <Button onClick={() => signOut()} className="w-full mt-4">Sign out</Button>
              ) : (
                <div className="flex flex-col space-y-2 mt-4">
                  <Button variant="ghost" onClick={() => setShowSignIn(true)} className="w-full">
                    Sign In
                  </Button>
                  <Button onClick={() => setShowSignUp(true)} className="w-full">
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {showSignIn && (
        <SignInOverlay onClose={() => setShowSignIn(false)} />
      )}
      {showSignUp && (
        <SignUpOverlay onClose={() => setShowSignUp(false)} />
      )}
    </div>
  )
}

const ListItem = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<"a"> & { title: string }
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

