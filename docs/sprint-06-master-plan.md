# Kế hoạch tổng Sprint 6 — UX phần II.B (Seller + Info + Auth)

**Ngày:** 2026-05-15
**Sprint:** 6
**Quyền hạn:** Rule 8 Option B (best-effort UX) — codify Sprint 4
**Ngôn ngữ:** Tiếng Việt thuần (Rule 9 Sprint 5+ codified)
**Phiên bản:** v2 — re-write theo Rule 9 strict

## Tổng quan scope (sau khi check reality Pha 1)

| Nhóm | Kế hoạch ban đầu | Thực tế | Pha | Ghi chú |
|---|---:|---:|:---:|---|
| Seller-center | 11 | **11** | 2 | Trang giới thiệu dịch vụ, KHÔNG phải portal CRUD |
| Info pages | 7 | **8** | 3 | +1 sub-page (industry-news/[slug]) |
| Đăng nhập/đăng ký polish | 4 | **4** | 3 | 4 form tồn tại, **0 đã wire** |
| **Tổng scope** | 22 | **23** | | |

## Kế hoạch theo pha (per 3-cycle rule)

### Pha 1 — Kiểm kê + Lập kế hoạch (pha này) ✅
- Audit 4-trạng-thái seller-center 11 trang
- Audit info pages 8 + phân tích cụm hex (91 hex)
- Audit wire form đăng nhập/đăng ký 4 trang
- 3 docs output (doc này + 2 doc chi tiết)

### Pha 2 — Thực thi seller-center (~10-12h ước tính)
- Bước 1: Refactor mechanical (8 hex → 0)
- Bước 2: Polish UX layout 11 trang landing dịch vụ
- Bước 3: Loading.tsx + error.tsx cho segment `/seller-center/`
- Bước 4: Mục sidebar ai-livestream (xử lý mồ côi)
- Bước 5: Pass mobile responsive trên 5 trang mỏng

