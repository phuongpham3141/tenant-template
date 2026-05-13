import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { resolveTenant } from "../../../../../lib/tenant/context"
import { analyzeAndEmbed } from "../../../../../lib/ai/vision"
import { searchSimilar } from "../../../../../lib/search/embeddings"
import { queryT } from "../../../../../lib/db/pg"
import crypto from "crypto"

const MAX_BYTES = 10 * 1024 * 1024
const ALLOWED_MIME = new Set(["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"])
const S3_ENDPOINT = process.env.S3_ENDPOINT ?? ""
const S3_BUCKET = process.env.S3_BUCKET ?? "csr-media"
const S3_PUBLIC_BASE = process.env.S3_PUBLIC_BASE ?? process.env.S3_FILE_URL ?? ""

interface UploadedPart {
  fieldName: string
  filename: string
  mimeType: string
  buffer: Buffer
}

async function parseMultipart(req: MedusaRequest): Promise<UploadedPart[]> {
  const ct = req.headers["content-type"]
  if (!ct || !ct.includes("multipart/form-data")) {
    throw new Error("expected multipart/form-data")
  }
  const boundaryMatch = ct.match(/boundary=(?:"([^"]+)"|([^;]+))/i)
  if (!boundaryMatch) throw new Error("no boundary")
  const boundary = boundaryMatch[1] || boundaryMatch[2]
  const bodyBuf: Buffer = (req as any).rawBody ?? Buffer.from(await new Promise<Buffer>((resolve, reject) => {
    const chunks: Buffer[] = []
    let total = 0
    req.on("data", (c: Buffer) => {
      total += c.length
      if (total > MAX_BYTES) { req.destroy(); reject(new Error("file_too_large")); return }
      chunks.push(c)
    })
    req.on("end", () => resolve(Buffer.concat(chunks)))
    req.on("error", reject)
  }))

  const delimiter = Buffer.from(`--${boundary}`)
  const parts: UploadedPart[] = []
  let start = bodyBuf.indexOf(delimiter)
  while (start !== -1) {
    const next = bodyBuf.indexOf(delimiter, start + delimiter.length)
    if (next === -1) break
    const block = bodyBuf.subarray(start + delimiter.length, next)
    const headerEnd = block.indexOf("\r\n\r\n")
    if (headerEnd === -1) { start = next; continue }
    const headers = block.subarray(0, headerEnd).toString("utf-8")
    const content = block.subarray(headerEnd + 4, block.length - 2) // strip trailing \r\n

    const disp = headers.match(/Content-Disposition:\s*form-data;\s*name="([^"]+)"(?:;\s*filename="([^"]*)")?/i)
    const typeMatch = headers.match(/Content-Type:\s*(.+)/i)
    if (disp && disp[2]) {
      parts.push({
        fieldName: disp[1],
        filename: disp[2],
        mimeType: (typeMatch?.[1] ?? "application/octet-stream").trim(),
        buffer: content,
      })
    }
    start = next
  }
  return parts
}

async function uploadToS3(buffer: Buffer, key: string, mimeType: string): Promise<string> {
  // Minimal SigV4-free upload via signed URL is out of scope; rely on already-configured aws-sdk if present.
  // Falls back to data URL if S3 not configured (dev only).
  if (!S3_ENDPOINT || !process.env.S3_ACCESS_KEY_ID) {
    return `data:${mimeType};base64,${buffer.toString("base64")}`
  }
  try {
    const { S3Client, PutObjectCommand } = await import("@aws-sdk/client-s3")
    const client = new S3Client({
      region: process.env.S3_REGION ?? "us-east-1",
      endpoint: S3_ENDPOINT,
      forcePathStyle: true,
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID!,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
      },
    })
    await client.send(new PutObjectCommand({
      Bucket: S3_BUCKET, Key: key, Body: buffer, ContentType: mimeType,
      CacheControl: "public, max-age=3600",
    }))
    return `${S3_PUBLIC_BASE.replace(/\/$/, "")}/${key}`
  } catch (err: any) {
    return `data:${mimeType};base64,${buffer.toString("base64")}`
  }
}

