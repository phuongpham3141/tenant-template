# Sprint 6 — Kiểm kê Seller-center (11 trang)

**Ngày:** 2026-05-15
**Sprint:** 6 Pha 1 (chỉ audit)
**Phương pháp:** Audit 4-trạng-thái (bài học Sprint 5)
**Phiên bản:** v2 — tuân thủ Rule 9 tiếng Việt thuần

## Plan deviation phát hiện (Rule 8 phụ — kiểu "build vs polish")

**Kế hoạch ban đầu mong đợi:** dashboard / orders / rfqs / messages / profile / analytics / pricing / livestream / inventory / settings (portal CRUD seller thông thường).

**Thực tế:** seller-center là **trang giới thiệu dịch vụ B2B sourcing**, KHÔNG phải portal CRUD. 11 trang thực tế là service offerings + landing:

1. `/seller-center` (root — overview)
2. `/seller-center/ai-assistant` (dịch vụ trợ lý AI)
3. `/seller-center/ai-livestream` (công cụ livestream AI — Tier 1-4 R22)
4. `/seller-center/domestic-cn` (dịch vụ thị trường Trung Quốc nội địa)
5. `/seller-center/export-na` (dịch vụ xuất khẩu Bắc Mỹ)
6. `/seller-center/gold-member` (thành viên cao cấp)
7. `/seller-center/logistics` (dịch vụ logistics)
8. `/seller-center/smart-expo` (tham gia hội chợ thông minh)
9. `/seller-center/trade-ehome` (dịch vụ Trade Ehome)
10. `/seller-center/trade-services` (gói dịch vụ thương mại)
11. `/seller-center/trading-service` (dịch vụ giao dịch)

→ Phạm vi Pha 2 Sprint 6 = **polish 11 trang landing dịch vụ**, KHÔNG phải xây CRUD seller dashboard. CRUD seller portal có thể defer Sprint 9 hoặc wire-up Sprint 7.

## Kiểm kê 4-trạng-thái

| # | Trang | LOC | Client | Fetch data | Form | Hex | Inline | Ghi chú |
|---|------|----:|:------:|:----------:|:----:|----:|-------:|---------|
| 1 | (root dashboard) | 127 | Không | Không | Không | 4 | 0 | thiếu loading, thiếu empty |
| 2 | ai-assistant | 145 | Không | Không | Không | 0 | 0 | thiếu loading, thiếu empty, mobile mỏng (4) |
| 3 | ai-livestream | 107 | Không | Không | Không | 0 | 1 | thiếu loading, mobile mỏng (2) — **mồ côi: không có trong sidebar** |
| 4 | domestic-cn | 172 | Không | Không | Không | 2 | 1 | thiếu loading |
| 5 | export-na | 150 | Không | Không | Không | 2 | 1 | thiếu loading, thiếu empty |
| 6 | gold-member | 199 | Không | Không | Không | 0 | 0 | thiếu loading, thiếu empty, mobile mỏng (4) |
| 7 | logistics | 184 | Không | Không | Không | 0 | 0 | thiếu loading, thiếu empty, mobile mỏng (4) |
| 8 | smart-expo | 128 | Không | Không | Không | 0 | 0 | thiếu loading, thiếu empty |
| 9 | trade-ehome | 123 | Không | Không | Không | 0 | 0 | thiếu loading, thiếu empty |
| 10 | trade-services | 177 | Không | Không | Không | 0 | 0 | thiếu loading, thiếu empty |
| 11 | trading-service | 140 | Không | Không | Không | 0 | 0 | thiếu loading, thiếu empty, mobile mỏng (3) |

**Tổng kết:** tổng hex = **8**, tổng inline = 3, mockup thuần = **11/11**, tổng LOC = **1652**.

## So sánh pattern Sprint 5

| Khía cạnh | Sprint 5 buyer-center | Sprint 6 seller-center | Ghi chú |
|---|---|---|---|
| Số trang | 12 | 11 | quy mô tương tự |
| Server components | 12/12 | 11/11 | pattern giống hệt |
| Fetch dữ liệu | 0/12 | 0/11 | giống hệt (mockup) |
| Form | 2/12 (Liên hệ, Đăng RFQ) | 0/11 | seller-center không có form |
| Hex baseline | 0 | 8 | seller sạch hơn |
| Phủ loading state | 0/12 | 0/11 | gap giống hệt |
| Phủ empty state | 0/12 | 9/11 thiếu | gap tương tự |

