import { spawn, type ChildProcess } from "child_process"
import { queryT, type TenantContext } from "../../lib/db/pg"
import type { Locale } from "./types"

/**
 * Simulcast mux: 1 master video timeline (from avatar lipsync renders) + N audio tracks per locale → N HLS outputs.
 *
 * Strategy:
 *   - FFmpeg input #1: master video pool (concat of avatar lipsync videos), no audio
 *   - FFmpeg input #N: per-locale audio (concat of TTS audio chunks for that locale)
 *   - Map each locale audio + master video → separate HLS output dir
 *   - Output: <stream_root>/<stream_id>/<locale>/playlist.m3u8
 *
 * Process supervision: 1 ffmpeg per stream, restart on exit.
 * Audio sync: each locale tracks its own offset_ms in stream_audio_track.
 */

export interface MuxConfig {
  streamId: string
  tenantId: string
  locales: Locale[]
  masterVideoFifo: string
  audioFifos: Record<Locale, string>
  hlsRoot: string
  segmentSeconds?: number
  playlistSize?: number
}

const ffmpegProcesses = new Map<string, ChildProcess>()

export function startMux(config: MuxConfig): { pid: number } {
  if (ffmpegProcesses.has(config.streamId)) {
    throw new Error(`Mux already running for stream ${config.streamId}`)
  }

  const segSec = config.segmentSeconds ?? 2
  const playlistSize = config.playlistSize ?? 6

  const args: string[] = [
    "-loglevel", "warning",
    "-re",
    "-i", config.masterVideoFifo,
  ]
  for (const locale of config.locales) {
    args.push("-i", config.audioFifos[locale])
  }

  for (let i = 0; i < config.locales.length; i++) {
    const locale = config.locales[i]
    const outDir = `${config.hlsRoot}/${config.streamId}/${locale}`
    args.push(
      "-map", "0:v", "-map", `${i + 1}:a`,
      "-c:v", "copy", "-c:a", "aac", "-ar", "48000", "-b:a", "128k",
      "-f", "hls",
      "-hls_time", String(segSec),
      "-hls_list_size", String(playlistSize),
      "-hls_flags", "delete_segments+independent_segments+omit_endlist",
      "-hls_segment_type", "fmp4",
      "-hls_segment_filename", `${outDir}/seg_%05d.m4s`,
      `${outDir}/playlist.m3u8`
    )
  }

  const proc = spawn("ffmpeg", args, { stdio: ["ignore", "pipe", "pipe"] })
  ffmpegProcesses.set(config.streamId, proc)

  proc.stderr.on("data", (chunk) => {
    if (process.env.MUX_DEBUG === "1") process.stderr.write(`[mux ${config.streamId}] ${chunk}`)
  })

  proc.on("exit", (code, sig) => {
    ffmpegProcesses.delete(config.streamId)
    console.warn(`mux ffmpeg exited stream=${config.streamId} code=${code} sig=${sig}`)
  })

  return { pid: proc.pid ?? 0 }
}

export function stopMux(streamId: string): boolean {
  const proc = ffmpegProcesses.get(streamId)
  if (!proc) return false
  proc.kill("SIGTERM")
  ffmpegProcesses.delete(streamId)
  return true
}

export function isMuxRunning(streamId: string): boolean {
  return ffmpegProcesses.has(streamId)
}

export async function publishHlsUrls(ctx: TenantContext, streamId: string, hlsBase: string, locales: Locale[]): Promise<void> {
  for (const locale of locales) {
    const url = `${hlsBase.replace(/\/$/, "")}/${streamId}/${locale}/playlist.m3u8`
    await queryT(
      ctx,
      `INSERT INTO live.stream_audio_track (
         id, tenant_id, stream_id, locale, hls_url, status, bitrate_kbps, created_at, updated_at
       ) VALUES (
         public.uuidv7(), $1, $2, $3, $4, 'active', 128, NOW(), NOW()
       )
       ON CONFLICT (stream_id, locale) DO UPDATE SET
         hls_url = EXCLUDED.hls_url, status = 'active', updated_at = NOW(), last_chunk_at = NOW()`,
      [ctx.tenantId, streamId, locale, url]
    )
  }
}
