import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework"

// Sprint 12 Pha 6 fix: media-layer queueProcessing đã drop (Sprint 11 Pha 2e D37,
// bảng media.processing_job MISSING). Subscriber này bị MISS trong cascade audit
// Pha 2e (L17) — phát hiện khi production build staging. Stub toàn bộ.
// Sprint 13 TODO: re-enable khi media processing pipeline rebuild.

export default async function mediaPipelineHandler({ event, container }: SubscriberArgs<{ id: string; tenant_id: string }>) {
  container.resolve("logger").debug(
    "[media-pipeline] event " + event.name + " for " + event.data.id + " (processing pipeline stubbed Sprint 11 Pha 2e D37)"
  )
}

export const config: SubscriberConfig = {
  event: ["media.uploaded", "media.variant.requested"],
}
