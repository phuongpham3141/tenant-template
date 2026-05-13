import { readdirSync, readFileSync } from "node:fs"
import path from "node:path"
import { Client } from "pg"

async function main() {
  const conn = process.env.DATABASE_URL ?? "postgres://medusa:medusa@localhost:5432/medusa"
  const client = new Client({ connectionString: conn })
  await client.connect()
  console.log("Connected to", conn.replace(/:[^@]+@/, ":***@"))

  const seedDir = path.resolve(__dirname, "..")
  const phases: Array<{ name: string; dir: string; enabled: boolean }> = [
    { name: "masters", dir: "masters", enabled: true },
    { name: "prompts", dir: "prompts", enabled: true },
    { name: "sample", dir: "sample", enabled: process.env.SEED_SAMPLES !== "0" },
  ]

  for (const phase of phases) {
    if (!phase.enabled) continue
    const phaseDir = path.join(seedDir, phase.dir)
    const files = readdirSync(phaseDir).filter((f) => f.endsWith(".sql")).sort()
    console.log(`\n=== Phase: ${phase.name} (${files.length} files) ===`)
    for (const f of files) {
      const sql = readFileSync(path.join(phaseDir, f), "utf-8")
      console.log(`  applying ${f}`)
      try {
        await client.query(sql)
      } catch (err: any) {
        console.error(`  FAILED ${f}: ${err.message}`)
        throw err
      }
    }
  }

  await client.end()
  console.log("\nSeed complete.")
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
