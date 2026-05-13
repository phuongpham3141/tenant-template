import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework"
import { MEDIA_LAYER_MODULE } from "../modules/media-layer"
import type MediaLayerService from "../modules/media-layer/service"
import { adminContext } from "../lib/tenant/context"

export default async function mediaPipelineHandler({ event, container }: SubscriberArgs<{ id: string; tenant_id: string; media_type?: string }>) {
  const ctx = adminContext(event.data.tenant_id)
  const media = container.resolve<MediaLayerService>(MEDIA_LAYER_MODULE)

  if (event.name === "media.uploaded") {
    const mt = event.data.media_type
    if (mt === "image") {
      await media.queueProcessing(ctx, event.data.id, "thumbnail")
      await media.queueProcessing(ctx, event.data.id, "ai_tagging")
      await media.queueProcessing(ctx, event.data.id, "moderation")
    } else if (mt === "video") {
      await media.queueProcessing(ctx, event.data.id, "transcode")
      await media.queueProcessing(ctx, event.data.id, "thumbnail")
    } else if (mt === "spin_360") {
      await media.queueProcessing(ctx, event.data.id, "spin_360_compile")
    }
  }
}

export const config: SubscriberConfig = {
  event: ["media.uploaded", "media.processing.completed", "media.processing.failed"],
}
