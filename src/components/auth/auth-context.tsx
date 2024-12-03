"use client"

import { createContext, useContext, useEffect, useState } from 'react'
import { signIn, signOut, signUp, getCurrentUser, type SignUpInput } from 'aws-amplify/auth'

type AuthContextType = {
  user: any
  loading: boolean
  signIn: (username: string, password: string) => Promise<void>
  signUp: (input: SignUpInput) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkUser()
  }, [])

  async function checkUser() {
    try {
      const userData = await getCurrentUser()
      setUser(userData)
    } catch {
      setUser(null)
    }
    setLoading(false)
  }

  const value = {
    user,
    loading,
    signIn: async (username: string, password: string) => {
      const { isSignedIn } = await signIn({ username, password })
      if (isSignedIn) await checkUser()
    },
    signUp: async (input: SignUpInput) => {
      await signUp(input)
    },
    signOut: async () => {
      await signOut()
      setUser(null)
    }
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}