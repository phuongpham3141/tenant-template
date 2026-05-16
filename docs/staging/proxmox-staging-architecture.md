# Staging Architecture — Proxmox VE 8 (4 VM)

**Mục đích:** Setup staging environment cybersilkroads cho Sprint 8 deploy + load test.
**Tham chiếu:** HUAYUE D01 (Proxmox+KVM), D02 (Docker Compose), D05 (compose files riêng), D06 (volume hybrid)
**Audience:** Phương Phạm + DevOps team khi onboard.

## Mục tiêu Sprint 8 staging

Mirror production setup (per HUAYUE blueprint) trên server vật lý:
- 4 VM per tenant (cybersilkroads = tenant đầu)
- Docker Compose stack trên mỗi VM
- ZFS bind mount cho data persistence (D06 production pattern)
- Network isolation per tenant (vmbr10 bridge)

## Topology

```
┌───────────────────────────────────────────────────────┐
│                  Proxmox VE 8 Host                    │
│  ┌────────────────────────────────────────────────┐  │
│  │            cybersilkroads tenant               │  │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────┐  │  │
│  │  │ csr-app │ │csr-data │ │csr-stor │ │ obs │  │  │
│  │  │  VM 110 │ │  VM 111 │ │  VM 112 │ │ 113 │  │  │
│  │  │         │ │         │ │         │ │     │  │  │
│  │  │ Medusa  │ │ Postgres│ │ MinIO   │ │ Loki│  │  │
│  │  │ Storefnt│ │ Redis   │ │ Meili   │ │ Graf│  │  │
│  │  │ Payload │ │ ClickH  │ │ pgvector│ │ Prom│  │  │
│  │  └─────────┘ └─────────┘ └─────────┘ └─────┘  │  │
│  └────────────────────────────────────────────────┘  │
│              Network: vmbr10 (10.10.1.0/24)           │
└───────────────────────────────────────────────────────┘
```

## VM specs (staging)

| VM | Role | CPU | RAM | Disk | Note |
|---|---|---|---|---|---|
| csr-app | Medusa + Storefront + Payload | 4 | 8 GB | 50 GB | Stateless, scale horizontal được |
| csr-data | Postgres + Redis + ClickHouse | 4 | 16 GB | 200 GB ZFS | DB stack, ZFS bind |
| csr-storage | MinIO + Meilisearch | 2 | 4 GB | 500 GB | Object storage + search |
| csr-obs | Loki + Grafana + Prometheus | 2 | 4 GB | 100 GB | Observability stack |

**Tổng staging:** 12 vCPU, 32 GB RAM, 850 GB disk.

## Network

- Bridge: `vmbr10` (HUAYUE D01 per-tenant network isolation)
- Subnet: `10.10.1.0/24` (cybersilkroads)
- Gateway: `10.10.1.1` (Proxmox host)
- VM IPs:
  - csr-app: `10.10.1.10`
  - csr-data: `10.10.1.11`
  - csr-storage: `10.10.1.12`
  - csr-obs: `10.10.1.13`

**Edge access:** Caddy reverse proxy trên Proxmox host (port 443) → routes:
- `staging.cybersilkroads.vn` → csr-app:3000 (storefront)
- `admin.staging.cybersilkroads.vn` → csr-app:7001 (Medusa admin)
- `cms.staging.cybersilkroads.vn` → csr-app:3001 (Payload)
- `metrics.staging.cybersilkroads.vn` → csr-obs:3000 (Grafana)

## Storage (D06 hybrid)

**Staging follows production pattern (KHÔNG dùng named volumes như dev):**
- ZFS pool: `rpool-data` trên Proxmox host
- Datasets per tenant: `rpool-data/cybersilkroads/{postgres,clickhouse,minio,meilisearch}`
- Bind mount vào VMs qua Proxmox VM config (`mp0`, `mp1`, ...)
- Snapshots: hourly automated (ZFS native — `zfs-auto-snapshot`)

**Dev (medusa-dev hiện tại) khác:**
- Docker named volumes (`postgres_data`, `redis_data`, etc.)
- Volumes managed by Docker daemon (`/var/lib/docker/volumes/...`)
- Simpler nhưng không production-ready

## Docker Compose (D02 + D05)

Mỗi VM có compose file riêng:
- `compose-staging/compose-staging-app.yml` → csr-app
- `compose-staging/compose-staging-data.yml` → csr-data
- `compose-staging/compose-staging-storage.yml` → csr-storage
- `compose-staging/compose-staging-obs.yml` → csr-obs

Compose extends `compose-shared.yml` cho common config (env vars, networks).

## Pre-deployment checklist (Sprint 8 Pha 2)

