import React, { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Input, Button } from "@nextui-org/react"
import { IconBrandGoogle } from '@tabler/icons-react'
import { X } from 'lucide-react'

interface SignInOverlayProps {
  onClose: () => void
}

export function SignInOverlay({ onClose }: SignInOverlayProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { signIn, signInWithGoogle } = useAuth()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await signIn(email, password)
      onClose()
    } catch (error) {
      setError('Failed to log in. Please check your credentials.')
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-black w-full max-w-md mx-4 rounded-lg border border-gray-800">
        <div className="p-6 relative">
          <button
            onClick={onClose}
            className="absolute right-6 top-6 text-gray-400 hover:text-white"
          >
            <X size={20} />
          </button>
          
          <h2 className="text-2xl font-bold text-white mb-6">Sign In</h2>
          
          <form onSubmit={handleLogin} className="space-y-4">
            {error && <p className="text-red-500 text-sm">{error}</p>}
            
            <Input
              label="Email"
              type="email"
              variant="bordered"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              classNames={{
                label: "text-gray-400",
                input: "text-white",
                inputWrapper: "border-gray-700 hover:border-gray-500"
              }}
            />
            
            <Input
              label="Password"
              type="password"
              variant="bordered"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              classNames={{
                label: "text-gray-400",
                input: "text-white",
                inputWrapper: "border-gray-700 hover:border-gray-500"
              }}
            />
            
            <Button
              type="submit"
              className="w-full bg-white text-black hover:bg-gray-100"
              size="lg"
            >
              Sign In
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
            className="w-full border border-gray-700 hover:bg-gray-900 text-white"
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

