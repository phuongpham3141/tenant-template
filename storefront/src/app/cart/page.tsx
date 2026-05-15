import { Metadata } from "next"
import { CartContent } from "./CartContent"

export const metadata: Metadata = {
  title: "Giỏ hàng",
  description: "Xem và quản lý sản phẩm trong giỏ hàng",
}

export default function CartPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-ink mb-6">Giỏ hàng của bạn</h1>
      <CartContent />
    </div>
  )
}
