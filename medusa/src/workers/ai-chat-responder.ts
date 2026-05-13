import { Worker, type ConnectionOptions, Queue } from "bullmq"
import { adminContext } from "../lib/tenant/context"
import { queryT } from "../lib/db/pg"
import { realtimeChatProviders, pickTtsProvider } from "../modules/ai-livestream/providers"
import { writeLedger } from "../modules/ai-livestream/cost-ledger"
import AiLivestreamService from "../modules/ai-livestream/service"
import { AI_LIVESTREAM_MODULE } from "../modules/ai-livestream"

const redisConn: ConnectionOptions = { url: process.env.REDIS_URL ?? "redis://redis:6379" } as any

export interface ChatJobData {
  tenantId: string
  sessionId: string
  personaId: string
  locale: "vi" | "en" | "cn"
  userId?: string
  message: string
}

const FAQ_TTL_SECONDS = 7 * 86400

export function startAiChatResponderWorker(container: any) {
  return new Worker<ChatJobData>(
    "ai-chat-responder",
    async (job) => {
      const { tenantId, sessionId, personaId, locale, message } = job.data
      const ctx = adminContext(tenantId)
      const service = container.resolve<AiLivestreamService>(AI_LIVESTREAM_MODULE)

      // 1. Cache lookup
      const cached = await service.lookupChatResponse(ctx, personaId, locale, message)
      if (cached) {
        await emitChatChunk(ctx, sessionId, locale, cached.responseText, cached.audioUrl)
        return { source: "cache" }
      }

      // 2. LLM call
      const persona = await service.getPersona(ctx, personaId)
      const provider = realtimeChatProviders["openai-realtime"]
      const sysPrompt = persona.systemPromptOverride
        || `You are ${(persona.displayNameI18n as any)[locale] ?? persona.slug}, a livestream host. Reply briefly (≤2 sentences), in ${locale}, friendly and on-brand. Catchphrases: ${(persona.catchphrases ?? []).join(", ")}`

      const chat = await provider.respond({
        systemPrompt: sysPrompt,
        message,
        locale,
      })

      await writeLedger(ctx, {
        tenantId,
        directorSessionId: sessionId,
        personaId,
        resourceType: "llm_realtime",
        provider: provider.id,
        units: 1,
        unitLabel: "request",
        unitMicros: chat.costMicros,
        totalMicros: chat.costMicros,
        metadata: { latencyMs: chat.latencyMs },
      })

      // 3. TTS the response (fire-and-forget; surface text immediately)
      const voiceProfileId = (persona.voiceProfileIds as any)[locale]
      let audioUrl: string | undefined
      if (voiceProfileId) {
        const vp = await queryT<any>(ctx, `SELECT provider, provider_voice_id FROM live.voice_profile WHERE id = $1`, [voiceProfileId])
        if (vp[0]) {
          try {
            const ttsProvider = pickTtsProvider(vp[0].provider)
            const ttsResult = await ttsProvider.synthesize({ text: chat.responseText, voiceId: vp[0].provider_voice_id, locale })
            audioUrl = ttsResult.audioUrl
            await writeLedger(ctx, {
              tenantId,
              directorSessionId: sessionId,
              personaId,
              resourceType: "tts",
              provider: ttsProvider.id,
              units: chat.responseText.length,
              unitLabel: "chars",
              unitMicros: chat.responseText.length > 0 ? ttsResult.costMicros / BigInt(chat.responseText.length) : 0n,
              totalMicros: ttsResult.costMicros,
              metadata: { context: "chat_response" },
            })
          } catch (err) {
            container.resolve("logger").warn(`chat TTS failed: ${(err as any).message}`)
          }
        }
      }

      await service.cacheChatResponse(ctx, { personaId, locale, questionText: message, responseText: chat.responseText, audioUrl, ttlSeconds: FAQ_TTL_SECONDS })
      await emitChatChunk(ctx, sessionId, locale, chat.responseText, audioUrl)
      return { source: "llm", latencyMs: chat.latencyMs }
    },
    { connection: redisConn, concurrency: Number(process.env.AI_CHAT_CONCURRENCY ?? 20) }
  ).on("failed", (job, err) => container.resolve("logger").error(`ai-chat-responder failed: ${err.message}`))
}

async function emitChatChunk(ctx: { tenantId: string }, sessionId: string, locale: string, text: string, audioUrl?: string): Promise<void> {
  // Inject into stream audio track + emit event for storefront chat overlay
  // In production: publish to Redis pub/sub or Kafka; here we update last_chat_response_at on session
  await queryT(
    ctx as any,
    `UPDATE live.ai_director_session SET last_chat_response_at = NOW() WHERE id = $1`,
    [sessionId]
  ).catch(() => undefined)
  if (audioUrl) {
    // Enqueue mux-feed for the chat audio chunk
    const muxQ = new Queue("ai-mux-feed", { connection: redisConn })
    try {
      await muxQ.add("chat", { tenantId: ctx.tenantId, sessionId, audioUrl, locale, isChatResponse: true, text })
    } finally {
      await muxQ.close()
    }
  }
}
