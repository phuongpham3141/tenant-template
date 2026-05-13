import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { Queue, type ConnectionOptions } from "bullmq"
import { queryT } from "../../../../../lib/db/pg"
import { resolveTenant } from "../../../../../lib/tenant/context"

const redisConn: ConnectionOptions = { url: process.env.REDIS_URL ?? "redis://redis:6379" } as any
const MAX_MSG_LEN = 280
const RATE_LIMIT_PER_MINUTE = 30

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const ctx = resolveTenant(req)
  const streamId = req.params.id
  const body = req.body as { message: string; locale?: "vi" | "en" | "cn" }
  if (!body.message || typeof body.message !== "string") {
    return res.status(400).json({ error: "message_required" })
  }
  if (body.message.length > MAX_MSG_LEN) {
    return res.status(400).json({ error: "message_too_long", max: MAX_MSG_LEN })
  }

  // Rate limit per user
  if (ctx.userId) {
    const rl = await queryT<{ c: number }>(
      ctx,
      `SELECT COUNT(*)::int AS c FROM live.livestream_chat_message
       WHERE stream_id = $1 AND user_id = $2 AND occurred_at > NOW() - INTERVAL '1 minute'`,
      [streamId, ctx.userId]
    ).catch(() => [{ c: 0 }])
    if (Number(rl[0]?.c ?? 0) >= RATE_LIMIT_PER_MINUTE) {
      return res.status(429).json({ error: "rate_limited" })
    }
  }

  const sessionRow = await queryT<any>(
    ctx,
    `SELECT s.id, s.persona_id, s.status FROM live.ai_director_session s WHERE s.stream_id = $1 AND s.status IN ('running','initializing') ORDER BY s.started_at DESC LIMIT 1`,
    [streamId]
  )
  if (!sessionRow[0]) return res.status(404).json({ error: "no_active_director_session" })

  // Persist user chat
  await queryT(
    ctx,
    `INSERT INTO live.livestream_chat_message (id, tenant_id, stream_id, user_id, body, source_locale, occurred_at)
     VALUES (public.uuidv7(), $1, $2, $3, $4, $5, NOW())`,
    [ctx.tenantId, streamId, ctx.userId ?? null, body.message, body.locale ?? "vi"]
  ).catch(() => undefined)

  const queue = new Queue("ai-chat-responder", { connection: redisConn })
  try {
    await queue.add(
      "respond",
      {
        tenantId: ctx.tenantId,
        sessionId: sessionRow[0].id,
        personaId: sessionRow[0].persona_id,
        locale: body.locale ?? "vi",
        userId: ctx.userId ?? undefined,
        message: body.message,
      },
      { removeOnComplete: 500, removeOnFail: 200, attempts: 2 }
    )
  } finally {
    await queue.close()
  }
  return res.status(202).json({ accepted: true, session_id: sessionRow[0].id })
}
