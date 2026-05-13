import { NextResponse } from "next/server"
import { clearSession, getSession } from "@/lib/session"
import { api } from "@/lib/api/client"

export async function POST() {
  const session = await getSession()
  if (session) {
    await api(`/auth/logout`, { method: "POST" }).catch(() => undefined)
  }
  await clearSession()
  return NextResponse.json({ ok: true })
}
