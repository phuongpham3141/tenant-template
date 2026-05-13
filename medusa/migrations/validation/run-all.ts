/**
 * Validation runner with structured JSON output.
 * Usage:
 *   DATABASE_URL=postgres://... npx tsx run-all.ts
 *   DATABASE_URL=postgres://... npx tsx run-all.ts --json > report.json
 */
import { readdirSync, readFileSync } from "node:fs"
import path from "node:path"
import { Client } from "pg"

interface CheckResult {
  check: string
  description: string
  rows: any[]
  ok: boolean
  durationMs: number
  error?: string
}

async function main() {
  const conn = process.env.DATABASE_URL
  if (!conn) {
    console.error("DATABASE_URL required")
    process.exit(1)
  }
  const jsonMode = process.argv.includes("--json")
  const dir = path.resolve(__dirname)
  const files = readdirSync(dir).filter((f) => /^0\d_.+\.sql$/.test(f)).sort()

  const client = new Client({ connectionString: conn })
  await client.connect()

  const results: CheckResult[] = []
  for (const f of files) {
    const sql = readFileSync(path.join(dir, f), "utf-8")
    const description = sql.split("\n")
      .filter((l) => l.startsWith("-- "))
      .slice(0, 3)
      .map((l) => l.slice(3))
      .join(" ")
      .trim()
    const t0 = Date.now()
    const result: CheckResult = {
      check: f,
      description: description || f,
      rows: [],
      ok: true,
      durationMs: 0,
    }
    try {
      // Split SQL by ;\n then run each statement; collect ALL row results
      // For \echo and DO blocks just execute as a whole batch.
      const batchResult = await client.query(sql)
      if (Array.isArray(batchResult)) {
        for (const r of batchResult) {
          if (r.rows && r.rows.length > 0) result.rows.push(...r.rows)
        }
      } else if (batchResult.rows && batchResult.rows.length > 0) {
        result.rows.push(...batchResult.rows)
      }
    } catch (err: any) {
      result.ok = false
      result.error = err.message
    }
    result.durationMs = Date.now() - t0
    results.push(result)
  }
  await client.end()

  if (jsonMode) {
    console.log(JSON.stringify({
      generatedAt: new Date().toISOString(),
      database: conn.replace(/:[^@]+@/, ":***@"),
      checks: results,
      summary: {
        total: results.length,
        passed: results.filter((r) => r.ok && r.rows.length === 0).length,
        findings: results.filter((r) => r.ok && r.rows.length > 0).length,
        errors: results.filter((r) => !r.ok).length,
      },
    }, null, 2))
    return
  }

  console.log("════════════════════════════════════════════════════════════")
  console.log("  Cybersilkroads DB Validation Report")
  console.log(`  ${new Date().toISOString()}`)
  console.log("════════════════════════════════════════════════════════════\n")

  for (const r of results) {
    const icon = !r.ok ? "❌" : r.rows.length === 0 ? "✅" : "⚠️ "
    console.log(`${icon} ${r.check}  (${r.durationMs}ms)`)
    console.log(`   ${r.description}`)
    if (r.error) console.log(`   ERROR: ${r.error}`)
    else if (r.rows.length > 0) console.log(`   Findings: ${r.rows.length} row(s)`)
    console.log()
  }

  const passed = results.filter((r) => r.ok && r.rows.length === 0).length
  const findings = results.filter((r) => r.ok && r.rows.length > 0).length
  const errors = results.filter((r) => !r.ok).length
  console.log(`Summary: ${passed} clean / ${findings} with findings / ${errors} errored`)
  process.exit(errors > 0 ? 1 : 0)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
