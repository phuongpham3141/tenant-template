import { DEFAULT_TENANT } from "../tenant"

// Client-safe API client — KHONG import session (next/headers server-only).
// Session cookie la httpOnly → browser tu gui qua credentials; khong build Authorization header.
const BASE_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL ?? "http://api.huayuesc.local"
const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY ?? ""

export interface BrowserApiOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
  body?: unknown
  headers?: Record<string, string>
  cache?: RequestCache
  next?: { revalidate?: number; tags?: string[] }
  query?: Record<string, string | number | boolean | undefined | null>
}

export class BrowserApiError extends Error {
  constructor(public status: number, public code: string, message: string, public details?: unknown) {
    super(message)
  }
}

function buildUrl(path: string, query?: BrowserApiOptions["query"]): string {
  const url = new URL(path.startsWith("http") ? path : `${BASE_URL}${path}`)
  if (query) {
    for (const [k, v] of Object.entries(query)) {
      if (v === undefined || v === null) continue
      url.searchParams.set(k, String(v))
    }
  }
  return url.toString()
}

export async function api<T>(path: string, opts: BrowserApiOptions = {}): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "x-publishable-api-key": PUBLISHABLE_KEY,
    "x-tenant-id": DEFAULT_TENANT.tenantId,
    ...(opts.headers ?? {}),
  }

  const res = await fetch(buildUrl(path, opts.query), {
    method: opts.method ?? "GET",
    headers,
    body: opts.body ? JSON.stringify(opts.body) : undefined,
    cache: opts.cache,
    next: opts.next,
    credentials: "include",
  })

  const ct = res.headers.get("content-type") ?? ""
  const isJson = ct.includes("application/json")
  const payload = isJson ? await res.json() : await res.text()

  if (!res.ok) {
    const code = isJson ? (payload as any).code ?? (payload as any).error ?? "API_ERROR" : "HTTP_ERROR"
    const message = isJson ? (payload as any).message ?? "Request failed" : `HTTP ${res.status}`
    throw new BrowserApiError(res.status, code, message, payload)
  }
  return payload as T
}
