#!/usr/bin/env bash
set -euo pipefail
# Loads Medusa demo data + Payload sample pages.

cd "$(dirname "$0")/../../compose-dev"
echo "[1/2] Seeding Medusa..."
docker compose exec medusa-server npm run seed || echo "(medusa seed script not present yet)"

echo "[2/2] Seed Payload (manual via admin UI for now — no API seed)"
