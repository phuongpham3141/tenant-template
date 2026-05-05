# compose-prod/obs — VM Obs

Prometheus + Alertmanager + Grafana + Loki. Deployed on the obs VM (e.g. 10.X.0.4).

## Pre-reqs

- ZFS datasets at /srv/{prometheus,alertmanager,grafana,loki}/data
- SMTP / PagerDuty secret files mounted (or use placeholders for non-critical tenants)
- Tenant VMs reachable from this VM (for scrape targets)

## Bring up

```bash
cp .env.example .env
docker compose up -d
```

Grafana on :3000, Prometheus on :9090, Alertmanager on :9093, Loki on :3100.
