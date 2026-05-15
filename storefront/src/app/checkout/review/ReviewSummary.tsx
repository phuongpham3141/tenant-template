"use client"

import Link from "next/link"
import { useCart } from "@/components/providers/CartProvider"
import { formatMoney } from "@/lib/money/format"

export function ReviewSummary() {
  const { items, total } = useCart()

  return (
    <div className="mb-6">
      <h2 className="font-semibold text-ink mb-3">Sản phẩm trong đơn</h2>
      <div className="border border-line rounded-lg overflow-hidden">
        {items.length === 0 ? (
          <div className="p-4 text-center text-mute text-sm">
            Giỏ hàng trống. <Link href="/products" className="text-brand hover:underline">Duyệt sản phẩm</Link>.
          </div>
        ) : (
          <ul className="divide-y divide-line">
            {items.map((item) => {
              const lineTotal = item.unitPriceMinor * BigInt(item.quantity)
              return (
                <li key={`${item.productId}-${item.variantId ?? ""}`} className="p-3 flex items-center gap-3">
                  <div className="w-10 h-10 bg-surface-1 rounded flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-ink truncate">{item.title}</p>
                    <p className="text-xs text-mute">SL: {item.quantity}</p>
                  </div>
                  <p className="text-sm font-semibold text-ink">{formatMoney(lineTotal, item.currency)}</p>
                </li>
              )
            })}
          </ul>
        )}
      </div>

      <div className="bg-surface-2 rounded-lg p-4 mt-4 space-y-2">
        <div className="flex justify-between text-mute text-sm">
          <span>Tạm tính</span>
          <span>{formatMoney(total.minor, total.currency)}</span>
        </div>
        <div className="flex justify-between text-mute text-sm">
          <span>Phí vận chuyển</span>
          <span>Sẽ tính sau</span>
        </div>
        <div className="flex justify-between font-bold text-lg text-ink pt-2 border-t border-line">
          <span>Tổng</span>
          <span>{formatMoney(total.minor, total.currency)}</span>
        </div>
      </div>
    </div>
  )
}
