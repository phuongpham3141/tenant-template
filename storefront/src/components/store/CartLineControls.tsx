"use client"

import { useTransition } from "react"
import { updateItem, removeItem } from "@/lib/store/cart"

export function CartLineControls({ lineId, quantity }: { lineId: string; quantity: number }) {
  const [pending, start] = useTransition()
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center border border-line rounded">
        <button
          type="button"
          disabled={pending}
          onClick={() => start(() => updateItem(lineId, quantity - 1))}
          className="px-2.5 py-1 text-ink hover:bg-surface-1 disabled:opacity-50"
          aria-label="Giảm"
        >
          −
        </button>
        <span className="w-10 text-center text-[13px] text-ink">{quantity}</span>
        <button
          type="button"
          disabled={pending}
          onClick={() => start(() => updateItem(lineId, quantity + 1))}
          className="px-2.5 py-1 text-ink hover:bg-surface-1 disabled:opacity-50"
          aria-label="Tăng"
        >
          +
        </button>
      </div>
      <button
        type="button"
        disabled={pending}
        onClick={() => start(() => removeItem(lineId))}
        className="text-[12px] text-mute hover:text-red-600 disabled:opacity-50"
      >
        Xóa
      </button>
    </div>
  )
}
