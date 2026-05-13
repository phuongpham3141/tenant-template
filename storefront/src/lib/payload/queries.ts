import { payloadFind, payloadFindBySlug, payloadGlobal } from "./client"

export interface BlogArticle {
  id: string
  title: string
  slug: string
  excerpt?: string
  coverImage?: { url: string }
  category: string
  publishedAt: string
  author?: { displayName: string }
  content?: any
}

export interface Banner {
  id: string
  name: string
  placement: string
  targetType: string
  targetValue?: string
  creatives: Array<{ image: { url: string }; imageMobile?: { url: string }; alt?: string; headline?: string; ctaLabel?: string; ctaUrl?: string }>
  priority: number
  weight: number
}

export interface IndustryChannel {
  id: string
  code: string
  name: string
  slug: string
  icon?: { url: string }
  cover?: { url: string }
  tagline?: string
}

export interface TradeShowItem {
  id: string
  slug: string
  name: string
  shortName?: string
  startDate: string
  endDate: string
  coverImage?: { url: string }
  venue: { name?: string; city?: string; country: string }
  stats?: { exhibitorCount?: number; visitorCount?: number }
}

export const payloadQueries = {
  blogArticles: (params: { category?: string; locale?: "vi" | "en" | "cn"; page?: number; limit?: number } = {}) =>
    payloadFind<BlogArticle>("blog-articles", {
      where: { _status: { equals: "published" }, ...(params.category ? { category: { equals: params.category } } : {}) },
      sort: "-publishedAt", limit: params.limit ?? 20, page: params.page ?? 1, locale: params.locale ?? "vi", depth: 1,
    }),
  blogArticleBySlug: (slug: string, locale: "vi" | "en" | "cn" = "vi") =>
    payloadFindBySlug<BlogArticle>("blog-articles", slug, locale),
  banners: (placement: string, locale: "vi" | "en" | "cn" = "vi") =>
    payloadFind<Banner>("banners", { where: { _status: { equals: "published" }, placement: { equals: placement } }, sort: "-priority", locale }),
  industryChannels: (locale: "vi" | "en" | "cn" = "vi") =>
    payloadFind<IndustryChannel>("industry-channels", { sort: "displayOrder", limit: 50, locale }),
  tradeShows: (locale: "vi" | "en" | "cn" = "vi") =>
    payloadFind<TradeShowItem>("trade-shows", { sort: "startDate", limit: 20, locale, where: { _status: { equals: "published" } } }),
  siteSettings: (locale: "vi" | "en" | "cn" = "vi") => payloadGlobal<any>("site-settings", locale),
  navigation: (locale: "vi" | "en" | "cn" = "vi") => payloadGlobal<any>("navigation", locale),
  footer: (locale: "vi" | "en" | "cn" = "vi") => payloadGlobal<any>("footer", locale),
}
