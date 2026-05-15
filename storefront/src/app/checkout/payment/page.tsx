import { Metadata } from "next"
import Link from "next/link"
import { StepIndicator } from "@/components/checkout/StepIndicator"

export const metadata: Metadata = {
  title: "Thanh toán — Phương thức thanh toán",
}

const methods = [
  { id: "vnpay", name: "VNPay", desc: "Thẻ ATM nội địa / QR Code", icon: "💳" },
  { id: "momo", name: "MoMo", desc: "Ví điện tử MoMo", icon: "📱" },
  { id: "zalopay", name: "ZaloPay", desc: "Ví điện tử ZaloPay", icon: "📱" },
  { id: "bank", name: "Chuyển khoản ngân hàng", desc: "Chuyển khoản trực tiếp", icon: "🏦" },
  { id: "escrow", name: "Escrow B2B", desc: "Bảo đảm giao dịch (cho đơn lớn)", icon: "🔒" },
] as const

export default function CheckoutPaymentPage() {
  return (
    <div>
      <StepIndicator currentStep={2} />
      <div className="bg-paper border border-line rounded-lg p-6 max-w-2xl mx-auto">
        <h1 className="text-xl font-bold text-ink mb-6">Chọn phương thức thanh toán</h1>

        <fieldset className="space-y-3 mb-6">
          <legend className="sr-only">Phương thức thanh toán</legend>
          {methods.map((m, idx) => (
            <label
              key={m.id}
              className="flex items-center gap-4 p-4 border border-line rounded-lg cursor-pointer hover:bg-surface-1 transition has-[:checked]:border-brand has-[:checked]:bg-surface-2"
            >
              <input
                type="radio"
                name="payment_method"
                value={m.id}
                defaultChecked={idx === 0}
                className="text-brand"
              />
              <div className="text-2xl" aria-hidden="true">{m.icon}</div>
              <div className="flex-1">
                <div className="font-semibold text-ink">{m.name}</div>
                <div className="text-sm text-mute">{m.desc}</div>
              </div>
            </label>
          ))}
        </fieldset>

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between pt-4 border-t border-line">
          <Link
            href="/checkout/shipping"
            className="px-5 py-2 border border-line text-ink rounded hover:bg-surface-1 transition text-center"
          >
            ← Vận chuyển
          </Link>
          <Link
            href="/checkout/review"
            className="px-5 py-2 bg-brand text-paper rounded hover:bg-brand-dark transition text-center"
          >
            Tiếp tục →
          </Link>
        </div>
      </div>
    </div>
  )
}
