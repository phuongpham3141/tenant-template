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

## References

- **Sprint roadmap:** `CMS/sprint-roadmap.md`
- **Sprint 9A reports:** `CMS/report/P9A-*.md`
- **Sprint 9B reports:** `CMS/report/P9B-*.md`
- **Audit closure:** `CMS/P9-AUDIT-CLOSURE.md`
- **Tenant config storefront:** `storefront/src/lib/tenant/index.ts`
- **Env example:** `medusa/.env.example` (Mini-Pha 4 Bước 1)
- **Migration tracking:** `admin.migration_log` (DB table)
