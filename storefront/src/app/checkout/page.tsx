import Link from "next/link"
import type { Metadata } from "next"
import { getCart } from "@/lib/store/cart"
import { formatVnd } from "@/lib/store/format"
import { CheckoutForm } from "@/components/store/CheckoutForm"

export const dynamic = "force-dynamic"
export const metadata: Metadata = { title: "Thanh toán — Cybersilkroads" }

export default async function CheckoutPage() {
  const cart = await getCart()
  const items: any[] = cart?.items ?? []

  if (items.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-mute mb-4">Giỏ hàng trống — không có gì để thanh toán.</p>
        <Link href="/products" className="inline-block bg-brand text-white px-5 py-2.5 rounded font-semibold">
          Duyệt sản phẩm
        </Link>
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <CheckoutForm />

      <aside className="bg-paper border border-line rounded-lg p-5 self-start">
        <h2 className="font-bold text-ink mb-4">Đơn hàng ({items.length} sản phẩm)</h2>
        <div className="space-y-3 mb-4">
          {items.map((item) => (
            <div key={item.id} className="flex gap-3 items-center">
              <div className="w-12 h-12 bg-surface-1 rounded overflow-hidden flex-shrink-0">
                {item.thumbnail ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.thumbnail} alt="" className="w-full h-full object-cover" />
                ) : null}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] text-ink line-clamp-1">{item.product_title || item.title}</p>
                <p className="text-[12px] text-mute">SL: {item.quantity}</p>
              </div>
              <div className="text-[13px] font-medium text-ink whitespace-nowrap">
                {formatVnd(item.total ?? item.unit_price * item.quantity)}
              </div>
            </div>
          ))}
        </div>
        <div className="border-t border-line pt-3 space-y-1.5 text-[13px] text-mute">
          <div className="flex justify-between">
            <span>Tạm tính</span>
            <span className="text-ink">{formatVnd(cart.item_subtotal ?? cart.item_total)}</span>
          </div>
        </div>
        <div className="flex justify-between font-bold text-ink text-[16px] border-t border-line mt-3 pt-3">
          <span>Tổng (chưa gồm ship)</span>
          <span className="text-accent">{formatVnd(cart.total)}</span>
        </div>
        <p className="text-[11.5px] text-mute mt-2">Phí giao hàng sẽ được cộng khi đặt hàng.</p>
      </aside>
    </div>
  )
}
