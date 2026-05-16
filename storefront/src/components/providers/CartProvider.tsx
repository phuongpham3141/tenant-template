"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react"
import {
  abandonMedusaCart,
  addMedusaLineItem,
  ensureMedusaCart,
  getMedusaCart,
  getMedusaCartId,
  removeMedusaLineItem,
  updateMedusaLineItem,
} from "@/lib/sdk/medusa-cart"

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
  // Sprint 9A Pha 1b v2: Medusa sync metadata
  medusaLineItemId?: string
}

export type CartMode = "retail" | "wholesale"

interface CartState {
  items: CartItem[]
  mode: CartMode
  total: { minor: bigint; currency: string }
  medusaCartId: string | null
  syncStatus: "idle" | "syncing" | "error"
  add: (item: CartItem) => void
  remove: (productId: string, variantId?: string) => void
  updateQty: (productId: string, qty: number, variantId?: string) => void
  clear: () => void
  setMode: (mode: CartMode) => void
  ensureSynced: () => Promise<string | null>
}

const CartContext = createContext<CartState | null>(null)

const STORAGE_KEY = "csr_cart_v1"

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [mode, setMode] = useState<CartMode>("wholesale")

  // Sprint 9A Pha 1b v2 — Medusa sync state
  const [medusaCartId, setMedusaCartId] = useState<string | null>(null)
  const [syncStatus, setSyncStatus] = useState<"idle" | "syncing" | "error">("idle")
  const syncTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Load B2B state từ localStorage (Sprint 5)
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      try {
        const parsed = JSON.parse(raw)
        setItems(
          (parsed.items ?? []).map((i: any) => ({
            ...i,
            unitPriceMinor: BigInt(i.unitPriceMinor ?? 0),
          })),
        )
        setMode(parsed.mode ?? "wholesale")
      } catch {
        // ignore parse error
      }
    }
  }, [])

  // Persist B2B state (Sprint 5)
  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        mode,
        items: items.map((i) => ({
          ...i,
          unitPriceMinor: i.unitPriceMinor.toString(),
        })),
      }),
    )
  }, [items, mode])

  // Sprint 9A Pha 1b v2 — Load Medusa cart_id từ localStorage on mount
  useEffect(() => {
    const id = getMedusaCartId()
    if (id) setMedusaCartId(id)
  }, [])

  /**
   * Lazy debounced sync action.
   * KHÔNG block UI — B2B primary state vẫn work nếu Medusa fail.
   */
  const lazySyncToMedusa = useCallback((action: () => Promise<void>) => {
    if (syncTimerRef.current) clearTimeout(syncTimerRef.current)
    syncTimerRef.current = setTimeout(() => {
      setSyncStatus("syncing")
      action()
        .then(() => setSyncStatus("idle"))
        .catch((err) => {
          console.error("[CartProvider] Medusa sync failed:", err)
          setSyncStatus("error")
        })
    }, 500)
  }, [])

  const add: CartState["add"] = (newItem) => {
    if (mode === "wholesale") {
      const distinctSuppliers = new Set(items.map((i) => i.supplierId))
      if (distinctSuppliers.size > 0 && !distinctSuppliers.has(newItem.supplierId)) {
        alert(
          "Giỏ bán sỉ chỉ hỗ trợ 1 nhà cung cấp mỗi đơn. Vui lòng hoàn tất đơn hiện tại trước.",
        )
        return
      }
    }
    setItems((cur) => {
      const existing = cur.find(
        (i) => i.productId === newItem.productId && i.variantId === newItem.variantId,
      )
      if (existing) {
        return cur.map((i) =>
          i === existing ? { ...i, quantity: i.quantity + newItem.quantity } : i,
        )
      }
      return [...cur, newItem]
    })

    // Sync lazy tới Medusa (chỉ khi có variantId — Medusa cần variant)
    if (newItem.variantId) {
      lazySyncToMedusa(async () => {
        const cart = await addMedusaLineItem(newItem.variantId!, newItem.quantity)
        setMedusaCartId(cart.id)
      })
    }
  }

  const remove: CartState["remove"] = (productId, variantId) => {
    const target = items.find(
      (i) => i.productId === productId && i.variantId === variantId,
    )

    setItems((cur) => cur.filter((i) => !(i.productId === productId && i.variantId === variantId)))

    if (target?.medusaLineItemId && medusaCartId) {
      lazySyncToMedusa(async () => {
        await removeMedusaLineItem(medusaCartId, target.medusaLineItemId!)
      })
    }
  }

  const updateQty: CartState["updateQty"] = (productId, qty, variantId) => {
    if (qty <= 0) return remove(productId, variantId)

    const target = items.find(
      (i) => i.productId === productId && i.variantId === variantId,
    )

    setItems((cur) =>
      cur.map((i) =>
        i.productId === productId && i.variantId === variantId ? { ...i, quantity: qty } : i,
      ),
    )

    if (target?.medusaLineItemId && medusaCartId) {
      lazySyncToMedusa(async () => {
        await updateMedusaLineItem(medusaCartId, target.medusaLineItemId!, qty)
      })
    }
  }

  const clear = () => {
    setItems([])
    abandonMedusaCart()
    setMedusaCartId(null)
  }

  /**
   * Flush pending sync + ensure all items synced trước checkout navigate.
   * Return Medusa cart_id nếu thành công.
   */
  const ensureSynced = useCallback(async (): Promise<string | null> => {
    if (syncTimerRef.current) {
      clearTimeout(syncTimerRef.current)
      syncTimerRef.current = null
    }

    if (!items.length) return null

    setSyncStatus("syncing")
    try {
      const id = await ensureMedusaCart()

      // Verify items đã sync (nếu thiếu, sync thêm)
      const cart = await getMedusaCart(id)
      const existingVariantIds = new Set(cart?.items?.map((i) => i.variant_id) ?? [])

      for (const item of items) {
        if (item.variantId && !existingVariantIds.has(item.variantId)) {
          await addMedusaLineItem(item.variantId, item.quantity)
        }
      }

      setMedusaCartId(id)
      setSyncStatus("idle")
      return id
    } catch (err) {
      console.error("[CartProvider] ensureSynced failed:", err)
      setSyncStatus("error")
      return null
    }
  }, [items])

  const currency = items[0]?.currency ?? "USD"
  const totalMinor = items.reduce(
    (acc, i) => acc + i.unitPriceMinor * BigInt(i.quantity),
    0n,
  )

  return (
    <CartContext.Provider
      value={{
        items,
        mode,
        total: { minor: totalMinor, currency },
        medusaCartId,
        syncStatus,
        add,
        remove,
        updateQty,
        clear,
        setMode,
        ensureSynced,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart(): CartState {
  const c = useContext(CartContext)
  if (!c) throw new Error("CartProvider missing")
  return c
}
