"use client"

import { useState, useRef, useEffect } from "react"
import { useAiLivestreamChat, type ChatLine } from "@/lib/hooks/useAiLivestreamChat"

type Locale = "vi" | "en" | "cn"

interface Props {
  streamId: string
  locale: Locale
  personaName?: string
  className?: string
}

const PLACEHOLDER: Record<Locale, string> = {
  vi: "Hỏi AI host bất cứ điều gì…",
  en: "Ask the AI host anything…",
  cn: "向 AI 主播提问…",
}
const SEND_LABEL: Record<Locale, string> = { vi: "Gửi", en: "Send", cn: "发送" }

export function AiChatBox({ streamId, locale, personaName = "AI Host", className = "" }: Props) {
  const { lines, send, sending } = useAiLivestreamChat(streamId, locale)
  const [input, setInput] = useState("")
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
  }, [lines])

  return (
    <div className={`flex flex-col rounded-lg border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-950 ${className}`}>
      <header className="border-b border-slate-200 px-3 py-2 text-sm font-semibold dark:border-slate-700">
        💬 {personaName} · AI Chat
      </header>

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-3 py-2" style={{ maxHeight: 320 }}>
        {lines.length === 0 && (
          <p className="text-center text-xs text-slate-400 py-6">
            {locale === "vi" ? "Hỏi gì đó để bắt đầu" : locale === "cn" ? "提问以开始对话" : "Ask something to start"}
          </p>
        )}
        {lines.map((line) => <ChatLineRow key={line.id} line={line} />)}
      </div>

      <form
        onSubmit={(e) => { e.preventDefault(); if (!sending) { void send(input); setInput("") } }}
        className="flex items-center gap-2 border-t border-slate-200 p-2 dark:border-slate-700"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          maxLength={280}
          placeholder={PLACEHOLDER[locale]}
          className="flex-1 rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
        />
        <button
          type="submit"
          disabled={sending || !input.trim()}
          className="rounded-md bg-purple-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-purple-700 disabled:bg-slate-300"
        >
          {SEND_LABEL[locale]}
        </button>
      </form>
    </div>
  )
}

function ChatLineRow({ line }: { line: ChatLine }) {
  const isUser = line.role === "user"
  return (
    <div className={`mb-2 flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[80%] rounded-2xl px-3 py-1.5 text-sm ${
        isUser ? "bg-blue-600 text-white" : line.role === "ai" ? "bg-purple-100 text-purple-900 dark:bg-purple-900 dark:text-purple-100" : "bg-slate-100 text-slate-700"
      }`}>
        {line.text}
        {line.status === "pending" && <span className="ml-1 opacity-50">…</span>}
        {line.status === "failed" && <span className="ml-1 text-red-300" title="Failed">⚠️</span>}
      </div>
    </div>
  )
}
