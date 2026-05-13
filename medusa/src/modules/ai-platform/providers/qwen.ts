import type { AiAdapter, AiAdapterResult } from "."
import { IntegrationError } from "../../../lib/errors"

const QWEN_BASE_URL = process.env.QWEN_BASE_URL ?? "http://localhost:8000/v1"
const QWEN_API_KEY = process.env.QWEN_API_KEY ?? ""

export const qwenAdapter: AiAdapter = {
  async invoke(input): Promise<AiAdapterResult> {
    const res = await fetch(`${QWEN_BASE_URL}/chat/completions`, {
      method: "POST",
      headers: { Authorization: `Bearer ${QWEN_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: input.model,
        messages: [
          ...(input.systemPrompt ? [{ role: "system", content: input.systemPrompt }] : []),
          { role: "user", content: input.userPrompt },
        ],
        max_tokens: input.maxTokens ?? 1024,
        temperature: input.temperature ?? 0.3,
      }),
    })
    if (!res.ok) throw new IntegrationError("qwen", `${res.status} ${await res.text()}`)
    const json: any = await res.json()
    const content = json.choices?.[0]?.message?.content ?? ""
    const inputTok = json.usage?.prompt_tokens ?? 0
    const outputTok = json.usage?.completion_tokens ?? 0
    return { content, inputTokens: inputTok, outputTokens: outputTok, costMicros: 0 }
  },
}
