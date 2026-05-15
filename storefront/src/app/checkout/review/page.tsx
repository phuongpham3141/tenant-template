import { Metadata } from "next"
import Link from "next/link"
import { StepIndicator } from "@/components/checkout/StepIndicator"
import { ReviewSummary } from "./ReviewSummary"

export const metadata: Metadata = {
  title: "Thanh toán — Xác nhận đơn hàng",
}

export default function CheckoutReviewPage() {
  return (
    <div>
      <StepIndicator currentStep={3} />
      <div className="bg-paper border border-line rounded-lg p-6 max-w-3xl mx-auto">
        <h1 className="text-xl font-bold text-ink mb-6">Xác nhận đơn hàng</h1>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="border border-line rounded-lg p-4">
            <div className="flex justify-between items-start mb-3">
              <h2 className="font-semibold text-ink">Địa chỉ giao hàng</h2>
              <Link href="/checkout/shipping" className="text-xs text-brand hover:underline">
                Sửa
              </Link>
            </div>
            <p className="text-sm text-mute">
              Hoàn tất bước Vận chuyển để hiển thị địa chỉ.
            </p>
          </div>

          <div className="border border-line rounded-lg p-4">
            <div className="flex justify-between items-start mb-3">
              <h2 className="font-semibold text-ink">Phương thức thanh toán</h2>
              <Link href="/checkout/payment" className="text-xs text-brand hover:underline">
                Sửa
              </Link>
            </div>
            <p className="text-sm text-mute">
              Hoàn tất bước Thanh toán để hiển thị phương thức.
            </p>
          </div>
        </div>

        <ReviewSummary />

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between items-center pt-4 border-t border-line">
          <Link
            href="/checkout/payment"
            className="px-5 py-2 border border-line text-ink rounded hover:bg-surface-1 transition text-center"
          >
            ← Quay lại
          </Link>
          <button
            type="button"
            className="px-8 py-3 bg-brand text-paper rounded-lg hover:bg-brand-dark transition font-semibold"
          >
            Đặt hàng
          </button>
        </div>

        <p className="text-xs text-mute2 text-center mt-4">
          Bằng việc đặt hàng, bạn đồng ý với{" "}
          <Link href="/info/terms" className="text-brand hover:underline">điều khoản dịch vụ</Link>.
        </p>
      </div>
    </div>
  )
}
