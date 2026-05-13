import { Worker, type ConnectionOptions } from "bullmq"
import { adminContext } from "../lib/tenant/context"
import { queryT } from "../lib/db/pg"
import { mkdirSync, createWriteStream } from "fs"
import { join } from "path"
import { startMux, isMuxRunning, publishHlsUrls } from "../modules/ai-livestream/simulcast-mux"

const redisConn: ConnectionOptions = { url: process.env.REDIS_URL ?? "redis://redis:6379" } as any
const STREAM_ROOT = process.env.MUX_HLS_ROOT ?? "/var/lib/csr/hls"
const FIFO_ROOT = process.env.MUX_FIFO_ROOT ?? "/var/lib/csr/fifo"
const HLS_PUBLIC_BASE = process.env.HLS_PUBLIC_BASE ?? "https://stream.huayuesc.vn"

interface MuxFeedJobData {
  tenantId: string
  sessionId: string
  videoUrl?: string
  audioUrl: string
  locale: "vi" | "en" | "cn"
  durationMs?: number
  isChatResponse?: boolean
  text?: string
}

async function ensureMuxRunning(tenantId: string, sessionId: string, locales: ("vi" | "en" | "cn")[]): Promise<string> {
  const ctx = adminContext(tenantId)
  const session = await queryT<any>(ctx, `SELECT stream_id FROM live.ai_director_session WHERE id = $1`, [sessionId])
  if (!session[0]) throw new Error(`director session not found: ${sessionId}`)
  const streamId = session[0].stream_id
  if (isMuxRunning(streamId)) return streamId

  mkdirSync(join(FIFO_ROOT, streamId), { recursive: true })
  for (const locale of locales) {
    mkdirSync(join(STREAM_ROOT, streamId, locale), { recursive: true })
  }
  const masterVideoFifo = join(FIFO_ROOT, streamId, "video.fifo")
  const audioFifos: Record<string, string> = {}
  for (const locale of locales) {
    audioFifos[locale] = join(FIFO_ROOT, streamId, `audio-${locale}.fifo`)
  }

  // Note: In production, FIFOs are created via mkfifo by a sidecar; here we assume they exist.
  startMux({ streamId, tenantId, locales, masterVideoFifo, audioFifos: audioFifos as any, hlsRoot: STREAM_ROOT })
  await publishHlsUrls(ctx, streamId, HLS_PUBLIC_BASE, locales)
  return streamId
}

export function startSimulcastMuxWorker(container: any) {
  return new Worker<MuxFeedJobData>(
    "ai-mux-feed",
    async (job) => {
      const { tenantId, sessionId, audioUrl, locale, videoUrl } = job.data
      const ctx = adminContext(tenantId)

      const streamMeta = await queryT<any>(
        ctx,
        `SELECT s.stream_id, l.locales_simulcast FROM live.ai_director_session s
         JOIN live.livestream l ON l.id = s.stream_id
         WHERE s.id = $1`,
        [sessionId]
      )
      if (!streamMeta[0]) return { skipped: "session_missing" }
      const locales: ("vi" | "en" | "cn")[] = (streamMeta[0].locales_simulcast ?? ["vi", "en", "cn"])
      const streamId = await ensureMuxRunning(tenantId, sessionId, locales)

      // Write audio chunk into per-locale FIFO. In production: use FFmpeg sub-process to fetch+decode+pipe.
      const fifoPath = join(FIFO_ROOT, streamId, `audio-${locale}.fifo`)
      try {
        const res = await fetch(audioUrl)
        if (!res.ok || !res.body) throw new Error(`fetch audio ${res.status}`)
        const buffer = Buffer.from(await res.arrayBuffer())
        const fs = await import("fs/promises")
        await fs.appendFile(fifoPath, buffer)
      } catch (err) {
        container.resolve("logger").warn(`mux audio feed failed locale=${locale}: ${(err as any).message}`)
      }

      // Write video chunk into master video FIFO (only when not chat-overlay-only)
      if (videoUrl && !job.data.isChatResponse) {
        const masterFifo = join(FIFO_ROOT, streamId, "video.fifo")
        try {
          const res = await fetch(videoUrl)
          if (!res.ok || !res.body) throw new Error(`fetch video ${res.status}`)
          const buffer = Buffer.from(await res.arrayBuffer())
          const fs = await import("fs/promises")
          await fs.appendFile(masterFifo, buffer)
        } catch (err) {
          container.resolve("logger").warn(`mux video feed failed: ${(err as any).message}`)
        }
      }

      await queryT(
        ctx,
        `UPDATE live.stream_audio_track SET last_chunk_at = NOW() WHERE stream_id = $1 AND locale = $2`,
        [streamId, locale]
      )

      return { ok: true, streamId }
    },
    { connection: redisConn, concurrency: Number(process.env.MUX_CONCURRENCY ?? 8) }
  ).on("failed", (job, err) => container.resolve("logger").error(`mux-feed failed: ${err.message}`))
}
