# caddy

Two Caddyfile configs:

- `Caddyfile.dev` — used by `compose-dev` (HTTP only, *.huayuesc.local)
- `Caddyfile.prod` — runs on a separate edge VM, terminates HTTPS via Let's Encrypt, fans out to per-tenant VM IPs

## Adding a new tenant in prod

Append a block per subdomain pointing to the tenant's app/obs/storage VM IPs. Or use Caddy snippets/imports to factor out the pattern. Reload with `caddy reload --config /etc/caddy/Caddyfile`.
