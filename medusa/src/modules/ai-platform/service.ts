import { MedusaService } from "@medusajs/framework/utils"
import { queryT, type TenantContext } from "../../lib/db/pg"
import type { AiInvocationInput, AiInvocationResult, AiEmbedding, AiConversation, AiProvider } from "./types"
import { providers } from "./providers"
import crypto from "crypto"

class AiPlatformService extends MedusaService({}) {
  async invoke(ctx: TenantContext, input: AiInvocationInput): Promise<AiInvocationResult> {
    const t0 = Date.now()
    const promptKey = crypto.createHash("sha256").update(JSON.stringify({
      systemPrompt: input.systemPrompt, userPrompt: input.userPrompt, model: input.model, vars: input.variables ?? {},
    })).digest("hex")
    if (input.cacheTtlSeconds && input.cacheTtlSeconds > 0) {
      const cached = await queryT<any>(
        ctx,
        `SELECT * FROM ai.inference_cache
         WHERE prompt_hash = $1 AND model_id = $2 AND created_at > NOW() - ($3 || ' seconds')::interval LIMIT 1`,
        [promptKey, input.model, String(input.cacheTtlSeconds)]
      )
      if (cached[0]) {
        return {
          id: cached[0].id, content: cached[0].response_text, inputTokens: cached[0].input_tokens,
          outputTokens: cached[0].output_tokens, costMicros: 0, latencyMs: Date.now() - t0, cacheHit: true,
          model: input.model, provider: cached[0].provider as AiProvider,
        }
      }
    }
    const provider: AiProvider = input.provider ?? this.inferProvider(input.model)
    const adapter = providers[provider]
    if (!adapter) throw new Error(`No AI provider adapter: ${provider}`)
    const out = await adapter.invoke(input)
    const result: AiInvocationResult = {
      id: crypto.randomUUID(),
      content: out.content, toolCalls: out.toolCalls,
      inputTokens: out.inputTokens, outputTokens: out.outputTokens,
      costMicros: out.costMicros, latencyMs: Date.now() - t0, cacheHit: false,
      model: input.model, provider,
    }
    await queryT(
      ctx,
      `INSERT INTO ai.inference_log (
         id, tenant_id, occurred_at, model_id, model_provider, operation, request_tokens,
         response_tokens, total_tokens, cost_micros, currency, latency_ms, user_id, feature_code, success, prompt_hash, metadata
       ) VALUES (
         public.uuidv7(), $1, NOW(), $2, $3, 'chat', $4,
         $5, $6, $7, 'USD', $8, $9, $10, TRUE, $11, $12::jsonb
       )`,
      [
        ctx.tenantId, input.model, provider, out.inputTokens, out.outputTokens,
        out.inputTokens + out.outputTokens, out.costMicros, result.latencyMs,
        input.userId ?? null, input.featureCode, promptKey, JSON.stringify({}),
      ]
    ).catch(() => undefined)
    if (input.cacheTtlSeconds && input.cacheTtlSeconds > 0) {
      await queryT(
        ctx,
        `INSERT INTO ai.inference_cache (id, tenant_id, prompt_hash, model_id, provider, response_text, input_tokens, output_tokens, created_at)
         VALUES (public.uuidv7(), $1, $2, $3, $4, $5, $6, $7, NOW())`,
        [ctx.tenantId, promptKey, input.model, provider, out.content, out.inputTokens, out.outputTokens]
      ).catch(() => undefined)
    }
    return result
  }

  async embed(ctx: TenantContext, input: { texts: string[]; model?: string; resourceType?: string; resourceIds?: string[] }): Promise<AiEmbedding[]> {
    const model = input.model ?? "text-embedding-3-small"
    const adapter = providers.openai
    const vectors = await adapter.embed!({ texts: input.texts, model })
    const out: AiEmbedding[] = []
    for (let i = 0; i < input.texts.length; i++) {
      const vec = vectors[i]
      if (input.resourceType && input.resourceIds?.[i]) {
        await queryT(
          ctx,
          `INSERT INTO ai.embedding (id, tenant_id, resource_type, resource_id, model, dimension, vector_json, created_at)
           VALUES (public.uuidv7(), $1, $2, $3, $4, $5, $6::jsonb, NOW())
           ON CONFLICT (tenant_id, resource_type, resource_id, model) DO UPDATE SET vector_json = EXCLUDED.vector_json, created_at = NOW()`,
          [ctx.tenantId, input.resourceType, input.resourceIds[i], model, vec.length, JSON.stringify(vec)]
        ).catch(() => undefined)
      }
      out.push({
        id: crypto.randomUUID(),
        resourceType: input.resourceType ?? "ad_hoc",
        resourceId: input.resourceIds?.[i] ?? `idx-${i}`,
        model, dimension: vec.length, vector: vec,
      })
    }
    return out
  }

  async getConversation(ctx: TenantContext, conversationId: string): Promise<AiConversation | null> {
    const rows = await queryT<any>(ctx, `SELECT * FROM ai.conversation WHERE id = $1`, [conversationId])
    if (!rows[0]) return null
    return {
      id: rows[0].id, tenantId: rows[0].tenant_id, userId: rows[0].user_id,
      feature: rows[0].feature_code, modelTrajectory: rows[0].model_trajectory ?? [],
      messageCount: Number(rows[0].message_count ?? 0),
      totalCostMicros: Number(rows[0].total_cost_micros ?? 0),
      createdAt: rows[0].created_at,
    }
  }

  private inferProvider(model: string): AiProvider {
    if (model.startsWith("claude-")) return "anthropic"
    if (model.startsWith("gpt-") || model.startsWith("text-embedding-")) return "openai"
    if (model.startsWith("gemini-")) return "google"
    if (model.startsWith("qwen")) return "qwen"
    return "local"
  }
}

export default AiPlatformService
