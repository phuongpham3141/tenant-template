/**
 * Medusa Cart SDK — Secondary persistence layer cho B2B CartProvider.
 *
 * Sprint 9A Pha 1b v2 (Strategy β Hybrid):
 * - CartProvider (Sprint 5) là PRIMARY state với B2B shape
 * - Medusa cart là SECONDARY (persistence, order conversion)
 * - Sync rules: lazy debounced 500ms, sync trước checkout navigate
 *
 * Lưu ý: Tất cả requests cần x-tenant-id header (middleware enforce).
 */

const BACKEND_URL =
  process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL ?? "http://api.huayuesc.local"
const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY ?? ""
const TENANT_ID = process.env.NEXT_PUBLIC_TENANT_ID ?? "cybersilkroads"

const STORAGE_KEY = "csr_medusa_cart_id"

export interface MedusaCart {
  id: string
  items: MedusaCartItem[]
  region_id?: string
  currency_code?: string
  total?: number
  subtotal?: number
  email?: string | null
}

export interface MedusaCartItem {
  id: string
  variant_id: string
  quantity: number
  unit_price: number
  title?: string
}

function defaultHeaders(): HeadersInit {
  return {
    "Content-Type": "application/json",
    "x-publishable-api-key": PUBLISHABLE_KEY,
    "x-tenant-id": TENANT_ID,
  }
}

/**
 * Get cart_id từ localStorage. KHÔNG fetch server.
 */
export function getMedusaCartId(): string | null {
  if (typeof window === "undefined") return null
  return localStorage.getItem(STORAGE_KEY)
}

/**
 * Save cart_id vào localStorage.
 */
function saveMedusaCartId(cartId: string): void {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEY, cartId)
}

/**
 * Clear cart_id từ localStorage.
 */
export function clearMedusaCartId(): void {
  if (typeof window === "undefined") return
  localStorage.removeItem(STORAGE_KEY)
}

/**
 * Tạo Medusa cart mới (empty). Save cart_id localStorage.
 */
export async function createMedusaCart(regionId?: string): Promise<MedusaCart> {
  const body = regionId ? { region_id: regionId } : {}

  const res = await fetch(`${BACKEND_URL}/store/carts`, {
    method: "POST",
    headers: defaultHeaders(),
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    throw new Error(`Tạo giỏ hàng thất bại: HTTP ${res.status}`)
  }

  const data = await res.json()
  const cart = (data.cart || data) as MedusaCart

  if (cart.id) {
    saveMedusaCartId(cart.id)
  }

  return cart
}

/**
 * Get Medusa cart by ID. Return null nếu không tồn tại (404).
 */
export async function getMedusaCart(cartId: string): Promise<MedusaCart | null> {
  const res = await fetch(`${BACKEND_URL}/store/carts/${cartId}`, {
    headers: defaultHeaders(),
  })

  if (res.status === 404) return null
  if (!res.ok) {
    throw new Error(`Lấy giỏ hàng thất bại: HTTP ${res.status}`)
  }

  const data = await res.json()
  return (data.cart || data) as MedusaCart
}

/**
 * Ensure cart exists trên server. Return cart_id.
 * - Nếu localStorage có cart_id + cart tồn tại trên server → return id
 * - Nếu không → tạo cart mới
 */
export async function ensureMedusaCart(): Promise<string> {
  const existingId = getMedusaCartId()

  if (existingId) {
    try {
      const cart = await getMedusaCart(existingId)
      if (cart) return existingId
    } catch {
      // ignore — sẽ tạo cart mới
    }
    clearMedusaCartId()
  }

  const newCart = await createMedusaCart()
  return newCart.id
}

/**
 * Add line item vào cart. Ensure cart exists trước.
 * Throw error nếu variant_id không hợp lệ.
 */
export async function addMedusaLineItem(
  variantId: string,
  quantity: number,
): Promise<MedusaCart> {
  const cartId = await ensureMedusaCart()

  const res = await fetch(`${BACKEND_URL}/store/carts/${cartId}/line-items`, {
    method: "POST",
    headers: defaultHeaders(),
    body: JSON.stringify({ variant_id: variantId, quantity }),
  })

  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    const detail = (data as any)?.message ?? ""
    throw new Error(`Thêm sản phẩm thất bại: HTTP ${res.status}${detail ? " — " + detail : ""}`)
  }

  const data = await res.json()
  return (data.cart || data) as MedusaCart
}

/**
 * Update line item quantity.
 */
export async function updateMedusaLineItem(
  cartId: string,
  itemId: string,
  quantity: number,
): Promise<MedusaCart> {
  const res = await fetch(`${BACKEND_URL}/store/carts/${cartId}/line-items/${itemId}`, {
    method: "POST",
    headers: defaultHeaders(),
    body: JSON.stringify({ quantity }),
  })

  if (!res.ok) {
    throw new Error(`Cập nhật số lượng thất bại: HTTP ${res.status}`)
  }

  const data = await res.json()
  return (data.cart || data) as MedusaCart
}

/**
 * Remove line item từ cart. KHÔNG throw nếu 404 (idempotent).
 */
export async function removeMedusaLineItem(
  cartId: string,
  itemId: string,
): Promise<void> {
  const res = await fetch(`${BACKEND_URL}/store/carts/${cartId}/line-items/${itemId}`, {
    method: "DELETE",
    headers: defaultHeaders(),
  })

  if (!res.ok && res.status !== 404) {
    throw new Error(`Xóa sản phẩm thất bại: HTTP ${res.status}`)
  }
}

/**
 * Abandon current cart (logical clear localStorage). Lần next addItem sẽ tạo cart mới.
 */
export function abandonMedusaCart(): void {
  clearMedusaCartId()
}
