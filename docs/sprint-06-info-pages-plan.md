# Sprint 6 — Info pages plan (8 pages + hex cluster cleanup)

**Date:** 2026-05-15
**Sprint:** 6 Phase 1 (audit only)
**Methodology:** Hex cluster analysis + content review

## Plan deviation flagged

**Plan paste expected:** 7 info pages with ~78+ hex.

**Reality:** **8 info pages** (`/info/industry-news/[slug]` = sub-page), **91 hex literals**, network/page.tsx alone has 56 hex (61% of cluster).

## Info pages list (verified)

| # | Page | LOC | Client | Data | Form | Hex | Arb `[#]` | Inline |
|---|------|----:|:------:|:----:|:----:|----:|---------:|-------:|
| 1 | `[topic]` (dynamic) | 1404 | N | N | N | 0 | 0 | 2 |
| 2 | `contact` | 656 | Y | N | N | 4 | 0 | 3 |
| 3 | `ddp-calculator` | 230 | N | N | Y | 0 | 0 | 0 |
| 4 | `disputes` | 701 | N | N | N | 15 | 1 | 10 |
| 5 | `industry-news/[slug]` | 317 | N | N | N | 1 | 1 | 4 |
| 6 | `industry-news` | 307 | N | N | Y | 2 | 2 | 5 |
| 7 | `network` | 1051 | N | N | N | **56** | 2 | 18 |
| 8 | `sample-orders` | 733 | N | N | N | 13 | 0 | 10 |

**Aggregate:** total_hex = **91**, total_arb = 6, total_inline = 52, total LOC = 4999.

## Hex cluster analysis

- **Total hex literals:** 91
- **Refactor candidates (match 19 existing tokens):** 6 (6.6%)
- **NEW color candidates:** 85 (93.4%)

→ Phase 3 strategy = mostly **introduce new semantic tokens** thay vì pure refactor.

### Top hex hotspots

| Page | hex | Sprint 6 priority |
|---|---:|---|
| network | 56 | P0 — biggest cluster, target 0 |
| disputes | 15 | P0 |
| sample-orders | 13 | P0 |
| contact | 4 | P1 |
| industry-news | 2 | P2 |
| industry-news/[slug] | 1 | P2 |
| [topic] | 0 | refactor skip |
| ddp-calculator | 0 | refactor skip |

### Top NEW colors (potential new token additions)

| Hex | Uses | Suggested token name | Phase 3 priority |
|---|---:|---|---|
| `#002557` | 8 | `--color-navy` (deep navy) | P1 (add token) |
| `#001A3F` | 8 | `--color-navy-dark` (darker navy) | P1 (add token) |
| `#0E7490` | 6 | `--color-teal-dark` (deep teal) | P1 (add token) |
| `#7C2D12` | 4 | inline keep OR `--color-rust` | P2 |
| `#92400E` | 4 | inline keep OR `--color-amber-dark` | P2 |
| `#DC2626` | 3 | use existing `--color-red` (#B81827)? | P2 — verify visual |
| `#16A34A` | 3 | use existing `--color-success` (#2A9D8F)? | P2 — verify visual |
| `#0E2A33` | 3 | use existing `--color-brand-dark`? | P2 — verify visual |
| `#C8102E` | 3 | (Vietnam flag red) keep semantic | P2 — semantic data |
| `#7C3AED` | 3 | use existing `--color-purple` (#A21CAF)? | P2 — verify visual |
| Other 5-8 | 2 each | case-by-case | P3 |

→ **3 new tokens recommended** Sprint 6 Phase 3: `navy`, `navy-dark`, `teal-dark` (Sprint 4 pattern: ≥6 uses + semantic meaning).

## Phase 3 strategy (Sprint 6 — info + login/register + close)

### Bước 1: Info pages design token expansion
- Add 3 new tokens to `globals.css @theme`: `navy`, `navy-dark`, `teal-dark`
- Tokens count: 19 → 22

### Bước 2: Info pages mechanical refactor
- Refactor 91 hex → tokens (22 token vocabulary)
- Target: 91 → <20 hex (info cluster cleanup)
- Top page `network`: 56 → 0 hex via expanded tokens + inline retention only for semantic
- Validate visual parity (no regression)

### Bước 3: Info pages UX polish (selective)
- **contact**: prominent form, hours, map placeholder
- **ddp-calculator**: improve UX (input fields + computation result display)
- **disputes, sample-orders, network, industry-news**: layout polish (mostly server-render content pages)

### Bước 4: Login/register polish (see auth section below)

### Bước 5: Sprint 6 final close + push

## Per-page Phase 3 actions

| Page | Mechanical | UX polish | Form wire | Priority |
|---|:-:|:-:|:-:|---|
| `[topic]` | — | — | — | skip (0 hex) |
| `contact` | hex refactor (4) | layout improve | Server Action (defer) | P1 |
| `ddp-calculator` | — | calculator UX | client compute | P1 |
| `disputes` | hex refactor (15) | layout polish | — | P0 |
| `industry-news` | hex refactor (2) | list pattern | search (defer) | P2 |
| `industry-news/[slug]` | hex refactor (1) | article template | — | P2 |
| `network` | hex refactor (56) | grid + locations | — | P0 (biggest) |
| `sample-orders` | hex refactor (13) | process steps | — | P0 |

## Acceptance criteria info pages (Phase 3)

- ✅ 8 info pages publish-ready
- ✅ Hex literals info cluster: 91 → <20 (target ~78% reduction)
- ✅ 3 new tokens added (navy, navy-dark, teal-dark) → 22 total
- ✅ Contact form structure ready (Server Action defer Sprint 7 backend)
- ✅ DDP calculator client-side compute working
- ✅ Mobile responsive

## Questions for coordinator (Phase 3 prep)

1. **3 new tokens approval:** `navy` (#002557), `navy-dark` (#001A3F), `teal-dark` (#0E7490) — match brand palette?
2. **Existing token reuse:** verify visual parity:
   - `#DC2626` → `red` (#B81827)?
   - `#16A34A` → `success` (#2A9D8F)?
   - `#0E2A33` → `brand-dark` (#003A42)?
   - `#7C3AED` → `purple` (#A21CAF)?
3. **Vietnam flag red `#C8102E`:** keep as semantic literal (national flag color)?
4. **Contact form Server Action:** Sprint 6 phase 3 wire HAY defer Sprint 7?
5. **DDP calculator backend:** client-side static formula (Sprint 6) hay wire backend pricing API (Sprint 7)?
