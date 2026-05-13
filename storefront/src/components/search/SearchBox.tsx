"use client"

import { useEffect, useId, useRef, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useAutocomplete } from "@/lib/hooks/useAutocomplete"
import { useRecentSearches } from "@/lib/hooks/useRecentSearches"
import { autocompleteApi, type Suggestion } from "@/lib/sdk/search/autocomplete"
import { SuggestionItem } from "./SuggestionItem"
import { RecentSearches } from "./RecentSearches"
import { VisualSearchButton } from "./VisualSearchButton"

interface Props {
  locale?: "vi" | "en" | "cn"
  initialQuery?: string
  placeholder?: string
  className?: string
  withVisualSearch?: boolean
  autoFocus?: boolean
}

const PLACEHOLDER: Record<string, string> = {
  vi: "Tìm sản phẩm, nhà cung cấp, danh mục…",
  en: "Search products, suppliers, categories…",
  cn: "搜索产品、供应商、类别…",
}

export function SearchBox({
  locale = "vi",
  initialQuery = "",
  placeholder,
  className = "",
  withVisualSearch = true,
  autoFocus = false,
}: Props) {
  const router = useRouter()
  const [query, setQuery] = useState(initialQuery)
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const wrapRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const listboxId = useId()

  const { suggestions, loading, source } = useAutocomplete(query, { locale })
  const { items: recent, add: addRecent, remove: removeRecent, clear: clearRecent } = useRecentSearches()

  const showRecent = query.trim().length === 0 && recent.length > 0
  const visible = open && (suggestions.length > 0 || showRecent || loading)

  // Click outside to close
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", onClick)
    return () => document.removeEventListener("mousedown", onClick)
  }, [])

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus()
  }, [autoFocus])

  useEffect(() => {
    // reset highlighted item when suggestions change
    setActiveIndex(-1)
  }, [suggestions, showRecent])

  const submitFreeText = useCallback((q: string) => {
    const trimmed = q.trim()
    if (!trimmed) return
    addRecent(trimmed)
    setOpen(false)
    router.push(`/search?q=${encodeURIComponent(trimmed)}`)
  }, [router, addRecent])

  const selectSuggestion = useCallback((s: Suggestion, position: number) => {
    addRecent(s.label)
    setOpen(false)
    void autocompleteApi.trackClick({
      query,
      locale,
      suggestionType: s.type,
      suggestionValue: s.label,
      position,
      productId: s.product_id ?? undefined,
      categoryId: s.category_id ?? undefined,
      supplierId: s.supplier_id ?? undefined,
    })
    router.push(s.url)
  }, [router, addRecent, query, locale])

  const handleKey = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!visible) {
      if (e.key === "Enter") submitFreeText(query)
      return
    }
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setActiveIndex((i) => Math.min(i + 1, suggestions.length - 1))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setActiveIndex((i) => Math.max(i - 1, -1))
    } else if (e.key === "Enter") {
      e.preventDefault()
      if (activeIndex >= 0 && suggestions[activeIndex]) {
        selectSuggestion(suggestions[activeIndex], activeIndex)
      } else {
        submitFreeText(query)
      }
    } else if (e.key === "Escape") {
      setOpen(false)
    }
  }, [visible, activeIndex, suggestions, query, submitFreeText, selectSuggestion])

  return (
    <div ref={wrapRef} className={`relative ${className}`}>
      <form
        role="search"
        onSubmit={(e) => { e.preventDefault(); submitFreeText(query) }}
        className="flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-2 shadow-sm focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 dark:border-slate-700 dark:bg-slate-900"
      >
        <svg aria-hidden width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1 text-slate-400"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>

        <input
          ref={inputRef}
          type="search"
          inputMode="search"
          autoComplete="off"
          spellCheck="false"
          role="combobox"
          aria-autocomplete="list"
          aria-controls={listboxId}
          aria-expanded={visible}
          aria-activedescendant={activeIndex >= 0 ? `${listboxId}-opt-${activeIndex}` : undefined}
          placeholder={placeholder ?? PLACEHOLDER[locale]}
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true) }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKey}
          className="flex-1 bg-transparent px-2 py-2 text-sm outline-none placeholder:text-slate-400 dark:text-slate-100"
        />

        {query && (
          <button
            type="button"
            aria-label="Clear"
            onClick={() => { setQuery(""); inputRef.current?.focus() }}
            className="inline-flex h-7 w-7 items-center justify-center rounded-md text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>
        )}

        {withVisualSearch && <VisualSearchButton locale={locale} className="!h-8 !w-8" />}

        <button
          type="submit"
          className="ml-1 rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          {locale === "vi" ? "Tìm" : locale === "cn" ? "搜索" : "Search"}
        </button>
      </form>

      {visible && (
        <div
          id={listboxId}
          role="listbox"
          className="absolute left-0 right-0 top-full z-40 mt-1 max-h-[28rem] overflow-y-auto rounded-lg border border-slate-200 bg-white py-1 shadow-xl dark:border-slate-700 dark:bg-slate-950"
        >
          {showRecent && (
            <RecentSearches
              items={recent}
              onRemove={removeRecent}
              onClear={clearRecent}
              onSelect={(q) => { setQuery(q); setOpen(false) }}
            />
          )}

          {source === "trending_default" && suggestions.length > 0 && (
            <div className="px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
              {locale === "vi" ? "Đang hot" : locale === "cn" ? "热门" : "Trending"}
            </div>
          )}

          {suggestions.map((s, i) => (
            <div key={`${s.type}-${s.label}-${i}`} id={`${listboxId}-opt-${i}`}>
              <SuggestionItem
                suggestion={s}
                query={query}
                active={i === activeIndex}
                onSelect={() => selectSuggestion(s, i)}
                onHover={() => setActiveIndex(i)}
              />
            </div>
          ))}

          {loading && (
            <div className="px-3 py-2 text-xs text-slate-400">
              {locale === "vi" ? "Đang tìm…" : locale === "cn" ? "搜索中…" : "Searching…"}
            </div>
          )}

          {!loading && suggestions.length === 0 && !showRecent && (
            <div className="px-3 py-4 text-center text-xs text-slate-400">
              {locale === "vi" ? "Không có gợi ý" : locale === "cn" ? "无建议" : "No suggestions"}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
