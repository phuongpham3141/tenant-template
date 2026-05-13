"use client"

import { useState } from "react"
import { VisualSearchModal } from "./VisualSearchModal"

interface Props {
  locale?: "vi" | "en" | "cn"
  className?: string
}

const LABEL: Record<string, string> = {
  vi: "Tìm bằng hình ảnh",
  en: "Search by image",
  cn: "图片搜索",
}

export function VisualSearchButton({ locale = "vi", className = "" }: Props) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={LABEL[locale]}
        title={LABEL[locale]}
        className={`inline-flex h-9 w-9 items-center justify-center rounded-md text-slate-600 transition hover:bg-slate-100 hover:text-blue-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-blue-400 ${className}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
          <circle cx="12" cy="13" r="3" />
          <circle cx="12" cy="13" r="0.5" fill="currentColor" />
        </svg>
      </button>
      {open && <VisualSearchModal locale={locale} onClose={() => setOpen(false)} />}
    </>
  )
}
