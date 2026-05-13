"use client"

import Link from "next/link"
import type { VisualAnalysis, VisualHit } from "@/lib/sdk/search/visual"
import { formatMoney } from "@/lib/money/format"

interface Props {
  analysis: VisualAnalysis
  hits: VisualHit[]
  locale: "vi" | "en" | "cn"
  latencyMs?: number
  onResultClick?: (hit: VisualHit) => void
}

const LABELS = {
  vi: { detected: "Hệ thống nhận diện", category: "Danh mục", color: "Màu", material: "Chất liệu", style: "Phong cách", matches: "kết quả tương tự", noResults: "Không tìm thấy sản phẩm tương tự", match: "% trùng khớp" },
  en: { detected: "We detected", category: "Category", color: "Colors", material: "Material", style: "Style", matches: "similar products", noResults: "No similar products found", match: "% match" },
  cn: { detected: "AI 识别", category: "类别", color: "颜色", material: "材质", style: "风格", matches: "相似产品", noResults: "未找到相似产品", match: "% 匹配" },
}

export function VisualSearchResults({ analysis, hits, locale, latencyMs, onResultClick }: Props) {
  const t = LABELS[locale]
  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900">
        <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">{t.detected}</div>
        <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm sm:grid-cols-4">
          <div><dt className="text-slate-500">{t.category}</dt><dd className="font-medium">{analysis.category || "—"}</dd></div>
          <div><dt className="text-slate-500">{t.color}</dt><dd className="font-medium">{analysis.colors?.join(", ") || "—"}</dd></div>
          <div><dt className="text-slate-500">{t.material}</dt><dd className="font-medium">{analysis.material || "—"}</dd></div>
          <div><dt className="text-slate-500">{t.style}</dt><dd className="font-medium">{analysis.style || "—"}</dd></div>
        </dl>
        {analysis.descriptors?.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {analysis.descriptors.map((d) => (
              <span key={d} className="rounded-full bg-white px-2 py-0.5 text-xs text-slate-600 ring-1 ring-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700">
                {d}
              </span>
            ))}
          </div>
        )}
      </div>

      {hits.length === 0 ? (
        <div className="rounded-lg border border-dashed border-slate-300 p-8 text-center text-slate-500 dark:border-slate-700">
          {t.noResults}
        </div>
      ) : (
        <>
          <div className="text-sm text-slate-600 dark:text-slate-400">
            {hits.length} {t.matches}
            {typeof latencyMs === "number" && <span className="ml-2 text-slate-400">({latencyMs}ms)</span>}
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {hits.map((h) => (
              <Link
                key={h.product_id}
                href={h.url}
                onClick={() => onResultClick?.(h)}
                className="group flex flex-col overflow-hidden rounded-lg border border-slate-200 bg-white transition hover:border-blue-400 hover:shadow-md dark:border-slate-700 dark:bg-slate-900"
              >
                <div className="relative aspect-square overflow-hidden bg-slate-100 dark:bg-slate-800">
                  {h.thumbnail ? (
                    <img src={h.thumbnail} alt={h.title} loading="lazy" className="h-full w-full object-cover transition group-hover:scale-105" />
                  ) : (
                    <div className="flex h-full items-center justify-center text-slate-400">📦</div>
                  )}
                  <span className="absolute right-2 top-2 rounded-full bg-blue-600 px-2 py-0.5 text-xs font-medium text-white shadow">
                    {Math.round(h.match_score * 100)}{t.match}
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-1 p-2.5">
                  <div className="line-clamp-2 text-sm font-medium text-slate-900 dark:text-slate-100">{h.title}</div>
                  {h.base_price_minor && h.base_currency && (
                    <div className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                      {formatMoney(h.base_price_minor, h.base_currency, locale === "vi" ? "vi-VN" : locale === "cn" ? "zh-CN" : "en-US")}
                    </div>
                  )}
                  {h.supplier_name && (
                    <div className="truncate text-xs text-slate-500 dark:text-slate-400">
                      {h.supplier_name}
                      {h.supplier_country && <span className="ml-1 rounded bg-slate-100 px-1 dark:bg-slate-800">{h.supplier_country}</span>}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
