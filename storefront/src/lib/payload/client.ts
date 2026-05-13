const PAYLOAD_URL = process.env.PAYLOAD_INTERNAL_URL ?? process.env.NEXT_PUBLIC_PAYLOAD_URL ?? "http://cms.huayuesc.local"
const PAYLOAD_API_KEY = process.env.PAYLOAD_API_KEY ?? ""

export interface PayloadFindOpts {
  limit?: number
  page?: number
  where?: Record<string, unknown>
  sort?: string
  depth?: number
  locale?: "vi" | "en" | "cn" | "all"
  fallbackLocale?: string
}

export async function payloadFind<T>(collection: string, opts: PayloadFindOpts = {}): Promise<{ docs: T[]; totalDocs: number; totalPages: number; page: number }> {
  const params = new URLSearchParams()
  if (opts.limit) params.set("limit", String(opts.limit))
  if (opts.page) params.set("page", String(opts.page))
  if (opts.sort) params.set("sort", opts.sort)
  if (opts.depth !== undefined) params.set("depth", String(opts.depth))
  if (opts.locale) params.set("locale", opts.locale)
  if (opts.fallbackLocale) params.set("fallback-locale", opts.fallbackLocale)
  if (opts.where) params.set("where", JSON.stringify(opts.where))
  const headers: Record<string, string> = { "Content-Type": "application/json" }
  if (PAYLOAD_API_KEY) headers["Authorization"] = `users API-Key ${PAYLOAD_API_KEY}`
  const res = await fetch(`${PAYLOAD_URL}/api/${collection}?${params.toString()}`, { headers, next: { revalidate: 60, tags: [collection] } })
  if (!res.ok) throw new Error(`Payload ${collection} ${res.status}`)
  return res.json()
}

export async function payloadFindBySlug<T>(collection: string, slug: string, locale: "vi" | "en" | "cn" = "vi"): Promise<T | null> {
  const res = await payloadFind<T>(collection, { where: { slug: { equals: slug } }, limit: 1, locale })
  return res.docs[0] ?? null
}

export async function payloadGlobal<T>(slug: string, locale: "vi" | "en" | "cn" = "vi"): Promise<T> {
  const params = new URLSearchParams({ locale, "fallback-locale": "vi" })
  const headers: Record<string, string> = {}
  if (PAYLOAD_API_KEY) headers["Authorization"] = `users API-Key ${PAYLOAD_API_KEY}`
  const res = await fetch(`${PAYLOAD_URL}/api/globals/${slug}?${params.toString()}`, { headers, next: { revalidate: 60, tags: [slug] } })
  if (!res.ok) throw new Error(`Payload global ${slug} ${res.status}`)
  return res.json()
}
