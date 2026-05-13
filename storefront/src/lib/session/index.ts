import { cookies } from "next/headers"

const COOKIE_NAME = "csr_session"
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30

export interface SessionData {
  userId: string
  tenantId: string
  email: string
  displayName: string
  roles: string[]
  supplierId?: string
  locale: "vi" | "en" | "cn"
  expiresAt: number
}

export async function getSession(): Promise<SessionData | null> {
  const jar = await cookies()
  const c = jar.get(COOKIE_NAME)
  if (!c?.value) return null
  try {
    const data = JSON.parse(Buffer.from(c.value, "base64").toString("utf-8")) as SessionData
    if (data.expiresAt < Date.now()) return null
    return data
  } catch {
    return null
  }
}

export async function setSession(session: SessionData): Promise<void> {
  const jar = await cookies()
  const encoded = Buffer.from(JSON.stringify(session)).toString("base64")
  jar.set({
    name: COOKIE_NAME,
    value: encoded,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: COOKIE_MAX_AGE,
  })
}

export async function clearSession(): Promise<void> {
  const jar = await cookies()
  jar.delete(COOKIE_NAME)
}

export async function requireSession(): Promise<SessionData> {
  const s = await getSession()
  if (!s) throw new Error("UNAUTHENTICATED")
  return s
}

export async function requireRole(...allowed: string[]): Promise<SessionData> {
  const s = await requireSession()
  if (!s.roles.some((r) => allowed.includes(r))) {
    throw new Error("FORBIDDEN")
  }
  return s
}
