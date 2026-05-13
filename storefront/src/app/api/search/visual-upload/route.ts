import { NextResponse } from "next/server"
import { getSession } from "@/lib/session"
import { DEFAULT_TENANT } from "@/lib/tenant"

const MAX_BYTES = 10 * 1024 * 1024
const BACKEND_URL = process.env.MEDUSA_INTERNAL_URL ?? process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL ?? "http://api.huayuesc.local"
const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY ?? ""

export const runtime = "nodejs"

export async function POST(req: Request) {
  const contentType = req.headers.get("content-type") ?? ""
  if (!contentType.includes("multipart/form-data")) {
    return NextResponse.json({ error: "expected_multipart" }, { status: 400 })
  }
  const contentLength = Number(req.headers.get("content-length") ?? 0)
  if (contentLength > MAX_BYTES) {
    return NextResponse.json({ error: "file_too_large", limit_bytes: MAX_BYTES }, { status: 413 })
  }

  const session = await getSession()
  const forwardHeaders: Record<string, string> = {
    "Content-Type": contentType,
    "x-publishable-api-key": PUBLISHABLE_KEY,
    "x-tenant-id": session?.tenantId ?? DEFAULT_TENANT.tenantId,
  }
  if (session) forwardHeaders["Authorization"] = `Bearer ${session.userId}`

  const upstream = await fetch(`${BACKEND_URL}/store/search/visual/from-upload`, {
    method: "POST",
    headers: forwardHeaders,
    body: req.body,
    // @ts-expect-error: Node fetch streaming bodies require duplex
    duplex: "half",
  })

  const payload = await upstream.text()
  return new NextResponse(payload, {
    status: upstream.status,
    headers: { "Content-Type": upstream.headers.get("content-type") ?? "application/json" },
  })
}
