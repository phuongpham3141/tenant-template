import { Metadata } from "next"
import Link from "next/link"
import { StepIndicator } from "@/components/checkout/StepIndicator"

export const metadata: Metadata = {
  title: "Thanh toán — Thông tin vận chuyển",
}

export default function CheckoutShippingPage() {
  return (
    <div>
      <StepIndicator currentStep={1} />
      <div className="bg-paper border border-line rounded-lg p-6 max-w-2xl mx-auto">
        <h1 className="text-xl font-bold text-ink mb-6">Địa chỉ vận chuyển</h1>

        <form className="space-y-4">
          <div>
            <label htmlFor="ship-name" className="block text-sm font-medium text-ink mb-1">
              Họ và tên <span className="text-red">*</span>
            </label>
            <input
              id="ship-name"
              name="full_name"
              type="text"
              required
              className="w-full px-3 py-2 border border-line rounded focus:border-brand focus:outline-none"
              placeholder="Nguyễn Văn A"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="ship-phone" className="block text-sm font-medium text-ink mb-1">
                Số điện thoại <span className="text-red">*</span>
              </label>
              <input
                id="ship-phone"
                name="phone"
                type="tel"
                required
                pattern="[0-9+\s\-()]+"
                className="w-full px-3 py-2 border border-line rounded focus:border-brand focus:outline-none"
                placeholder="0901234567"
              />
            </div>
            <div>
              <label htmlFor="ship-email" className="block text-sm font-medium text-ink mb-1">
                Email
              </label>
              <input
                id="ship-email"
                name="email"
                type="email"
                className="w-full px-3 py-2 border border-line rounded focus:border-brand focus:outline-none"
                placeholder="email@example.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="ship-address" className="block text-sm font-medium text-ink mb-1">
              Địa chỉ <span className="text-red">*</span>
            </label>
            <input
              id="ship-address"
              name="address_line"
              type="text"
              required
              className="w-full px-3 py-2 border border-line rounded focus:border-brand focus:outline-none"
              placeholder="Số nhà, tên đường"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="ship-province" className="block text-sm font-medium text-ink mb-1">
                Tỉnh/TP <span className="text-red">*</span>
              </label>
              <select
                id="ship-province"
                name="province"
                required
                className="w-full px-3 py-2 border border-line rounded focus:border-brand focus:outline-none"
                defaultValue=""
              >
                <option value="" disabled>Chọn tỉnh</option>
                <option value="hn">Hà Nội</option>
                <option value="hcm">TP HCM</option>
                <option value="dn">Đà Nẵng</option>
                <option value="hp">Hải Phòng</option>
                <option value="ct">Cần Thơ</option>
              </select>
            </div>
            <div>
              <label htmlFor="ship-district" className="block text-sm font-medium text-ink mb-1">
                Quận/Huyện <span className="text-red">*</span>
              </label>
              <input
                id="ship-district"
                name="district"
                type="text"
                required
                className="w-full px-3 py-2 border border-line rounded focus:border-brand focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="ship-ward" className="block text-sm font-medium text-ink mb-1">
                Phường/Xã <span className="text-red">*</span>
              </label>
              <input
                id="ship-ward"
                name="ward"
                type="text"
                required
                className="w-full px-3 py-2 border border-line rounded focus:border-brand focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label htmlFor="ship-note" className="block text-sm font-medium text-ink mb-1">
              Ghi chú
            </label>
            <textarea
              id="ship-note"
              name="note"
              rows={3}
              className="w-full px-3 py-2 border border-line rounded focus:border-brand focus:outline-none"
              placeholder="Hướng dẫn giao hàng (tùy chọn)"
            />
          </div>

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between pt-4 border-t border-line">
            <Link
              href="/cart"
              className="px-5 py-2 border border-line text-ink rounded hover:bg-surface-1 transition text-center"
            >
              ← Quay lại giỏ
            </Link>
            <Link
              href="/checkout/payment"
              className="px-5 py-2 bg-brand text-paper rounded hover:bg-brand-dark transition text-center"
            >
              Tiếp tục →
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
