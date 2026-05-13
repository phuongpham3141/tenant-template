import { IntegrationError } from "../../../lib/errors"
import type { TtsProvider, TtsRequest, TtsResult, VoiceCloneRequest, VoiceCloneResult } from "."

const API_KEY = process.env.ELEVENLABS_API_KEY ?? ""
const BASE = "https://api.elevenlabs.io/v1"
const MODEL = process.env.ELEVENLABS_MODEL ?? "eleven_multilingual_v2"
const COST_PER_1K_CHARS_MICROS = 300_000n // $0.30 / 1k chars

async function uploadAudio(buffer: ArrayBuffer, key: string, contentType: string): Promise<string> {
  if (!process.env.S3_ACCESS_KEY_ID || !process.env.S3_ENDPOINT) {
    return `data:${contentType};base64,${Buffer.from(buffer).toString("base64")}`
  }
  const { S3Client, PutObjectCommand } = await import("@aws-sdk/client-s3")
  const client = new S3Client({
    region: process.env.S3_REGION ?? "us-east-1",
    endpoint: process.env.S3_ENDPOINT,
    forcePathStyle: true,
    credentials: { accessKeyId: process.env.S3_ACCESS_KEY_ID!, secretAccessKey: process.env.S3_SECRET_ACCESS_KEY! },
  })
  const bucket = process.env.S3_BUCKET ?? "csr-media"
  await client.send(new PutObjectCommand({ Bucket: bucket, Key: key, Body: Buffer.from(buffer), ContentType: contentType, CacheControl: "public, max-age=86400" }))
  return `${(process.env.S3_PUBLIC_BASE ?? process.env.S3_FILE_URL ?? "").replace(/\/$/, "")}/${key}`
}

export const elevenLabsTts: TtsProvider = {
  id: "elevenlabs",
  async synthesize(req: TtsRequest): Promise<TtsResult> {
    if (!API_KEY) throw new IntegrationError("elevenlabs", "ELEVENLABS_API_KEY missing")
    const res = await fetch(`${BASE}/text-to-speech/${encodeURIComponent(req.voiceId)}?output_format=mp3_44100_128`, {
      method: "POST",
      headers: { "xi-api-key": API_KEY, "Content-Type": "application/json", Accept: "audio/mpeg" },
      body: JSON.stringify({
        text: req.text,
        model_id: MODEL,
        voice_settings: { stability: 0.4, similarity_boost: 0.85, style: 0.2, use_speaker_boost: true },
      }),
    })
    if (!res.ok) throw new IntegrationError("elevenlabs", `${res.status} ${await res.text()}`)
    const buffer = await res.arrayBuffer()
    const charCount = req.text.length
    const costMicros = (BigInt(charCount) * COST_PER_1K_CHARS_MICROS) / 1000n
    const durationMs = Math.round((buffer.byteLength / (128_000 / 8)) * 1000)
    const key = `tts/elevenlabs/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.mp3`
    const audioUrl = await uploadAudio(buffer, key, "audio/mpeg")
    return { audioUrl, durationMs, bytes: buffer.byteLength, costMicros }
  },
  async cloneVoice(req: VoiceCloneRequest): Promise<VoiceCloneResult> {
    if (!API_KEY) throw new IntegrationError("elevenlabs", "ELEVENLABS_API_KEY missing")
    const fd = new FormData()
    fd.append("name", req.name)
    if (req.description) fd.append("description", req.description)
    // Download sample URLs and attach as files
    for (let i = 0; i < req.sampleAudioUrls.length; i++) {
      const r = await fetch(req.sampleAudioUrls[i])
      if (!r.ok) continue
      const blob = await r.blob()
      fd.append("files", blob, `sample-${i}.mp3`)
    }
    const res = await fetch(`${BASE}/voices/add`, {
      method: "POST",
      headers: { "xi-api-key": API_KEY },
      body: fd as any,
    })
    if (!res.ok) {
      return { providerVoiceId: "", status: "failed", error: `${res.status} ${await res.text()}` }
    }
    const json = await res.json() as any
    return { providerVoiceId: json.voice_id, status: "ready" }
  },
}
