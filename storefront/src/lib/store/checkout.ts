"use server"

import { cookies } from "next/headers"
import { store } from "./sdk"

const COOKIE = "csr_cart_id"

type PlaceOrderInput = {
  email: string
  first_name: string
  last_name: string
  phone: string
  address_1: string
  city: string
  postal_code?: string
}

export async function placeOrder(input: PlaceOrderInput) {
  const jar = await cookies()
  const cartId = jar.get(COOKIE)?.value
  if (!cartId) return { error: "Giỏ hàng trống hoặc đã hết hạn." }

  const address = {
    first_name: input.first_name,
    last_name: input.last_name,
    phone: input.phone,
    address_1: input.address_1,
    city: input.city,
    country_code: "vn",
    postal_code: input.postal_code || "70000",
  }

  try {
    // 1. email + địa chỉ
    await store.cart.update(cartId, {
      email: input.email,
      shipping_address: address,
      billing_address: address,
    } as any)

    // 2. phương thức giao hàng
    const { shipping_options }: any = await store.fulfillment.listCartOptions({
      cart_id: cartId,
    } as any)
    if (!shipping_options?.length) {
      return { error: "Không có phương thức giao hàng khả dụng cho địa chỉ này." }
    }
    await store.cart.addShippingMethod(cartId, { option_id: shipping_options[0].id })

    // 3. phiên thanh toán (manual / pp_system_default)
    const { cart }: any = await store.cart.retrieve(cartId)
    await store.payment.initiatePaymentSession(cart, {
      provider_id: "pp_system_default",
    } as any)

    // 4. hoàn tất → tạo đơn
    const res: any = await store.cart.complete(cartId)
    if (res?.type === "order") {
      jar.set(COOKIE, "", { path: "/", maxAge: 0 })
      return {
        ok: true,
        orderNo: res.order.display_id,
        total: res.order.total,
        currency: res.order.currency_code,
      }
    }
    return { error: res?.error?.message || "Không hoàn tất được đơn hàng." }
  } catch (e: any) {
    return { error: e?.message || "Lỗi khi đặt hàng. Vui lòng thử lại." }
  }
}
