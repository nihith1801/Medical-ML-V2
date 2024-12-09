import { User } from '@/types/user'

let currentUser: User | null = null

export const mockSignIn = (email: string, password: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === 'user@example.com' && password === 'password') {
        currentUser = {
          id: '1',
          email: email,
          name: 'Mock User',
          avatar: null,
        }
        resolve(currentUser)
      } else {
        reject(new Error('Invalid credentials'))
      }
    }, 500)
  })
}

export const mockSignUp = (email: string, password: string, name: string): Promise<User> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      currentUser = {
        id: '2',
        email: email,
        name: name,
        avatar: null,
      }
      resolve(currentUser)
    }, 500)
  })
}

export const mockSignOut = (): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      currentUser = null
      resolve()
    }, 500)
  })
}

export const getCurrentUser = (): User | null => {
  return currentUser
}

