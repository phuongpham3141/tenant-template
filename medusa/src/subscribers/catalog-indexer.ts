import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework"
import { SEARCH_PLATFORM_MODULE } from "../modules/search-platform"
import type SearchPlatformService from "../modules/search-platform/service"
import { CATALOG_EXT_MODULE } from "../modules/catalog-ext"
import type CatalogExtService from "../modules/catalog-ext/service"
import { AI_PLATFORM_MODULE } from "../modules/ai-platform"
import type AiPlatformService from "../modules/ai-platform/service"
import { adminContext } from "../lib/tenant/context"

export default async function catalogIndexerHandler({ event, container }: SubscriberArgs<{ id: string; tenant_id: string }>) {
  const ctx = adminContext(event.data.tenant_id)
  if (event.name === "product.created" || event.name === "product.updated") {
    const catalog = container.resolve<CatalogExtService>(CATALOG_EXT_MODULE)
    const search = container.resolve<SearchPlatformService>(SEARCH_PLATFORM_MODULE)
    const ai = container.resolve<AiPlatformService>(AI_PLATFORM_MODULE)

    const product = await catalog.getProduct(ctx, event.data.id)
    await search.indexDocument(ctx, "product", product.id, {
      tenant_id: product.tenantId, supplier_id: product.supplierId,
      sku: product.sku, status: product.status,
      title_vi: product.titleI18n.vi, title_en: product.titleI18n.en, title_cn: product.titleI18n.cn,
      description_vi: product.descriptionI18n.vi, description_en: product.descriptionI18n.en,
      category_id: product.categoryId, brand_id: product.brandId, hs_code: product.hsCode,
      tags: product.tags ?? [], base_price_minor: product.basePriceMinor?.toString() ?? null,
      base_currency: product.baseCurrency, updated_at: product.updatedAt.toISOString(),
    })
    const text = `${product.titleI18n.en ?? product.titleI18n.vi ?? ""} ${product.descriptionI18n.en ?? product.descriptionI18n.vi ?? ""}`.slice(0, 8000)
    if (text.trim()) {
      await ai.embed(ctx, { texts: [text], resourceType: "product", resourceIds: [product.id] }).catch(() => undefined)
    }
  }
  if (event.name === "product.deleted") {
    // Index deletion would happen here in real impl
  }
}

export const config: SubscriberConfig = {
  event: ["product.created", "product.updated", "product.deleted"],
}
