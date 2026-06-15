import Link from "next/link"
import type { Metadata } from "next"
import { formatVnd } from "@/lib/store/format"

export const dynamic = "force-dynamic"
export const metadata: Metadata = { title: "Đặt hàng thành công — Cybersilkroads" }

export default async function OrderConfirmedPage({
  searchParams,
}: {
  searchParams: Promise<{ no?: string; total?: string }>
}) {
  const sp = await searchParams
  const total = sp.total ? Number(sp.total) : null

  return (
    <div className="max-w-xl mx-auto px-4 py-16 text-center">
      <div className="w-16 h-16 mx-auto rounded-full bg-success/10 flex items-center justify-center text-success text-3xl mb-5">
        ✓
      </div>
      <h1 className="text-2xl font-bold text-ink mb-2">Đặt hàng thành công!</h1>
      <p className="text-mute mb-6">
        Cảm ơn bạn đã mua sắm tại Cybersilkroads. Đơn hàng của bạn đã được ghi nhận.
      </p>
      <div className="bg-paper border border-line rounded-lg p-5 inline-block text-left min-w-[260px]">
        {sp.no && (
          <div className="flex justify-between gap-8 text-[14px] mb-1">
            <span className="text-mute">Mã đơn hàng</span>
            <span className="font-bold text-ink">#{sp.no}</span>
          </div>
        )}
        {total != null && (
          <div className="flex justify-between gap-8 text-[14px]">
            <span className="text-mute">Tổng thanh toán</span>
            <span className="font-bold text-accent">{formatVnd(total)}</span>
          </div>
        )}
      </div>
      <div className="mt-8 flex gap-3 justify-center">
        <Link href="/products" className="bg-brand text-white px-5 py-2.5 rounded font-semibold">
          Tiếp tục mua sắm
        </Link>
        <Link href="/buyer-center/orders" className="border border-line text-ink px-5 py-2.5 rounded">
          Xem đơn hàng
        </Link>
      </div>
    </div>
  )
}
