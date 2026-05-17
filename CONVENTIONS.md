# CONVENTIONS — HUAYUE Platform tenant template

**Mục đích:** Document hệ thống convention cho future devs — folder names, module constants, tenant ID, ngôn ngữ, migration pattern, git workflow, hard rules + 21 lessons codified.

**Last updated:** Sprint 9 Mini-Pha 4 (2026-05-17)

---

## 1. Module folder names vs `_MODULE` constants

### Design intent

| Layer | Convention | Lý do |
|---|---|---|
| **Folder names** | hyphen (kebab-case) hoặc snake_case | Human-readable cho file system |
| **`_MODULE` constants** | snake_case (underscore) | Medusa v2 framework requirement |

### Ví dụ

```typescript
// File path: medusa/src/modules/ai-livestream/index.ts (folder = hyphen)
import { Module } from "@medusajs/framework/utils"
import AiLivestreamService from "./service"

export const AI_LIVESTREAM_MODULE = "ai_livestream"  // constant MUST snake_case
export default Module(AI_LIVESTREAM_MODULE, { service: AiLivestreamService })
```

### 26 modules hiện tại (Sprint 9B audit)

**15 hyphen folder names:**
ai-livestream, ai-platform, audit-log, auth-security, catalog-ext, fulfillment-pro, live-commerce, marketing-ads, marketing-email, media-layer, notification-bus, payment-abstract, search-platform, tax-engine, vn-sourcing

**11 underscore/no-hyphen folder names:**
communication, dispute, escrow, experimentation, gdpr, marketplace, rbac, returns, rfq, supplier_application, tenant

→ **100% module constants dùng underscore** (Sprint 9A Pha 0 v2 D14 fix). Folder names KHÔNG đổi (design intent).

### ⚠ KHÔNG nhầm

- ❌ `AI_LIVESTREAM_MODULE = "ai-livestream"` (Medusa v2 reject)
- ✅ `AI_LIVESTREAM_MODULE = "ai_livestream"`
- ✅ Folder path `src/modules/ai-livestream/` (hyphen OK)

---

## 2. Tenant ID convention

### Canonical: `'csr'`

**Sprint 1 R20 design:**
- 15 tables schema defaults: `tenant_id varchar NOT NULL DEFAULT 'csr'`
- 48+ rows seed data dùng `'csr'`
- RLS bypass role: `csr_admin` (PostgreSQL)
- Storefront slug: `DEFAULT_TENANT.slug = 'csr'` (`src/lib/tenant/index.ts`)

**Deviation đã REVERT:**
- Sprint 9A ad-hoc dùng `'cybersilkroads'` (4 endpoint defaults + 7 supplier_application rows)
- Sprint 9B Pha 1d-a v2 D20-a EXPANDED: REVERT toàn bộ về `'csr'` canonical

### ⚠ KHÔNG nhầm

- ❌ Code default tenant: `'cybersilkroads'` (deprecated Sprint 9B)
- ✅ Code default tenant: `'csr'`
- ✅ Brand display name: `'Cybersilkroads'` (logo, footer, email — UI label, KHÔNG tenant context)

### UUID convention (defer Sprint 10+ verify)

Storefront `DEFAULT_TENANT.tenantId = '11111111-2222-3333-4444-555555555555'` (UUID format).

Có thể là multi-tenant FK design (chưa verified Sprint 9B). **Sprint 10+ task: audit + clarify mối quan hệ giữa UUID `tenantId` (storefront) vs slug `'csr'` (DB schema).**

---

## 3. Ngôn ngữ user-facing

### Tuyệt đối: TIẾNG VIỆT THUẦN

