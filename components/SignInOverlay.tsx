import React, { useState, useRef, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Input, Button, Alert } from "@nextui-org/react"
import { IconBrandGoogle } from '@tabler/icons-react'
import { X } from 'lucide-react'
import { gsap } from "gsap"

interface SignInOverlayProps {
  onClose: () => void
}

export function SignInOverlay({ onClose }: SignInOverlayProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [alert, setAlert] = useState<{ type: 'success' | 'error', message: string } | null>(null)
  const { signIn, signInWithGoogle } = useAuth()
  const overlayRef = useRef<HTMLDivElement>(null)
  const alertRef = useRef<HTMLDivElement>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setAlert(null)
    try {
      await signIn(email, password)
      setAlert({ type: 'success', message: 'Login successful!' })
      animateAlert(true, () => {
        setTimeout(() => {
          animateAlert(false, () => {
            setAlert(null)
            onClose()
          })
        }, 2000)
      })
    } catch (error) {
      setAlert({ type: 'error', message: 'Failed to log in. Please check your credentials.' })
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
          style={{ opacity: 0, transform: 'translateY(-50px)' }}
        >
          <Alert 
            title={alert.type === 'success' ? 'Success' : 'Error'}
            description={alert.message}
            color={alert.type === 'success' ? 'success' : 'error'}
            className="mb-4"
            variant="bordered"
            isDismissable
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
            className="absolute right-6 top-6 text-gray-400 hover:text-white"
          >
            <X size={20} />
          </button>
          
          <h2 className="text-2xl font-bold text-white mb-6">Sign In</h2>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              label=""
              type="email"
              variant="bordered"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              classNames={{
                input: "text-white",
                inputWrapper: "border-gray-700 hover:border-gray-500"
              }}
              className="animate-fade-in"
              placeholder="Enter your email"
            />
            
            <Input
              label=""
              type="password"
              variant="bordered"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              classNames={{
                input: "text-white",
                inputWrapper: "border-gray-700 hover:border-gray-500"
              }}
              className="animate-fade-in"
              placeholder="Enter your password"
            />
            
            <Button
              type="submit"
              className="w-full bg-white text-black hover:bg-gray-100 animate-fade-in"
              size="lg"
            >
              Sign In
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
            className="w-full border border-gray-700 hover:bg-gray-900 text-white animate-fade-in"
            size="lg"
            variant="bordered"
            onClick={() => signInWithGoogle()}
            startContent={<IconBrandGoogle className="h-5 w-5" />}
          >
            Sign in with Google
          </Button>
        </div>
      </div>
    </div>
  )
}