→ Seller-center phản chiếu pattern buyer-center + ít hơn 1 layer form = **ít công wire hơn Sprint 6**.

## Audit sidebar nav seller

10 mục nav trong `src/components/seller/sidebar.tsx`. Cả 10 link tới trang đã tồn tại ✅.

**Vấn đề:** `/seller-center/ai-livestream` page tồn tại nhưng KHÔNG xuất hiện trong sidebar nav → trang mồ côi (quyết định Pha 2: thêm vào nav HOẶC bỏ trang).

## SDK / actions imports

**0 imports** trong toàn bộ seller-center. Mockup tĩnh hoàn toàn (giống buyer-center trước Sprint 5).

## Phân loại trang (lập kế hoạch Pha 2)

| Trang | Loại | Ưu tiên | Hành động |
|---|---|---|---|
| (root dashboard) | DASHBOARD | P0 | Polish — chào mừng + 4 thống kê + ô dịch vụ |
| ai-assistant | LANDING | P0 | Polish — showcase tính năng + CTA |
| ai-livestream | LANDING | P1 | Polish + **thêm vào sidebar** HOẶC bỏ |
| domestic-cn | LANDING | P1 | Polish — pitch thị trường |
| export-na | LANDING | P1 | Polish — pitch xuất khẩu + quy trình |
| gold-member | PRICING | P0 | Polish — bảng bậc + lợi ích + CTA nâng cấp |
| logistics | SERVICE | P1 | Polish — mô tả dịch vụ + cách hoạt động |
| smart-expo | SERVICE | P1 | Polish — thông tin hội chợ + CTA đăng ký |
| trade-ehome | SERVICE | P2 | Polish — tổng quan dịch vụ |
| trade-services | UMBRELLA | P0 | Polish — lưới dịch vụ link tới các trang khác |
| trading-service | SERVICE | P2 | Polish — mô tả dịch vụ |

## Kế hoạch thực thi Pha 2 (sơ bộ)

### Bước 1: Refactor mechanical (Rule 8 Tier 1)
- 8 hex literals → tokens (root 4, domestic-cn 2, export-na 2)
- 3 inline styles → refactor static nếu áp dụng được
- Tái sử dụng infrastructure Sprint 5 (EmptyState, Skeleton)

### Bước 2: Polish UX layout theo loại trang (Rule 8 Tier 2)
- Áp dụng convention B2B marketing-seller (hero dịch vụ + thẻ lợi ích + cách hoạt động + CTA)
- Thêm `loading.tsx` cho segment seller-center
- Thêm `error.tsx` cho segment seller-center
- Mobile responsive pass cho các trang mỏng (ai-assistant, ai-livestream, gold-member, logistics, trading-service)

### Bước 3: Xử lý ai-livestream mồ côi
- **Cần quyết định:** thêm vào sidebar HOẶC bỏ trang (escalate coordinator)
- Action mặc định Pha 2: THÊM vào sidebar (trang đã có content; coordinator có thể đổi ý)

## Tiêu chí chấp nhận Pha 2

- ✅ 11 trang seller-center publish-ready (mechanical + UX polish)
- ✅ Tái sử dụng infrastructure Sprint 5 (không component mới)
- ✅ 0 hex literals trong scope (8 → 0)
- ✅ Mobile responsive (≥ 10 hit/trang trên trang mỏng)
- ✅ `loading.tsx` + `error.tsx` cho segment `/seller-center/`
- ✅ ai-livestream mồ côi đã xử lý
- ✅ 100% tiếng Việt thuần (Rule 9)

## Câu hỏi cho coordinator (chuẩn bị Pha 2)

1. **ai-livestream mồ côi:** thêm vào sidebar (mặc định) hay bỏ trang?
2. **CRUD seller portal:** kế hoạch ban đầu ngụ ý seller portal có orders/products/analytics/inventory. Seller-center hiện tại KHÔNG có. Defer build Sprint 9/Sprint 7 hay thêm vào scope Sprint 6?
3. **Ngưỡng mobile responsive:** mục tiêu ≥10 hits/trang như Sprint 5? hay khác?
4. **Bảng bậc gold-member:** dữ liệu tĩnh đã có hay cần verify với coordinator?
