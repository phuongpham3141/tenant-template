"use client"

interface TranscriptLine {
  id: string
  text: string
  locale: "vi" | "en" | "cn"
  at: number
}

interface Props {
  lines: TranscriptLine[]
  currentLocale: "vi" | "en" | "cn"
  show: boolean
  className?: string
}

export function TranscriptOverlay({ lines, currentLocale, show, className = "" }: Props) {
  if (!show || lines.length === 0) return null
  const filtered = lines.filter((l) => l.locale === currentLocale).slice(-3)
  if (filtered.length === 0) return null
  const latest = filtered[filtered.length - 1]
  return (
    <div className={`pointer-events-none absolute inset-x-0 bottom-16 z-20 flex justify-center px-4 ${className}`}>
      <div className="max-w-2xl rounded-md bg-black/75 px-4 py-2 text-center text-base leading-snug text-white shadow-lg">
        {latest.text}
      </div>
    </div>
  )
}
