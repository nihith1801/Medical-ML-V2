'use client'

import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import { Brain, ImagePlus, Waves } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { gsap } from 'gsap'
import { ParticleWaves } from '@/components/ParticleWaves'

const models = [
  {
    title: 'Ultrasound Analysis',
    description: 'Breast Cancer Detection using advanced deep learning techniques',
    icon: Waves,
    href: '/ultrasound',
  },
  {
    title: 'X-Ray Analysis',
    description: 'Bone Fracture Detection with high accuracy and rapid results',
    icon: ImagePlus,
    href: '/xray',
  },
  {
    title: 'MRI Analysis',
    description: 'Brain Tumor Detection to support early diagnosis',
    icon: Brain,
    href: '/mri',
  },
]

export function AuthenticatedDashboard() {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const cardsRef = useRef<(HTMLAnchorElement | null)[]>([])

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.from(titleRef.current, { y: 50, opacity: 0, duration: 1 })
      .from(descriptionRef.current, { y: 30, opacity: 0, duration: 0.8 }, '-=0.5')
      .from(cardsRef.current, { 
        y: 50, 
        opacity: 0, 
        duration: 0.6, 
        stagger: 0.2,
        ease: 'back.out(1.7)'
      }, '-=0.5')

    return () => {
      tl.kill() // Clean up the timeline when component unmounts
    }
  }, [])

  return (
    <div className="relative min-h-screen bg-background">
      <ParticleWaves />
      <div className="container mx-auto p-6 relative z-10">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 ref={titleRef} className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Welcome to Medical ML
            </h1>
            <p ref={descriptionRef} className="text-lg text-muted-foreground">
              Choose a model to get started with your analysis
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {models.map((model, index) => (
              <Link 
                key={model.title} 
                href={model.href} 
                className="block group"
                ref={el => cardsRef.current[index] = el}
              >
                <Card className="transition-all duration-300 hover:shadow-md hover:border-primary transform hover:-translate-y-1 rounded-lg border border-border">
                  <CardHeader className="p-4 flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <model.icon className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-xl font-semibold">{model.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <CardDescription className="text-sm text-muted-foreground">{model.description}</CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

