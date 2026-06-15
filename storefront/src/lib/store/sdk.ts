import Medusa from "@medusajs/js-sdk"

// Server-side Medusa client. Dùng MEDUSA_INTERNAL_URL (LAN, nhanh, không phụ
// thuộc DNS public). Mọi commerce call (PLP/PDP/cart/checkout) chạy server-side.
export const sdk = new Medusa({
  baseUrl:
    process.env.MEDUSA_INTERNAL_URL ||
    process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL ||
    "http://localhost:9000",
  publishableKey: process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
})

// Loose-typed store surface — tránh ma sát type của js-sdk trong build TS strict.
// Các method (cart/fulfillment/payment/product/region/category) đều tồn tại runtime (v2.14).
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const store: any = sdk.store
