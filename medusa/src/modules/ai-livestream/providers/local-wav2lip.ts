import { IntegrationError } from "../../../lib/errors"
import type { AvatarProvider, AvatarRenderRequest, AvatarRenderResult } from "."

const WAV2LIP_URL = process.env.WAV2LIP_URL ?? "http://wav2lip:8500"

export const wav2lipAvatar: AvatarProvider = {
  id: "local_wav2lip",
  supportsRealtime: false,
  async render(req: AvatarRenderRequest): Promise<AvatarRenderResult> {
    const res = await fetch(`${WAV2LIP_URL}/lipsync`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        base_video_url: req.providerAssetId,
        audio_url: req.audioUrl,
        face_det_batch_size: 16,
        pads: [0, 10, 0, 0],
        resize_factor: req.resolution === "720p" ? 1 : 2,
      }),
    })
    if (!res.ok) throw new IntegrationError("wav2lip", `${res.status} ${await res.text()}`)
    const json = await res.json() as any
    return {
      videoUrl: json.output_url,
      durationMs: req.audioDurationMs,
      frameCount: Math.round((req.audioDurationMs / 1000) * 25),
      costMicros: 0n, // self-hosted (GPU time accounted separately)
      gpuSeconds: json.gpu_seconds ?? Math.round(req.audioDurationMs / 1000) * 2,
    }
  },
}
