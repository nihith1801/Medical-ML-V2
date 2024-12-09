import React, { useState, useEffect, useRef } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Input, Button } from "@nextui-org/react"
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
  const [error, setError] = useState('')
  const overlayRef = useRef(null)
  const formRef = useRef(null)

  useEffect(() => {
    gsap.from(overlayRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.inOut",
    })
    gsap.from(formRef.current, {
      y: 50,
      opacity: 0,
      duration: 0.5,
      ease: "power3.out",
      delay: 0.2,
    })
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')

    try {
      await signUp(formData.email, formData.password, formData.name)
      onClose()
    } catch (error) {
      console.error('Error signing up:', error)
      setError('An error occurred during sign up. Please try again.')
    }
  }

  const handleButtonHover = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1.05,
      duration: 0.2,
      ease: "power2.out",
    })
  }

  const handleButtonLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      duration: 0.2,
      ease: "power2.in",
    })
  }

  return (
    <div ref={overlayRef} className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div ref={formRef} className="bg-black w-full max-w-md mx-4 rounded-lg border border-gray-800">
        <div className="p-6 relative">
          <button
            onClick={onClose}
            className="absolute right-6 top-6 text-gray-400 hover:text-white transition-colors duration-300"
          >
            <X size={20} />
          </button>
          
          <h2 className="text-2xl font-bold text-white mb-6">Sign Up</h2>
          
          <form onSubmit={handleSignup} className="space-y-4">
            {error && <p className="text-red-500 text-sm">{error}</p>}
            
            <Input
              label="Full Name"
              name="name"
              variant="bordered"
              value={formData.name}
              onChange={handleInputChange}
              required
              classNames={{
                label: "text-gray-400",
                input: "text-white",
                inputWrapper: "border-gray-700 hover:border-gray-500 transition-colors duration-300"
              }}
            />
            
            <Input
              label="Email"
              name="email"
              type="email"
              variant="bordered"
              value={formData.email}
              onChange={handleInputChange}
              required
              classNames={{
                label: "text-gray-400",
                input: "text-white",
                inputWrapper: "border-gray-700 hover:border-gray-500 transition-colors duration-300"
              }}
            />
            
            <Input
              label="Password"
              name="password"
              type="password"
              variant="bordered"
              value={formData.password}
              onChange={handleInputChange}
              required
              classNames={{
                label: "text-gray-400",
                input: "text-white",
                inputWrapper: "border-gray-700 hover:border-gray-500 transition-colors duration-300"
              }}
            />
            
            <Button
              type="submit"
              className="w-full bg-white text-black hover:bg-gray-100 transition-colors duration-300"
              size="lg"
              onMouseEnter={handleButtonHover}
              onMouseLeave={handleButtonLeave}
            >
              Sign Up
            </Button>
          </form>

          <div className="relative my-6">
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
            className="w-full border border-gray-700 hover:bg-gray-900 text-white transition-colors duration-300"
            size="lg"
            variant="bordered"
            onClick={() => signInWithGoogle()}
            startContent={<IconBrandGoogle className="h-5 w-5" />}
            onMouseEnter={handleButtonHover}
            onMouseLeave={handleButtonLeave}
          >
            Sign in with Google
          </Button>
        </div>
      </div>
    </div>
  )
}

