import { NextResponse } from "next/server"
import { getSession } from "@/lib/session"

export async function GET() {
  const session = await getSession()
  if (!session) return NextResponse.json({ user: null }, { status: 200 })
  return NextResponse.json({
    user: {
      id: session.userId,
      email: session.email,
      display_name: session.displayName,
      tenant_id: session.tenantId,
      roles: session.roles,
      supplier_id: session.supplierId,
      locale: session.locale,
    },
  })
}
