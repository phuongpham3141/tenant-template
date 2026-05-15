#!/usr/bin/env bash
# Run all validation checks and produce a single report.
# Usage:
#   DATABASE_URL=postgres://... bash run-all.sh
#   DATABASE_URL=postgres://... bash run-all.sh > validation-report.txt
set -uo pipefail

PG_CONN="${DATABASE_URL:?DATABASE_URL required}"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
TS="$(date -u +%Y%m%d-%H%M%S)"

echo "════════════════════════════════════════════════════════════"
echo "  Cybersilkroads DB Validation Report"
echo "  Timestamp: ${TS}"
echo "  Connection: ${PG_CONN//:*@/:***@}"
echo "════════════════════════════════════════════════════════════"
echo

for sql in "$SCRIPT_DIR"/0*.sql; do
  echo
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "  Running: $(basename "$sql")"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  psql "$PG_CONN" -v ON_ERROR_STOP=0 --pset=pager=off -f "$sql"
done

echo
echo "════════════════════════════════════════════════════════════"
echo "  Validation complete."
echo "  Review output above. Any non-empty result sets indicate"
echo "  issues to investigate (not necessarily bugs)."
echo "════════════════════════════════════════════════════════════"
