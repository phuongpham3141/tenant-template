"use client"

import Link from "next/link"

interface Props {
  items: Array<{ query: string; at: number }>
  onRemove: (q: string) => void
  onClear: () => void
  onSelect?: (q: string) => void
}

export function RecentSearches({ items, onRemove, onClear, onSelect }: Props) {
  if (items.length === 0) return null
  return (
    <div className="px-3 py-2">
      <div className="mb-1.5 flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-1">
          <span aria-hidden>🕒</span>
          <span>Recent</span>
        </div>
        <button
          type="button"
          onClick={onClear}
          className="text-xs font-normal text-slate-400 hover:text-red-500"
        >
          Clear all
        </button>
      </div>
      <ul className="flex flex-col gap-0.5">
        {items.map((r) => (
          <li
            key={r.query}
            className="flex items-center justify-between rounded-md px-2 py-1 hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            <Link
              href={`/search?q=${encodeURIComponent(r.query)}`}
              onClick={() => onSelect?.(r.query)}
              className="flex-1 truncate text-sm text-slate-700 dark:text-slate-200"
            >
              {r.query}
            </Link>
            <button
              type="button"
              aria-label={`Remove ${r.query}`}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onRemove(r.query)
              }}
              className="ml-2 text-slate-400 hover:text-red-500"
            >
              ×
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
