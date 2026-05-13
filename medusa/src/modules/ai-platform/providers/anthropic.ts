import type { AiAdapter, AiAdapterResult } from "."
import { IntegrationError } from "../../../lib/errors"

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY ?? ""

const PRICE_PER_M_TOKENS_USD: Record<string, { in: number; out: number }> = {
  "claude-opus-4-7": { in: 15, out: 75 },
  "claude-sonnet-4-6": { in: 3, out: 15 },
  "claude-haiku-4-5": { in: 1, out: 5 },
}

export const anthropicAdapter: AiAdapter = {
  async invoke(input): Promise<AiAdapterResult> {
    if (!ANTHROPIC_API_KEY) throw new IntegrationError("anthropic", "ANTHROPIC_API_KEY missing")
    const body: Record<string, unknown> = {
      model: input.model,
      max_tokens: input.maxTokens ?? 1024,
      temperature: input.temperature ?? 0.3,
      system: input.systemPrompt,
      messages: [{ role: "user", content: this.fillTemplate(input.userPrompt, input.variables) }],
    }
    if (input.tools?.length) body.tools = input.tools.map((t) => ({ name: t.name, description: t.description, input_schema: t.inputSchema }))
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    })
    if (!res.ok) throw new IntegrationError("anthropic", `${res.status} ${await res.text()}`)
    const json: any = await res.json()
    let content = ""
    const toolCalls: AiAdapterResult["toolCalls"] = []
    for (const block of json.content ?? []) {
      if (block.type === "text") content += block.text
      else if (block.type === "tool_use") toolCalls.push({ name: block.name, input: block.input })
    }
    const inputTok = json.usage?.input_tokens ?? 0
    const outputTok = json.usage?.output_tokens ?? 0
    const price = PRICE_PER_M_TOKENS_USD[input.model] ?? { in: 3, out: 15 }
    const costMicros = Math.round(((inputTok * price.in + outputTok * price.out) / 1_000_000) * 1_000_000)
    return { content, toolCalls: toolCalls.length ? toolCalls : undefined, inputTokens: inputTok, outputTokens: outputTok, costMicros }
  },
  fillTemplate(template: string, vars?: Record<string, unknown>) {
    if (!vars) return template
    return template.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, k) => String(vars[k] ?? ""))
  },
} as AiAdapter & { fillTemplate: (t: string, v?: Record<string, unknown>) => string }
