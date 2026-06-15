"use server"

import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"
import { store } from "./sdk"
import { getRegion } from "./region"

const COOKIE = "csr_cart_id"
const CART_FIELDS =
  "id,email,currency_code,completed_at,total,item_total,item_subtotal,shipping_total,*items,*items.variant,*items.product,*shipping_methods,*shipping_address"

async function readCartId(): Promise<string | undefined> {
  return (await cookies()).get(COOKIE)?.value
}

async function writeCartId(id: string) {
  ;(await cookies()).set(COOKIE, id, {
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
    sameSite: "lax",
  })
}

export async function getCart(): Promise<any | null> {
  const id = await readCartId()
  if (!id) return null
  try {
    const { cart }: any = await store.cart.retrieve(id, { fields: CART_FIELDS } as any)
    if (!cart || cart.completed_at) return null
    return cart
  } catch {
    return null
  }
}

async function ensureCart(): Promise<any> {
  const id = await readCartId()
  if (id) {
    try {
      const { cart }: any = await store.cart.retrieve(id)
      if (cart && !cart.completed_at) return cart
    } catch {
      /* tạo mới bên dưới */
    }
  }
  const region = await getRegion()
  const { cart }: any = await store.cart.create({ region_id: region.id })
  await writeCartId(cart.id)
  return cart
}

export async function addToCart(variantId: string, quantity = 1) {
  const cart = await ensureCart()
  await store.cart.createLineItem(cart.id, { variant_id: variantId, quantity })
  revalidatePath("/cart")
  return { ok: true }
}

export async function updateItem(lineId: string, quantity: number) {
  const id = await readCartId()
  if (!id) return
  if (quantity <= 0) {
    await store.cart.deleteLineItem(id, lineId)
  } else {
    await store.cart.updateLineItem(id, lineId, { quantity })
  }
  revalidatePath("/cart")
}

export async function removeItem(lineId: string) {
  const id = await readCartId()
  if (!id) return
  await store.cart.deleteLineItem(id, lineId)
  revalidatePath("/cart")
}
