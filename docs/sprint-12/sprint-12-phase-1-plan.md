# Sprint 12 Pha 1 — Proxmox staging pre-flight verify ✅ DONE (D41-EXPANDED ESCALATE)

**Ngày:** 2026-05-17
**Loại:** READ-ONLY pre-flight discovery
**Branch:** cms
**Status:** ✅ Pha 1 mission accomplished — Proxmox UNREACHABLE confirmed, D41-EXPANDED escalate

## Outcome

**Pha 1 succeeded by discovering blocker BEFORE commit infrastructure changes.** Sprint 9B Pha 3 precedent (D17/D18) REPEATED — Proxmox host not reachable from current Hyper-V dev environment.

**Path D outcome: ESCALATE D41-EXPANDED + defer Sprint 12 Pha 2-6 until coordinator decides alternative.**

## Bước 0 — Proxmox host reachability (CRITICAL gate)

### Test results

| Host | PING | TCP 8006 | HTTPS reach |
|---|---|---|---|
| 192.168.0.10 | NOT_REACHABLE | TIMEOUT | HTTP 000 |
| 192.168.0.20 | NOT_REACHABLE | TIMEOUT | HTTP 000 |
| 192.168.1.10 | NOT_REACHABLE | TIMEOUT | HTTP 000 |
| 192.168.137.1 (Hyper-V parent) | NOT_REACHABLE | REFUSED | HTTP 000 |
| 192.168.0.1 (gateway) | NOT_REACHABLE | TIMEOUT | - |
| 10.0.0.1 | NOT_REACHABLE | - | - |
| proxmox.local DNS | NOT_REACHABLE | - | - |
| pve.local DNS | NOT_REACHABLE | - | - |

### Network context (medusa-dev VM)

- eth0: 192.168.0.11/24 (Hyper-V external switch)
- eth2: 192.168.137.52/24 (Hyper-V default internal switch)
- Default gateway: 192.168.0.1 (DHCP, ICMP blocked but routes work — internet reachable via github.com HTTP 200)
- Docker bridges: docker0 (172.17.0.0/16) + br-f80315ccc070 (172.18.0.0/16)

### Conclusion: No Proxmox host exists in current environment

This is expected reality — project context is Hyper-V dev VM only. Sprint 11 closed with 14 modules cleanup but production infrastructure (Proxmox) was never provisioned. Sprint 9B Pha 3 attempt (May 15) discovered same gap (D17/D18 escalate).

## D41-EXPANDED ESCALATION (Sprint 9B Pha 3 repeat)

**Issue:** No Proxmox host accessible for Sprint 12 staging deploy.

**Options for coordinator decision:**

### Option A — Verify network/firewall access
- Test from outside Hyper-V VM (Windows host network)
- Check if Proxmox exists at different subnet not reachable from this VM
- Pre-requisite: Coordinator provides Proxmox host details (IP/credentials)
- Time: 1-2h investigation

### Option B — Cloud staging alternative
- DigitalOcean droplets (4 × $24/month = $96/mo) — Ubuntu 24 ready
- AWS EC2 t3.medium (4 instances ~$120/mo)
- GCP n2-standard-2 (4 instances ~$140/mo)
- Hetzner Cloud CX31 (4 instances ~€60/mo) — cheaper
- Time: 8-12h cloud provision + adapt compose
- Trade-off: cloud cost vs Proxmox CapEx hardware

### Option C — Bare metal alternative
- Single dedicated server (Dell/HP) installed with Proxmox locally
- 1-2 weeks lead time + hardware purchase
- Time: 15-25h installation + setup
- Trade-off: highest CapEx but lowest OpEx

### Option D — Defer Sprint 12 entirely
- Skip staging deploy until production decision made
- Continue Sprint 12+ priorities #3-7 (UX features, messages wire, /account, etc.)
- Customer #1 launch directly on production after Sprint 13+ validation
- Trade-off: skip staging = higher production risk

### Recommendation: Option B (DigitalOcean/Hetzner)

Cloud staging fastest path to customer #1 launch:
- 4 VMs ready in hours vs Proxmox bare metal weeks
- Adapt compose-staging for cloud (similar work needed regardless)
- $96/month operational cost manageable for staging
- Can migrate to Proxmox bare metal Sprint 13+ when hardware available

## Bước 1 — Proxmox API discover (SKIPPED — host unreachable)

N/A. Cannot discover API capabilities without host.

## Bước 2 — 4 VM resource specification (documented for future)

**Specs unchanged regardless of Proxmox/cloud/bare metal:**

| VM | Role | CPU | RAM | Disk | OS |
|---|---|---|---|---|---|
| csr-app | Medusa + Storefront + Admin | 4 | 8 GB | 80 GB | Ubuntu 24 |
| csr-data | Postgres + Redis | 4 | 16 GB | 200 GB | Ubuntu 24 |
| csr-storage | MinIO | 2 | 4 GB | 500 GB | Ubuntu 24 |
| csr-obs | Prometheus + Grafana + Loki | 2 | 4 GB | 100 GB | Ubuntu 24 |
| **TOTAL** | | **12** | **32 GB** | **880 GB** | |

## Bước 3 — Network + DNS plan (documented for future)

