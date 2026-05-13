"use client"

import Link from "next/link"
import type { Suggestion } from "@/lib/sdk/search/autocomplete"

interface Props {
  terms: Suggestion[]
  title?: string
  onSelect?: (term: string) => void
}

export function TrendingTerms({ terms, title = "Trending", onSelect }: Props) {
  if (terms.length === 0) return null
  return (
    <div className="px-3 py-2">
      <div className="mb-1.5 flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
        <span aria-hidden>🔥</span>
        <span>{title}</span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {terms.map((t) => (
          <Link
            key={t.label}
            href={t.url}
            onClick={() => onSelect?.(t.label)}
            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-blue-500 dark:hover:bg-blue-950"
          >
            {t.label}
          </Link>
        ))}
      </div>
    </div>
  )
}
