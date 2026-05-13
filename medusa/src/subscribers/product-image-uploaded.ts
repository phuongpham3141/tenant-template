import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework"
import { Queue, type ConnectionOptions } from "bullmq"

const redisConn: ConnectionOptions = { url: process.env.REDIS_URL ?? "redis://redis:6379" } as any

interface MediaReadyEvent {
  id: string
  tenant_id: string
  owner_type: string
  owner_id: string
  cdn_url?: string
  media_type?: string
}

export default async function productImageUploadedHandler({ event, container }: SubscriberArgs<MediaReadyEvent>) {
  const data = event.data
  if (data.owner_type !== "product") return
  if (data.media_type !== "image" && data.media_type !== "spin_360") return
  if (!data.cdn_url) return

  const queue = new Queue("visual-embed", { connection: redisConn })
  try {
    await queue.add(
      "embed-product",
      {
        tenantId: data.tenant_id,
        scopeType: "product",
        scopeId: data.owner_id,
        imageUrl: data.cdn_url,
        imageAssetId: data.id,
      },
      {
        jobId: `embed:product:${data.owner_id}:${data.id}`,
        removeOnComplete: 1000,
        removeOnFail: 500,
        attempts: 3,
        backoff: { type: "exponential", delay: 15_000 },
      }
    )
    container.resolve("logger").info(`queued visual-embed for product=${data.owner_id} asset=${data.id}`)
  } finally {
    await queue.close()
  }
}

export const config: SubscriberConfig = {
  event: ["media.ready", "media.processing.completed"],
}
