import type { CollectionAfterChangeHook } from 'payload'

const MEDUSA_BASE_URL = process.env.MEDUSA_BASE_URL || 'http://medusa:9000'
const MEDUSA_API_TOKEN = process.env.PAYLOAD_TO_MEDUSA_TOKEN || ''

export const syncMedusaCategory: CollectionAfterChangeHook = async ({ doc, previousDoc, operation, req }) => {
  if (operation === 'delete') return doc
  if (doc._status !== 'published') return doc

  const previousStatus = previousDoc?._status
  const justPublished = previousStatus !== 'published' && doc._status === 'published'
  const contentChanged =
    previousDoc?.name !== doc.name ||
    previousDoc?.slug !== doc.slug ||
    previousDoc?.heroImage !== doc.heroImage

  if (!justPublished && !contentChanged) return doc

  if (!doc.medusaCategoryId) {
    req.payload.logger.warn(`syncMedusaCategory: missing medusaCategoryId for ${doc.id}`)
    return doc
  }

  const payload = {
    id: doc.medusaCategoryId,
    name_i18n: doc.name,
    slug: doc.slug,
    short_description_i18n: doc.shortDescription,
    hero_image_url: doc.heroImage,
    metadata: {
      payload_category_content_id: doc.id,
      featured_supplier_ids: (doc.featuredSuppliers ?? []).map((s: any) => s.supplierId),
      featured_product_ids: (doc.featuredProducts ?? []).map((p: any) => p.productId),
    },
  }

  try {
    const res = await fetch(`${MEDUSA_BASE_URL}/internal/categories/${doc.medusaCategoryId}/content`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-internal-token': MEDUSA_API_TOKEN,
      },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      req.payload.logger.error(
        `syncMedusaCategory: medusa returned ${res.status} for category ${doc.medusaCategoryId}`
      )
    } else {
      req.payload.logger.info(`syncMedusaCategory: synced category ${doc.medusaCategoryId}`)
    }
  } catch (err: any) {
    req.payload.logger.error(`syncMedusaCategory error: ${err.message}`)
  }

  return doc
}
