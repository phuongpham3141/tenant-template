# Staging Deployment Procedure — Sprint 8 Pha 2

**Mục đích:** Step-by-step deploy cybersilkroads staging trên Proxmox VE 8.
**Audience:** Phương Phạm (solo) hoặc DevOps khi onboard.
**Status:** ⏸ DEPLOYMENT-READY (chưa deploy thực tế — chờ Proxmox host + D10 fix)

## ⚠ Pre-requisites BLOCKING

Trước khi deploy, phải fix:

1. **D10 (Sprint 7 carry-over):** Medusa server HTTP 502
   - 3 broken `defineLink` files trong `medusa/src/links/`
   - Fix: comment out hoặc remove → verify medusa-server starts
   - Time estimate: 4-8h
   - Detail: `CMS/P7.1-BLOCKED.md`

2. **Proxmox host:** PVE 8.x với ZFS pool sẵn sàng
   - Hardware: tối thiểu 16 vCPU + 48 GB RAM + 1 TB disk
   - ZFS pool `rpool-data` tạo
   - Network bridge `vmbr10` config

→ KHÔNG deploy nếu chưa đáp ứng 2 prerequisites.

## Pre-deployment setup (Proxmox host)

### Step 1: Verify Proxmox version

```bash
pveversion
# Mong đợi: pve-manager/8.x
```

### Step 2: Create ZFS datasets

```bash
zpool list rpool-data  # verify pool exists
zfs create rpool-data/cybersilkroads
zfs create rpool-data/cybersilkroads/postgres
zfs create rpool-data/cybersilkroads/redis
zfs create rpool-data/cybersilkroads/clickhouse
zfs create rpool-data/cybersilkroads/minio
zfs create rpool-data/cybersilkroads/meilisearch
zfs create rpool-data/cybersilkroads/loki
zfs create rpool-data/cybersilkroads/grafana
zfs create rpool-data/cybersilkroads/prometheus
```

### Step 3: Create network bridge

Edit `/etc/network/interfaces`:

```
auto vmbr10
iface vmbr10 inet static
  address 10.10.1.1/24
  bridge-ports none
  bridge-stp off
  bridge-fd 0
```

Apply: `ifup vmbr10`

### Step 4: Cài đặt Caddy reverse proxy (Proxmox host)

```bash
apt install -y caddy
# Edit /etc/caddy/Caddyfile với routes:
# staging.cybersilkroads.vn { reverse_proxy 10.10.1.10:3000 }
# admin.staging.cybersilkroads.vn { reverse_proxy 10.10.1.10:7001 }
# cms.staging.cybersilkroads.vn { reverse_proxy 10.10.1.10:3001 }
# minio.staging.cybersilkroads.vn { reverse_proxy 10.10.1.12:9001 }
# metrics.staging.cybersilkroads.vn { reverse_proxy 10.10.1.13:3000 }
systemctl restart caddy
```

## Build + push images (D07 hybrid)

```bash
# Trên dev machine (Hyper-V medusa-dev)
cd ~/projects/tenant-template

# Build 3 images
docker build -t ghcr.io/phuongpham3141/csr-medusa:staging \
  -f medusa/Dockerfile medusa/

docker build -t ghcr.io/phuongpham3141/csr-storefront:staging \
  -f storefront/Dockerfile storefront/

docker build -t ghcr.io/phuongpham3141/csr-payload:staging \
  -f payload/Dockerfile payload/

# Push lên GitHub Container Registry
docker push ghcr.io/phuongpham3141/csr-medusa:staging
docker push ghcr.io/phuongpham3141/csr-storefront:staging
docker push ghcr.io/phuongpham3141/csr-payload:staging
```

## VM provisioning (Proxmox CLI)

### VM 110: csr-app

```bash
qm create 110 --name csr-app-staging \
  --memory 8192 --cores 4 \
  --net0 virtio,bridge=vmbr10 \
  --bootdisk virtio0 \
  --virtio0 local-lvm:50 \
  --ostype l26 \
  --ide2 local:iso/ubuntu-22.04.iso,media=cdrom

# Sau install Ubuntu (cloud-init recommended):
# - Set static IP 10.10.1.10
# - Install Docker Engine + Compose v2
# - Add SSH key Phương
```

### VM 111: csr-data (16 GB RAM, 200 GB ZFS bind mount)

```bash
qm create 111 --name csr-data-staging \
  --memory 16384 --cores 4 \
  --net0 virtio,bridge=vmbr10 \
  --bootdisk virtio0 \
  --virtio0 local-lvm:200 \
  --ostype l26

# Bind mount ZFS datasets
pct set 111 -mp0 /rpool-data/cybersilkroads/postgres,mp=/var/lib/postgresql/data
pct set 111 -mp1 /rpool-data/cybersilkroads/redis,mp=/data/redis
pct set 111 -mp2 /rpool-data/cybersilkroads/clickhouse,mp=/var/lib/clickhouse
```

### VM 112: csr-storage (4 GB RAM, 500 GB disk)

Pattern tương tự VM 111 với bind mount cho minio + meilisearch.

