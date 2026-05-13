import type { AiAdapter, AiAdapterResult } from "."
import { IntegrationError } from "../../../lib/errors"

const OPENAI_API_KEY = process.env.OPENAI_API_KEY ?? ""

const PRICE: Record<string, { in: number; out: number }> = {
  "gpt-5": { in: 5, out: 15 },
  "gpt-5-mini": { in: 0.15, out: 0.6 },
  "text-embedding-3-small": { in: 0.02, out: 0 },
}

export const openaiAdapter: AiAdapter = {
  async invoke(input): Promise<AiAdapterResult> {
    if (!OPENAI_API_KEY) throw new IntegrationError("openai", "OPENAI_API_KEY missing")
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${OPENAI_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: input.model,
        messages: [
          ...(input.systemPrompt ? [{ role: "system", content: input.systemPrompt }] : []),
          { role: "user", content: fillTemplate(input.userPrompt, input.variables) },
        ],
        max_tokens: input.maxTokens ?? 1024,
        temperature: input.temperature ?? 0.3,
      }),
    })
    if (!res.ok) throw new IntegrationError("openai", `${res.status} ${await res.text()}`)
    const json: any = await res.json()
    const content = json.choices?.[0]?.message?.content ?? ""
    const inputTok = json.usage?.prompt_tokens ?? 0
    const outputTok = json.usage?.completion_tokens ?? 0
    const price = PRICE[input.model] ?? { in: 1, out: 3 }
    const costMicros = Math.round(((inputTok * price.in + outputTok * price.out) / 1_000_000) * 1_000_000)
    return { content, inputTokens: inputTok, outputTokens: outputTok, costMicros }
  },
  async embed({ texts, model }) {
    if (!OPENAI_API_KEY) throw new IntegrationError("openai", "OPENAI_API_KEY missing")
    const res = await fetch("https://api.openai.com/v1/embeddings", {
      method: "POST",
      headers: { Authorization: `Bearer ${OPENAI_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ model, input: texts }),
    })
    if (!res.ok) throw new IntegrationError("openai", `${res.status} ${await res.text()}`)
    const json: any = await res.json()
    return json.data.map((d: any) => d.embedding as number[])
  },
}

function fillTemplate(template: string, vars?: Record<string, unknown>) {
  if (!vars) return template
  return template.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, k) => String(vars[k] ?? ""))
}
