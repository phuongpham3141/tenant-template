# Deployment

## Prerequisites

- 4 Proxmox VMs per tenant: \`app\`, \`data\`, \`storage\`, \`obs\`
- IPs follow pattern \`10.<idx>.0.{1,2,3,4}\` (idx = tenant numeric ID)
- ZFS datasets pre-created and mounted (see each \`compose-prod/<role>/README.md\`)
- SSH key access from operator workstation to all 4 VMs
- \`sops\`, \`yq\`, \`age\` (or AWS KMS) on operator workstation
- GitHub PAT with \`write:packages\` to pull tenant images

## Tenant onboarding (manual, first deploy)

1. **Create tenant repo from template** (GitHub UI: "Use this template")
2. **Clone, customize, push**:
   ```bash
   git clone git@github.com:phuongpham3141/tenant-acme.git
   cd tenant-acme
   # Customize medusa-config.ts, payload collections, storefront branding
   git add . && git commit -m 'feat: initial customization for acme'
   git push
   ```
3. **Build images** (via CI on tag, or manually):
   ```bash
   ./scripts/ci/build-and-push.sh acme v1.0.0
   ```
4. **Encrypt secrets** for the tenant:
   ```bash
   sops --encrypt --age <pubkey> tenants/acme/env.plain.yaml > tenants/acme/env.sops.yaml
   ```
5. **Deploy**:
   ```bash
   ./scripts/prod/deploy.sh acme 1
   ```
6. **Migrate** (only if schema changed since image build):
   ```bash
   ./scripts/prod/migrate.sh acme 1
   ```
7. **Healthcheck**:
   ```bash
   ./scripts/prod/healthcheck.sh acme.huayuesc.com
   ```

## Routine ops

### Deploy a new app version

```bash
# Build images for new version
./scripts/ci/build-and-push.sh acme v1.1.0

# Update SOPS yaml: bump versions
# medusa.version: v1.1.0
# payload.version: v1.1.0
# storefront.version: v1.1.0

# Deploy
./scripts/prod/deploy.sh acme 1
```

### Rollback

```bash
./scripts/prod/rollback.sh acme 1 v1.0.5 v1.0.5 v1.0.5
```

### Backup

```bash
./scripts/prod/backup.sh acme 1
```

Schedule via cron on ops VM:
```
0 2 * * * /opt/ops/scripts/prod/backup.sh acme 1
```

## Scaling: adding a tenant

1. Pick next \`<idx>\` (e.g. acme=1, bigshop=2)
2. Provision VMs at \`10.2.0.{1,2,3,4}\`
3. Append a section in \`caddy/Caddyfile.prod\` for \`*.bigshop.huayuesc.com\` → \`10.2.0.x\`
4. \`caddy reload\` on edge VM
5. Onboard tenant (see above)

## Disaster recovery

- **Postgres**: ZFS snapshots on data VM (auto every 4h via \`zfs-auto-snapshot\`). Restore via \`zfs rollback\` + \`docker compose restart postgres\`
- **MinIO**: bucket replication to a different storage VM (out-of-template, configure manually)
- **Redis**: RDB snapshots persisted to ZFS, replayable

DR drill: see runbook (TODO; not in this repo).