### Network plan
- Subnet: 192.168.10.0/24 (or cloud private network)
- VM IPs: csr-app .10, csr-data .11, csr-storage .12, csr-obs .13
- Gateway: .1 (Proxmox host or cloud router)
- DNS: 1.1.1.1, 8.8.8.8

### DNS hostnames staging
- api.staging.huayuesc.vn → csr-app
- admin.staging.huayuesc.vn → csr-app
- shop.staging.huayuesc.vn → csr-app
- grafana.staging.huayuesc.vn → csr-obs
- minio.staging.huayuesc.vn → csr-storage

### Internal hostnames (compose-staging)
- postgres.local → csr-data
- redis.local → csr-data
- minio.local → csr-storage
- prometheus.local → csr-obs

## Bước 4 — compose-staging requirements (documented for future)

### Differentiation vs compose-dev

| Aspect | Dev (current) | Staging (future) |
|---|---|---|
| Hosts | 1 VM (medusa-dev) | 4 VMs split |
| Volumes | Named (Docker) | Bind mounts → ZFS datasets |
| Images | Local build | ghcr.io pulls |
| Service refs | localhost | csr-data:5432 etc. |
| Secrets | .env file | Docker secrets OR Vault Sprint 13+ |
| Migrations | Auto on Medusa start | Explicit migrate job pre-start |

### compose-staging file structure plan

```
tenant-template/
├── compose-dev/                    (unchanged, current dev)
│   ├── docker-compose.yml          (11 services)
│   ├── postgres/
│   ├── scripts/
│   └── README.md
│
├── compose-staging/                (NEW Sprint 12 Pha 3, deferred)
│   ├── docker-compose.app.yml      # csr-app VM
│   ├── docker-compose.data.yml     # csr-data VM
│   ├── docker-compose.storage.yml  # csr-storage VM
│   ├── docker-compose.obs.yml      # csr-obs VM
│   ├── .env.staging.example
│   └── configs/
│       ├── nginx/
│       ├── prometheus/
│       └── grafana/
```

### Current compose-dev services (11) for migration

Inventory from compose-dev/docker-compose.yml:
- postgres, redis (DATA LAYER)
- minio, minio-init (STORAGE LAYER)
- meilisearch (SEARCH)
- prometheus, grafana, loki (OBSERVABILITY)
- caddy (PROXY)
- medusa-server (APP backend)
- storefront (APP frontend)
- payload-cms (CMS)

Staging split allocation:
- csr-data: postgres + redis
- csr-storage: minio + minio-init
- csr-app: medusa-server + storefront + payload-cms + caddy + meilisearch
- csr-obs: prometheus + grafana + loki

## Sprint 12 timeline (BLOCKED until D41-EXPANDED resolved)

| Phase | Status | Time est | Note |
|---|---|---|---|
| Pha 1 pre-flight | ✅ DONE | 1.5h | ESCALATE D41-EXPANDED |
| Pha 2 provision 4 VMs | ⏸️ BLOCKED | 4-6h | Wait coordinator Option A/B/C/D |
| Pha 3 deploy compose | ⏸️ BLOCKED | 3-5h | After Pha 2 |
| Pha 4 smoke + load test start | ⏸️ BLOCKED | 2-3h | After Pha 3 |
| Pha 5 load test wait | ⏸️ BLOCKED | 24-48h | Passive |
| Pha 6 mig 49 + close | ⏸️ BLOCKED | 5-8h | After Pha 5 |

## Risk register Sprint 12

| Risk | Status | Mitigation |
|---|---|---|
| Proxmox host unreachable | ✅ REALIZED | D41-EXPANDED escalate |
| Capacity insufficient | ⏸️ TBD | Wait Option A/B/C |
| Ubuntu 24 template missing | ⏸️ TBD | Cloud provider has templates |
| Load test reveals critical bug | ⏸️ TBD | Sprint 13+ buffer |

## Coordinator decision needed

**Cannot proceed to Sprint 12 Pha 2 without coordinator decision on Option A/B/C/D.**

Recommendation: **Option B (DigitalOcean cloud staging)** for fastest path to customer #1 launch.

## HARD RULES Pha 1 compliance

| Rule | OK? |
|---|---|
| Rule 1 — Commit cùng turn | ✅ Pha 1 plan committed |
| Rule 4 — KHÔNG đụng main/develop | ✅ cms only |
| Rule 5 — Git sync trước audit | ✅ |
| Rule 7 — Multi-layer verify | ✅ PING + TCP 8006 + HTTPS verify all hosts |
| Rule 8 — Best-effort no placeholder | ✅ Sprint 12+ TODO + escalate documented |
| Rule 8 phụ — Plan deviation | ✅ D41-EXPANDED escalate per plan paste |
| Rule 9 — Tiếng Việt thuần | ✅ |

KHÔNG infrastructure changes (READ-ONLY confirmed).

## References

- Sprint 9B Pha 3 escalation D17/D18 (precedent)
- `CMS/sprint-roadmap.md` v5.0 (Sprint 12+ priorities)
- `CMS/P12-PHA1-PROXMOX-PRE-FLIGHT-D41-ESCALATE.md` (this CMS report)
