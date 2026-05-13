"use client"

interface Props {
  displayName: string
  description?: string
  thumbnailUrl?: string
  voiceStyle?: string
  catchphrase?: string
  className?: string
}

export function AiPersonaCard({ displayName, description, thumbnailUrl, voiceStyle, catchphrase, className = "" }: Props) {
  return (
    <div className={`flex items-center gap-3 rounded-lg bg-black/60 px-3 py-2 text-white backdrop-blur ${className}`}>
      {thumbnailUrl ? (
        <img src={thumbnailUrl} alt={displayName} className="h-10 w-10 rounded-full object-cover ring-2 ring-purple-500" />
      ) : (
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-700 text-sm font-bold">
          {displayName.slice(0, 2).toUpperCase()}
        </div>
      )}
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center gap-1.5">
          <span className="truncate text-sm font-semibold">{displayName}</span>
          <span className="rounded-full bg-purple-600 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide" aria-label="AI host">AI</span>
        </div>
        {(description || catchphrase) && (
          <span className="truncate text-xs text-white/70">{catchphrase ?? description}</span>
        )}
        {voiceStyle && <span className="text-[10px] text-white/50">{voiceStyle.replace(/_/g, " ")}</span>}
      </div>
    </div>
  )
}
