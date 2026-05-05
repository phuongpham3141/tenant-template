# scripts

Operational scripts for dev, prod, and CI workflows.

## Layout

\`\`\`
scripts/
├── dev/
│   ├── reset-db.sh      — wipe Postgres dev volume
│   ├── seed-data.sh     — Medusa + Payload seed
│   ├── tail-logs.sh     — tail compose-dev logs
│   └── shell.sh         — exec shell inside any service container
├── prod/
│   ├── deploy.sh        — full deploy: render envs + scp + compose up
│   ├── migrate.sh       — manual DB migrations (Medusa + Payload)
│   ├── backup.sh        — pg_dump both DBs to data VM
│   ├── rollback.sh      — rollback app stack image versions
│   ├── healthcheck.sh   — probe tenant public URLs
│   └── render-env.sh    — decrypt SOPS, generate per-VM .env files
└── ci/
    └── build-and-push.sh — buildx + push to ghcr.io
\`\`\`

## Conventions

- All scripts use \`set -euo pipefail\` and accept positional args. Usage is in the first comment line.
- Tenants indexed numerically (\`acme=1\`, \`bigshop=2\`, ...). VMs at \`10.<idx>.0.{1,2,3,4}\` for app/data/storage/obs.
- Secrets in \`tenants/<id>/env.sops.yaml\` (SOPS-encrypted). Render via \`scripts/prod/render-env.sh\`.
