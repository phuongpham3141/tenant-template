/**
 * Idempotent script: ensure admin user exists in payload.users.
 *
 * Usage:
 *   pnpm ensure-admin
 *
 * Idempotent — chạy nhiều lần OK:
 *   - User tồn tại → skip + ensure tenant_id set
 *   - User không tồn tại → tạo qua Payload Local API
 *
 * Sprint 2 Day 4 Bước 3c (P1.4-F6):
 *   Replacement cho `payload db:push` (Rule 2 cấm wipe).
 *   Dev convenience: re-create admin sau khi reset DB.
 *
 * Env vars (defaults cho dev):
 *   PAYLOAD_ADMIN_EMAIL=phuongpham3141@gmail.com
 *   PAYLOAD_ADMIN_PASSWORD=Phuong2606$$
 *   PAYLOAD_ADMIN_TENANT_ID=cybersilkroads
 */

import { getPayload } from 'payload'
import config from '../src/payload.config.js'

const ADMIN_EMAIL = process.env.PAYLOAD_ADMIN_EMAIL || 'phuongpham3141@gmail.com'
const ADMIN_PASSWORD = process.env.PAYLOAD_ADMIN_PASSWORD || 'Phuong2606$$'
const ADMIN_TENANT_ID = process.env.PAYLOAD_ADMIN_TENANT_ID || 'cybersilkroads'

async function main() {
  console.log('[ensure-admin] Initializing Payload...')
  const payload = await getPayload({ config })

  console.log(`[ensure-admin] Checking user: ${ADMIN_EMAIL}`)
  const existing = await payload.find({
    collection: 'users',
    where: { email: { equals: ADMIN_EMAIL } },
    limit: 1,
  })

  if (existing.totalDocs > 0) {
    const user = existing.docs[0] as any
    console.log(`[ensure-admin] ✓ User exists: id=${user.id}, tenant=${user.tenantId || 'NULL'}`)

    if (!user.tenantId) {
      await payload.update({
        collection: 'users',
        id: user.id,
        data: { tenantId: ADMIN_TENANT_ID } as any,
      })
      console.log(`[ensure-admin] ✓ Updated tenant_id → ${ADMIN_TENANT_ID}`)
    }

    process.exit(0)
  }

  console.log(`[ensure-admin] User missing. Creating...`)
  const created = await payload.create({
    collection: 'users',
    data: {
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      tenantId: ADMIN_TENANT_ID,
    } as any,
  })

  console.log(`[ensure-admin] ✓ Created user id=${(created as any).id}`)
  process.exit(0)
}

main().catch((err) => {
  console.error('[ensure-admin] ❌ Failed:', err)
  process.exit(1)
})
