"use client"

import Link from "next/link"
import type { Suggestion } from "@/lib/sdk/search/autocomplete"

interface Props {
  suggestion: Suggestion
  query: string
  active: boolean
  onSelect: () => void
  onHover: () => void
}

const TYPE_ICON: Record<Suggestion["type"], string> = {
  query: "🔍",
  trending: "🔥",
  product: "📦",
  category: "🗂️",
  supplier: "🏭",
  did_you_mean: "💡",
}

function highlight(label: string, query: string): React.ReactNode {
  if (!query) return label
  const q = query.trim().toLowerCase()
  if (!q) return label
  const lower = label.toLowerCase()
  const idx = lower.indexOf(q)
  if (idx < 0) return label
  return (
    <>
      {label.slice(0, idx)}
      <span className="font-semibold text-blue-600">{label.slice(idx, idx + q.length)}</span>
      {label.slice(idx + q.length)}
    </>
  )
}

export function SuggestionItem({ suggestion, query, active, onSelect, onHover }: Props) {
  return (
    <Link
      href={suggestion.url}
      onClick={onSelect}
      onMouseEnter={onHover}
      role="option"
      aria-selected={active}
      className={`flex items-center gap-3 px-3 py-2 text-sm transition ${
        active ? "bg-blue-50 dark:bg-slate-800" : "hover:bg-slate-50 dark:hover:bg-slate-800/60"
      }`}
      data-suggestion-type={suggestion.type}
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-slate-100 dark:bg-slate-800 text-base">
        {suggestion.thumbnail ? (
          <img
            src={suggestion.thumbnail}
            alt=""
            loading="lazy"
            className="h-8 w-8 rounded-md object-cover"
          />
        ) : (
          <span aria-hidden>{TYPE_ICON[suggestion.type]}</span>
        )}
      </span>

      <div className="flex min-w-0 flex-1 flex-col">
        <span className="truncate text-slate-900 dark:text-slate-100">
          {highlight(suggestion.label, query)}
        </span>
        {suggestion.sublabel && (
          <span className="truncate text-xs text-slate-500 dark:text-slate-400">{suggestion.sublabel}</span>
        )}
      </div>

      {suggestion.type === "trending" && (
        <span className="rounded-full bg-orange-50 px-2 py-0.5 text-xs font-medium text-orange-600 dark:bg-orange-950 dark:text-orange-300">
          Trending
        </span>
      )}
      {suggestion.type === "did_you_mean" && (
        <span className="rounded-full bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-600 dark:bg-amber-950 dark:text-amber-300">
          ?
        </span>
      )}
      {typeof suggestion.hits === "number" && suggestion.hits > 0 && suggestion.type === "query" && (
        <span className="text-xs text-slate-400">{Math.round(suggestion.hits)}+</span>
      )}
    </Link>
  )
}
