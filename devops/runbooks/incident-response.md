# Incident Response Runbook

## P0 — Service outage (storefront / API down)

1. **Confirm**: check Grafana "CSR — API Health" dashboard. Are RPS dropping while p99 climbing?
2. **Page**: PagerDuty fires automatically for `severity: critical`. Acknowledge within 5 min.
3. **Triage** (10 min budget):
   - `kubectl -n csr get pods` → which are not Ready?
   - `kubectl -n csr logs deploy/medusa --tail=200 --since=10m` → recent error pattern?
   - `kubectl -n csr describe pod <name>` → OOMKilled? CrashLoopBackOff?
4. **Mitigate**:
   - Rolling restart: `kubectl -n csr rollout restart deploy/medusa`
   - Scale up: `kubectl -n csr scale deploy/medusa --replicas=10`
   - Rollback to last green: `kubectl -n csr rollout undo deploy/medusa`
5. **Communicate**: post in `#csr-status` channel + status page within 15 min.
6. **Postmortem**: blameless RCA within 5 business days.

## P1 — Payment provider webhook failures

1. Check `payment_webhook_failures_total` metric.
2. Check provider dashboard (Stripe / VNPay / MoMo / ZaloPay) for service status.
3. If provider issue: switch fallback adapter in tenant config (toggle `payment_processor_preference` feature flag).
4. Verify webhooks via DLQ queue replay.

## P1 — PG replica lag > 30s

1. Check `pg_stat_replication` on master: `SELECT * FROM pg_stat_replication`.
2. If physical issue: kill long queries on replica (`SELECT pg_cancel_backend(pid)`).
3. If sustained: reduce write throughput on master (rate-limit non-critical writes).
4. If replica corrupt: re-bootstrap from `pg_basebackup`.

## P1 — Escrow milestone past due

1. Check `dispute.dispute` for related open disputes.
2. Notify supplier + buyer; offer 24h cure window via internal admin.
3. If unresolved, escalate to tier T2 (mediator) using `dispute.escalate` API.

## P2 — Search degraded (latency p95 > 2s)

1. Check Elasticsearch heap usage, GC pauses.
2. Reduce facet count; disable expensive aggregations temporarily.
3. Trigger index rebuild via `search-indexer` worker.

## P2 — AI cost spike

1. Check Grafana "AI Cost Daily" panel.
2. Identify feature_code drift.
3. Toggle `feature_flag` to fallback model (cheaper) or disable feature.
4. Investigate prompt regression / abusive caller.

## P3 — KYC backlog SLA breach

1. Check `kyc.document` count where `status = 'pending'` and `created_at < NOW() - 48h`.
2. Add KYC reviewers via break-glass.
3. Enable AI pre-screening to triage.

## Channels
- PagerDuty: critical only
- Slack `#csr-alerts`: all severities
- Slack `#csr-oncall`: high+
- Status page: customer-visible incidents only
