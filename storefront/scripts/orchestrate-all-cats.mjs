// Sequential orchestrator: run remaining categories with strict gen+verify+retry.
// Logs to scripts/orchestrate.log (persistent, survives VM reboot).
// For each category:
//   1. Run gen-category.mjs
//   2. Wait + retry failures with concurrency=1
//   3. Move to next
//
// Usage: nohup node scripts/orchestrate-all-cats.mjs > /home/dev/projects/tenant-template/storefront/scripts/orchestrate.log 2>&1 &

import { spawn } from "node:child_process";
import fs from "node:fs/promises";
import { createWriteStream } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const LOG_DIR = path.join(ROOT, "scripts");
await fs.mkdir(LOG_DIR, { recursive: true });

// Categories already done — skip
const DONE = new Set([
  "home-garden", "construction-materials", "bathroom-sanitary",
  "noi-that", "kitchen-equipment", "lighting",
  "doors-windows", "hotel-supplies", "hardware-tools",
]);

// All categories in order
const CATEGORIES = [
  "decoration",
  "outdoor-garden",
  "electrical",
];

function ts() { return new Date().toISOString(); }
function log(msg) { console.log(`[${ts()}] ${msg}`); }

async function runCmd(args, logFile) {
  return new Promise((resolve, reject) => {
    const out = createWriteStream(logFile, { flags: "a" });
    const child = spawn("node", args, { cwd: ROOT });
    child.stdout.pipe(out);
    child.stderr.pipe(out);
    child.on("close", (code) => resolve(code));
    child.on("error", reject);
  });
}

async function processCategory(cat) {
  if (DONE.has(cat)) { log(`SKIP ${cat} (already done)`); return; }
  log(`========================================`);
  log(`Starting category: ${cat}`);
  log(`========================================`);

  const mainLog = path.join(LOG_DIR, `cat-${cat}.log`);
  await fs.writeFile(mainLog, ""); // truncate

  // Phase 1: initial gen
  log(`[${cat}] Phase 1: initial gen (concurrency=2)`);
  const code1 = await runCmd(["scripts/gen-category.mjs", `--category=${cat}`, "--concurrency=2"], mainLog);
  log(`[${cat}] Phase 1 exit code ${code1}`);

  // Find failures by parsing log
  let failedSlugs = [];
  try {
    const logTxt = await fs.readFile(mainLog, "utf8");
    const matches = [...logTxt.matchAll(/✗ (cat\d+(?:-[a-z0-9-]+)?)/g)];
    failedSlugs = [...new Set(matches.map(m => m[1]))];
  } catch {}

  if (failedSlugs.length === 0) {
    log(`[${cat}] No failures, done.`);
    return;
  }

  // Phase 2: retry failures with pause
  log(`[${cat}] Phase 2: retry ${failedSlugs.length} failures after 60s pause`);
  await new Promise(r => setTimeout(r, 60000));

  const retryLog = path.join(LOG_DIR, `cat-${cat}-retry.log`);
  await fs.writeFile(retryLog, "");
  const code2 = await runCmd([
    "scripts/gen-category.mjs",
    `--category=${cat}`,
    "--concurrency=1",
    `--only=${failedSlugs.join(",")}`
  ], retryLog);
  log(`[${cat}] Phase 2 exit code ${code2}`);

  // Phase 3: check final failures
  let stillFailed = [];
  try {
    const logTxt = await fs.readFile(retryLog, "utf8");
    const matches = [...logTxt.matchAll(/✗ (cat\d+(?:-[a-z0-9-]+)?)/g)];
    stillFailed = [...new Set(matches.map(m => m[1]))];
  } catch {}

  if (stillFailed.length) {
    log(`[${cat}] FINAL FAILURES (accepted): ${stillFailed.join(",")}`);
  } else {
    log(`[${cat}] All retries passed!`);
  }
}

// ============== MAIN LOOP ==============
log(`Orchestrator starting for ${CATEGORIES.length} categories`);
for (const cat of CATEGORIES) {
  try {
    await processCategory(cat);
  } catch (e) {
    log(`[${cat}] ERROR: ${e.message}`);
  }
}
log(`========================================`);
log(`ALL DONE`);
log(`========================================`);
