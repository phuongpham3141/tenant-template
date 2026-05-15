"use client"

import { useEffect } from "react"
import Link from "next/link"

export default function BuyerCenterError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string }
  unstable_retry: () => void
}) {
  useEffect(() => {
    console.error("Buyer-center error:", error)
  }, [error])

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 text-center">
      <div className="text-5xl mb-4" aria-hidden="true">⚠</div>
      <h2 className="text-xl font-bold text-ink mb-2">
        Không tải được dữ liệu
      </h2>
      <p className="text-mute mb-6">
        Đã có sự cố khi tải trang. Vui lòng thử lại.
      </p>
      <div className="flex gap-3 justify-center">
        <button
          onClick={() => unstable_retry()}
          className="px-5 py-2 bg-brand text-paper rounded hover:bg-brand-dark transition"
        >
          Thử lại
        </button>
        <Link
          href="/buyer-center"
          className="px-5 py-2 border border-line text-ink rounded hover:bg-surface-1 transition"
        >
          Về Buyer Center
        </Link>
      </div>
    </div>
  )
}
