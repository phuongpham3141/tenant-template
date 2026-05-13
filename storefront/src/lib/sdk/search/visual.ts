export interface VisualAnalysis {
  category: string
  colors: string[]
  material: string
  style: string
  descriptors: string[]
  text_for_embedding: string
}

export interface VisualHit {
  product_id: string
  sku: string
  title: string
  title_i18n: Record<string, string>
  supplier_id: string
  supplier_name?: string
  supplier_country?: string
  verification_tier?: number
  category_id?: string
  base_price_minor: string | null
  base_currency: string | null
  thumbnail: string | null
  match_score: number
  url: string
}

export interface VisualSearchResult {
  analysis: VisualAnalysis
  hits: VisualHit[]
  total: number
  latency_ms: number
  image_url?: string
}

const BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL ?? "http://api.huayuesc.local"
const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY ?? ""

export const visualSearchApi = {
  /** Visual search by image URL or base64 payload. */
  async byUrl(input: {
    imageUrl?: string
    imageBase64?: string
    locale?: "vi" | "en" | "cn"
    limit?: number
    filterCategoryId?: string
    filterSupplierCountry?: string
  }): Promise<VisualSearchResult> {
    const res = await fetch(`${BACKEND_URL}/store/search/visual`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "x-publishable-api-key": PUBLISHABLE_KEY,
      },
      body: JSON.stringify({
        image_url: input.imageUrl,
        image_base64: input.imageBase64,
        locale: input.locale,
        limit: input.limit,
        filter_category_id: input.filterCategoryId,
        filter_supplier_country: input.filterSupplierCountry,
      }),
    })
    if (!res.ok) throw new Error(`visual_search_failed: ${res.status}`)
    return res.json()
  },

  /**
   * Visual search by uploaded file. Goes through Next.js proxy at `/api/search/visual-upload`
   * which forwards the multipart to Medusa (avoids exposing publishable key in browser
   * upload requests and lets us attach the session cookie tenant context).
   */
  async byFile(file: File, opts: { locale?: "vi" | "en" | "cn"; limit?: number } = {}): Promise<VisualSearchResult> {
    const fd = new FormData()
    fd.append("image", file, file.name)
    if (opts.locale) fd.append("locale", opts.locale)
    if (opts.limit) fd.append("limit", String(opts.limit))

    const res = await fetch("/api/search/visual-upload", {
      method: "POST",
      body: fd,
    })
    if (!res.ok) {
      const text = await res.text().catch(() => "")
      throw new Error(`upload_failed: ${res.status} ${text.slice(0, 200)}`)
    }
    return res.json()
  },
}
