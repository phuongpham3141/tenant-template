import { Worker, type ConnectionOptions, Queue } from "bullmq"
import { adminContext } from "../lib/tenant/context"
import AiLivestreamService from "../modules/ai-livestream/service"
import { tickDirector } from "../modules/ai-livestream/director"
import { AI_LIVESTREAM_MODULE } from "../modules/ai-livestream"

const redisConn: ConnectionOptions = { url: process.env.REDIS_URL ?? "redis://redis:6379" } as any
const TICK_INTERVAL_MS = 1000

interface DirectorTickData {
  tenantId: string
  sessionId: string
}

export function startAiDirectorWorker(container: any) {
  const directorQ = new Queue("ai-director-tick", { connection: redisConn })

  const worker = new Worker<DirectorTickData>(
    "ai-director-tick",
    async (job) => {
      const { tenantId, sessionId } = job.data
      const ctx = adminContext(tenantId)
      const service = container.resolve<AiLivestreamService>(AI_LIVESTREAM_MODULE)
      const result = await tickDirector({ ctx, service, sessionId })
      if (result.action !== "ended" && !result.action.startsWith("failed") && !result.action.startsWith("noop_terminal")) {
        await directorQ.add(
          "tick",
          { tenantId, sessionId },
          {
            jobId: `director:${sessionId}:${Date.now()}`,
            delay: TICK_INTERVAL_MS,
            removeOnComplete: 100,
            removeOnFail: 100,
          }
        )
      }
      return result
    },
    { connection: redisConn, concurrency: Number(process.env.AI_DIRECTOR_CONCURRENCY ?? 20) }
  ).on("failed", (job, err) => container.resolve("logger").error(`ai-director-tick failed: ${err.message}`))

  return worker
}

export async function enqueueDirectorTick(tenantId: string, sessionId: string, delayMs = 0): Promise<void> {
  const queue = new Queue("ai-director-tick", { connection: redisConn })
  try {
    await queue.add(
      "tick",
      { tenantId, sessionId },
      { jobId: `director:${sessionId}:${Date.now()}`, delay: delayMs, removeOnComplete: 100 }
    )
  } finally {
    await queue.close()
  }
}
