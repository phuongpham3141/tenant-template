import Link from "next/link"
import type { Metadata } from "next"
import { getCart } from "@/lib/store/cart"
import { formatVnd } from "@/lib/store/format"
import { CartLineControls } from "@/components/store/CartLineControls"

export const dynamic = "force-dynamic"
export const metadata: Metadata = {
  title: "Giỏ hàng — Cybersilkroads",
  description: "Xem và quản lý sản phẩm trong giỏ hàng",
}

export default async function CartPage() {
  const cart = await getCart()
  const items: any[] = cart?.items ?? []

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-ink mb-6">Giỏ hàng của bạn</h1>

      {items.length === 0 ? (
        <div className="bg-paper border border-line rounded-lg p-10 text-center">
          <p className="text-mute mb-4">Giỏ hàng trống. Khám phá sản phẩm và bắt đầu mua sắm.</p>
          <Link href="/products" className="inline-block bg-brand text-white px-5 py-2.5 rounded font-semibold">
            Duyệt sản phẩm
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-3">
            {items.map((item) => (
              <div key={item.id} className="border border-line rounded-lg p-4 flex gap-4 bg-paper">
                <div className="w-20 h-20 bg-surface-1 rounded flex-shrink-0 overflow-hidden">
                  {item.thumbnail ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.thumbnail} alt={item.product_title || item.title} className="w-full h-full object-cover" />
                  ) : null}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-ink line-clamp-2">{item.product_title || item.title}</h3>
                  <p className="text-[12px] text-mute mt-0.5">{formatVnd(item.unit_price)} / sản phẩm</p>
                  <div className="mt-2">
                    <CartLineControls lineId={item.id} quantity={item.quantity} />
                  </div>
                </div>
                <div className="text-right font-bold text-ink whitespace-nowrap">
                  {formatVnd(item.total ?? item.unit_price * item.quantity)}
                </div>
              </div>
            ))}
          </div>

          {/* Tổng kết */}
          <aside className="bg-paper border border-line rounded-lg p-5 self-start">
            <h2 className="font-bold text-ink mb-4">Tóm tắt đơn hàng</h2>
            <div className="space-y-2 text-[13px] text-mute">
              <div className="flex justify-between">
                <span>Tạm tính</span>
                <span className="text-ink">{formatVnd(cart.item_subtotal ?? cart.item_total)}</span>
              </div>
              <div className="flex justify-between">
                <span>Phí giao hàng</span>
                <span className="text-ink">{cart.shipping_total ? formatVnd(cart.shipping_total) : "Tính ở bước thanh toán"}</span>
              </div>
            </div>
            <div className="flex justify-between font-bold text-ink text-[16px] border-t border-line mt-4 pt-4">
              <span>Tổng</span>
              <span className="text-accent">{formatVnd(cart.total)}</span>
            </div>
            <Link
              href="/checkout"
              className="block text-center bg-accent text-white font-semibold px-5 py-3 rounded mt-5 hover:opacity-90"
            >
              Tiến hành thanh toán
            </Link>
            <Link href="/products" className="block text-center text-[13px] text-brand mt-3 hover:underline">
              Tiếp tục mua sắm
            </Link>
          </aside>
        </div>
      )}
    </div>
  )
}
