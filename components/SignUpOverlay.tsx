import React, { useState, useEffect, useRef } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Input, Button, Alert } from "@nextui-org/react"
import { IconBrandGoogle } from '@tabler/icons-react'
import { X } from 'lucide-react'
import { gsap } from "gsap"

interface SignUpOverlayProps {
  onClose: () => void
}

export function SignUpOverlay({ onClose }: SignUpOverlayProps) {
  const { signUp, signInWithGoogle } = useAuth()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [alert, setAlert] = useState<{ type: 'success' | 'error', message: string } | null>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const alertRef = useRef<HTMLDivElement>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setAlert(null)

    try {
      await signUp(formData.email, formData.password, formData.name)
      setAlert({ type: 'success', message: 'Sign up successful!' })
      animateAlert(true, () => {
        setTimeout(() => {
          animateAlert(false, () => {
            setAlert(null)
            onClose()
          })
        }, 2000)
      })
    } catch (error) {
      console.error('Error signing up:', error)
      setAlert({ type: 'error', message: 'An error occurred during sign up. Perhaps the user already exists. Please try logging in.' })
      animateAlert(true)
    }
  }

  const animateAlert = (show: boolean, onComplete?: () => void) => {
    if (alertRef.current) {
      gsap.to(alertRef.current, { 
        opacity: show ? 1 : 0, 
        y: show ? 0 : -50, 
        duration: 0.5, 
        ease: show ? 'power3.out' : 'power3.in',
        onComplete
      })
    }
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.inOut",
      })
      gsap.from(".animate-fade-in", {
        y: 30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power3.out",
      })
    }, overlayRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={overlayRef} className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      {alert && (
        <div 
          ref={alertRef} 
          className="fixed top-4 right-4 z-60"
          // Use inline styles to set initial opacity and transform
          style={{ opacity: 0, transform: 'translateY(-50px)', pointerEvents: 'none' }}
        >
          <Alert 
            title={alert.type === 'success' ? 'Success' : 'Error'}
            description={alert.message}
            color={alert.type === 'success' ? 'success' : 'error'} // Keep 'error' for semantics
            className="mb-4"
            variant="bordered"
            isDismissable
            // Apply custom styles using the 'css' prop
            css={{
              backgroundColor: alert.type === 'success' ? '#4CAF50' : '#F44336', // Green for success, Red for error
              color: '#FFFFFF', // White text
              borderColor: alert.type === 'success' ? '#4CAF50' : '#F44336',
              // Ensure styles are applied irrespective of theme
              '& .nextui-alert-body': {
                color: '#FFFFFF',
              },
              '& .nextui-alert-title': {
                color: '#FFFFFF',
              },
              '& .nextui-alert-close': {
                color: '#FFFFFF',
                '&:hover': {
                  color: '#EEEEEE',
                }
              }
            }}
            onDismiss={() => {
              animateAlert(false, () => setAlert(null))
            }}
          />
        </div>
      )}

      <div className="bg-black w-full max-w-md mx-4 rounded-lg border border-gray-800 animate-fade-in">
        <div className="p-6 relative">
          <button
            onClick={onClose}
            className="absolute right-6 top-6 text-gray-400 hover:text-white transition-colors duration-300"
          >
            <X size={20} />
          </button>
          
          <h2 className="text-2xl font-bold text-white mb-6">Sign Up</h2>
          
          <form onSubmit={handleSignup} className="space-y-4">
            <Input
              label=""
              name="name"
              variant="bordered"
              value={formData.name}
              onChange={handleInputChange}
              required
              classNames={{
                input: "text-white",
                inputWrapper: "border-gray-700 hover:border-gray-500 transition-colors duration-300"
              }}
              className="animate-fade-in"
              placeholder="Enter your full name"
            />
            
            <Input
              label=""
              name="email"
              type="email"
              variant="bordered"
              value={formData.email}
              onChange={handleInputChange}
              required
              classNames={{
                input: "text-white",
                inputWrapper: "border-gray-700 hover:border-gray-500 transition-colors duration-300"
              }}
              className="animate-fade-in"
              placeholder="Enter your email"
            />
            
            <Input
              label=""
              name="password"
              type="password"
              variant="bordered"
              value={formData.password}
              onChange={handleInputChange}
              required
              classNames={{
                input: "text-white",
                inputWrapper: "border-gray-700 hover:border-gray-500 transition-colors duration-300"
              }}
              className="animate-fade-in"
              placeholder="Enter your password"
            />
            
            <Button
              type="submit"
              className="w-full bg-white text-black hover:bg-gray-100 transition-colors duration-300 animate-fade-in"
              size="lg"
            >
              Sign Up
            </Button>
          </form>

          <div className="relative my-6 animate-fade-in">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-700" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-black px-2 text-gray-400">
                OR CONTINUE WITH
              </span>
            </div>
          </div>

          <Button 
            className="w-full border border-gray-700 hover:bg-gray-900 text-white transition-colors duration-300 animate-fade-in"
            size="lg"
            variant="bordered"
            onClick={() => signInWithGoogle()}
            startContent={<IconBrandGoogle className="h-5 w-5" />}
          >
            Sign up with Google
          </Button>
        </div>
      </div>
    </div>
  )
}
