import { queryT, withTenant, type TenantContext } from "../db/pg"

export interface EmbeddingMatch {
  resource_type: string
  resource_id: string
  similarity: number
  metadata?: Record<string, unknown>
}

let pgvectorAvailable: boolean | null = null

async function detectPgVector(ctx: TenantContext): Promise<boolean> {
  if (pgvectorAvailable !== null) return pgvectorAvailable
  const rows = await queryT<{ exists: boolean }>(
    ctx,
    `SELECT EXISTS (SELECT 1 FROM pg_extension WHERE extname = 'vector') AS exists`,
    []
  ).catch(() => [{ exists: false }])
  pgvectorAvailable = Boolean(rows[0]?.exists)
  return pgvectorAvailable
}

/**
 * Find top-N similar embeddings by cosine distance.
 * Uses pgvector when available, otherwise JSONB cosine fallback (slower).
 */
export async function searchSimilar(
  ctx: TenantContext,
  opts: {
    queryEmbedding: number[]
    scopeType: string
    limit?: number
    filterScopeIds?: string[]
    excludeScopeIds?: string[]
    minSimilarity?: number
  }
): Promise<EmbeddingMatch[]> {
  const limit = Math.min(opts.limit ?? 24, 100)
  const usePg = await detectPgVector(ctx)

  if (usePg) {
    const params: unknown[] = [`[${opts.queryEmbedding.join(",")}]`, opts.scopeType]
    let where = `WHERE scope_type = $2`
    if (opts.filterScopeIds?.length) {
      params.push(opts.filterScopeIds)
      where += ` AND scope_id = ANY($${params.length}::uuid[])`
    }
    if (opts.excludeScopeIds?.length) {
      params.push(opts.excludeScopeIds)
      where += ` AND scope_id <> ALL($${params.length}::uuid[])`
    }
    params.push(limit)
    const rows = await queryT<any>(
      ctx,
      `SELECT scope_type, scope_id, metadata_jsonb AS metadata,
              1 - (embedding <=> $1::vector) AS similarity
       FROM ai.ai_embedding_doc
       ${where}
       ORDER BY embedding <=> $1::vector
       LIMIT $${params.length}`,
      params
    )
    return rows
      .filter((r) => Number(r.similarity) >= (opts.minSimilarity ?? 0))
      .map((r) => ({
        resource_type: r.scope_type,
        resource_id: r.scope_id,
        similarity: Number(r.similarity),
        metadata: r.metadata ?? undefined,
      }))
  }

  // JSONB fallback: compute cosine in app (slow for large catalogs; suitable for dev only)
  const candidates = await queryT<any>(
    ctx,
    `SELECT scope_type, scope_id, metadata_jsonb AS metadata, embedding
     FROM ai.ai_embedding_doc
     WHERE scope_type = $1 AND embedding IS NOT NULL
     LIMIT 5000`,
    [opts.scopeType]
  )

  const q = opts.queryEmbedding
  const qNorm = Math.sqrt(q.reduce((s, v) => s + v * v, 0))
  const scored: EmbeddingMatch[] = []

  for (const c of candidates) {
    const vec = Array.isArray(c.embedding) ? c.embedding : (() => {
      try { return JSON.parse(c.embedding) } catch { return null }
    })()
    if (!vec || vec.length !== q.length) continue
    let dot = 0
    let vNorm = 0
    for (let i = 0; i < q.length; i++) {
      dot += q[i] * vec[i]
      vNorm += vec[i] * vec[i]
    }
    const sim = dot / (qNorm * Math.sqrt(vNorm) || 1)
    if (sim >= (opts.minSimilarity ?? 0)) {
      scored.push({
        resource_type: c.scope_type,
        resource_id: c.scope_id,
        similarity: sim,
        metadata: c.metadata ?? undefined,
      })
    }
  }
  scored.sort((a, b) => b.similarity - a.similarity)
  return scored.slice(0, limit)
}

export async function upsertEmbedding(
  ctx: TenantContext,
  input: {
    scopeType: string
    scopeId: string
    embedding: number[]
    model: string
    metadata?: Record<string, unknown>
  }
): Promise<void> {
  const usePg = await detectPgVector(ctx)
  const embedExpr = usePg ? `$3::vector` : `$3::jsonb`
  const embedVal = usePg
    ? `[${input.embedding.join(",")}]`
    : JSON.stringify(input.embedding)

  await withTenant(ctx, async (client) => {
    await client.query(
      `INSERT INTO ai.ai_embedding_doc (
         id, tenant_id, scope_type, scope_id, embedding, embedding_model, metadata_jsonb, created_at, updated_at
       ) VALUES (
         public.uuidv7(), $1, $2, $4, ${embedExpr}, $5, $6::jsonb, NOW(), NOW()
       )
       ON CONFLICT (tenant_id, scope_type, scope_id, embedding_model) DO UPDATE
       SET embedding = EXCLUDED.embedding, metadata_jsonb = EXCLUDED.metadata_jsonb, updated_at = NOW()`,
      [ctx.tenantId, input.scopeType, embedVal, input.scopeId, input.model, JSON.stringify(input.metadata ?? {})]
    )
  })
}
