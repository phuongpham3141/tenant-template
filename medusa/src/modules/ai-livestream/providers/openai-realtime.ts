import { IntegrationError } from "../../../lib/errors"
import type { RealtimeChatProvider, RealtimeChatRequest, RealtimeChatResult } from "."

const API_KEY = process.env.OPENAI_API_KEY ?? ""
const MODEL = process.env.OPENAI_REALTIME_MODEL ?? "gpt-realtime"

const INPUT_PER_M_TOKENS_USD = 5
const OUTPUT_PER_M_TOKENS_USD = 20

export const openaiRealtimeChat: RealtimeChatProvider = {
  id: "openai-realtime",
  async respond(req: RealtimeChatRequest): Promise<RealtimeChatResult> {
    if (!API_KEY) throw new IntegrationError("openai-realtime", "OPENAI_API_KEY missing")
    const t0 = Date.now()
    const messages = [
      { role: "system", content: req.systemPrompt },
      ...(req.conversationContext ?? []),
      { role: "user", content: req.message },
    ]
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: MODEL,
        messages,
        max_tokens: 280,
        temperature: 0.6,
      }),
    })
    if (!res.ok) throw new IntegrationError("openai-realtime", `${res.status} ${await res.text()}`)
    const json = await res.json() as any
    const responseText = json.choices?.[0]?.message?.content ?? ""
    const inT = json.usage?.prompt_tokens ?? 0
    const outT = json.usage?.completion_tokens ?? 0
    const costMicros = BigInt(Math.round(((inT * INPUT_PER_M_TOKENS_USD + outT * OUTPUT_PER_M_TOKENS_USD) / 1_000_000) * 1_000_000))
    return {
      responseText,
      latencyMs: Date.now() - t0,
      costMicros,
    }
  },
}