- [ ] Proxmox host updated (latest PVE 8.x stable)
- [ ] ZFS pool `rpool-data` tạo + 4 datasets allocated per tenant
- [ ] vmbr10 bridge configured trên Proxmox
- [ ] 4 VMs cloned từ Ubuntu 22.04 template + cloud-init
- [ ] Docker Engine + Compose v2 installed mỗi VM (qua cloud-init)
- [ ] SSH key Phương deployed vào 4 VMs (qua cloud-init)
- [ ] DNS records: `*.staging.cybersilkroads.vn` → Proxmox host IP
- [ ] TLS cert: Let's Encrypt cho `*.staging.cybersilkroads.vn` (wildcard via DNS-01)
- [ ] Secrets: production-grade passwords trong `.env.staging` (KHÔNG dùng `devpass123`)
- [ ] Backup target: external storage (Backblaze B2 hoặc S3) cho daily dumps
- [ ] **D10 prerequisite**: Medusa server functional (3 broken defineLink fix Sprint 7 carry-over)

## Deploy procedure (Sprint 8 Pha 2)

1. Build images local + push GHCR (D07 hybrid build):
   ```bash
   cd ~/projects/tenant-template
   docker buildx build --platform linux/amd64 -t ghcr.io/phuongpham3141/csr-medusa:staging ./medusa
   docker push ghcr.io/phuongpham3141/csr-medusa:staging
   # Tương tự cho storefront + payload
   ```

2. SCP compose files + `.env.staging` vào 4 VMs

3. Apply migrations trên csr-data (40 PG + 5 ClickHouse + Sprint 7 mig 48 nếu unblocked)

4. Start containers theo thứ tự:
   - csr-data first (DB stack)
   - csr-storage (MinIO + Meilisearch)
   - csr-obs (observability)
   - csr-app cuối (depends on data + storage)

5. Smoke test endpoints:
   - `curl https://staging.cybersilkroads.vn/health` → 200
   - `curl https://admin.staging.cybersilkroads.vn/app` → 200
   - `curl https://staging.cybersilkroads.vn` → 200

6. Load test với k6 (Pha 2):
   - Target: p95 < 500ms cho 8 endpoint categories
   - Profile: 50 VUs, ramp 5 → 50 trong 2 min, hold 5 min

7. Monitor 24h via Grafana dashboards (Sprint 8 R20 deliverable)

## Rollback procedure

Nếu staging fail:
1. **ZFS snapshot restore** (instant rollback data):
   ```bash
   zfs rollback rpool-data/cybersilkroads/postgres@hourly-2026-05-15-1200
   ```
2. Stop containers: `docker compose down` trên VM affected
3. Investigate via Loki logs (`{tenant="cybersilkroads"}` query)
4. Fix on dev → re-deploy

## Secrets management

**KHÔNG commit secrets thật vào git.**

- `compose-staging/.env.staging.template` — placeholders only
- Production secrets stored:
  - Phương: 1Password vault (per-VM credentials)
  - DevOps team Sprint 10+: HashiCorp Vault (centralized)

Per-secret rotation cadence:
- DB passwords: quarterly
- JWT/cookie secrets: monthly
- API keys (third-party): khi rotate provider-side

## Multi-tenant scaling pattern

Cybersilkroads = tenant #1. Khi onboard tenant #2 (per HUAYUE blueprint):
1. Tạo ZFS dataset `rpool-data/<tenant-id>/{postgres,redis,...}`
2. Tạo bridge `vmbr11`, subnet `10.10.2.0/24`
3. Clone 4 VMs với template `csr-app/data/storage/obs`
4. Run tenant onboarding script (Sprint 9+ deliverable)
5. DNS: `*.<tenant>.vn` → Proxmox host
6. TLS cert per tenant

**Onboarding target:** 30-60 phút per new tenant (per HUAYUE Stage 11).

## Status tracking

```
Pha 1 (paste này): Architecture doc + pre-deployment checklist ⏳ Pha 1 hoàn tất
Pha 2: VM provisioning + deploy + smoke + load test ⏳ chờ D10 fix
```

**D10 blocker carry-over từ Sprint 7:**
3 broken `defineLink` files block Medusa server. Sprint 8 staging deploy CHẶN cho đến khi D10 fixed (medusa container không start).

## Tài liệu liên quan

- `docs/sprint-02-report.md` — Sprint 2 R20 setup (40 migrations)
- `docs/sprint-03-report.md` — Sprint 3 backlog → Sprint 8
- `docs/runbooks/audit-event-runbook.md` — Sprint 8 Pha 1 (Bước 2)
- HUAYUE blueprint D01-D08 (architecture decisions reference)
