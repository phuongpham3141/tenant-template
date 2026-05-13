# Backup & Restore Runbook

## RPO / RTO targets
| Tier | RPO | RTO |
|------|-----|-----|
| PostgreSQL (master) | 5 min (wal-g) / 24h (logical) | < 30 min |
| ClickHouse | 6h | < 60 min |
| MinIO/S3 media | Versioning + cross-region replication | N/A |
| Redis | None (cache-only) | < 5 min (restart) |

## Daily logical backup
- Cron: `pg-backup` (2am UTC)
- Script: `devops/backup/pgbackup.sh`
- Encryption: AES-256-GCM, key from `backup-secrets`
- Destination: `s3://csr-backups/pg/YYYY/MM/...`
- Retention: 30 dailies, 12 monthlies, 7 yearlies (S3 lifecycle)

## Continuous WAL archive
- wal-g sidecar (configure separately)
- Pushes WAL to `s3://csr-backups/pg/wal/`

## Restore drill (quarterly)
1. Provision fresh PG instance.
2. Run `restore.sh` with target backup key.
3. Verify row counts vs prod within tolerance.
4. Run integration test suite against restored DB.
5. Document time-to-recovery; update RTO if drift.

## Point-in-time restore
1. `wal-g backup-fetch /data LATEST`
2. Set `recovery_target_time` in postgresql.conf
3. Start PG; verify state at target time

## ClickHouse
- `clickhouse-backup` tool: `devops/backup/clickhouse-backup.sh`
- Daily local backup, weekly S3 upload
- Restore: `clickhouse-backup restore <name>`

## Disaster scenarios
- **Master corrupted**: failover to replica → promote → restore replica from base backup
- **Region down**: switch DNS to DR region (RTO 30 min for media, 4h for DB rehydration)
- **Ransomware**: immutable backup tier (S3 Object Lock) — restore from before infection date
