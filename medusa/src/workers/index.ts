import { startLivestreamAggregatorWorker } from "./livestream-aggregator"
import { startNotificationDispatcherWorker } from "./notification-dispatcher"
import { startMediaProcessorWorker } from "./media-processor"
import { startSearchIndexerWorker } from "./search-indexer"
import { startVisualEmbedWorker } from "./visual-embed-worker"
import { startAiTtsRenderWorker } from "./ai-tts-render-worker"
import { startAiVideoRenderWorker } from "./ai-video-render-worker"
import { startAiDirectorWorker } from "./ai-director-worker"
import { startAiChatResponderWorker } from "./ai-chat-responder"
import { startSimulcastMuxWorker } from "./simulcast-mux-worker"

export function startAllWorkers(container: any) {
  return [
    startLivestreamAggregatorWorker(container),
    startNotificationDispatcherWorker(container),
    startMediaProcessorWorker(container),
    startSearchIndexerWorker(container),
    startVisualEmbedWorker(container),
    startAiTtsRenderWorker(container),
    startAiVideoRenderWorker(container),
    startAiDirectorWorker(container),
    startAiChatResponderWorker(container),
    startSimulcastMuxWorker(container),
  ]
}
