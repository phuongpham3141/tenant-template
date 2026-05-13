import { IntegrationError } from "../../../lib/errors"
import type { TtsProvider, TtsRequest, TtsResult } from "."

const COQUI_URL = process.env.COQUI_TTS_URL ?? "http://coqui-tts:5002"

export const coquiTts: TtsProvider = {
  id: "coqui",
  async synthesize(req: TtsRequest): Promise<TtsResult> {
    const res = await fetch(`${COQUI_URL}/api/tts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: req.text,
        speaker_id: req.voiceId,
        language_id: req.locale === "cn" ? "zh-cn" : req.locale,
        speed: req.speed ?? 1,
      }),
    })
    if (!res.ok) throw new IntegrationError("coqui", `${res.status} ${await res.text()}`)
    const buffer = await res.arrayBuffer()
    const durationMs = Math.round((buffer.byteLength / (44100 * 2)) * 1000)
    return {
      audioUrl: `data:audio/wav;base64,${Buffer.from(buffer).toString("base64")}`,
      durationMs,
      bytes: buffer.byteLength,
      costMicros: 0n, // self-hosted
    }
  },
}
