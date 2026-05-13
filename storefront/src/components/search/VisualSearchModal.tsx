"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { useVisualSearch } from "@/lib/hooks/useVisualSearch"
import { VisualSearchResults } from "./VisualSearchResults"

const MAX_BYTES = 10 * 1024 * 1024
const ACCEPTED = "image/jpeg,image/png,image/webp,image/heic,image/heif"

interface Props {
  locale?: "vi" | "en" | "cn"
  onClose: () => void
}

const LABELS = {
  vi: { title: "Tìm sản phẩm bằng hình ảnh", dropHint: "Kéo & thả ảnh vào đây, hoặc", browse: "chọn từ thiết bị", camera: "Chụp ảnh", urlLabel: "Hoặc dán URL ảnh", search: "Tìm kiếm", searching: "Đang phân tích…", change: "Đổi ảnh khác", error: "Đã xảy ra lỗi", tooLarge: "Ảnh quá lớn (tối đa 10MB)", invalidType: "Định dạng không hỗ trợ", close: "Đóng" },
  en: { title: "Search by image", dropHint: "Drag & drop an image, or", browse: "browse device", camera: "Take photo", urlLabel: "Or paste an image URL", search: "Search", searching: "Analyzing…", change: "Change image", error: "Something went wrong", tooLarge: "Image too large (max 10MB)", invalidType: "Unsupported format", close: "Close" },
  cn: { title: "通过图片搜索", dropHint: "拖放图片到此处，或", browse: "从设备选择", camera: "拍摄照片", urlLabel: "或粘贴图片网址", search: "搜索", searching: "正在分析…", change: "更换图片", error: "发生错误", tooLarge: "图片过大（最大10MB）", invalidType: "不支持的格式", close: "关闭" },
}

export function VisualSearchModal({ locale = "vi", onClose }: Props) {
  const t = LABELS[locale]
  const { result, loading, error, previewUrl, searchFile, searchUrl, reset } = useVisualSearch()
  const [dragOver, setDragOver] = useState(false)
  const [urlInput, setUrlInput] = useState("")
  const [localError, setLocalError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    document.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [onClose])

  const handleFile = useCallback((file: File | null | undefined) => {
    if (!file) return
    if (file.size > MAX_BYTES) {
      setLocalError(t.tooLarge)
      return
    }
    if (!file.type.startsWith("image/")) {
      setLocalError(t.invalidType)
      return
    }
    setLocalError(null)
    void searchFile(file, { locale })
  }, [searchFile, locale, t.tooLarge, t.invalidType])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    handleFile(e.dataTransfer.files?.[0])
  }, [handleFile])

  const handleUrlSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    const url = urlInput.trim()
    if (!url) return
    setLocalError(null)
    void searchUrl(url, { locale })
  }, [urlInput, searchUrl, locale])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="visual-search-title"
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-900/60 p-4 sm:items-center"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl rounded-xl bg-white shadow-2xl dark:bg-slate-950"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between border-b border-slate-200 px-5 py-3 dark:border-slate-800">
          <h2 id="visual-search-title" className="text-base font-semibold text-slate-900 dark:text-slate-100">
            {t.title}
          </h2>
          <button type="button" onClick={onClose} aria-label={t.close} className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>
        </header>

        <div className="p-5">
          {!result && !loading && (
            <>
              <div
                role="button"
                tabIndex={0}
                onClick={() => fileInputRef.current?.click()}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && fileInputRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 text-center transition ${
                  dragOver ? "border-blue-500 bg-blue-50 dark:bg-blue-950" : "border-slate-300 hover:border-blue-400 dark:border-slate-700"
                }`}
              >
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mb-2 text-slate-400">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  {t.dropHint} <span className="font-semibold text-blue-600">{t.browse}</span>
                </p>
                <p className="mt-1 text-xs text-slate-500">JPG, PNG, WEBP &middot; max 10MB</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept={ACCEPTED}
                  className="hidden"
                  onChange={(e) => handleFile(e.target.files?.[0])}
                />
              </div>

              <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => cameraInputRef.current?.click()}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-blue-400 hover:bg-blue-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-blue-950"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
                  {t.camera}
                </button>
                <input
                  ref={cameraInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                  onChange={(e) => handleFile(e.target.files?.[0])}
                />
              </div>

              <form onSubmit={handleUrlSubmit} className="mt-4 flex flex-col gap-2">
                <label htmlFor="vs-url" className="text-xs font-medium text-slate-600 dark:text-slate-400">
                  {t.urlLabel}
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
                    disabled={!urlInput.trim()}
                    className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:bg-slate-300"
                  >
                    {t.search}
                  </button>
                </div>
              </form>

              {localError && <p className="mt-3 text-sm text-red-600">{localError}</p>}
            </>
          )}

          {loading && (
            <div className="flex flex-col items-center gap-3 py-12">
              {previewUrl && (
                <img src={previewUrl} alt="" className="max-h-64 rounded-lg shadow" />
              )}
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                <svg className="h-5 w-5 animate-spin text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" /><path fill="currentColor" className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                {t.searching}
              </div>
            </div>
          )}

          {error && !loading && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
              <strong className="font-semibold">{t.error}:</strong> {error.message}
              <button type="button" onClick={reset} className="ml-3 underline">
                {t.change}
              </button>
            </div>
          )}

          {result && !loading && (
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-4">
                {previewUrl && <img src={previewUrl} alt="" className="h-32 w-32 rounded-lg object-cover shadow" />}
                <button
                  type="button"
                  onClick={reset}
                  className="text-sm font-medium text-blue-600 hover:underline"
                >
                  {t.change}
                </button>
              </div>
              <VisualSearchResults
                analysis={result.analysis}
                hits={result.hits}
                locale={locale}
                latencyMs={result.latency_ms}
                onResultClick={() => onClose()}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
