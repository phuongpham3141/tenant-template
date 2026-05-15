import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

const MEDUSA_BASE_URL = process.env.MEDUSA_BASE_URL || 'http://medusa:9000'
const AUDIT_TOKEN = process.env.PAYLOAD_TO_MEDUSA_TOKEN || ''

const emit = async (event: Record<string, unknown>) => {
  if (!AUDIT_TOKEN) return
  try {
    await fetch(`${MEDUSA_BASE_URL}/internal/audit/payload`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-internal-token': AUDIT_TOKEN },
      body: JSON.stringify(event),
    })
  } catch {
    // swallow: audit is best-effort
  }
}

export const auditTrailAfterChange: CollectionAfterChangeHook = async ({ doc, previousDoc, operation, collection, req }) => {
  await emit({
    occurred_at: new Date().toISOString(),
    actor_user_id: req.user?.id ?? null,
    action_code: operation === 'create' ? 'create' : 'update',
    resource_type: `payload.${collection.slug}`,
    resource_id: doc.id,
    tenant_id: doc.tenantId ?? req.user?.tenantId ?? null,
    before_state: previousDoc ?? null,
    after_state: doc,
  })
  return doc
}

export const auditTrailAfterDelete: CollectionAfterDeleteHook = async ({ doc, collection, req }) => {
  await emit({
    occurred_at: new Date().toISOString(),
    actor_user_id: req.user?.id ?? null,
    action_code: 'delete',
    resource_type: `payload.${collection.slug}`,
    resource_id: doc.id,
    tenant_id: doc.tenantId ?? req.user?.tenantId ?? null,
    before_state: doc,
    after_state: null,
  })
}
