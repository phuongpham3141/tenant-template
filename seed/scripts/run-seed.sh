#!/usr/bin/env bash
# Run all seed SQL files in order against the configured PG.
set -euo pipefail

PG_CONN="${DATABASE_URL:-postgres://medusa:medusa@localhost:5432/medusa}"
SEED_DIR="$(cd "$(dirname "$0")/.." && pwd)"

echo "Seeding masters..."
for f in "$SEED_DIR"/masters/*.sql; do
  echo "  applying $(basename "$f")"
  psql "$PG_CONN" -f "$f"
done

echo "Seeding prompts..."
for f in "$SEED_DIR"/prompts/*.sql; do
  echo "  applying $(basename "$f")"
  psql "$PG_CONN" -f "$f"
done

if [ "${SEED_SAMPLES:-1}" = "1" ]; then
  echo "Seeding sample data..."
  for f in "$SEED_DIR"/sample/*.sql; do
    echo "  applying $(basename "$f")"
    psql "$PG_CONN" -f "$f"
  done
fi

echo "Seed complete."
