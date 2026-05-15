import type { CollectionAfterChangeHook } from 'payload'

const MEDUSA_BASE_URL = process.env.MEDUSA_BASE_URL || 'http://medusa:9000'
const MEDUSA_API_TOKEN = process.env.PAYLOAD_TO_MEDUSA_TOKEN || ''

export const syncMedusaSupplier: CollectionAfterChangeHook = async ({ doc, previousDoc, operation, req }) => {
  if (operation === 'delete') return doc
  if (doc._status !== 'published') return doc
  if (!doc.supplierId) return doc

  const previousStatus = previousDoc?._status
  const justPublished = previousStatus !== 'published' && doc._status === 'published'

  const payload = {
    supplier_id: doc.supplierId,
    site_metadata: {
      payload_page_id: doc.id,
      payload_page_slug: doc.slug,
      page_type: doc.pageType,
      template_id: doc.template,
      published_at: doc.updatedAt,
    },
  }

  try {
    const res = await fetch(`${MEDUSA_BASE_URL}/internal/suppliers/${doc.supplierId}/site-metadata`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-internal-token': MEDUSA_API_TOKEN,
      },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      req.payload.logger.error(
        `syncMedusaSupplier: medusa returned ${res.status} for supplier ${doc.supplierId}`
      )
    } else if (justPublished) {
      req.payload.logger.info(`syncMedusaSupplier: published site for supplier ${doc.supplierId}`)
    }
  } catch (err: any) {
    req.payload.logger.error(`syncMedusaSupplier error: ${err.message}`)
  }

  return doc
}
