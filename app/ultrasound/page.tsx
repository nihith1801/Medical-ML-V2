'use client'

import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { Button } from '@/components/ui/button'
import { cn } from "@/lib/utils"
import { useTheme } from 'next-themes'

export default function UltrasoundPage() {
  const { theme } = useTheme()
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.fromTo(
        [titleRef.current, descriptionRef.current, buttonsRef.current],
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.2 }
    )
  }, [])

  const isDarkMode = theme === 'dark'

  return (
      <div className={cn(
          "min-h-screen pt-20",
          isDarkMode ? "bg-black" : "bg-white"
      )}>
        <div className="container mx-auto px-4 h-[calc(100vh-5rem)] flex flex-col items-center justify-center text-center">
          <h1
              ref={titleRef}
              className={cn(
                  "text-5xl md:text-6xl lg:text-7xl font-bold mb-8 opacity-0",
                  isDarkMode ? "text-white" : "text-black"
              )}
          >
            Ultrasound Analysis Model
          </h1>

          <p
              ref={descriptionRef}
              className={cn(
                  "text-lg md:text-xl max-w-4xl mx-auto mb-12 opacity-0",
                  isDarkMode ? "text-gray-300" : "text-gray-700"
              )}
          >
            Our advanced Ultrasound Analysis model utilizes deep learning techniques to analyze ultrasound images,
            helping detect various abnormalities including breast cancer. It provides rapid and accurate insights
            to support medical professionals in their diagnostic process.
          </p>

          <div
              ref={buttonsRef}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0"
          >
            <Button
                size="lg"
                className={cn(
                    "px-8 py-6 text-lg",
                    "transition-all duration-300 transform hover:scale-105",
                    "bg-primary text-primary-foreground hover:bg-primary/90"
                )}
                onClick={() => {}}
            >
              Try the model!
            </Button>

            <Button
                asChild
                variant="outline"
                size="lg"
                className={cn(
                    "px-8 py-6 text-lg",
                    "transition-all duration-300 transform hover:scale-105",
                    "border-primary text-primary hover:bg-primary/10"
                )}
            >
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </div>
  )
}


