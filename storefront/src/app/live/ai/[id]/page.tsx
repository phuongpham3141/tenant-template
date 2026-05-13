import { AiLivestreamPlayer } from "@/components/livestream/AiLivestreamPlayer"
import { AiChatBox } from "@/components/livestream/AiChatBox"
import { aiLivestreamApi } from "@/lib/sdk/ai-livestream"
import { cookies } from "next/headers"

type Locale = "vi" | "en" | "cn"

async function loadStreamMeta(streamId: string) {
  try {
    return await aiLivestreamApi.getAudioTracks(streamId)
  } catch {
    return null
  }
}

async function loadPersonaMeta(personaId: string | null, locale: Locale) {
  if (!personaId) return null
  const base = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL ?? "http://api.huayuesc.local"
  try {
    const res = await fetch(`${base}/store/ai-livestream/personas/${personaId}?locale=${locale}`, { next: { revalidate: 120, tags: [`persona:${personaId}`] } })
    if (!res.ok) return null
    return await res.json() as any
  } catch {
    return null
  }
}

export default async function AiLivestreamWatchPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const meta = await loadStreamMeta(id)
  const cookieJar = await cookies()
  const locale = (cookieJar.get("locale")?.value ?? cookieJar.get("csr_live_locale")?.value ?? "vi") as Locale
  const persona = meta?.persona_id ? await loadPersonaMeta(meta.persona_id, locale) : null

  if (!meta || meta.audio_tracks.length === 0) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-12 text-center">
        <h1 className="mb-4 text-2xl font-bold">AI Livestream chưa khả dụng</h1>
        <p className="text-slate-500">Stream đang khởi động hoặc đã kết thúc. Quay lại sau ít phút.</p>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-6">
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div>
          <AiLivestreamPlayer
            streamId={id}
            audioTracks={meta.audio_tracks.map((t) => ({ locale: t.locale, hls_url: t.hls_url, status: t.status }))}
            defaultLocale={locale}
            persona={persona ? {
              display_name: persona.display_name_i18n?.[locale] ?? persona.slug,
              description: persona.persona_description_i18n?.[locale],
              thumbnail_url: persona.avatar?.thumbnail_url,
              voice_style: persona.voice_style,
              catchphrase: (persona.catchphrases ?? [])[0],
            } : undefined}
          />
          <div className="mt-3 flex items-center justify-between text-sm text-slate-500">
            <span>Mode: <strong className="text-purple-600">{meta.mode ?? "—"}</strong></span>
            <span>Locales: {meta.locales_simulcast?.join(" · ") ?? "—"}</span>
          </div>
        </div>

        <aside>
          <AiChatBox
            streamId={id}
            locale={locale}
            personaName={persona ? persona.display_name_i18n?.[locale] ?? persona.slug : "AI Host"}
          />
        </aside>
      </div>
    </main>
  )
}
