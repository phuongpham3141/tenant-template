"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { placeOrder } from "@/lib/store/checkout"

export function CheckoutForm() {
  const [pending, start] = useTransition()
  const [err, setErr] = useState<string | null>(null)
  const router = useRouter()

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setErr(null)
    const fd = new FormData(e.currentTarget)
    const input = {
      email: String(fd.get("email") || ""),
      first_name: String(fd.get("first_name") || ""),
      last_name: String(fd.get("last_name") || ""),
      phone: String(fd.get("phone") || ""),
      address_1: String(fd.get("address_1") || ""),
      city: String(fd.get("city") || ""),
      postal_code: String(fd.get("postal_code") || ""),
    }
    start(async () => {
      const res = await placeOrder(input)
      if (res?.ok) {
        router.push(`/order/confirmed?no=${res.orderNo}&total=${res.total}`)
      } else {
        setErr(res?.error || "Không đặt được hàng.")
      }
    })
  }

  const field = "w-full border border-line rounded px-3 py-2 text-[14px] text-ink bg-paper focus:border-brand outline-none"

  return (
    <form onSubmit={onSubmit} className="bg-paper border border-line rounded-lg p-5 space-y-4">
      <h2 className="font-bold text-ink">Thông tin giao hàng</h2>
      <div>
        <label className="block text-[12.5px] text-mute mb-1">Email *</label>
        <input name="email" type="email" required className={field} placeholder="ban@email.com" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-[12.5px] text-mute mb-1">Họ *</label>
          <input name="last_name" required className={field} placeholder="Nguyễn" />
        </div>
        <div>
          <label className="block text-[12.5px] text-mute mb-1">Tên *</label>
          <input name="first_name" required className={field} placeholder="Văn A" />
        </div>
      </div>
      <div>
        <label className="block text-[12.5px] text-mute mb-1">Số điện thoại *</label>
        <input name="phone" required className={field} placeholder="09xxxxxxxx" />
      </div>
      <div>
        <label className="block text-[12.5px] text-mute mb-1">Địa chỉ *</label>
        <input name="address_1" required className={field} placeholder="Số nhà, đường" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-[12.5px] text-mute mb-1">Tỉnh / Thành phố *</label>
          <input name="city" required className={field} placeholder="TP. Hồ Chí Minh" />
        </div>
        <div>
          <label className="block text-[12.5px] text-mute mb-1">Mã bưu chính</label>
          <input name="postal_code" className={field} placeholder="70000" />
        </div>
      </div>

      {err && <p className="text-[13px] text-red-600">{err}</p>}

      <button
        type="submit"
        disabled={pending}
        className="w-full bg-accent text-white font-semibold px-5 py-3 rounded hover:opacity-90 disabled:opacity-50"
      >
        {pending ? "Đang xử lý đơn hàng…" : "Đặt hàng (thanh toán khi nhận hàng)"}
      </button>
      <p className="text-[11.5px] text-mute text-center">
        Giao hàng tiêu chuẩn nội địa VN · Thanh toán: COD / chuyển khoản (xác nhận thủ công)
      </p>
    </form>
  )
}
