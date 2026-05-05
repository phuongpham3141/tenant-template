# Development

## Daily workflow

```bash
cd compose-dev
docker compose up -d
docker compose logs -f medusa-server   # in another terminal
```

Edit code in \`medusa/src/\`, \`payload/src/\`, or \`storefront/src/\` — bind-mounted into containers, hot-reload triggers immediately.

## Common tasks

### Add a Medusa custom module

1. \`medusa/src/modules/<name>/\` — create module
2. Register in \`medusa/medusa-config.ts\`
3. Restart container: \`docker compose restart medusa-server\`

### Add a Payload collection

1. Create \`payload/src/collections/MyCollection.ts\`
2. Import in \`payload/src/payload.config.ts\` collections array
3. Generate types: \`docker compose exec payload-cms npm run generate:types\`
4. Container will hot-reload

### Reset databases

```bash
./scripts/dev/reset-db.sh
```

### Seed demo data

```bash
./scripts/dev/seed-data.sh
```

### Inspect a service

```bash
./scripts/dev/shell.sh medusa-server   # exec sh inside container
docker compose logs -f payload-cms
```

## Branch strategy

- \`main\` — production-ready, protected
- \`develop\` — integration, default for dev
- \`feature/<name>\` — feature branches off \`develop\`
- \`hotfix/<name>\` — urgent fixes off \`main\`, merged back to both

PR flow:
1. Open PR \`feature/...\` → \`develop\`
2. CI must pass (lint + tests)
3. 1 approval required
4. Squash merge

Releases:
1. \`develop\` → \`main\` PR (release branch optional)
2. CI builds and tags \`v*.*.*\` automatically
3. Tagged image pushed to ghcr.io

## Tenant fork workflow

Each customer gets their own repo forked from this template:

1. On GitHub: **Use this template** → \`huayuesc/tenant-<id>\`
2. Clone, customize \`medusa-config.ts\`, branding in \`storefront/\`, custom Payload collections
3. Push, deploy with \`scripts/prod/deploy.sh <tenant-id> <idx>\`

To pull template improvements back into a forked tenant repo:

```bash
git remote add template git@github.com:phuongpham3141/tenant-template.git
git fetch template
git merge template/main --allow-unrelated-histories
# Resolve conflicts, push
```

## VS Code Remote-SSH

Settings, extensions, and dev container config live in the \`.vscode/\` folders inside each service. Recommended extensions: ESLint, Prettier, Docker, Thunder Client, GitLens.
