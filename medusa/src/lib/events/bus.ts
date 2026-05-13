import type { IEventBusModuleService } from "@medusajs/framework/types"

export interface DomainEvent<TPayload = unknown> {
  name: string
  data: TPayload
  metadata?: {
    tenantId: string
    userId?: string | null
    correlationId?: string
    causationId?: string
  }
}

export async function publishDomainEvent<T>(
  eventBus: IEventBusModuleService,
  event: DomainEvent<T>
): Promise<void> {
  await eventBus.emit({
    name: event.name,
    data: event.data,
    metadata: event.metadata as Record<string, unknown> | undefined,
  } as any)
}
