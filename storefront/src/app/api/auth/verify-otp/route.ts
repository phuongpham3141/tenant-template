import { NextResponse } from "next/server"
import { api, ApiError } from "@/lib/api/client"

export async function POST(req: Request) {
  const body = (await req.json()) as { user_id: string; otp: string; channel: "email" | "sms" }
  if (!body.user_id || !body.otp) {
    return NextResponse.json({ error: "invalid_input" }, { status: 400 })
  }
  try {
    const result = await api<{ verified: boolean }>(`/auth/verify-otp`, { method: "POST", body })
    return NextResponse.json(result)
  } catch (err: any) {
    if (err instanceof ApiError) {
      return NextResponse.json({ error: err.code, message: err.message }, { status: err.status })
    }
    return NextResponse.json({ error: "unknown_error" }, { status: 500 })
  }
}
