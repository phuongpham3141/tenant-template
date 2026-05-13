import { NextResponse } from "next/server"
import { setSession } from "@/lib/session"
import { api, ApiError } from "@/lib/api/client"

interface LoginRequest {
  identifier: string
  password: string
  otp?: string
  remember_me?: boolean
}

export async function POST(req: Request) {
  const body = (await req.json()) as LoginRequest
  if (!body.identifier || !body.password) {
    return NextResponse.json({ error: "invalid_input" }, { status: 400 })
  }
  try {
    const result = await api<{ user: { id: string; tenant_id: string; email: string; display_name: string; roles: string[]; locale: string; supplier_id?: string }; session_expires_at: string }>(
      "/auth/login",
      { method: "POST", body: { identifier: body.identifier, password: body.password, otp: body.otp } }
    )
    await setSession({
      userId: result.user.id,
      tenantId: result.user.tenant_id,
      email: result.user.email,
      displayName: result.user.display_name,
      roles: result.user.roles,
      supplierId: result.user.supplier_id,
      locale: (result.user.locale as any) ?? "vi",
      expiresAt: new Date(result.session_expires_at).getTime(),
    })
    return NextResponse.json({ ok: true, user: result.user })
  } catch (err: any) {
    if (err instanceof ApiError) {
      return NextResponse.json({ error: err.code, message: err.message }, { status: err.status })
    }
    return NextResponse.json({ error: "unknown_error" }, { status: 500 })
  }
}
