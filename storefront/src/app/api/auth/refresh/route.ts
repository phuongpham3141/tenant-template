import { NextResponse } from "next/server"
import { getSession, setSession } from "@/lib/session"
import { api } from "@/lib/api/client"

export async function POST() {
  const current = await getSession()
  if (!current) return NextResponse.json({ error: "no_session" }, { status: 401 })
  const result = await api<{ session_expires_at: string }>(`/auth/refresh`, { method: "POST" }).catch(() => null)
  if (!result) return NextResponse.json({ error: "refresh_failed" }, { status: 401 })
  await setSession({ ...current, expiresAt: new Date(result.session_expires_at).getTime() })
  return NextResponse.json({ ok: true })
}