### Pha 3 — Info + Đăng nhập/đăng ký + đóng sprint (~12-15h ước tính)
- Bước 1: Mở rộng design token (19 → 22, thêm navy + navy-dark + teal-dark)
- Bước 2: Refactor mechanical info pages (91 hex → <20)
- Bước 3: Polish UX info pages (contact, ddp-calculator, network, disputes)
- Bước 4: Wire 4 form đăng nhập/đăng ký (fetch /api/auth/* routes)
- Bước 5: Đóng Sprint 6 + push origin/cms

## Bài học Sprint 5 áp dụng (5 bài học quan trọng)

✅ **Bài học 1 — Pha 1 kiểm tra reality:** Pha này audit kỹ TRƯỚC commit scope. Phát hiện:
- Seller-center thực tế = trang dịch vụ (không phải CRUD)
- Info hex 91 (không phải 78)
- Trang auth 4/4 có form nhưng 0 wire

✅ **Bài học 2 — Kiểm kê 4-trạng-thái:** Áp dụng cho seller-center (pattern mockup match buyer-center Sprint 5) + trang auth (trạng thái = form-chưa-wire).

✅ **Bài học 3 — Phát hiện bug có sẵn:** trang mồ côi ai-livestream (tồn tại nhưng không trong sidebar). 6 /api/auth route tồn tại nhưng trang không fetch.

✅ **Bài học 4 — Plan dự đoán có thể fail:** Pha 2/3 đang là draft trong doc này. Finalize specifics sau khi có reality Pha 1.

✅ **Bài học 5 — Pattern cụm hex:** Info pages 91 hex confirmed (ước tính Sprint 5 "78+" là cận dưới). Lớn hơn dự đoán → chiến lược điều chỉnh (cần 3 token mới, không chỉ refactor tới token sẵn có).

## Plan deviation Pha 1 đã flag (Rule 8 phụ)

### D1. Seller-center KHÔNG phải CRUD portal
Kế hoạch ban đầu giả định seller-center có trang orders/products/analytics/inventory. Thực tế: 11 trang giới thiệu dịch vụ (dịch vụ B2B sourcing). → Sprint 6 = polish 11 trang landing. CRUD seller portal defer Sprint 9 hoặc Sprint 7.

### D2. Info pages = 8 (không phải 7)
`industry-news/[slug]` là sub-page làm tổng = 8. Coi như trong scope.

### D3. Info hex = 91 (không phải 78+)
Ước tính kế hoạch là cận dưới. `network/page.tsx` một mình có 56 hex (61% của cụm). Chiến lược cần thêm 3 token mới.

### D4. Trang auth 4/4 form chưa wire
Kế hoạch nói "polish login/register". Thực tế: form tồn tại nhưng KHÔNG có onSubmit, action prop, useState, hay fetch /api/auth. 6 handler /api/auth route tồn tại (login, logout, password-reset, refresh, register, verify-otp). Pha 3 Sprint 6 phải WIRE cả 4.

Phát hiện mồ côi: trang `/seller-center/ai-livestream` tồn tại nhưng KHÔNG có trong sidebar.

## Áp dụng Rule 8

### Tier 1 (Claude Code tự quyết) ✅
- Refactor hex literals → tokens (8 seller + 91 info → max ~99 hex)
- Phân loại inline style (52 info inline — ứng viên refactor static)
- Tái sử dụng component (Sprint 5 EmptyState, Skeleton, ListSkeleton)
- Wire form qua fetch /api/auth/* (route handler đã sẵn)
- Đề xuất 3 design token mới (navy, navy-dark, teal-dark)

### Tier 2 (Best-effort UX — quyền Option B) ✅
- Convention B2B-marketing cho trang landing dịch vụ (hero + thẻ lợi ích + cách hoạt động + CTA)
- Layout nội dung info pages (pattern bài viết, UX calculator, luồng giải quyết tranh chấp)
- UX form auth (trạng thái lỗi, luồng redirect, UX OAuth/OTP)
- Nội dung empty state
- Cập nhật sidebar nav (xử lý mồ côi ai-livestream)

### Cấm (anti-pattern)
- ❌ Placeholder text trong code/commit/doc
- ❌ Mass conversion inline style không kiểm tra từng file
- ❌ Refactor hex semantic data (đỏ cờ Việt Nam #C8102E giữ nguyên)
- ❌ Silent plan deviation (Rule 8 phụ)

## Áp dụng Rule 9 (Sprint 5+ codified)

### Tiếng Việt thuần ✅
- UI copy: "Bảng điều khiển", "Đơn nhận được", "Yêu cầu báo giá đến"
- Form labels: "Tên doanh nghiệp", "Mã số thuế", "Ngành hàng"
- CTA: "Phản hồi RFQ", "Xác nhận đơn", "Cập nhật giá"
- Empty state: "Chưa có đơn nào", "Chưa có RFQ", "Chưa có sản phẩm"
- Commit message: tiếng Việt thuần
- Documentation: tiếng Việt thuần

### Tiếng Anh (ngoại lệ kỹ thuật) ✅
- API, SDK, hex, token (thuật ngữ)
- console.error/log (developer-facing)
- Tên file, route path
- Tên biến/function trong code

## Metrics mục tiêu (cuối Sprint 6)

| Metric | Cuối Sprint 5 | Mục tiêu cuối Sprint 6 | Trạng thái |
|---|---:|---:|:-:|
| Tổng hex literals (phương pháp Pha 1) | 196 | < 130 | Mục tiêu -34% |
| Hex cụm info | 91 | < 20 | Mục tiêu -78% |
| Hex scope seller | 8 | 0 | Mục tiêu -100% |
| Hex scope auth | 4 | 0 | Mục tiêu -100% |
| Design tokens | 19 | 22 (+navy, navy-dark, teal-dark) | thêm token |
| Convention files | 4 | 6 (+seller-center loading/error) | thêm file |
| Trang mới build | (Sprint 5: 8) | 0 (Sprint 6 chỉ polish) | — |
| Form auth đã wire | 0/4 | 4/4 | MỚI |
| Smoke seller flow | n/a | 11/11 routes (auth-gated 307→/login OK) | MỚI |
| Smoke info pages | n/a | 8/8 HTTP 200 | MỚI |
| Hex trang scope Sprint 6 | varied | 0/23 | MỚI |
| Compliance Rule 9 | n/a | 100% UI/commit/doc tiếng Việt | MỚI |

## Mapping điều kiện tiên quyết Sprint 7

Sau khi Sprint 6 hoàn thành:
- ✅ Luồng buyer (Sprint 5) + luồng seller + auth đã wire + info pages
- ✅ ~33/55 trang storefront publish-ready (60%)
- ✅ Tất cả form đã wire structure (Cart Sprint 5, Auth Sprint 6)
- ⏳ Phạm vi Sprint 7:
  - Tích hợp backend Cart context (Medusa SDK sync)
  - Admin custom features (verification tier, AI livestream control, VN sourcing)
  - Server Action form Liên hệ (defer Sprint 6)
  - API DDP calculator backend pricing (defer Sprint 6)
  - Wire backend 3 trang buyer-center MỚI (rfqs/messages/profile từ Sprint 5)

## Việc chuyển sang Sprint 9 (Option γ Sprint 5 + Pha 1 Sprint 6 confirms)

- 10 Sprint 4 carry-over UX layout polish
- 7 trang buyer-center còn lại (Sprint 5 đã bỏ qua per Option γ)
- /account/* page suite
- /order/[id] detail/tracking page
- CRUD seller portal (nếu cần — coordinator quyết định)
- 23 `loading.tsx` Sprint 4 carry-over

## Tiêu chí chấp nhận Sprint 6

- ✅ 11 seller-center đã polish
- ✅ 8 info pages đã polish (cụm hex đã dọn)
- ✅ 4 trang auth đã wire (đăng nhập/đăng ký hoạt động)
- ✅ 3 token mới đã thêm (navy, navy-dark, teal-dark)
- ✅ Convention files mở rộng (segment seller-center)
- ✅ Commits Sprint 6 push origin/cms
- ✅ Tất cả 4 plan deviation đã document (Rule 1)
- ✅ 100% tiếng Việt thuần (Rule 9)

## Câu hỏi cho coordinator (tổng hợp, 10 câu)

### Critical (block khởi động Pha 2)
1. **ai-livestream mồ côi:** thêm vào sidebar seller (mặc định) hay bỏ trang?
2. **Scope CRUD seller portal:** thêm Sprint 6 (orders/products/analytics/inventory) hay defer Sprint 9?
3. **Cách wire auth:** Server Actions (sạch hơn) hay fetch /api/auth/* (pattern sẵn có)?

### Quyết định token Pha 3
4. **Duyệt 3 token mới:** navy `#002557`, navy-dark `#001A3F`, teal-dark `#0E7490`?
5. **Verify tái sử dụng token sẵn có:** `#DC2626` → red? `#16A34A` → success? `#0E2A33` → brand-dark? `#7C3AED` → purple?
6. **Đỏ cờ Việt Nam `#C8102E`:** giữ làm literal semantic?

### Defer backend
7. **Form Liên hệ:** wire Sprint 6 Pha 3 thành Server Action hay defer Sprint 7?
8. **DDP calculator:** client-side tĩnh (Sprint 6) hay backend API (Sprint 7)?

### Tổng quát
9. **Ngưỡng mobile:** mục tiêu ≥10 mobile breakpoint hits/trang (pattern Sprint 5)?
10. **Cadence commit Pha 2 + 3:** 1 commit/Bước (pattern Sprint 5) hay grouped?

## Docs chi tiết

- [sprint-06-seller-center-inventory.md](sprint-06-seller-center-inventory.md)
- [sprint-06-info-pages-plan.md](sprint-06-info-pages-plan.md)

## Bước tiếp theo

Coordinator trả lời 10 câu hỏi → finalize scope Pha 2 v2 → thực thi polish seller-center.
