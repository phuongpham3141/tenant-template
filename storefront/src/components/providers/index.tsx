"use client"

import type { ReactNode } from "react"
import { AuthProvider, type CurrentUser } from "./AuthProvider"
import { TenantProvider } from "./TenantProvider"
import { LocaleProvider } from "./LocaleProvider"
import { CartProvider } from "./CartProvider"
import type { TenantConfig, Locale } from "@/lib/tenant"

interface Props {
  tenant: TenantConfig
  initialLocale: Locale
  initialUser: CurrentUser | null
  children: ReactNode
}

export function Providers({ tenant, initialLocale, initialUser, children }: Props) {
  return (
    <TenantProvider tenant={tenant}>
      <LocaleProvider initialLocale={initialLocale}>
        <AuthProvider initialUser={initialUser}>
          <CartProvider>{children}</CartProvider>
        </AuthProvider>
      </LocaleProvider>
    </TenantProvider>
  )
}