export const config = {
  api: { bodyParser: false },
}

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const ctx = resolveTenant(req)
  const t0 = Date.now()

  let parts: UploadedPart[]
  try {
    parts = await parseMultipart(req)
  } catch (err: any) {
    return res.status(400).json({ error: err.message ?? "multipart_parse_failed" })
  }

  const filePart = parts.find((p) => p.fieldName === "image")
  if (!filePart) return res.status(400).json({ error: "image_field_required" })
  if (!ALLOWED_MIME.has(filePart.mimeType)) {
    return res.status(415).json({ error: "unsupported_media_type", message: `Allowed: ${Array.from(ALLOWED_MIME).join(", ")}` })
  }
  if (filePart.buffer.length > MAX_BYTES) {
    return res.status(413).json({ error: "file_too_large", limit_bytes: MAX_BYTES })
  }

  const ext = filePart.mimeType.split("/")[1] ?? "bin"
  const hash = crypto.createHash("sha1").update(filePart.buffer).digest("hex").slice(0, 16)
  const key = `visual-search/${ctx.tenantId}/${new Date().toISOString().slice(0, 10)}/${hash}.${ext}`
  const imageUrl = await uploadToS3(filePart.buffer, key, filePart.mimeType)

  const limit = Math.min(Number(parts.find((p) => p.fieldName === "limit")?.buffer.toString() ?? 24), 60)
  const locale = parts.find((p) => p.fieldName === "locale")?.buffer.toString() ?? "vi"

  const { analysis, embedding } = await analyzeAndEmbed({ imageUrl })

  const matches = await searchSimilar(ctx, {
    queryEmbedding: embedding, scopeType: "product", limit: limit * 2, minSimilarity: 0.5,
  })

  if (matches.length === 0) {
    return res.json({ analysis, hits: [], total: 0, latency_ms: Date.now() - t0, image_url: imageUrl })
  }

  const ids = matches.map((m) => m.resource_id)
  const products = await queryT<any>(
    ctx,
    `SELECT p.id, p.sku, p.supplier_id, p.category_id,
            p.title_i18n->>$2 AS title, p.title_i18n,
            p.base_price_minor, p.base_currency,
            s.legal_name AS supplier_name, s.country_code AS supplier_country, s.verification_tier,
            m.cdn_url AS thumbnail
     FROM catalog.product p
     JOIN identity.supplier s ON s.id = p.supplier_id
     LEFT JOIN LATERAL (
       SELECT cdn_url FROM media.media_asset
       WHERE owner_type = 'product' AND owner_id = p.id AND status = 'ready'
       ORDER BY created_at ASC LIMIT 1
     ) m ON TRUE
     WHERE p.id = ANY($1::uuid[]) AND p.deleted_at IS NULL AND p.status = 'active'`,
    [ids, locale]
  )
  const byId = new Map(products.map((p) => [p.id, p]))
  const hits = matches.map((m) => {
    const p = byId.get(m.resource_id)
    if (!p) return null
    return {
      product_id: p.id, sku: p.sku, title: p.title ?? p.sku, title_i18n: p.title_i18n,
      supplier_id: p.supplier_id, supplier_name: p.supplier_name, supplier_country: p.supplier_country,
      verification_tier: p.verification_tier, category_id: p.category_id,
      base_price_minor: p.base_price_minor, base_currency: p.base_currency,
      thumbnail: p.thumbnail, match_score: m.similarity, url: `/product/${p.id}`,
    }
  }).filter(Boolean).slice(0, limit)

  queryT(
    ctx,
    `INSERT INTO search.search_query_log (
       id, tenant_id, executed_at, user_id, raw_query, processed_query, locale,
       hits_count, latency_ms, ai_intent_classified, filters_applied_jsonb
     ) VALUES (
       public.uuidv7(), $1, NOW(), $2, $3, $4, $5, $6, $7, 'visual_search_upload', $8::jsonb
     )`,
    [
      ctx.tenantId, ctx.userId ?? null,
      `[upload] ${analysis.category}`, analysis.text_for_embedding.slice(0, 500),
      locale, hits.length, Date.now() - t0,
      JSON.stringify({ image_key: key, image_size_bytes: filePart.buffer.length, mime: filePart.mimeType }),
    ]
  ).catch(() => undefined)

  return res.json({ analysis, hits, total: hits.length, latency_ms: Date.now() - t0, image_url: imageUrl })
}
