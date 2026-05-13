import { Worker, type ConnectionOptions } from "bullmq"
import { LIVE_COMMERCE_MODULE } from "../modules/live-commerce"
import type LiveCommerceService from "../modules/live-commerce/service"
import { adminContext } from "../lib/tenant/context"

const redisConn: ConnectionOptions = { url: process.env.REDIS_URL ?? "redis://redis:6379" } as any

export function startLivestreamAggregatorWorker(container: any) {
  const svc = container.resolve<LiveCommerceService>(LIVE_COMMERCE_MODULE)
  const worker = new Worker(
    "livestream-aggregator",
    async (job) => {
      const { tenantId, streamId, peakAdd, uniqueAdd, revenueMinor } = job.data as { tenantId: string; streamId: string; peakAdd: number; uniqueAdd: number; revenueMinor: string }
      await svc.incrementMetrics(adminContext(tenantId), streamId, peakAdd, uniqueAdd, BigInt(revenueMinor))
    },
    { connection: redisConn, concurrency: 8 }
  )
  worker.on("failed", (job, err) => {
    container.resolve("logger").error(`livestream-aggregator job failed: ${err.message}`)
  })
  return worker
}
