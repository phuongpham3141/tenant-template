// Retry all accepted-failures from previous orchestrator runs.
// Delete existing bad jpg files first so vision strict verify reruns gen.

import { spawn } from "node:child_process";
import { createWriteStream } from "node:fs";
import fs from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const IMG_DIR = path.join(ROOT, "public", "img");

// Failures grouped by category
const FAILS = {
  "noi-that":               ["cat44", "cat66", "cat70", "cat84"],
  "kitchen-equipment":      ["cat4-s4-1", "cat4-s7-3", "cat4-s8-0", "cat4-s8-2", "cat4-s8-3", "cat4-s8-4"],
  "lighting":               ["cat5-10", "cat5-s1-2", "cat5-s3-7", "cat5-s8-5"],
  "doors-windows":          ["cat6-1", "cat6-6", "cat6-s1-0", "cat6-s1-2", "cat6-s1-4", "cat6-s2-0", "cat6-s3-0", "cat6-s5-4"],
  "hotel-supplies":         ["cat7-s6-5", "cat7-s8-0", "cat7-s8-1", "cat7-s8-2", "cat7-s8-5", "cat7-s8-6", "cat7-s8-7"],
  "hardware-tools":         ["cat8-5", "cat8-s4-1", "cat8-s6-1", "cat8-s6-4", "cat8-s6-7", "cat8-s7-0", "cat8-s7-1", "cat8-s7-2", "cat8-s7-3", "cat8-s7-4", "cat8-s7-5", "cat8-s7-6", "cat8-s7-7", "cat8-s8-0", "cat8-s8-1", "cat8-s8-2", "cat8-s8-3", "cat8-s8-4", "cat8-s8-5", "cat8-s8-6", "cat8-s8-7"],
  "decoration":             ["cat9-s8-6"],
  "outdoor-garden":         ["cat10-s7-0"],
  "electrical":             ["cat11-s2-6"],
};

function ts() { return new Date().toISOString(); }
function log(m) { console.log(`[${ts()}] ${m}`); }

async function runCmd(args, logFile) {
  return new Promise((resolve) => {
    const out = createWriteStream(logFile, { flags: "a" });
    const child = spawn("node", args, { cwd: ROOT });
    child.stdout.pipe(out);
    child.stderr.pipe(out);
    child.on("close", (code) => resolve(code));
  });
}

for (const [cat, slugs] of Object.entries(FAILS)) {
  log(`===== ${cat}: ${slugs.length} retries =====`);
  // Delete existing jpg files to force regen
  for (const s of slugs) {
    try { await fs.unlink(path.join(IMG_DIR, `${s}.jpg`)); } catch {}
  }
  const logFile = path.join(ROOT, "scripts", `retry-${cat}.log`);
  await fs.writeFile(logFile, "");
  const code = await runCmd([
    "scripts/gen-category.mjs",
    `--category=${cat}`,
    "--concurrency=2",
    `--only=${slugs.join(",")}`
  ], logFile);
  log(`[${cat}] retry exit code ${code}`);
  await new Promise(r => setTimeout(r, 5000)); // brief pause between categories
}

log(`========== ALL RETRIES DONE ==========`);
