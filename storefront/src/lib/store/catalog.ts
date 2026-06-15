import { store } from "./sdk"
import { getRegion } from "./region"

const FIELDS =
  "id,title,handle,thumbnail,description,metadata,*images,*categories,*variants,*variants.calculated_price,*variants.options"

export type StoreProduct = any

export async function listProducts(
  opts: { limit?: number; offset?: number; categoryId?: string; q?: string } = {}
) {
  const region = await getRegion()
  const query: any = {
    region_id: region.id,
    limit: opts.limit ?? 24,
    offset: opts.offset ?? 0,
    fields: FIELDS,
  }
  if (opts.categoryId) query.category_id = [opts.categoryId]
  if (opts.q) query.q = opts.q
  const res: any = await store.product.list(query)
  return { products: (res.products ?? []) as StoreProduct[], count: (res.count ?? 0) as number, region }
}

export async function getProductByHandle(handle: string) {
  const region = await getRegion()
  const res: any = await store.product.list({
    handle,
    region_id: region.id,
    fields: FIELDS,
    limit: 1,
  })
  return { product: (res.products?.[0] ?? null) as StoreProduct | null, region }
}

export async function listCategories() {
  try {
    const res: any = await store.category.list({ fields: "id,name,handle", limit: 100 })
    return (res.product_categories ?? []) as Array<{ id: string; name: string; handle: string }>
  } catch {
    return []
  }
}

export function variantPrice(product: StoreProduct): number | null {
  const cp = product?.variants?.[0]?.calculated_price
  return cp?.calculated_amount ?? null
}

export function firstVariantId(product: StoreProduct): string | null {
  return product?.variants?.[0]?.id ?? null
}
