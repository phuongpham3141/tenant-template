import { NextResponse } from "next/server"
import { api, ApiError } from "@/lib/api/client"

interface RegisterRequest {
  email: string
  password: string
  display_name: string
  account_type: "buyer" | "supplier" | "dealer"
  phone?: string
  country_code?: string
  locale?: "vi" | "en" | "cn"
  company_name?: string
  consent_marketing?: boolean
  consent_tos: boolean
  consent_privacy: boolean
}

export async function POST(req: Request) {
  const body = (await req.json()) as RegisterRequest
  if (!body.consent_tos || !body.consent_privacy) {
    return NextResponse.json({ error: "consent_required" }, { status: 400 })
  }
  if (!body.email || !body.password || !body.display_name) {
    return NextResponse.json({ error: "invalid_input" }, { status: 400 })
  }
  try {
    const result = await api<{ user_id: string; verification_required: boolean }>(`/auth/register`, { method: "POST", body })
    return NextResponse.json({ ok: true, ...result })
  } catch (err: any) {
    if (err instanceof ApiError) {
      return NextResponse.json({ error: err.code, message: err.message }, { status: err.status })
    }
    return NextResponse.json({ error: "unknown_error" }, { status: 500 })
  }
}
