import Link from "next/link"
import { api } from "@/lib/api/client"
import { requireSupplier } from "@/lib/auth/guards"

async function loadDashboard(supplierId: string) {
  try {
    const [personas, scripts, schedules, ledger] = await Promise.all([
      api<{ personas: any[] }>(`/admin/ai-livestream/personas?supplier_id=${supplierId}&limit=20`),
      api<{ scripts: any[] }>(`/admin/ai-livestream/scripts?limit=20`),
      api<{ schedules: any[] }>(`/admin/ai-livestream/schedules`),
      api<{ monthly_quota: any; rollup: any[] }>(`/admin/ai-livestream/ledger`),
    ])
    return { personas: personas.personas, scripts: scripts.scripts, schedules: schedules.schedules, ledger }
  } catch {
    return { personas: [], scripts: [], schedules: [], ledger: null as any }
  }
}

export default async function SellerAiLivestreamDashboard() {
  const session = await requireSupplier()
  const supplierId = session.supplierId ?? ""
  const { personas, scripts, schedules, ledger } = await loadDashboard(supplierId)
  const quota = ledger?.monthly_quota

  return (
    <main className="mx-auto max-w-7xl px-4 py-6">
      <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">AI Livestream</h1>
        <div className="flex gap-2">
          <Link href="/seller-center/ai-livestream/personas/new" className="rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700">+ Persona</Link>
          <Link href="/seller-center/ai-livestream/scripts/new" className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800">+ Script</Link>
        </div>
      </header>

      {quota && (
        <section className="mb-6 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-semibold">GPU quota this month</span>
            <span className={quota.is_approaching_limit ? "text-orange-600" : "text-slate-500"}>{quota.percent_used}% used</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
            <div
              className={`h-full transition-all ${quota.is_over_quota ? "bg-red-500" : quota.is_approaching_limit ? "bg-orange-500" : "bg-emerald-500"}`}
              style={{ width: `${Math.min(quota.percent_used, 100)}%` }}
            />
          </div>
          {quota.is_over_quota && <p className="mt-2 text-sm text-red-600">⚠️ Quota exceeded — streams have been paused. Upgrade plan to resume.</p>}
        </section>
      )}

      <section className="mb-8">
        <h2 className="mb-3 text-lg font-semibold">Personas ({personas.length})</h2>
        {personas.length === 0 ? (
          <p className="text-sm text-slate-500">Chưa có persona nào — tạo persona đầu tiên để bắt đầu.</p>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {personas.map((p) => (
              <Link
                key={p.id}
                href={`/seller-center/ai-livestream/personas/${p.id}`}
                className="rounded-lg border border-slate-200 p-3 transition hover:border-purple-400 dark:border-slate-700"
              >
                <div className="flex items-center gap-2">
                  <div className="font-medium">{p.display_name_i18n?.vi ?? p.slug}</div>
                  <span className={`rounded-full px-1.5 py-0.5 text-xs ${p.status === "active" ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-600"}`}>{p.status}</span>
                </div>
                <div className="mt-1 text-xs text-slate-500">{p.voice_style} · {p.supported_locales?.join(", ")}</div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-lg font-semibold">Scripts ({scripts.length})</h2>
        <div className="rounded-lg border border-slate-200 dark:border-slate-700">
          {scripts.map((s) => (
            <div key={s.id} className="border-b border-slate-200 p-3 last:border-0 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <Link href={`/seller-center/ai-livestream/scripts/${s.id}`} className="font-medium hover:text-purple-600">{s.name}</Link>
                <span className="text-xs text-slate-500">{s.status} · v{s.version} · ~{Math.round((s.total_duration_estimate_seconds ?? 0) / 60)}min</span>
              </div>
              {s.description && <p className="mt-1 text-xs text-slate-500">{s.description}</p>}
            </div>
          ))}
          {scripts.length === 0 && <p className="p-4 text-sm text-slate-500">Chưa có script.</p>}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold">24/7 Schedules ({schedules.length})</h2>
        {schedules.length === 0 ? (
          <p className="text-sm text-slate-500">Chưa lên lịch 24/7 — tạo schedule để stream tự chạy.</p>
        ) : (
          <ul className="space-y-2">
            {schedules.map((s) => (
              <li key={s.id} className="flex items-center justify-between rounded-md border border-slate-200 px-3 py-2 dark:border-slate-700">
                <span>Stream <code className="text-xs">{s.stream_id.slice(0, 8)}</code> · {s.schedule_type} · {s.script_ids?.length ?? 0} scripts</span>
                <span className={s.paused ? "text-red-500" : "text-green-600"}>{s.paused ? `Paused (${s.pause_reason ?? ""})` : "Active"}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}
