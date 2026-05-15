# Sprint 6 — Kế hoạch Info pages (8 trang + dọn cụm hex)

**Ngày:** 2026-05-15
**Sprint:** 6 Pha 1 (chỉ audit)
**Phương pháp:** Phân tích cụm hex + đánh giá nội dung
**Phiên bản:** v2 — tuân thủ Rule 9 tiếng Việt thuần

## Plan deviation phát hiện

**Kế hoạch ban đầu mong đợi:** 7 info pages với ~78+ hex.

**Thực tế:** **8 info pages** (`/info/industry-news/[slug]` là sub-page), **91 hex literals**, `network/page.tsx` một mình có 56 hex (61% của cụm).

## Danh sách info pages (đã verify)

| # | Trang | LOC | Client | Data | Form | Hex | Arb `[#]` | Inline |
|---|------|----:|:------:|:----:|:----:|----:|---------:|-------:|
| 1 | `[topic]` (động) | 1404 | Không | Không | Không | 0 | 0 | 2 |
| 2 | `contact` | 656 | Có | Không | Không | 4 | 0 | 3 |
| 3 | `ddp-calculator` | 230 | Không | Không | Có | 0 | 0 | 0 |
| 4 | `disputes` | 701 | Không | Không | Không | 15 | 1 | 10 |
| 5 | `industry-news/[slug]` | 317 | Không | Không | Không | 1 | 1 | 4 |
| 6 | `industry-news` | 307 | Không | Không | Có | 2 | 2 | 5 |
| 7 | `network` | 1051 | Không | Không | Không | **56** | 2 | 18 |
| 8 | `sample-orders` | 733 | Không | Không | Không | 13 | 0 | 10 |

**Tổng kết:** tổng hex = **91**, tổng arb = 6, tổng inline = 52, tổng LOC = 4999.

## Phân tích cụm hex

- **Tổng hex literals:** 91
- **Ứng viên refactor (match 19 token có sẵn):** 6 (6.6%)
- **Ứng viên màu MỚI:** 85 (93.4%)

→ Chiến lược Pha 3 = chủ yếu **thêm token semantic mới** thay vì pure refactor.

### Top hex hotspot

| Trang | hex | Ưu tiên Sprint 6 |
|---|---:|---|
| network | 56 | P0 — cụm lớn nhất, mục tiêu 0 |
| disputes | 15 | P0 |
| sample-orders | 13 | P0 |
| contact | 4 | P1 |
| industry-news | 2 | P2 |
| industry-news/[slug] | 1 | P2 |
| [topic] | 0 | bỏ qua refactor |
| ddp-calculator | 0 | bỏ qua refactor |

### Top màu MỚI (ứng viên thêm token)

| Hex | Lần dùng | Tên token đề xuất | Ưu tiên Pha 3 |
|---|---:|---|---|
| `#002557` | 8 | `--color-navy` (xanh navy đậm) | P1 (thêm token) |
| `#001A3F` | 8 | `--color-navy-dark` (navy đậm hơn) | P1 (thêm token) |
| `#0E7490` | 6 | `--color-teal-dark` (teal đậm) | P1 (thêm token) |
| `#7C2D12` | 4 | giữ inline HOẶC `--color-rust` | P2 |
| `#92400E` | 4 | giữ inline HOẶC `--color-amber-dark` | P2 |
| `#DC2626` | 3 | dùng `--color-red` (#B81827) sẵn có? | P2 — verify visual |
| `#16A34A` | 3 | dùng `--color-success` (#2A9D8F) sẵn có? | P2 — verify visual |
| `#0E2A33` | 3 | dùng `--color-brand-dark` sẵn có? | P2 — verify visual |
| `#C8102E` | 3 | (đỏ cờ Việt Nam) giữ semantic | P2 — dữ liệu semantic |
| `#7C3AED` | 3 | dùng `--color-purple` (#A21CAF) sẵn có? | P2 — verify visual |
| Khác 5-8 | 2 mỗi | tùy trường hợp | P3 |

→ **3 token mới đề xuất** Sprint 6 Pha 3: `navy`, `navy-dark`, `teal-dark` (pattern Sprint 4: ≥6 lần dùng + ý nghĩa semantic).

## Chiến lược Pha 3 (Sprint 6 — info + đăng nhập/đăng ký + đóng sprint)

### Bước 1: Mở rộng design token info pages
- Thêm 3 token mới vào `globals.css @theme`: `navy`, `navy-dark`, `teal-dark`
- Số token: 19 → 22

### Bước 2: Refactor mechanical info pages
- Refactor 91 hex → tokens (vốn từ 22 token)
- Mục tiêu: 91 → <20 hex (dọn cụm info)
- Trang top `network`: 56 → 0 hex qua token mở rộng + giữ inline chỉ cho semantic
- Validate visual parity (không regression)

### Bước 3: Polish UX info pages (chọn lọc)
- **contact**: form nổi bật, giờ làm việc, placeholder bản đồ
- **ddp-calculator**: cải thiện UX (input + hiển thị kết quả tính toán)
- **disputes, sample-orders, network, industry-news**: polish layout (chủ yếu trang content server-render)

### Bước 4: Polish đăng nhập/đăng ký (xem section auth phía dưới)

### Bước 5: Đóng Sprint 6 + push origin/cms

## Hành động Pha 3 theo từng trang

| Trang | Mechanical | UX polish | Wire form | Ưu tiên |
|---|:-:|:-:|:-:|---|
| `[topic]` | — | — | — | bỏ qua (0 hex) |
| `contact` | refactor hex (4) | cải thiện layout | Server Action (defer) | P1 |
| `ddp-calculator` | — | UX calculator | client compute | P1 |
| `disputes` | refactor hex (15) | polish layout | — | P0 |
| `industry-news` | refactor hex (2) | pattern danh sách | search (defer) | P2 |
| `industry-news/[slug]` | refactor hex (1) | template bài viết | — | P2 |
| `network` | refactor hex (56) | lưới + địa điểm | — | P0 (lớn nhất) |
| `sample-orders` | refactor hex (13) | các bước quy trình | — | P0 |

## Tiêu chí chấp nhận info pages (Pha 3)

- ✅ 8 info pages publish-ready
- ✅ Hex literals cụm info: 91 → <20 (mục tiêu giảm ~78%)
- ✅ 3 token mới thêm (navy, navy-dark, teal-dark) → tổng 22
- ✅ Cấu trúc form Liên hệ sẵn sàng (defer Server Action Sprint 7 backend)
- ✅ DDP calculator client-side compute hoạt động
- ✅ Mobile responsive
- ✅ 100% tiếng Việt thuần (Rule 9)

## Câu hỏi cho coordinator (chuẩn bị Pha 3)

1. **Duyệt 3 token mới:** `navy` (#002557), `navy-dark` (#001A3F), `teal-dark` (#0E7490) — có match palette brand?
2. **Verify tái sử dụng token sẵn có:**
   - `#DC2626` → `red` (#B81827)?
   - `#16A34A` → `success` (#2A9D8F)?
   - `#0E2A33` → `brand-dark` (#003A42)?
   - `#7C3AED` → `purple` (#A21CAF)?
3. **Đỏ cờ Việt Nam `#C8102E`:** giữ làm literal semantic (màu cờ quốc gia)?
4. **Form Liên hệ Server Action:** wire Sprint 6 Pha 3 HAY defer Sprint 7?
5. **DDP calculator backend:** công thức client-side tĩnh (Sprint 6) hay wire backend pricing API (Sprint 7)?
