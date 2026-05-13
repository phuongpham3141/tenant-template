"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

export interface CartItem {
  productId: string
  variantId?: string
  supplierId: string
  sku: string
  title: string
  thumbnail?: string
  quantity: number
  unitPriceMinor: bigint
  currency: string
  moqMin: number
  customizations?: Record<string, unknown>
}

export type CartMode = "retail" | "wholesale"

interface CartState {
  items: CartItem[]
  mode: CartMode
  total: { minor: bigint; currency: string }
  add: (item: CartItem) => void
  remove: (productId: string, variantId?: string) => void
  updateQty: (productId: string, qty: number, variantId?: string) => void
  clear: () => void
  setMode: (mode: CartMode) => void
}

const CartContext = createContext<CartState | null>(null)

const STORAGE_KEY = "csr_cart_v1"

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [mode, setMode] = useState<CartMode>("wholesale")

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      try {
        const parsed = JSON.parse(raw)
        setItems((parsed.items ?? []).map((i: any) => ({ ...i, unitPriceMinor: BigInt(i.unitPriceMinor ?? 0) })))
        setMode(parsed.mode ?? "wholesale")
      } catch {}
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ mode, items: items.map((i) => ({ ...i, unitPriceMinor: i.unitPriceMinor.toString() })) }))
  }, [items, mode])

  const add: CartState["add"] = (newItem) => {
    if (mode === "wholesale") {
      const distinctSuppliers = new Set(items.map((i) => i.supplierId))
      if (distinctSuppliers.size > 0 && !distinctSuppliers.has(newItem.supplierId)) {
        alert("Wholesale cart only supports 1 supplier per checkout. Complete current order first.")
        return
      }
    }
    setItems((cur) => {
      const existing = cur.find((i) => i.productId === newItem.productId && i.variantId === newItem.variantId)
      if (existing) {
        return cur.map((i) => i === existing ? { ...i, quantity: i.quantity + newItem.quantity } : i)
      }
      return [...cur, newItem]
    })
  }

  const remove: CartState["remove"] = (productId, variantId) => {
    setItems((cur) => cur.filter((i) => !(i.productId === productId && i.variantId === variantId)))
  }

  const updateQty: CartState["updateQty"] = (productId, qty, variantId) => {
    if (qty <= 0) return remove(productId, variantId)
    setItems((cur) => cur.map((i) => i.productId === productId && i.variantId === variantId ? { ...i, quantity: qty } : i))
  }

  const clear = () => setItems([])

  const currency = items[0]?.currency ?? "USD"
  const totalMinor = items.reduce((acc, i) => acc + i.unitPriceMinor * BigInt(i.quantity), 0n)

  return (
    <CartContext.Provider value={{ items, mode, total: { minor: totalMinor, currency }, add, remove, updateQty, clear, setMode }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart(): CartState {
  const c = useContext(CartContext)
  if (!c) throw new Error("CartProvider missing")
  return c
}
