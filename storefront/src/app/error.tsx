"use client"

import { useEffect } from "react"
import Link from "next/link"

export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string }
  unstable_retry: () => void
}) {
  useEffect(() => {
    console.error("Global error:", error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg px-4">
      <div className="max-w-md text-center">
        <div className="text-6xl mb-4" aria-hidden="true">⚠</div>
        <h1 className="text-2xl font-bold text-ink mb-2">
          Có lỗi xảy ra
        </h1>
        <p className="text-mute mb-6">
          Đã có sự cố. Vui lòng thử lại hoặc liên hệ hỗ trợ.
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => unstable_retry()}
            className="px-5 py-2 bg-brand text-paper rounded hover:bg-brand-dark transition"
          >
            Thử lại
          </button>
          <Link
            href="/"
            className="px-5 py-2 border border-line text-ink rounded hover:bg-surface-1 transition"
          >
            Về trang chủ
          </Link>
        </div>
        {error.digest && (
          <p className="text-xs text-mute2 mt-6">Error ID: {error.digest}</p>
        )}
      </div>
    </div>
  )
}
