"use client"

type Locale = "vi" | "en" | "cn"

const LABELS: Record<Locale, string> = { vi: "Tiếng Việt", en: "English", cn: "中文" }
const FLAGS: Record<Locale, string> = { vi: "🇻🇳", en: "🇬🇧", cn: "🇨🇳" }

interface Props {
  available: Locale[]
  current: Locale
  onSwitch: (locale: Locale) => void
  className?: string
}

export function AudioTrackSwitcher({ available, current, onSwitch, className = "" }: Props) {
  if (available.length <= 1) return null
  return (
    <div className={`flex items-center gap-1 rounded-lg bg-black/70 px-2 py-1 backdrop-blur ${className}`}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/80" aria-hidden>
        <path d="M3 18v-6a9 9 0 0 1 18 0v6" /><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
      </svg>
      {available.map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => onSwitch(loc)}
          aria-pressed={current === loc}
          aria-label={`Switch audio to ${LABELS[loc]}`}
          className={`flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium transition ${
            current === loc ? "bg-white text-slate-900" : "text-white/80 hover:bg-white/10"
          }`}
        >
          <span aria-hidden>{FLAGS[loc]}</span>
          <span>{loc.toUpperCase()}</span>
        </button>
      ))}
    </div>
  )
}
