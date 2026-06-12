/**
 * Media processor worker (stub Sprint 12 Pha 6)
 *
 * STATUS: Worker stubbed — media-layer queueProcessing/markJobCompleted/markJobFailed
 * da drop Sprint 11 Pha 2e D37 (bang media.processing_job MISSING).
 * Cascade nay bi MISS trong Pha 2e audit (L17) — phat hien khi production build.
 *
 * Sprint 13 TODO: re-enable khi media processing pipeline rebuild.
 * Original: BullMQ worker queue media-processing (ffmpeg/AI tagging/spin viewer).
 */

export function startMediaProcessorWorker(_container: any) {
  console.log("[media-processor] No-op stub (Sprint 12 Pha 6, media pipeline defer Sprint 13+)")
  return null
}
