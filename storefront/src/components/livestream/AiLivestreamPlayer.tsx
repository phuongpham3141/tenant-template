"use client"

import { useEffect, useRef, useState } from "react"
import { AudioTrackSwitcher } from "./AudioTrackSwitcher"
import { AiPersonaCard } from "./AiPersonaCard"
import { TranscriptOverlay } from "./TranscriptOverlay"
import { useAudioTrackSwitcher } from "@/lib/hooks/useAudioTrackSwitcher"

type Locale = "vi" | "en" | "cn"

interface PersonaProps {
  display_name: string
  description?: string
  thumbnail_url?: string
  voice_style?: string
  catchphrase?: string
}

interface Props {
  streamId: string
  audioTracks: Array<{ locale: Locale; hls_url: string; status: string }>
  defaultLocale?: Locale
  persona?: PersonaProps
  showTranscript?: boolean
  className?: string
}

export function AiLivestreamPlayer({ streamId, audioTracks, defaultLocale = "vi", persona, showTranscript = true, className = "" }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [transcript, setTranscript] = useState<Array<{ id: string; text: string; locale: Locale; at: number }>>([])
  const { currentLocale, available, bindHls, registerPlaylists, switchTo } = useAudioTrackSwitcher({ defaultLocale })

  useEffect(() => {
    const map = Object.fromEntries(audioTracks.map((t) => [t.locale, t.hls_url])) as Partial<Record<Locale, string>>
    registerPlaylists(map)
  }, [audioTracks, registerPlaylists])

  useEffect(() => {
    const playlistUrl = audioTracks.find((t) => t.locale === currentLocale)?.hls_url
    const video = videoRef.current
    if (!playlistUrl || !video) return

    let hls: any
    let cancelled = false

    ;(async () => {
      const isNativeHls = video.canPlayType("application/vnd.apple.mpegurl") !== ""
      if (isNativeHls) {
        video.src = playlistUrl
      } else {
        const { default: Hls } = await import("hls.js")
        if (cancelled) return
        if (Hls.isSupported()) {
          hls = new Hls({ liveSyncDuration: 4, liveMaxLatencyDuration: 8 })
          hls.loadSource(playlistUrl)
          hls.attachMedia(video)
          bindHls(hls)
        } else {
          video.src = playlistUrl
        }
      }
    })()

    return () => {
      cancelled = true
      if (hls) hls.destroy()
    }
  }, [currentLocale, audioTracks, bindHls])

  return (
    <div className={`relative aspect-video w-full overflow-hidden rounded-lg bg-black ${className}`}>
      <video ref={videoRef} controls autoPlay playsInline muted className="h-full w-full object-contain" />

      {persona && (
        <div className="absolute left-3 top-3 z-10 max-w-sm">
          <AiPersonaCard
            displayName={persona.display_name}
            description={persona.description}
            thumbnailUrl={persona.thumbnail_url}
            voiceStyle={persona.voice_style}
            catchphrase={persona.catchphrase}
          />
        </div>
      )}

      <div className="absolute right-3 top-3 z-10">
        <AudioTrackSwitcher
          available={available.length > 0 ? available : audioTracks.map((t) => t.locale)}
          current={currentLocale}
          onSwitch={switchTo}
        />
      </div>

      <TranscriptOverlay lines={transcript} currentLocale={currentLocale} show={showTranscript} />

      <div className="pointer-events-none absolute right-3 bottom-3 z-10 flex items-center gap-2 rounded-full bg-red-600/90 px-3 py-1 text-xs font-bold text-white">
        <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
        LIVE
      </div>
    </div>
  )
}
