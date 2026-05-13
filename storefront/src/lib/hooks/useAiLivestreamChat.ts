"use client"

import { useCallback, useState } from "react"
import { aiLivestreamApi } from "@/lib/sdk/ai-livestream"

type Locale = "vi" | "en" | "cn"

export interface ChatLine {
  id: string
  role: "user" | "ai" | "system"
  text: string
  locale: Locale
  at: number
  status?: "pending" | "sent" | "answered" | "failed"
}

export function useAiLivestreamChat(streamId: string, defaultLocale: Locale = "vi") {
  const [lines, setLines] = useState<ChatLine[]>([])
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const send = useCallback(async (message: string, locale: Locale = defaultLocale) => {
    const trimmed = message.trim()
    if (!trimmed) return
    const localId = `local-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
    setLines((l) => [...l, { id: localId, role: "user", text: trimmed, locale, at: Date.now(), status: "pending" }])
    setSending(true)
    setError(null)
    try {
      await aiLivestreamApi.sendChat(streamId, { message: trimmed, locale })
      setLines((l) => l.map((line) => line.id === localId ? { ...line, status: "sent" } : line))
    } catch (e: any) {
      setError(e)
      setLines((l) => l.map((line) => line.id === localId ? { ...line, status: "failed" } : line))
    } finally {
      setSending(false)
    }
  }, [streamId, defaultLocale])

  const appendAi = useCallback((text: string, locale: Locale) => {
    setLines((l) => [...l, { id: `ai-${Date.now()}`, role: "ai", text, locale, at: Date.now() }])
  }, [])

  return { lines, send, sending, error, appendAi }
}
