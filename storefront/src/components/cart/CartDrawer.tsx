"use client"

import { useState } from "react"
import Link from "next/link"
import { useCart } from "@/components/providers/CartProvider"
import { formatMoney } from "@/lib/money/format"

export function CartDrawer() {
  const [open, setOpen] = useState(false)
  const { items, total, remove } = useCart()
  const itemCount = items.reduce((acc, i) => acc + i.quantity, 0)

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="relative flex items-center gap-1.5 text-[12.5px] text-ink hover:text-brand transition flex-shrink-0"
        aria-label="Mở giỏ hàng"
      >
        <span className="text-[16px]" aria-hidden="true">🛒</span>
        <span className="max-xl:hidden">Giỏ hàng</span>
        {itemCount > 0 && (
          <span className="absolute -top-1.5 -right-1.5 bg-accent text-paper text-[10px] rounded-full min-w-[18px] h-[18px] px-1 flex items-center justify-center font-semibold">
            {itemCount > 99 ? "99+" : itemCount}
          </span>
        )}
      </button>

      {open && (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-labelledby="cart-drawer-title">
          <button
            type="button"
            className="absolute inset-0 bg-ink/50"
            onClick={() => setOpen(false)}
            aria-label="Đóng giỏ hàng"
          />

          <aside className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-paper shadow-xl flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-line">
              <h2 id="cart-drawer-title" className="font-semibold text-ink">
                Giỏ hàng ({itemCount})
              </h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="p-2 hover:bg-surface-1 rounded"
                aria-label="Đóng"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-mute mb-4">Giỏ hàng trống</p>
                  <Link
                    href="/products"
                    onClick={() => setOpen(false)}
                    className="inline-block px-4 py-2 bg-brand text-paper rounded hover:bg-brand-dark transition"
                  >
                    Duyệt sản phẩm
                  </Link>
                </div>
              ) : (
                <ul className="space-y-3">
                  {items.map((item) => {
                    const lineTotal = item.unitPriceMinor * BigInt(item.quantity)
                    return (
                      <li key={`${item.productId}-${item.variantId ?? ""}`} className="flex gap-3 pb-3 border-b border-line">
                        <div className="w-14 h-14 bg-surface-1 rounded flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-ink truncate">{item.title}</p>
                          <p className="text-xs text-mute">SL: {item.quantity}</p>
                          <p className="text-xs font-semibold text-brand">{formatMoney(lineTotal, item.currency)}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => remove(item.productId, item.variantId)}
                          className="text-xs text-mute hover:text-red self-start"
                        >
                          ✕
                        </button>
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-4 border-t border-line space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-mute">Tổng</span>
                  <span className="font-semibold text-ink">{formatMoney(total.minor, total.currency)}</span>
                </div>
                <Link
                  href="/cart"
                  onClick={() => setOpen(false)}
                  className="block text-center py-2.5 border border-brand text-brand rounded hover:bg-brand hover:text-paper transition text-sm"
                >
                  Xem giỏ hàng
                </Link>
                <Link
                  href="/checkout/shipping"
                  onClick={() => setOpen(false)}
                  className="block text-center py-2.5 bg-brand text-paper rounded hover:bg-brand-dark transition text-sm font-medium"
                >
                  Thanh toán
                </Link>
              </div>
            )}
          </aside>
        </div>
      )}
    </>
  )
}
