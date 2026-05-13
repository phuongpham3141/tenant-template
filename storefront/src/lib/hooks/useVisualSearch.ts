"use client"

import { useCallback, useRef, useState } from "react"
import { visualSearchApi, type VisualSearchResult } from "@/lib/sdk/search/visual"

interface UseVisualSearchState {
  result: VisualSearchResult | null
  loading: boolean
  error: Error | null
  previewUrl: string | null
}

interface UseVisualSearchActions {
  searchFile: (file: File, opts?: { locale?: "vi" | "en" | "cn"; limit?: number }) => Promise<void>
  searchUrl: (url: string, opts?: { locale?: "vi" | "en" | "cn"; limit?: number; filterCategoryId?: string }) => Promise<void>
  reset: () => void
}

export function useVisualSearch(): UseVisualSearchState & UseVisualSearchActions {
  const [state, setState] = useState<UseVisualSearchState>({
    result: null,
    loading: false,
    error: null,
    previewUrl: null,
  })
  const previewObjectUrlRef = useRef<string | null>(null)

  const revokePreview = useCallback(() => {
    if (previewObjectUrlRef.current) {
      URL.revokeObjectURL(previewObjectUrlRef.current)
      previewObjectUrlRef.current = null
    }
  }, [])

  const searchFile = useCallback<UseVisualSearchActions["searchFile"]>(async (file, opts = {}) => {
    revokePreview()
    const previewUrl = URL.createObjectURL(file)
    previewObjectUrlRef.current = previewUrl
    setState({ result: null, loading: true, error: null, previewUrl })
    try {
      const result = await visualSearchApi.byFile(file, opts)
      setState((s) => ({ ...s, result, loading: false, error: null }))
    } catch (e: any) {
      setState((s) => ({ ...s, result: null, loading: false, error: e }))
    }
  }, [revokePreview])

  const searchUrl = useCallback<UseVisualSearchActions["searchUrl"]>(async (url, opts = {}) => {
    revokePreview()
    setState({ result: null, loading: true, error: null, previewUrl: url })
    try {
      const result = await visualSearchApi.byUrl({
        imageUrl: url,
        locale: opts.locale,
        limit: opts.limit,
        filterCategoryId: opts.filterCategoryId,
      })
      setState((s) => ({ ...s, result, loading: false, error: null }))
    } catch (e: any) {
      setState((s) => ({ ...s, result: null, loading: false, error: e }))
    }
  }, [revokePreview])

  const reset = useCallback(() => {
    revokePreview()
    setState({ result: null, loading: false, error: null, previewUrl: null })
  }, [revokePreview])

  return { ...state, searchFile, searchUrl, reset }
}
