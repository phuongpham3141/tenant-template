import { NextResponse } from "next/server"
import { api } from "@/lib/api/client"

export async function POST(req: Request) {
  const body = (await req.json()) as { email?: string; token?: string; new_password?: string }
  if (body.email) {
    await api(`/auth/password-reset/request`, { method: "POST", body: { email: body.email } }).catch(() => undefined)
    return NextResponse.json({ ok: true, message: "If an account exists, a reset email has been sent." })
  }
  if (body.token && body.new_password) {
    try {
      await api(`/auth/password-reset/confirm`, { method: "POST", body })
      return NextResponse.json({ ok: true })
    } catch (err: any) {
      return NextResponse.json({ error: err.code ?? "reset_failed" }, { status: 400 })
    }
  }
  return NextResponse.json({ error: "invalid_input" }, { status: 400 })
}
