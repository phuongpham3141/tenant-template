"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

export interface CurrentUser {
  id: string
  email: string
  display_name: string
  tenant_id: string
  roles: string[]
  supplier_id?: string
  locale: "vi" | "en" | "cn"
}

interface AuthState {
  user: CurrentUser | null
  loading: boolean
  refresh: () => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthState>({ user: null, loading: true, refresh: async () => {}, logout: async () => {} })

export function AuthProvider({ initialUser, children }: { initialUser?: CurrentUser | null; children: ReactNode }) {
  const [user, setUser] = useState<CurrentUser | null>(initialUser ?? null)
  const [loading, setLoading] = useState(initialUser === undefined)

  const refresh = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/me")
      const data = await res.json()
      setUser(data.user ?? null)
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    setUser(null)
  }

  useEffect(() => {
    if (initialUser === undefined) refresh()
  }, [])

  return <AuthContext.Provider value={{ user, loading, refresh, logout }}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthState {
  return useContext(AuthContext)
}

export function useRequireAuth(): CurrentUser {
  const { user } = useAuth()
  if (!user) throw new Error("Auth required")
  return user
}

export function useHasRole(...roles: string[]): boolean {
  const { user } = useAuth()
  if (!user) return false
  return user.roles.some((r) => roles.includes(r))
}
