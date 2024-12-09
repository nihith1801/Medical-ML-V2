'use client'

import { NextUINavbar } from '@/components/NextUINavbar'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function ClientWrapper({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = useState(false)
    const { theme, resolvedTheme } = useTheme()
    const [currentTheme, setCurrentTheme] = useState<string | undefined>(undefined)

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        setCurrentTheme(resolvedTheme)
    }, [resolvedTheme])

    if (!mounted) {
        return null
    }

    return (
        <div className={`min-h-screen flex flex-col ${currentTheme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
            <NextUINavbar />
            <main className="flex-1 bg-transparent px-4 sm:px-6 lg:px-8">
                {children}
            </main>
        </div>
    )
}


