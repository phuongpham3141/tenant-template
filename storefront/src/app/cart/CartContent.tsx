"use client"

import Link from "next/link"
import Image from "next/image"
import { useCart } from "@/components/providers/CartProvider"
import { formatMoney } from "@/lib/money/format"
import { EmptyState } from "@/components/ui/EmptyState"

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
    </svg>
  )
}

export function CartContent() {
  const { items, mode, total, remove, updateQty } = useCart()

  if (items.length === 0) {
    return (
      <EmptyState
        icon={<CartIcon />}
        title="Giỏ hàng trống"
        message="Bạn chưa thêm sản phẩm nào vào giỏ. Khám phá sản phẩm và bắt đầu mua sắm."
        ctaText="Duyệt sản phẩm"
        ctaHref="/products"
      />
    )
  }

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-3">
        <div className="text-xs text-mute mb-1">
          Chế độ: <span className="font-medium text-ink uppercase">{mode === "wholesale" ? "Bán sỉ" : "Bán lẻ"}</span>
        </div>
        {items.map((item) => {
          const lineTotal = item.unitPriceMinor * BigInt(item.quantity)
          return (
            <div key={`${item.productId}-${item.variantId ?? ""}`} className="border border-line rounded-lg p-4 flex gap-4 bg-paper">
              <div className="w-20 h-20 bg-surface-1 rounded flex-shrink-0 relative overflow-hidden">
                {item.thumbnail ? (
                  <Image src={item.thumbnail} alt={item.title} fill className="object-cover" />
                ) : null}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-ink truncate">{item.title}</h3>
                <p className="text-xs text-mute">SKU: {item.sku}</p>
                <p className="text-xs text-mute">MOQ: {item.moqMin}</p>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    type="button"
                    onClick={() => updateQty(item.productId, Math.max(item.moqMin, item.quantity - 1), item.variantId)}
                    className="w-8 h-8 border border-line rounded hover:bg-surface-1 text-ink"
                    aria-label="Giảm số lượng"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    min={item.moqMin}
                    value={item.quantity}
                    onChange={(e) => updateQty(item.productId, Math.max(item.moqMin, Number(e.target.value) || item.moqMin), item.variantId)}
                    className="w-16 text-center border border-line rounded px-2 py-1 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => updateQty(item.productId, item.quantity + 1, item.variantId)}
                    className="w-8 h-8 border border-line rounded hover:bg-surface-1 text-ink"
                    aria-label="Tăng số lượng"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="text-right flex flex-col justify-between flex-shrink-0">
                <p className="font-semibold text-brand">{formatMoney(lineTotal, item.currency)}</p>
                <button
                  type="button"
                  onClick={() => remove(item.productId, item.variantId)}
                  className="text-xs text-mute hover:text-red transition"
                >
                  Xóa
                </button>
              </div>
            </div>
          )
        })}
      </div>

      <div className="md:col-span-1">
        <div className="border border-line rounded-lg p-5 bg-surface-2 md:sticky md:top-4">
          <h2 className="font-semibold text-ink mb-4">Tổng đơn hàng</h2>
          <div className="space-y-2 text-sm mb-4 pb-4 border-b border-line">
            <div className="flex justify-between text-mute">
              <span>Tạm tính ({items.length} sản phẩm)</span>
              <span>{formatMoney(total.minor, total.currency)}</span>
            </div>
            <div className="flex justify-between text-mute">
              <span>Phí vận chuyển</span>
              <span>Tính khi thanh toán</span>
            </div>
          </div>
          <div className="flex justify-between font-semibold text-ink mb-4">
            <span>Tổng</span>
            <span>{formatMoney(total.minor, total.currency)}</span>
          </div>
          <Link
            href="/checkout/shipping"
            className="block w-full text-center py-3 bg-brand text-paper rounded hover:bg-brand-dark transition font-medium"
          >
            Tiến hành thanh toán
          </Link>
          <Link
            href="/products"
            className="block w-full text-center py-2 mt-2 text-brand hover:underline text-sm"
          >
            Tiếp tục mua sắm
          </Link>
        </div>
      </div>
    </div>
  )
}
