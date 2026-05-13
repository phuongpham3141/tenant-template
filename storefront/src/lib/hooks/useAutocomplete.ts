"use client"

import { useEffect, useRef, useState } from "react"
import { autocompleteApi, type Suggestion } from "@/lib/sdk/search/autocomplete"

interface UseAutocompleteOptions {
  locale?: "vi" | "en" | "cn"
  debounceMs?: number
  minChars?: number
  includeProducts?: boolean
  includeSuppliers?: boolean
  includeCategories?: boolean
  /** Show trending terms when query is empty. */
  showTrendingOnEmpty?: boolean
}

interface UseAutocompleteState {
  suggestions: Suggestion[]
  loading: boolean
  error: Error | null
  source: "trending_default" | "live" | null
}

export function useAutocomplete(query: string, opts: UseAutocompleteOptions = {}): UseAutocompleteState {
  const {
    locale = "vi",
    debounceMs = 180,
    minChars = 1,
    includeProducts = true,
    includeSuppliers = true,
    includeCategories = true,
    showTrendingOnEmpty = true,
  } = opts

  const [state, setState] = useState<UseAutocompleteState>({
    suggestions: [],
    loading: false,
    error: null,
    source: null,
  })
  const abortRef = useRef<AbortController | null>(null)
  const lastQueryRef = useRef<string>("")

  useEffect(() => {
    const trimmed = query.trim()

    if (trimmed.length < minChars) {
      abortRef.current?.abort()
      if (!showTrendingOnEmpty) {
        setState({ suggestions: [], loading: false, error: null, source: null })
        return
      }
      let cancelled = false
      setState((s) => ({ ...s, loading: true, error: null }))
      autocompleteApi
        .trending({ locale, period: "24h", limit: 10 })
        .then((res) => {
          if (cancelled) return
          setState({
            suggestions: res.terms.map((t) => ({
              type: "trending" as const,
              label: t.term,
              url: t.url,
            })),
            loading: false,
            error: null,
            source: "trending_default",
          })
        })
        .catch((e) => {
          if (cancelled) return
          setState({ suggestions: [], loading: false, error: e, source: null })
        })
      return () => {
        cancelled = true
      }
    }

    const handle = setTimeout(async () => {
      abortRef.current?.abort()
      const ctrl = new AbortController()
      abortRef.current = ctrl
      lastQueryRef.current = trimmed
      setState((s) => ({ ...s, loading: true, error: null }))
      try {
        const res = await autocompleteApi.fetch(trimmed, {
          locale,
          includeProducts,
          includeSuppliers,
          includeCategories,
          signal: ctrl.signal,
        })
        if (ctrl.signal.aborted || lastQueryRef.current !== trimmed) return
        setState({ suggestions: res.suggestions, loading: false, error: null, source: res.source })
      } catch (e: any) {
        if (e?.name === "AbortError") return
        setState({ suggestions: [], loading: false, error: e, source: null })
      }
    }, debounceMs)

    return () => clearTimeout(handle)
  }, [
    query, locale, debounceMs, minChars,
    includeProducts, includeSuppliers, includeCategories, showTrendingOnEmpty,
  ])

  return state
}
