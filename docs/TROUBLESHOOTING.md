# Troubleshooting

## Dev (compose-dev)

### `docker compose up` hangs on image pull
- Check VM has internet: `ssh medusa-dev "ping -c 2 1.1.1.1"`
- If only IPv6 fails (network unreachable), confirm IPv6 is disabled in `/etc/sysctl.d/99-medusa-dev.conf`

### `medusa-server` keeps restarting
- Check logs: `docker compose logs medusa-server --tail 100`
- Most common: Postgres not yet ready or wrong creds. Verify `.env` matches `compose-dev/.env.example`
- Schema out of sync: `./scripts/dev/reset-db.sh` (destroys data!)

### Hot-reload not picking up changes
- Volume mount path mismatch: confirm `../medusa/src` exists at the host path
- File watcher overflow: bump `fs.inotify.max_user_watches` (already done in dev VM tuning)

### Caddy returns 502
- Service not listening on expected port. Check `docker compose ps`
- Hostname not in Windows hosts file (see top-level README)

### Permission denied on `init-multiple-dbs.sh`
- File needs `chmod +x`. Repo enforces this via `core.fileMode`; if you're on Windows, ensure WSL/git keeps the executable bit

## Prod

### Image pull fails on app VM
- Not logged in to ghcr.io: `docker login ghcr.io -u phuongpham3141`
- PAT expired or lacks `read:packages`: regenerate

### Postgres OOM
- `data` VM under-provisioned. Bump `deploy.resources.limits.memory` in `compose-prod/data/docker-compose.yml` and tune `shared_buffers` accordingly
- Check long-running queries: `pg_stat_activity` (visible via Grafana datasource)

### Migration fails halfway
- Restore from backup: `gunzip < /srv/postgres/backups/medusa-pre-migrate-*.sql.gz | psql -U postgres -d medusa`
- Re-run migration with verbose: `npx medusa db:migrate --verbose`

### Storefront 500 errors
- `NEXT_PUBLIC_MEDUSA_BACKEND_URL` mismatch with actual API host
- Medusa server not reachable from app VM (firewall? compose network?)

### Grafana shows no metrics
- Prometheus can't reach scrape targets: check obs VM can reach app/data/storage VMs on metric ports
- Service not exposing `/metrics`: Medusa requires the `prom-bundle` plugin or sidecar exporter

### Backup script silently fails
- Disk full on data VM? `df -h /srv/postgres/backups`
- Lock file stuck: `rm /tmp/backup.lock`

## CI

### Build fails on `npm ci --legacy-peer-deps` mismatch
- Lock file out of sync. Locally: `cd <service> && rm package-lock.json && npm install --legacy-peer-deps && git commit package-lock.json`

### Image push to ghcr.io rejected
- Token lacks `write:packages`
- Repo not connected to user/org: visit `https://ghcr.io/<owner>/<image>/settings` and link to repo

## Misc

### "permission denied while trying to connect to the Docker daemon"
- User not in `docker` group, or current SSH session opened before group change. Disconnect (`ssh -O exit medusa-dev`), reconnect.

### Disk filling up with old images
- `docker system prune -af --volumes` (destructive — re-pulls images)
- Better: configure `daemon.json` `log-opts.max-size` (already done) and `containers.gc-interval`
