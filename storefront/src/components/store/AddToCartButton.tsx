"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { addToCart } from "@/lib/store/cart"

export function AddToCartButton({
  variantId,
  disabled,
}: {
  variantId: string | null
  disabled?: boolean
}) {
  const [qty, setQty] = useState(1)
  const [pending, start] = useTransition()
  const [err, setErr] = useState<string | null>(null)
  const router = useRouter()

  function handleAdd() {
    if (!variantId) return
    setErr(null)
    start(async () => {
      try {
        await addToCart(variantId, qty)
        router.push("/cart")
      } catch (e: any) {
        setErr(e?.message || "Không thêm được vào giỏ")
      }
    })
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <div className="flex items-center border border-line rounded">
          <button
            type="button"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="px-3 py-2 text-ink hover:bg-surface-1"
            aria-label="Giảm"
          >
            −
          </button>
          <input
            value={qty}
            onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-14 text-center border-x border-line py-2 text-ink bg-transparent"
            inputMode="numeric"
          />
          <button
            type="button"
            onClick={() => setQty((q) => q + 1)}
            className="px-3 py-2 text-ink hover:bg-surface-1"
            aria-label="Tăng"
          >
            +
          </button>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          disabled={disabled || !variantId || pending}
          className="flex-1 bg-accent text-white font-semibold px-6 py-2.5 rounded hover:opacity-90 disabled:opacity-50"
        >
          {pending ? "Đang thêm…" : "Thêm vào giỏ"}
        </button>
      </div>
      {err && <p className="text-[12px] text-red-600">{err}</p>}
    </div>
  )
}
