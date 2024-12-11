'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { Button } from '@/components/ui/button'
import { cn } from "@/lib/utils"

interface LandingPageProps {
  isMobile: boolean;
}

export default function LandingPage({ isMobile }: LandingPageProps) {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(
      [titleRef.current, subtitleRef.current, ctaRef.current],
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.2 }
    );
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full p-4 sm:p-6 lg:p-8 mx-auto">
      <div className="w-full max-w-[1400px] mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h1 
          ref={titleRef} 
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight opacity-0"
        >
          Medical ML: Redefining Medical Diagnostics
        </h1>
        <p 
          ref={subtitleRef} 
          className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 max-w-3xl mx-auto opacity-0"
        >
          Harness the power of advanced ML models for precise medical image classification and early disease detection.
        </p>
        <div 
          ref={ctaRef} 
          className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0"
        >
          <Button
            asChild
            size="lg"
            className={cn(
              "px-8 py-6 text-lg",
              "transition-all duration-300 transform hover:scale-105",
              "bg-primary text-primary-foreground hover:bg-primary/90"
            )}
          >
            <Link href="/ultrasound">Explore Ultrasound Model</Link>
          </Button>
          <Button
            asChild
            size="lg"
            className={cn(
              "px-8 py-6 text-lg",
              "transition-all duration-300 transform hover:scale-105",
              "bg-primary text-primary-foreground hover:bg-primary/90"
            )}
          >
            <Link href="/xray">Explore X-Ray Model</Link>
          </Button>
          <Button
            asChild
            size="lg"
            className={cn(
              "px-8 py-6 text-lg",
              "transition-all duration-300 transform hover:scale-105",
              "bg-primary text-primary-foreground hover:bg-primary/90"
            )}
          >
            <Link href="/mri">Explore MRI Model</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

