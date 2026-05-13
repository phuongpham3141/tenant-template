"use client"

import { createContext, useContext, type ReactNode } from "react"
import type { TenantConfig } from "@/lib/tenant"

const TenantContext = createContext<TenantConfig | null>(null)

export function TenantProvider({ tenant, children }: { tenant: TenantConfig; children: ReactNode }) {
  return <TenantContext.Provider value={tenant}>{children}</TenantContext.Provider>
}

export function useTenant(): TenantConfig {
  const t = useContext(TenantContext)
  if (!t) throw new Error("TenantProvider missing")
  return t
}
