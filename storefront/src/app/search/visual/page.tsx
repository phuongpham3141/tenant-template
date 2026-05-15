"use client"

/**
 * /search/visual — Functional visual search upload page.
 * Client component, uses useVisualSearch hook.
 * Companion: /search/by-image = SEO landing/marketing page.
 * Audit Sprint 4 Phase 3 confirmed NOT duplicate (92% file diff).
 */

import { useState, useCallback } from "react"
import { useVisualSearch } from "@/lib/hooks/useVisualSearch"
import { VisualSearchResults } from "@/components/search/VisualSearchResults"

const MAX_BYTES = 10 * 1024 * 1024

export default function VisualSearchPage() {
  const { result, loading, error, previewUrl, searchFile, searchUrl, reset } = useVisualSearch()
  const [urlInput, setUrlInput] = useState("")
  const [localError, setLocalError] = useState<string | null>(null)

  const handleFile = useCallback((file: File | null | undefined) => {
    if (!file) return
    if (file.size > MAX_BYTES) {
      setLocalError("Ảnh quá lớn (tối đa 10MB)")
      return
    }
    setLocalError(null)
    void searchFile(file, { locale: "vi" })
  }, [searchFile])

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">Tìm sản phẩm bằng hình ảnh</h1>

      {!result && !loading && (
        <div className="grid gap-4 md:grid-cols-2">
          <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 p-12 text-center transition hover:border-blue-400 dark:border-slate-700">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mb-2 text-slate-400">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            <span className="text-sm text-slate-700 dark:text-slate-300">
              Chọn ảnh từ thiết bị
            </span>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/heic,image/heif"
              className="hidden"
              onChange={(e) => handleFile(e.target.files?.[0])}
            />
          </label>

          <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 p-12 text-center transition hover:border-blue-400 dark:border-slate-700">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mb-2 text-slate-400">
              <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
              <circle cx="12" cy="13" r="3" />
            </svg>
            <span className="text-sm text-slate-700 dark:text-slate-300">Chụp ảnh</span>
            <input
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={(e) => handleFile(e.target.files?.[0])}
            />
          </label>
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault()
          if (!urlInput.trim()) return
          setLocalError(null)
          void searchUrl(urlInput.trim(), { locale: "vi" })
        }}
        className="mt-6 flex flex-col gap-2"
      >
        <label htmlFor="vs-url" className="text-xs font-medium text-slate-600 dark:text-slate-400">
          Hoặc dán URL ảnh
        </label>
        <div className="flex gap-2">
          <input
            id="vs-url"
            type="url"
            placeholder="https://example.com/image.jpg"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            className="flex-1 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          />
          <button
            type="submit"
            disabled={!urlInput.trim() || loading}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:bg-slate-300"
          >
            Tìm kiếm
          </button>
        </div>
      </form>

      {localError && <p className="mt-3 text-sm text-red-600">{localError}</p>}

      {loading && (
        <div className="mt-6 flex flex-col items-center gap-3 py-12">
          {previewUrl && <img src={previewUrl} alt="" className="max-h-64 rounded-lg shadow" />}
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
            <svg className="h-5 w-5 animate-spin text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" /><path fill="currentColor" className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
            Đang phân tích…
          </div>
        </div>
      )}

      {error && !loading && (
        <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
          Lỗi: {error.message}
          <button type="button" onClick={reset} className="ml-3 underline">Thử ảnh khác</button>
        </div>
      )}

      {result && !loading && (
        <div className="mt-6 flex flex-col gap-4">
          <div className="flex items-start gap-4">
            {previewUrl && <img src={previewUrl} alt="" className="h-32 w-32 rounded-lg object-cover shadow" />}
            <button type="button" onClick={reset} className="text-sm font-medium text-blue-600 hover:underline">
              Đổi ảnh khác
            </button>
          </div>
          <VisualSearchResults
            analysis={result.analysis}
            hits={result.hits}
            locale="vi"
            latencyMs={result.latency_ms}
          />
        </div>
      )}
    </main>
  )
}
