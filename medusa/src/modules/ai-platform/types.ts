export type AiProvider = "anthropic" | "openai" | "google" | "qwen" | "local"
export type AiOperation = "completion" | "chat" | "embedding" | "image_generation" | "image_understanding" | "tool_use"

export interface AiInvocationInput {
  promptCode?: string
  systemPrompt?: string
  userPrompt: string
  model: string
  provider?: AiProvider
  variables?: Record<string, unknown>
  temperature?: number
  maxTokens?: number
  topP?: number
  streaming?: boolean
  cacheTtlSeconds?: number
  tools?: Array<{ name: string; description?: string; inputSchema: Record<string, unknown> }>
  userId?: string
  featureCode: string
}

export interface AiInvocationResult {
  id: string
  content: string
  toolCalls?: Array<{ name: string; input: Record<string, unknown> }>
  inputTokens: number
  outputTokens: number
  costMicros: number
  latencyMs: number
  cacheHit: boolean
  model: string
  provider: AiProvider
}

export interface AiEmbedding {
  id: string
  resourceType: string
  resourceId: string
  model: string
  dimension: number
  vector: number[]
  metadata?: Record<string, unknown>
}

export interface AiConversation {
  id: string
  tenantId: string
  userId?: string
  feature: string
  modelTrajectory: string[]
  messageCount: number
  totalCostMicros: number
  createdAt: Date
}
