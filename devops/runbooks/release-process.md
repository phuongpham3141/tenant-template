# Release Process

## Cadence
- **Production**: every Tuesday & Thursday 10:00 ICT (off-peak)
- **Hotfix**: any time, requires 2-person review
- **Staging**: continuous on every `main` push

## Pre-release checklist
- [ ] All migrations idempotent and tested on staging
- [ ] No `--no-verify` / `--no-gpg-sign` bypasses in commit history of release range
- [ ] CI green on the release SHA
- [ ] Smoke test in staging completed within last 24h
- [ ] Change log written and posted in `#csr-releases`
- [ ] Rollback plan documented in PR description

## Cut release
```bash
git tag v$(date -u +%Y.%m.%d.%H%M) -m "release"
git push origin --tags
```

## Deploy
1. Trigger `Deploy` workflow in GitHub Actions with `env=production` and the tag.
2. Watch `kubectl -n csr rollout status` for each service.
3. Verify Grafana metrics stable for 15 min.
4. Cancel rollout if 5xx > 0.5% sustained.

## Database migrations
- All `XX_*.sql` files in `medusa/migrations/` apply idempotently. CI verifies on staging.
- Long-running migrations: split into pre/post-deploy. Mark in `migration_log.notes`.
- Seed updates: re-apply `seed/masters/*.sql` (idempotent via `ON CONFLICT DO UPDATE`).

## Communication
- T-1h: post planned-deploy notice in `#csr-status`
- T-0: post deploy starting
- T+rollout-complete: post green, attach Grafana snapshot
- T+24h: review error rate diff and update release notes

## Rollback
- `kubectl -n csr rollout undo deploy/<service>`
- If schema diverged: restore from latest PG snapshot (RPO 15 min via wal-g)
- Coordinate with finance ops if escrow state inconsistent
