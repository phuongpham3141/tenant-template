import type { AiInvocationInput, AiProvider } from "../types"

export interface AiAdapterResult {
  content: string
  toolCalls?: Array<{ name: string; input: Record<string, unknown> }>
  inputTokens: number
  outputTokens: number
  costMicros: number
}

export interface AiAdapter {
  invoke(input: AiInvocationInput): Promise<AiAdapterResult>
  embed?(input: { texts: string[]; model: string }): Promise<number[][]>
}

import { anthropicAdapter } from "./anthropic"
import { openaiAdapter } from "./openai"
import { qwenAdapter } from "./qwen"

export const providers: Record<AiProvider, AiAdapter> = {
  anthropic: anthropicAdapter,
  openai: openaiAdapter,
  google: openaiAdapter,
  qwen: qwenAdapter,
  local: qwenAdapter,
}
