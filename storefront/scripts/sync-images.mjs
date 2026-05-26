// Periodic sync: pull state JSON + new images from VM to Windows categorized backup.
// Run from Windows: node scripts/sync-images.mjs

import { execSync } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";

const STATE_FILE = "c:/install-medusa-dev/tenant-template/storefront/scripts/pipeline-state.json";
const IMAGES_ROOT = "c:/install-medusa-dev/GiaoDien/images";

// 1. Pull state file
try {
  execSync(`scp -q medusa-dev:/home/dev/projects/tenant-template/storefront/scripts/pipeline-state.json "${STATE_FILE}"`);
} catch (e) { console.error("state pull:", e.message.slice(0, 100)); }

let state;
try { state = JSON.parse(await fs.readFile(STATE_FILE, "utf8")); } catch { state = { categories: {} }; }

// 2. For each category, ensure folder + pull new images
let pulled = 0;
for (const [catKey, cat] of Object.entries(state.categories || {})) {
  const folder = path.join(IMAGES_ROOT, cat.folder);
  await fs.mkdir(folder, { recursive: true });
  for (const it of cat.items || []) {
    if (it.status === "failed") continue;
    const localPath = path.join(folder, `${it.slug}.jpg`);
    try {
      await fs.access(localPath);
      continue; // already have
    } catch {}
    try {
      execSync(`scp -q medusa-dev:/home/dev/projects/tenant-template/storefront/public/img/${it.slug}.jpg "${localPath}"`, { stdio: "ignore" });
      pulled++;
    } catch {}
  }
}

console.log(`Pulled ${pulled} new images into category folders`);
