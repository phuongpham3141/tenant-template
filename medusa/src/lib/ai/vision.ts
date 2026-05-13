import { IntegrationError } from "../errors"

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY ?? ""
const OPENAI_API_KEY = process.env.OPENAI_API_KEY ?? ""

export interface VisionAnalysis {
  category: string
  colors: string[]
  material: string
  style: string
  descriptors: string[]
  text_for_embedding: string
}

const SYSTEM_PROMPT = `You analyze a product image for e-commerce visual search.
Return ONLY a valid JSON object with this exact shape:
{"category": "string", "colors": ["string"], "material": "string", "style": "string", "descriptors": ["string"]}
- category: high-level category in English (e.g., "electronics > mobile phones", "apparel > t-shirts")
- colors: up to 5 dominant colors as common names ("navy blue", "off-white")
- material: best-guess primary material ("plastic", "cotton", "wood", "stainless steel"), or "unknown"
- style: short style descriptor ("modern minimalist", "industrial", "vintage")
- descriptors: 5-10 searchable visual descriptors (shape, texture, distinguishing features)
Be strict: only valid JSON, no markdown, no preamble.`

export async function analyzeImage(input: { imageUrl: string }): Promise<VisionAnalysis> {
  if (!ANTHROPIC_API_KEY) throw new IntegrationError("anthropic", "ANTHROPIC_API_KEY missing")

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 800,
      temperature: 0.1,
      system: SYSTEM_PROMPT,
      messages: [{
        role: "user",
        content: [
          { type: "image", source: { type: "url", url: input.imageUrl } },
          { type: "text", text: "Analyze this product image and return the JSON described in the system prompt." },
        ],
      }],
    }),
  })
  if (!res.ok) throw new IntegrationError("anthropic-vision", `${res.status} ${await res.text()}`)
  const json: any = await res.json()
  const raw = (json.content ?? []).find((b: any) => b.type === "text")?.text ?? ""
  const cleaned = raw.replace(/^```json\s*|\s*```$/g, "").trim()

  let parsed: any
  try {
    parsed = JSON.parse(cleaned)
  } catch {
    throw new IntegrationError("anthropic-vision", `Failed to parse vision JSON: ${cleaned.slice(0, 200)}`)
  }

  const category = String(parsed.category ?? "")
  const colors = Array.isArray(parsed.colors) ? parsed.colors.map(String).slice(0, 5) : []
  const material = String(parsed.material ?? "unknown")
  const style = String(parsed.style ?? "")
  const descriptors = Array.isArray(parsed.descriptors) ? parsed.descriptors.map(String).slice(0, 10) : []

  const text_for_embedding =
    `${category}. Colors: ${colors.join(", ")}. Material: ${material}. Style: ${style}. ${descriptors.join(", ")}`
      .replace(/\s+/g, " ").trim()

  return { category, colors, material, style, descriptors, text_for_embedding }
}

export async function embedText(text: string, model = "text-embedding-3-small"): Promise<number[]> {
  if (!OPENAI_API_KEY) throw new IntegrationError("openai", "OPENAI_API_KEY missing")
  const res = await fetch("https://api.openai.com/v1/embeddings", {
    method: "POST",
    headers: { Authorization: `Bearer ${OPENAI_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ model, input: text }),
  })
  if (!res.ok) throw new IntegrationError("openai-embed", `${res.status} ${await res.text()}`)
  const json: any = await res.json()
  return json.data[0].embedding as number[]
}

export async function analyzeAndEmbed(input: { imageUrl: string }): Promise<{ analysis: VisionAnalysis; embedding: number[] }> {
  const analysis = await analyzeImage(input)
  const embedding = await embedText(analysis.text_for_embedding)
  return { analysis, embedding }
}