**Áp dụng cho:**
- Commit messages (Conventional Commits format + Vietnamese description)
- Documentation (`docs/`, `CMS/`, README)
- UI copy (admin + storefront, including admin/routes/* labels)
- Error messages user-facing
- Comments quan trọng giải thích "Why"

**Ngoại lệ thuật ngữ kỹ thuật giữ tiếng Anh:**
- Git/CI: commit, push, build, deploy
- HTTP/REST: status codes, methods, URL paths
- Stack: API, SDK, Server Action, MedusaService, Mikro-ORM
- Database: migration, sequence, partition, RLS, FK, CHECK
- Code identifiers: variable names, function names, class names

### Lý do

Sprint 10+ roadmap có đa ngôn ngữ (vi/en/zh). Phải có version tiếng Việt "thuần" làm canonical baseline trước khi i18n sang en/zh.

---

## 4. Pattern raw-SQL vs MedusaService factory

### 25 Sprint 1 R20 modules: raw-SQL pattern

```typescript
// Pattern Sprint 1 R20 era (25 modules)
import { MedusaService } from "@medusajs/framework/utils"
import { queryT, withTenant, type TenantContext } from "../../lib/db/pg"

class XService extends MedusaService({}) {
  async listX(ctx: TenantContext, filters: any, opts: any) {
    return withTenant(ctx, async (client) => {
      const { rows } = await client.query("SELECT * FROM schema.table WHERE ...", [...])
      return rows
    })
  }
}
```

### 1 Sprint 9A NEW module: MedusaService factory

```typescript
// Pattern Sprint 9A Pha 1a NEW (supplier_application)
import { MedusaService } from "@medusajs/framework/utils"
import { SupplierApplication } from "./models/supplier-application"

class SupplierApplicationService extends MedusaService({
  SupplierApplication,  // Mikro-ORM model defined
}) {
  // Auto-methods: listSupplierApplications, retrieveSupplierApplication,
  //               createSupplierApplications, updateSupplierApplications, etc.
}
```

### Sprint 10+ refactor scope

**L20 24-module audit (Sprint 10):** discovery phase identify broken raw-SQL modules. Read-only Layer 0+1+1b STRICT audit. Output: severity-ranked list.

**Sprint 11+ rewrite batches:** convert broken modules sang MedusaService factory pattern (giống supplier_application Sprint 9A Pha 1a). Estimate 6-10h per module × 25 = **150-250h dedicated maintenance Sprint 10-12**.

**Trade-off Sprint 9A Pha 0 v2 D10:** 3 modules với `defineLink` commented out (escrow, marketplace, catalog-ext) — Sprint 10+ refactor scope priority.

---

## 5. Migration files convention

### Numbering + naming

`medusa/migrations/NNN_description_snake_case.sql`

- NNN: 3-digit zero-padded (049, 050, 051)
- description: snake_case, action-verb-first
- Examples:
  - `048_audit_event_partition_poc.sql` (Sprint 8 stub, Sprint 9B Pha 3 applied)
  - `049_recreate_critical_indexes.sql` (D22 STUB — Sprint 8 left fill pending load test)
  - `050_rfq_sequences_and_d20a_revert.sql` (Sprint 9B Pha 1d-a v2)

### Apply tracking

Tất cả migrations apply qua `admin.migration_log`:

```sql
INSERT INTO admin.migration_log (migration_file, status, applied_at, notes)
VALUES ('NNN_filename.sql', 'success', NOW(), 'Brief description');
```

### Pattern rules (Sprint 8 D11 codified)

- File extension: `.sql` (raw SQL — KHÔNG ORM migrations vì Sprint 1 R20 pattern)
- `BEGIN; ... COMMIT;` transaction wrap
- Idempotent: `CREATE ... IF NOT EXISTS`, `INSERT ... ON CONFLICT DO NOTHING`
- Verify queries cuối file (`\echo === Verify ===` + SELECT)
- Header comments: Sprint reference + intent + rollback plan

---

## 6. Git workflow (D08 simplified)

```
main      ←  production (Rule 4: KHÔNG đụng)
develop   ←  staging integration (Rule 4: KHÔNG đụng)
cms       ←  Coordinator + Phương workflow (Sprint 1-9B branch)
giaodien  ←  DEMO visual only (Rule 3: KHÔNG dùng cho code)
feature/* ←  feature branches
hotfix/*  ←  critical fixes
```

**KHÔNG có:**
- `release/*` branches (D08 simplified)
- Tags Sprint level (Rule 4 — chỉ tag khi merge to main)

**Commit messages:**
- Conventional Commits: `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `test:`
- Vietnamese description (Rule 9)
- Reference Sprint + Phase + Bước trong title

---

## 7. HARD RULES (Coordinator + Claude Code MUST NEVER violate)

1. **Rule 1**: File tracked commit cùng turn (không sed lén + giả query)
2. **Rule 2**: Backup trước wipe data (`payload db:push` CẤM, drop schema CẤM unless backup verified)
3. **Rule 3**: Branch `giaodien` = DEMO visual only (KHÔNG dùng cho code production)
4. **Rule 4**: KHÔNG đụng `main`/`develop` cho đến Sprint 7 staging hoàn tất
5. **Rule 5**: Validation script ≠ ground truth — luôn audit ground truth trước fix
6. **Rule 6**: Schema change MUST migration file (KHÔNG psql ad-hoc DDL)
7. **Rule 7**: Multi-layer ground truth audit (Layer 0 DB + 1 service + 1b cascade + 3 runtime)
8. **Rule 8**: Best-effort UX 2-tier (mechanical auto + design needs spec) + Rule 8 phụ plan deviation handling
9. **Rule 9**: Tiếng Việt thuần (UI + commits + docs)

---

## 8. Lessons codified (Rule 8 phụ framework)

21 lessons L1-L21 cumulative (Sprint 1-9B):

- **L1-L7** (Sprint 5-6 base patterns):
  - L1 Phase 1 inventory critical
  - L2 Plan vs reality scope reframing
  - L3 Infrastructure ROI > polish ROI
  - L4 Critical missing pages > polish
  - L5 Pre-existing bug discovery
  - L6 Inline styles classification
  - L7 Hex literals 4-category framework
- **L8** Coordinator escalation handling protocol (Sprint 9A reshape)
- **L9** Plan vs reality verification — recent reports (Sprint 9A)
- **L10** Maintenance phase scope expansion multi-same-era (Sprint 9A Pha 0 v2)
- **L11** Layer 1b usage scan trước rename (Sprint 9A Pha 0 v2)
- **L12** Mikro-ORM `model.dateTime().default(new Date())` cấm (Sprint 9A Pha 1a)
- **L13** Atomic phase split khi scope >12h (Sprint 9A Pha 1+2, Sprint 9B Pha 1d)
- **L14** Endpoint inventory pre-flight check (Sprint 9A Pha 1b v2)
- **L15** Service signature audit Medusa standard vs raw-SQL (Sprint 9A Pha 2a)
- **L16** Layer 0 STRICT cột-by-cột (Sprint 9B Pha 1d)
- **L17** Module rewrite cascade Layer 1b outside folder (Sprint 9B Pha 1d)
- **L18** Layer 0 cascade audit FULL system trước migration (Sprint 9B Pha 1d-a)
- **L19** CHECK + FK + enum + seed audit cùng column types (Sprint 9B Pha 1d-a v2)
- **L20** Sprint 1 R20 era architectural debt — 3 modules confirmed pattern (Sprint 9B Pha 2b)
- **L21** Multi-module Sprint 1 R20 audit MUST trước paste plan touch service methods (Sprint 9B Pha 2b)

---

## 9. MODULE_CONST naming ≠ DB schema naming (L22 — Sprint 10 Pha 1)

### Insight

Sprint 9A D14 fix renamed `_MODULE` constants từ hyphen sang underscore (e.g., `AI_LIVESTREAM_MODULE = "ai_livestream"`) — đây là **Medusa v2 framework requirement**, KHÔNG correlate với DB schema names. DB schemas designed semantic-first (Sprint 1 R20 era).

### Sprint 10 Pha 1 discovery — 17/26 modules mismatch

| MODULE_CONST | DB schema queried | Schema table count |
|---|---|---|
| `ai_livestream` | `live.*` | 78 tables |
| `ai_platform` | `ai.*` | 18 tables |
| `escrow` | `payment.*` | 19 tables |
| `marketing_ads` | `advertising.*` | 44 tables |
| `marketing_email` | `email_mkt.*` | 25 tables |
| `live_commerce` | `live.*` (cùng ai_livestream) | 78 tables |
| `tax_engine` | `tax.*` | 17 tables |
| `auth_security` | `auth.*` | 29 tables |
| `audit_log` | `audit.*` | 22 tables |
| `notification_bus` | `notification.*` | 9 tables |
| `payment_abstract` | `payment.*` | 19 tables |
| `search_platform` | `search.*` | 19 tables |
| `media_layer` | `media.*` | 28 tables |
| `fulfillment_pro` | `fulfillment.*` | 15 tables |
| `catalog_ext` | `catalog.*` | 14 tables |
| `marketplace` | `identity.*` | 8 tables |
| `tenant` | `admin.*` + `tenant.*` | 13 tables |

### Pattern audit — TRƯỚC assume schema based on MODULE_CONST

```bash
# Step 1: Extract actual schema refs từ service
grep -oE "(FROM|INTO|UPDATE)\s+[a-z_]+\.[a-z_]+" service.ts | sort -u

# Step 2: Cross-reference với existing schemas
docker compose exec -T postgres psql -U postgres -d medusa \
  -c "SELECT schemaname FROM pg_tables GROUP BY schemaname"

# Step 3: Schema name pass ≠ column-level pass (L19 separate concern)
```

### Hệ quả Sprint 10 audit

- Schema-name pass: 24/26 modules (chỉ `returns` suspect + `supplier_application` factory)
- Column-level pass: 2/26 confirmed (rfq + supplier_application)
- Column-level fail: 4/26 RED confirmed (communication D21, escrow D23, marketplace D24, catalog-ext D25)
- Column-level TBD: 20/26 (Sprint 11+ per-module STRICT audit needed)

### Bài học correction

Sprint 9A D14 fix focused Medusa framework naming. DB schema names = Sprint 1 R20 design layer (semantic grouping). **Two convention layers độc lập, không correlate.**

---

## References

- **Sprint roadmap:** `CMS/sprint-roadmap.md`
- **Sprint 9A reports:** `CMS/report/P9A-*.md`
- **Sprint 9B reports:** `CMS/report/P9B-*.md`
- **Audit closure:** `CMS/P9-AUDIT-CLOSURE.md`
- **Sprint 10 Pha 1 L20 audit:** `docs/sprint-10/L20-audit-report.md`
- **Tenant config storefront:** `storefront/src/lib/tenant/index.ts`
- **Env example:** `medusa/.env.example` (Mini-Pha 4 Bước 1)
- **Migration tracking:** `admin.migration_log` (DB table)

---

## Lesson 24 codified (Sprint 10 Pha 2d Bước 5 SWC syntax fix)

**L24 — Stub docstring cấm `*/` sequence trong path notation:**

SWC TypeScript parser (Medusa v2 build pipeline) silently fails khi gặp `*/` sequence trong JSDoc comment. Parser interprets `*/` as JSDoc terminator → comment ends early → next characters parsed as code → silent build success but module load fail at runtime.

**Pattern fix:**

```typescript
// FAIL — SWC parser silent fail
/**
 * Schema cols: geo_*/primary_currency, support_languages
 */

// PASS — comma separator
/**
 * Schema cols: geo lat/lng, primary_currency, support_languages
 */
```

**Discovery context:** Sprint 10 Pha 2d marketplace Bước 5 — `types.ts` stub docstring described schema cols using `geo_*/primary` notation → build PASS silently → runtime module load fail sau restart → commit `2011654` fix.

**Audit pattern khi viết stub docstrings:**
1. Search `*/` sequences trong JSDoc comments (TS/JS files)
2. Replace với comma separator hoặc backslash escape
3. Verify module load post-restart

**Hệ quả:** Sprint 11+ stub patterns (escrow, marketplace, catalog-ext defer modules) PHẢI follow L24.

---

## Lesson 25 codified (Sprint 10 Pha 2d Path D surprise)

**L25 — Cross-module dependency check critical Pha 1 audit:**

Sprint 10 Pha 1 L20 audit ranked marketplace RED based trên service ↔ schema column mismatch. Pre-emptive Coordinator estimate: Path B (refactor 6-10h) vì assumes UI consumers exist (Admin Supplier UI Sprint 9A).

Reality Bước 0 Pha 2d audit revealed:
- Sprint 9A NEW supplier-application backend dùng `public.supplier_application` table (KHÔNG `identity.supplier`)
- Admin Supplier UI Sprint 9A fetch `/admin/supplier-applications` (NOT marketplace endpoints)
- `marketplace.supplier` service methods HAS **0 UI consumers** (supplier-application module Sprint 9A independent)
- Path D drop SAFE (3h vs 6-10h Path B)

**Pattern: Pha 1 audit MUST include cross-module dependency mapping:**

1. Service A queries table T
2. Service B (Sprint 9A NEW) queries different table T2 với related semantic
3. UI consumer X fetches endpoint of A or B (verify which)
4. Path D safe ONLY IF UI consumer maps to B (not A)

**Sprint 11+ implications:**
- 20 TBD modules column-level audit Sprint 11+ MUST include UI consumer mapping
- Severity ranking refinement: RED + UI dependent → A/B path; RED + 0 UI → D drop safe


---

## Sprint 11 Lessons Codified (L23 final + L26-L29)

### Lesson 23 FINAL FORM (Sprint 11 closing — 10 reinforcements)

**L23 — Pha 1 RED ranking = noise filter only, bi-directional errors confirmed:**

10 reinforcements across Sprint 10-11:

**OVERSTATED examples (4 cases):**
- catalog-ext (Sprint 10): RED → ORANGE downgrade (1/6 broken)
- marketplace (Sprint 10): RED Path B prediction → Path D (0 UI consumers actual)
- returns (Sprint 11 Pha 2a): RED Path B → Path D drop (false positive ActionRefs)
- ai-livestream (Sprint 11 Pha 2f): RED biggest 8-12h → Path A 30min (1/11 broken)

**UNDERSTATED examples (2 cases):**
- escrow (Sprint 10): RED 1 method → DEEPER RED 8/8 broken + 3 cascade
- fulfillment-pro (Sprint 11 Pha 2e): YELLOW 1/4 → ORANGE 4/8 broken (SELECT gap)

**L23 final rules:**
- Pha 1 schema-name fail = inaccurate severity estimator
- Pha 1 method count = INSERT only (misses SELECT + UPDATE — L23 9th)
- Pha 1 UI consumer text-match = false positives (L27 fix needed)
- Pha 1 cascade depth = ONLY reliable dimension

**Sprint 12+ MANDATORY:** Bước 0 STRICT method-level audit BEFORE any plan commitment.

---

### Lesson 26 — Bulk SQL audit pattern (Sprint 11 Pha 1)

**L26 — `information_schema` EXISTS bulk verification 3-10x faster than per-module bash:**

Pattern: Extract INSERT targets grep → format as VALUES tuples → single SQL EXISTS query → instant verification across many modules.

**Sprint 11 metrics:**
- Sprint 10 per-module bash: 6 modules in 2h
- Sprint 11 bulk SQL: 20 modules in 3h = 3x speedup

Sprint 12+ Pha 1 audit MUST use L26 bulk pattern.

---

### Lesson 27 — Import-based UI consumer audit (Sprint 11 Pha 2a)

**L27 — UI consumer audit MUST distinguish import refs vs text matches:**

- FAIL pattern: `grep -rln $MODULE storefront/src/actions/` (text match → false positives from function names, JSON keys, comments)
- PASS pattern: `grep -rln 'from.*$MODULE|MODULE_CONST' storefront/src/actions/` (import-based, MODULE_CONST refs only)

**Sprint 11 Pha 2a returns:** Pha 1 ActionRefs=2 false positive → predicted Path B 4-6h → reality Path D drop 1.5h.

Sprint 12+ audit MUST use L27 import-based grep.

---

### Lesson 28 — Python+scp safe file writing pattern (Sprint 11 Pha 2b)

**L28 — Avoid SSH heredoc with template literals (backtick escape trap):**

FAIL pattern (Sprint 11 Pha 2b Bước 4 incident): SSH heredoc + TS template literals (backticks) → bash preserves backslashes literally → SWC parser fails with Unterminated template error.

PASS pattern (Sprint 11+ MUST use): Python script with plain string concat + scp transfer. Avoid template literals when writing files via SSH.

**L24 + L28 family (SWC silent failure traps):**
- L24 JSDoc */ terminator (Sprint 10 Pha 2d)
- L28 Heredoc backslash-backtick (Sprint 11 Pha 2b)

Sprint 12+ TS file writing MUST use Python+scp OR plain string concat.

---

### Lesson 29 — Strict module path grep pattern (Sprint 11 Pha 2d)

**L29 — Module audit grep MUST use strict path pattern:**

- FAIL pattern: `grep -rln 'from.*$M' path/` (substring match → 49 false positives for tenant from lib/tenant/context unrelated)
- PASS pattern: `grep -rln 'from.*modules/$M|${CONST}_MODULE' path/` (strict module path → 0 real cascade)

**L27 + L29 cumulative refinement (audit tooling progressive precision):**
- L27 (Pha 2a): bare keyword → import-based
- L29 (Pha 2d): substring from.*$M → strict from.*modules/$M

Sprint 12+ audit template MUST use L29 strict pattern by default.

---

## Sprint 12+ Audit Template (synthesized Sprint 10-11)

5-Dimension audit + L23-L29 lessons cumulative:

- **D1 Schema-name (L20):** docker compose exec postgres psql -c `\dt $SCHEMA.*`
- **D2 Method-level INSERT + SELECT + UPDATE (L23 9th — ALL types, not just INSERT):** grep service.ts
- **D3 Cascade depth (L29 strict):** grep `from.*modules/$M|${CONST}_MODULE` in jobs/workers/subs/api
- **D4 UI consumer (L27 import-based):** grep `from.*modules/$M|${CONST}_MODULE` in storefront/src/* + admin/routes
- **D5 Bulk INSERT targets verify (L26):** single SQL VALUES + EXISTS query

**Decision matrix:**
- Path A adapt (≥80% match + 1-2 broken): 4-6h
- Path B rewrite (40-79% OR 3+ broken): 6-10h
- Path C escalate (<40% + arch mismatch): TBD
- Path D drop (0 UI consumers + functional methods low): 1-2h
- Path D-partial (1-2 broken, preserve functional): 2-4h
- Path A minimal (1 line broken, 95% preserved): 0.5-1h
