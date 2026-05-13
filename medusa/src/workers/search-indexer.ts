import { Worker, type ConnectionOptions } from "bullmq"
import { SEARCH_PLATFORM_MODULE } from "../modules/search-platform"
import type SearchPlatformService from "../modules/search-platform/service"
import { adminContext } from "../lib/tenant/context"

const redisConn: ConnectionOptions = { url: process.env.REDIS_URL ?? "redis://redis:6379" } as any

export function startSearchIndexerWorker(container: any) {
  const svc = container.resolve<SearchPlatformService>(SEARCH_PLATFORM_MODULE)
  return new Worker(
    "search-indexer",
    async (job) => {
      const { tenantId, indexName, batch } = job.data as { tenantId: string; indexName: string; batch: Array<{ id: string; doc: Record<string, unknown> }> }
      await svc.bulkIndex(adminContext(tenantId), indexName, batch)
    },
    { connection: redisConn, concurrency: 4 }
  )
}
