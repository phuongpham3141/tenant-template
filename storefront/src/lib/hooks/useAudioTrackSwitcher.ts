"use client"

import { useCallback, useEffect, useRef, useState } from "react"

type Locale = "vi" | "en" | "cn"

interface UseAudioTrackSwitcherOpts {
  defaultLocale?: Locale
  onSwitch?: (locale: Locale) => void
}

interface AudioTrackInfo {
  id: number
  language?: string
  name?: string
}

/**
 * Bind to an HLS.js instance and expose locale-aware audio track switching.
 *
 * Two modes supported:
 *  1. Multi-audio-track HLS (single master.m3u8 with N audio renditions) → use hls.audioTracks API
 *  2. Separate-playlist mode (1 playlist per locale) → swap hls.loadSource on switch
 */
export function useAudioTrackSwitcher(opts: UseAudioTrackSwitcherOpts = {}) {
  const [currentLocale, setCurrentLocale] = useState<Locale>(opts.defaultLocale ?? "vi")
  const [available, setAvailable] = useState<Locale[]>([])
  const hlsRef = useRef<any>(null)
  const playlistMapRef = useRef<Partial<Record<Locale, string>>>({})

  const bindHls = useCallback((hls: any) => {
    hlsRef.current = hls
    if (hls?.audioTracks?.length > 0) {
      const tracks: AudioTrackInfo[] = hls.audioTracks
      const locales: Locale[] = []
      for (const t of tracks) {
        const lang = (t.language ?? t.name ?? "").toLowerCase().slice(0, 2)
        if (["vi", "en", "cn"].includes(lang) && !locales.includes(lang as Locale)) {
          locales.push(lang as Locale)
        }
      }
      setAvailable(locales)
    }
  }, [])

  const registerPlaylists = useCallback((map: Partial<Record<Locale, string>>) => {
    playlistMapRef.current = map
    setAvailable(Object.keys(map) as Locale[])
  }, [])

  const switchTo = useCallback((locale: Locale) => {
    const hls = hlsRef.current
    if (hls?.audioTracks?.length > 0) {
      const idx = hls.audioTracks.findIndex((t: AudioTrackInfo) =>
        (t.language ?? t.name ?? "").toLowerCase().startsWith(locale)
      )
      if (idx >= 0) {
        hls.audioTrack = idx
        setCurrentLocale(locale)
        opts.onSwitch?.(locale)
        return
      }
    }
    const playlistUrl = playlistMapRef.current[locale]
    if (playlistUrl && hls?.loadSource) {
      const currentTime = hls.media?.currentTime ?? 0
      hls.loadSource(playlistUrl)
      hls.on?.("hlsManifestParsed", () => {
        if (hls.media) hls.media.currentTime = currentTime
      })
      setCurrentLocale(locale)
      opts.onSwitch?.(locale)
    }
  }, [opts])

  useEffect(() => {
    document.cookie = `csr_live_locale=${currentLocale}; path=/; max-age=31536000; samesite=lax`
  }, [currentLocale])

  return { currentLocale, available, bindHls, registerPlaylists, switchTo }
}