### VM 113: csr-obs (4 GB RAM, 100 GB disk)

Bind mount cho loki + grafana + prometheus.

## Deployment per VM

### Step 1: csr-data (DB layer first)

```bash
ssh root@10.10.1.11
mkdir /opt/csr && cd /opt/csr

# SCP compose-staging-data.yml + .env.staging từ dev machine
scp medusa-dev:~/projects/tenant-template/compose-staging/compose-staging-data.yml .
# Tạo .env.staging với production-grade secrets

docker compose -f compose-staging-data.yml up -d

# Verify
docker compose ps
docker compose logs postgres
```

### Step 2: csr-storage

```bash
ssh root@10.10.1.12
# Same pattern với compose-staging-storage.yml
docker compose -f compose-staging-storage.yml up -d
```

### Step 3: csr-obs

```bash
ssh root@10.10.1.13
# Same pattern với compose-staging-obs.yml
docker compose -f compose-staging-obs.yml up -d
```

### Step 4: csr-app (last — depends on DB + storage)

```bash
ssh root@10.10.1.10
# compose-staging-app.yml
docker compose up -d

# Apply migrations (sau khi D10 fix)
docker compose exec medusa npx medusa db:migrate

# Verify migrations
docker compose exec medusa npx medusa db:migrate:show
# Mong đợi: 47 base + 48 (audit partition) + 49 (indexes recreate) + 50 (enum extend nếu Sprint 9)
```

### Step 5: Verify

```bash
# Từ dev machine hoặc public internet
curl -s https://staging.cybersilkroads.vn/health      # storefront
curl -s https://admin.staging.cybersilkroads.vn/app   # medusa admin
curl -s https://cms.staging.cybersilkroads.vn/admin   # payload

# Run smoke test (Sprint 9 prep)
bash scripts/staging-smoke-test.sh
```

## DNS + TLS

1. DNS A records:
   - `staging.cybersilkroads.vn → <public IP>`
   - `*.staging.cybersilkroads.vn → <public IP>` (wildcard)

2. Let's Encrypt cert via DNS-01 (wildcard):
   ```bash
   certbot certonly --dns-cloudflare \
     -d "*.staging.cybersilkroads.vn" \
     -d staging.cybersilkroads.vn
   ```

3. Caddy auto-renew handles cert lifecycle.

## Rollback procedure

Nếu deploy fail trên staging:

1. **ZFS snapshot restore** (data layer):
   ```bash
   # On Proxmox host
   zfs rollback rpool-data/cybersilkroads/postgres@pre-deploy-2026-05-15
   ```

2. **Stop containers:**
   ```bash
   ssh root@10.10.1.10 'cd /opt/csr && docker compose down'
   ssh root@10.10.1.11 'cd /opt/csr && docker compose down'
   ssh root@10.10.1.12 'cd /opt/csr && docker compose down'
   ssh root@10.10.1.13 'cd /opt/csr && docker compose down'
   ```

3. **Investigate via Loki logs:**
   ```bash
   # Trong Grafana: query {tenant="cybersilkroads"}
   ```

4. **Fix on dev → re-deploy:**
   - Identify issue trong dev environment
   - Test fix
   - Re-build + push image
   - Re-deploy với new image tag

## Health checks Sprint 9 success criteria

- [ ] 4 VMs running healthy
- [ ] All containers passing healthcheck
- [ ] Migrations applied (50 PG + 5 ClickHouse + new mig 48 + 49)
- [ ] Storefront responsive: `curl https://staging.cybersilkroads.vn/`
- [ ] Admin login: `https://admin.staging.cybersilkroads.vn`
- [ ] Buyer flow smoke: register → browse → cart → checkout (Sprint 5+6 wired)
- [ ] Seller flow smoke: login → dashboard (Sprint 6)
- [ ] Auth flow: login + register + forgot password (Sprint 6 + 7)
- [ ] Grafana dashboard accessible (Sprint 2 R20)
- [ ] Load test PASS (p95 < 500ms trên 8 endpoint categories)

## Sprint 8 Pha 2 status

✅ **Documentation complete:**
- Architecture (Pha 1)
- Deployment procedure (this doc, Pha 2)

✅ **Compose templates complete:**
- compose-staging-data.yml (Pha 1)
- compose-staging-app.yml (Pha 2)
- compose-staging-storage.yml (Pha 2)
- compose-staging-obs.yml (Pha 2)

✅ **Migration files ready:**
- mig 48 audit_event partition POC
- mig 49 indexes recreation template

⏸ **Actual deploy DEFERRED Sprint 9:**
- D10 fix prerequisite (4-8h)
- Proxmox host provisioning (4-6h)
- Actual deploy + smoke + load test (4-6h)

## Tài liệu liên quan

- `docs/staging/proxmox-staging-architecture.md` (Pha 1)
- `compose-staging/*.yml` (4 compose files)
- `medusa/migrations/48_audit_event_partition_poc.sql`
- `medusa/migrations/49_recreate_critical_indexes.sql` (template)
- `CMS/P7.1-BLOCKED.md` — D10 root cause
- HUAYUE blueprint D01-D08
