'use client'

import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { Button } from '@/components/ui/button'
import { cn } from "@/lib/utils"
import { useTheme } from 'next-themes'
import { ClientWrapper } from '@/components/ClientWrapper'
import { ImagePreview } from '@/components/ImagePreview'
import { getPrediction, ModelType, PredictionResponse } from '@/lib/api'
import { Upload, FileUp, File } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { SignInOverlay } from '@/components/SignInOverlay'
import { SignUpOverlay } from '@/components/SignUpOverlay'

export default function MRIPage() {
  const { theme } = useTheme()
  const { user } = useAuth()
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const uploadRef = useRef<HTMLDivElement>(null)
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [prediction, setPrediction] = useState<PredictionResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showSignIn, setShowSignIn] = useState(false)
  const [showSignUp, setShowSignUp] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      if (titleRef.current && descriptionRef.current && uploadRef.current) {
        tl.fromTo(
          [titleRef.current, descriptionRef.current, uploadRef.current],
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, stagger: 0.2 }
        )
      }
    }
  }, [])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  const handleUpload = async () => {
    if (file) {
      setIsLoading(true)
      try {
        const result = await getPrediction(file, ModelType.BRAIN_TUMOR)
        setPrediction(result)
      } catch (error) {
        console.error('Error getting prediction:', error)
        // Handle error (e.g., show error message to user)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const isDarkMode = theme === 'dark'

  return (
    <ClientWrapper>
      <div className={cn(
        "min-h-screen pt-20",
        isDarkMode ? "bg-black" : "bg-white"
      )}>
        <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center">
          <h1 
            ref={titleRef}
            className={cn(
              "text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-center",
              isDarkMode ? "text-white" : "text-black"
            )}
          >
            Brain MRI Model
          </h1>
          
          <p 
            ref={descriptionRef}
            className={cn(
              "text-lg md:text-xl max-w-4xl mx-auto mb-12 text-center",
              isDarkMode ? "text-gray-300" : "text-gray-700"
            )}
          >
            Our advanced MRI Analysis model utilizes deep learning techniques to analyze MRI scans,
            helping detect various abnormalities including brain tumors. It provides rapid and accurate insights
            to support medical professionals in their diagnostic process.
          </p>
          
          <div 
            ref={uploadRef}
            className="w-full max-w-md mx-auto mb-8"
          >
            <div 
              className={cn(
                "h-64 w-full border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer",
                isDarkMode ? "border-gray-600 bg-gray-800" : "border-gray-300 bg-gray-50",
                "transition-colors duration-300"
              )}
              onClick={() => user ? document.getElementById('file-upload')?.click() : setShowSignIn(true)}
            >
              {preview ? (
                <img src={preview} alt="Preview" className="h-full w-full object-cover rounded-lg" />
              ) : (
                <>
                  <Upload className={cn("w-12 h-12 mb-4", isDarkMode ? "text-gray-400" : "text-gray-500")} />
                  <p className={cn("text-sm", isDarkMode ? "text-gray-400" : "text-gray-500")}>
                    {user ? "Click to upload or drag and drop" : "Sign in to upload an image"}
                  </p>
                  {user && (
                    <p className={cn("text-xs mt-1", isDarkMode ? "text-gray-500" : "text-gray-400")}>
                      SVG, PNG, JPG or GIF (max. 800x400px)
                    </p>
                  )}
                </>
              )}
            </div>
            {user && (
              <input
                id="file-upload"
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept="image/*"
              />
            )}
          </div>
          
          {user && file && (
  <Button
    size="lg"
    className={cn(
      "px-8 py-4 text-lg mt-4",
      "transition-all duration-300 transform hover:scale-105",
      "bg-primary text-primary-foreground hover:bg-primary/90"
    )}
    onClick={handleUpload}
    disabled={isLoading}
  >
    {isLoading ? 'Processing...' : 'Analyze Image'}
  </Button>
)}
          {(preview || prediction) && (
            <ImagePreview
              src={preview || ''}
              alt="Uploaded MRI scan"
              prediction={prediction}
              modelType={ModelType.BRAIN_TUMOR}
              isLoading={isLoading}
            />
          )}
        </div>
      </div>

      {showSignIn && <SignInOverlay onClose={() => setShowSignIn(false)} />}
      {showSignUp && <SignUpOverlay onClose={() => setShowSignUp(false)} />}
    </ClientWrapper>
  )
}

