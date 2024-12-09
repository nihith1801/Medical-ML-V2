import React, { useState } from 'react';
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { PredictionHistory } from './PredictionHistory'
import { cn } from "@/lib/utils"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarFooter,
} from '@/components/ui/sidebar'
import { Waves, ImagePlus, User, Settings, LogOut, Home, Brain } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { IconBrandGoogle } from '@tabler/icons-react'
import { User as UserType } from '@/types/user'

const sidebarItems = [
  {
    title: 'Navigation',
    items: [
      { title: 'Home', icon: Home, href: '/' },
    ],
  },
  {
    title: 'Our Models',
    items: [
      { title: 'Ultrasound Analysis', icon: Waves, href: '/ultrasound', description: 'Breast Cancer Detection' },
      { title: 'X-Ray Analysis', icon: ImagePlus, href: '/xray', description: 'Bone Fracture Detection' },
      { title: 'MRI Analysis', icon: Brain, href: '/mri', description: 'Brain Tumor Detection' },
    ],
  },
]

export function AppSidebar({ className, ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user, loading, signIn, signUp, signOut, signInWithGoogle, sendEmailVerification } = useAuth()
  const [showAuthDialog, setShowAuthDialog] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [isClient, setIsClient] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showVerificationDialog, setShowVerificationDialog] = useState(false)
  const [error, setError] = useState('');
  const pathname = usePathname()

  React.useEffect(() => {
    setIsClient(true)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      if (isSignUp) {
        await signUp(formData.email, formData.password, formData.name);
        setShowVerificationDialog(true);
      } else {
        await signIn(formData.email, formData.password);
        setShowAuthDialog(false);
      }
    } catch (error: any) {
      console.error('Authentication error:', error);
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        setError('Invalid email or password. Please try again.');
      } else if (error.code === 'auth/email-already-in-use') {
        setError('This email is already registered. Please use a different email or try logging in.');
      } else if (error.code === 'auth/weak-password') {
        setError('Password should be at least 6 characters long.');
      } else {
        setError('An error occurred during authentication. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      setShowAuthDialog(false);
    } catch (error) {
      console.error('Google sign in error:', error);
      alert('Failed to sign in with Google. Please try again.');
    }
  };

  const handleResendVerification = async () => {
    try {
      await sendEmailVerification();
      alert('Verification email sent. Please check your inbox.');
    } catch (error) {
      console.error('Error sending verification email:', error);
      alert('Failed to send verification email. Please try again later.');
    }
  };

  if (loading) {
    return <div></div>; // Or any loading indicator
  }

  return (
    <Sidebar className={cn("w-64 flex-shrink-0", className)} {...props}>
      <SidebarHeader className="text-xl font-bold p-4">Medical ML</SidebarHeader>
      <SidebarContent>
        {sidebarItems.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.href} className={`flex items-center gap-2 ${pathname === item.href ? 'text-primary' : ''}`}>
                        <item.icon className="w-5 h-5" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
        {user && <PredictionHistory />}
      </SidebarContent>
      <SidebarFooter className="p-4">
        {isClient && user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-start">
                <Avatar className="w-8 h-8 mr-2">
                  <AvatarImage src={user.avatar || undefined} />
                  <AvatarFallback>{user.name?.[0]}</AvatarFallback>
                </Avatar>
                <span>{user.name}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <Link href="/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => signOut()}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="space-y-2">
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={() => {
                setIsSignUp(false);
                setShowAuthDialog(true);
              }}
            >
              Login
            </Button>
            <Button 
              variant="default" 
              className="w-full"
              onClick={() => {
                setIsSignUp(true);
                setShowAuthDialog(true);
              }}
            >
              Sign Up
            </Button>
          </div>
        )}
      </SidebarFooter>
      <SidebarRail />

      <AlertDialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
        <AlertDialogContent className="sm:max-w-[425px]">
          <AlertDialogHeader>
            <span className="sr-only">
              <AlertDialogTitle>{isSignUp ? 'Sign Up' : 'Login'}</AlertDialogTitle>
            </span>
            <AlertDialogDescription>
              {isSignUp ? 'Create your account to get started.' : 'Welcome back! Please login to your account.'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <form onSubmit={handleAuthSubmit}>
            <div className="grid gap-4 py-4">
              {error && (
                <div className="text-red-500 text-sm">{error}</div>
              )}
              {isSignUp && (
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleInputChange}
                    required={isSignUp}
                  />
                </div>
              )}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <AlertDialogFooter className="flex-col gap-2 sm:flex-col">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Processing...' : (isSignUp ? 'Sign Up' : 'Login')}
              </Button>
              <div className="relative w-full">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleGoogleSignIn}
              >
                <IconBrandGoogle className="mr-2 h-4 w-4" />
                Continue with Google
              </Button>
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showVerificationDialog} onOpenChange={setShowVerificationDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <span className="sr-only">
              <AlertDialogTitle>Verify Your Email</AlertDialogTitle>
            </span>
            <AlertDialogDescription>
              We've sent a verification email to your address. Please check your inbox and click the verification link to complete your registration.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button onClick={handleResendVerification}>Resend Verification Email</Button>
            <AlertDialogAction onClick={() => setShowVerificationDialog(false)}>Close</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Sidebar>
  )
}

