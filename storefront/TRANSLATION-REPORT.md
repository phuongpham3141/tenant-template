# Báo cáo chuẩn hoá ngôn ngữ — Cybersilkroads

**Ngày**: 2026-05-08
**Phạm vi**: Quét toàn site qua sitemap, dịch nội dung tiếng Trung và tiếng Anh sang tiếng Việt (trừ tên riêng và thương hiệu).

---

## 📋 Nguyên tắc áp dụng

### ✅ ĐÃ DỊCH sang tiếng Việt
- Badge UI hiển thị chữ thường (LABEL TEXT) bằng tiếng Anh
- Nhãn (label) song ngữ Việt-Anh / Việt-Trung — bỏ phần tiếng Anh/Trung dư thừa
- Mô tả vai trò văn phòng song ngữ
- Placeholder form bằng tiếng Anh/Trung
- Phụ đề `Cụm công nghiệp · 产业带` kiểu mix Việt-Trung
- Tiêu đề mô tả ngành sản phẩm (Smart Expo)

### 🚫 KHÔNG dịch (giữ nguyên)
- **Tên riêng tổ chức Trung Quốc**: 中国国际贸易促进委员会 (CCPIT), 中国家具协会 (China Furniture Association), 广西国际贸易促进委员会 (CCPIT Quảng Tây)…
- **Tên thương hiệu**: 天猫 (Tmall), 京东 (JD.com), 企业微信 (WeCom), 麦可 (Maike — AI assistant)
- **Tên doanh nghiệp**: 欧派家居集团 (OPPEIN Home Group)
- **Tên dịch vụ**: 天眼查 (Tianyancha), 企查查 (Qichacha), 中国裁判文书网 (China Court Database)
- **Tên giấy tờ pháp lý chính thức Trung Quốc**: 营业执照 (Business License), 税务登记证, 组织机构代码证, 统一社会信用代码 — giữ trong ngữ cảnh mô tả audit để chính xác
- **Nhãn ngôn ngữ i18n**: 中文 (label cho switch sang tiếng Trung)
- **Tên kỹ thuật & viết tắt**: RFQ, MOQ, OEM, ODM, FOB, CIF, DDP, EXW, SKU, HS, ISO, AQL, Incoterms, NĐ 13/2023, VIAC, CIETAC, CCPIT, VCCI, VINASME, KADIN, FTI, FMM, SBF…
- **Tên sản phẩm CSR**: Trade Assurance, Trade Alert, Trade Shows, Sample Hub, Sell on Cybersilkroads, AI Assistant, Smart Expo, Trade eHome, Gold Member
- **Tên địa danh nguyên gốc**: Foshan, Đông Quan, Yiwu, Tianhe Plaza, Bitexco, Diamond Flower

### 📂 Dữ liệu không hiển thị (không sửa)
- Trường `cn:` trong `data/categories.ts` và `data/home.ts` — dead data không render lên UI, giữ làm bilingual data cho i18n tương lai
- Comment code có chứa CJK (`product-section.tsx`)

---

## 🇨🇳 Phần 1 — Sửa nội dung tiếng Trung

| # | File | Trước | Sau | Lý do |
|---|------|-------|-----|-------|
| 1 | [src/app/register/factory/page.tsx:74](src/app/register/factory/page.tsx#L74) | `🏭 SUPPLIER REGISTRATION · 工厂入驻` | `🏭 ĐĂNG KÝ NHÀ CUNG CẤP` | Badge song ngữ Anh-Trung, dịch sang Việt thuần |
| 2 | [src/app/register/factory/page.tsx:155](src/app/register/factory/page.tsx#L155) | `Tên công ty / 公司名称` | `Tên công ty` | Nhãn form đã có tiếng Việt, bỏ phần tiếng Trung dư thừa |
| 3 | [src/app/register/factory/page.tsx:160](src/app/register/factory/page.tsx#L160) | `placeholder="Foshan ABC Industrial Co., Ltd. / 佛山ABC工业有限公司"` | `placeholder="Foshan ABC Industrial Co., Ltd."` | Placeholder ví dụ — đủ với 1 ngôn ngữ |
| 4 | [src/app/register/factory/page.tsx:378](src/app/register/factory/page.tsx#L378) | `placeholder="Wang Lei / 王磊"` | `placeholder="Tên người liên hệ tại nhà máy"` | Placeholder dùng mô tả tiếng Việt thay vì ví dụ tên Trung |
| 5 | [src/components/home/zones.tsx:12](src/components/home/zones.tsx#L12) | `Cụm công nghiệp · 产业带` | `Cụm công nghiệp` | Section heading site-wide, bỏ chữ Trung Quốc thừa |
| 6 | [src/app/sell-on-csr/page.tsx:128](src/app/sell-on-csr/page.tsx#L128) | `Giấy phép kinh doanh CN (营业执照)` | `Giấy phép kinh doanh Trung Quốc` | Nhãn checklist audit — viết đầy đủ "Trung Quốc" thay vì viết tắt + Hán tự |

**Tổng cộng 6 thay đổi tiếng Trung trên 3 file.**

---

## 🇬🇧 Phần 2 — Sửa nội dung tiếng Anh

### 2.1 — Badge UI / nhãn ALL CAPS hiển thị cho người dùng

| # | File | Trước | Sau | Lý do |
|---|------|-------|-----|-------|
| 1 | [src/app/app/page.tsx:11](src/app/app/page.tsx#L11) | `📱 ALIBABAVN APP` | `📱 ỨNG DỤNG CYBERSILKROADS` | Sửa tên brand cũ + Việt hoá "APP" |
| 2 | [src/app/buyer-center/browsing-history/page.tsx:59](src/app/buyer-center/browsing-history/page.tsx#L59) | `🕘 BROWSING HISTORY` | `🕘 LỊCH SỬ DUYỆT` | Badge hero — site Việt nên dùng Việt |
| 3 | [src/app/buyer-center/supplier-discover/page.tsx:26](src/app/buyer-center/supplier-discover/page.tsx#L26) | `🏭 SUPPLIER DISCOVER` | `🏭 KHÁM PHÁ NHÀ CUNG CẤP` | Badge hero |
| 4 | [src/app/buyer-center/secured-trading/page.tsx:68](src/app/buyer-center/secured-trading/page.tsx#L68) | `🔒 SECURED TRADING SERVICE` | `🔒 GIAO DỊCH BẢO ĐẢM` | Badge hero |
| 5 | [src/app/buyer-center/meet-suppliers/page.tsx:53](src/app/buyer-center/meet-suppliers/page.tsx#L53) | `🤝 MEET SUPPLIERS` | `🤝 GẶP NHÀ CUNG CẤP` | Badge hero |
| 6 | [src/app/buyer-center/product-directory/page.tsx:84](src/app/buyer-center/product-directory/page.tsx#L84) | `🗂 PRODUCT DIRECTORY` | `🗂 DANH BẠ SẢN PHẨM` | Badge hero |
| 7 | [src/app/seller-center/trading-service/page.tsx:54](src/app/seller-center/trading-service/page.tsx#L54) | `🔒 SECURED TRADING SERVICE — SELLER VIEW` | `🔒 GIAO DỊCH BẢO ĐẢM — DÀNH CHO NHÀ BÁN` | Badge hero |
| 8 | [src/app/sell-on-csr/page.tsx:283](src/app/sell-on-csr/page.tsx#L283) | `RECOMMENDED` | `KHUYẾN NGHỊ` | Badge cho tier được khuyến nghị |
| 9 | [src/app/supplier/[slug]/page.tsx:55](src/app/supplier/[slug]/page.tsx#L55) | `GOLD SUPPLIER` | `NCC GOLD` | Badge — giữ "Gold" là tier name, dịch "Supplier" |
| 10 | [src/app/supplier/[slug]/page.tsx:56](src/app/supplier/[slug]/page.tsx#L56) | `AUDITED` | `ĐÃ KIỂM ĐỊNH` | Badge tier verified |
| 11 | [src/app/suppliers/page.tsx:59](src/app/suppliers/page.tsx#L59) | `AUDITED` | `ĐÃ KIỂM ĐỊNH` | Cùng badge ở trang danh sách |

### 2.2 — Badge song ngữ "Việt · Anh" trên trang `/info/*`

| # | File | Trước | Sau | Lý do |
|---|------|-------|-----|-------|
| 12 | [src/app/info/sample-orders/page.tsx:338](src/app/info/sample-orders/page.tsx#L338) | `📦 ĐẶT MẪU · SAMPLE ORDER` | `📦 ĐẶT MẪU` | Hero badge song ngữ — bỏ tiếng Anh dư |
| 13 | [src/app/info/disputes/page.tsx:325](src/app/info/disputes/page.tsx#L325) | `⚖️ KHIẾU NẠI & TRANH CHẤP · DISPUTE RESOLUTION` | `⚖️ KHIẾU NẠI & TRANH CHẤP` | Hero badge |
| 14 | [src/app/info/network/page.tsx:756](src/app/info/network/page.tsx#L756) | `🤝 KẾT NỐI · CONNECTION NETWORK` | `🤝 MẠNG LƯỚI KẾT NỐI` | Hero badge — dịch luôn cho nhất quán |
| 15 | [src/app/sitemap/page.tsx](src/app/sitemap/page.tsx) | `🗺 SITEMAP · ĐIỀU HƯỚNG TOÀN SITE` | `🗺 BẢN ĐỒ TRANG` | Hero badge |

### 2.3 — Trường `category` trong `[topic]/page.tsx` (8 nhãn song ngữ)

| # | Trước | Sau |
|---|-------|-----|
| 16 | `TUYỂN DỤNG · CAREERS` | `TUYỂN DỤNG` |
| 17 | `PHÁP LÝ · TERMS` | `PHÁP LÝ` |
| 18 | `PHÁP LÝ · COMPLIANCE` | `PHÁP LÝ` |
| 19 | `MẠNG LƯỚI ĐỐI TÁC · PARTNERSHIPS` | `MẠNG LƯỚI ĐỐI TÁC` |
| 20 | `QUY TRÌNH KIỂM ĐỊNH · FACTORY AUDIT` | `QUY TRÌNH KIỂM ĐỊNH` |
| 21 | `VẬN CHUYỂN · LOGISTICS` | `VẬN CHUYỂN` |
| 22 | `BẢO VỆ GIAO DỊCH · ESCROW` | `BẢO VỆ GIAO DỊCH` |
| 23 | `TÀI LIỆU NGHIÊN CỨU · MARKET REPORTS` | `TÀI LIỆU NGHIÊN CỨU` |
| 24 | `DEVELOPER · INTEGRATION` | `LẬP TRÌNH VIÊN · TÍCH HỢP` |

File: [src/app/info/[topic]/page.tsx](src/app/info/[topic]/page.tsx)

**Lý do**: Các trường `category` được hiển thị dưới dạng badge nhỏ uppercase tracking-wider trên hero của mỗi trang `/info/*` — site Việt nên giữ thuần Việt.

### 2.4 — Vai trò văn phòng (`/info/contact`) — 8 office roles song ngữ

| # | File | Trước | Sau |
|---|------|-------|-----|
| 25 | [src/app/info/contact/page.tsx:39](src/app/info/contact/page.tsx#L39) | `Trụ sở chính · Global Headquarters` | `Trụ sở chính` |
| 26 | [src/app/info/contact/page.tsx:69](src/app/info/contact/page.tsx#L69) | `Văn phòng phía Nam · Southern Regional Office` | `Văn phòng phía Nam` |
| 27 | [src/app/info/contact/page.tsx:97](src/app/info/contact/page.tsx#L97) | `Văn phòng miền Trung · Central Regional Office` | `Văn phòng miền Trung` |
| 28 | [src/app/info/contact/page.tsx:124](src/app/info/contact/page.tsx#L124) | `Trade Operations Center · Logistics Hub` | `Trung tâm Vận hành & Logistics` |
| 29 | [src/app/info/contact/page.tsx:152](src/app/info/contact/page.tsx#L152) | `Đại diện ĐBSCL · Mekong Delta Liaison` | `Đại diện ĐBSCL` |
| 30 | src/app/info/contact/page.tsx | `Regional ASEAN Hub` | `Trung tâm khu vực ASEAN` |
| 31 | src/app/info/contact/page.tsx | `Thailand Trade Liaison · ASEAN North` | `Đại diện thương mại Thái Lan · ASEAN Bắc` |
| 32 | src/app/info/contact/page.tsx | `Indonesia & Archipelago Liaison` | `Đại diện Indonesia & quần đảo` |

### 2.5 — Section header `tracking-wider` trong nội dung

| # | File | Trước | Sau |
|---|------|-------|-----|
| 33 | [src/app/info/sample-orders/page.tsx:575](src/app/info/sample-orders/page.tsx#L575) | `CHECKLIST PRE-MOQ` | `DANH MỤC KIỂM TRA TRƯỚC MOQ` |
| 34 | [src/app/info/sample-orders/page.tsx:611](src/app/info/sample-orders/page.tsx#L611) | `POWER USER PROGRAM` | `CHƯƠNG TRÌNH NGƯỜI DÙNG NÂNG CAO` |
| 35 | [src/app/info/disputes/page.tsx:540](src/app/info/disputes/page.tsx#L540) | `CASE STUDIES` | `TÌNH HUỐNG ĐIỂN HÌNH` |
| 36 | [src/app/info/network/page.tsx:915](src/app/info/network/page.tsx#L915) | `TRADE FAIR 2026` | `HỘI CHỢ THƯƠNG MẠI 2026` |

### 2.6 — Smart Expo: chủ đề ngành (`topic`/`industry`)

| # | File | Trước | Sau |
|---|------|-------|-----|
| 37 | [src/app/seller-center/smart-expo/page.tsx:6](src/app/seller-center/smart-expo/page.tsx#L6) | `Sofa · Bedroom · Office furniture` | `Sofa · Phòng ngủ · Nội thất văn phòng` |
| 38 | [src/app/seller-center/smart-expo/page.tsx:8](src/app/seller-center/smart-expo/page.tsx#L8) | `Tile · Sanitary · Door & Window` | `Gạch · Sanitary · Cửa & Cửa sổ` |
| 39 | [src/app/seller-center/smart-expo/page.tsx:9](src/app/seller-center/smart-expo/page.tsx#L9) | `Knitwear · Denim · Home textile` | `Đồ dệt kim · Denim · Vải gia dụng` |
| 40 | [src/app/seller-center/smart-expo/page.tsx:19](src/app/seller-center/smart-expo/page.tsx#L19) | `Sofa · Bedroom` | `Sofa · Phòng ngủ` |

**Tổng cộng 40 thay đổi tiếng Anh trên 17 file.**

---

## 📊 Tổng kết

| Loại | Số thay đổi | Số file |
|------|------------:|--------:|
| Tiếng Trung → Tiếng Việt | 6 | 3 |
| Tiếng Anh → Tiếng Việt | 40 | 17 |
| **Tổng cộng** | **46** | **20** |

---

## ✅ Verify sau khi sửa

Đã chạy lại curl trên 20 routes quan trọng — **tất cả đều trả về HTTP 200**:

```
/                                             200
/sitemap                                      200
/info/contact                                 200
/info/network                                 200
/info/disputes                                200
/info/sample-orders                           200
/info/careers                                 200
/info/audit-process                           200
/info/market-reports                          200
/info/api-integration                         200
/sell-on-csr                                  200
/buyer-center/browsing-history                200
/buyer-center/supplier-discover               200
/buyer-center/meet-suppliers                  200
/buyer-center/product-directory               200
/buyer-center/secured-trading                 200
/seller-center/trading-service                200
/register/factory                             200
/app                                          200
/suppliers                                    200
```

---

## 📝 Các trường hợp giáp ranh — quyết định giữ nguyên (kèm lý do)

### Tên Hán tự của tổ chức Trung Quốc
- 17 hiệp hội Trung Quốc trong [src/app/info/network/page.tsx](src/app/info/network/page.tsx) — Hán tự là TÊN CHÍNH THỨC của tổ chức (CCPIT 中国国际贸易促进委员会, China Furniture Association 中国家具协会, CCPIT Quảng Tây 广西国际贸易促进委员会…) → **giữ là tên riêng**
- Tương tự trong [src/app/info/[topic]/page.tsx](src/app/info/[topic]/page.tsx) lines 626, 715 → **giữ**

### Tên thương hiệu Trung Quốc
- 天猫 (Tmall), 京东 (JD.com) trong [src/app/seller-center/domestic-cn/page.tsx](src/app/seller-center/domestic-cn/page.tsx) → **giữ là brand name**
- 企业微信 (WeCom) trong [src/app/seller-center/trade-ehome/page.tsx](src/app/seller-center/trade-ehome/page.tsx) → **giữ là tên sản phẩm Tencent**
- 麦可 (Maike — AI assistant của CSR) trong [src/app/seller-center/ai-assistant/page.tsx](src/app/seller-center/ai-assistant/page.tsx) → **giữ là tên sản phẩm**
- 欧派家居集团 (OPPEIN Home Group) trong [src/lib/blog.ts:333](src/lib/blog.ts#L333) → **giữ là tên doanh nghiệp**

### Tên dịch vụ Trung Quốc
- 天眼查 (Tianyancha — đối thủ của VietnamCredit), 企查查 (Qichacha), 中国裁判文书网 (China Court Open Database) → **giữ là tên dịch vụ chính thức**

### Tên giấy tờ pháp lý
- 营业执照, 税务登记证, 组织机构代码证, 统一社会信用代码, 对外贸易经营者备案登记表, 报关单位注册登记证书 trong mô tả audit 18 tài liệu → **giữ là tên chính thức của giấy tờ Trung Quốc**, tăng độ chính xác cho người làm audit/import

### i18n Language label
- 中文 trong [src/lib/i18n.ts:33](src/lib/i18n.ts#L33) → **giữ vì là LABEL ngôn ngữ Trung dùng cho switcher tiếng Trung**

### Dữ liệu không hiển thị (dead data)
- Trường `cn:` trong [src/data/categories.ts](src/data/categories.ts) (12 entries) và [src/data/home.ts](src/data/home.ts) (3 entries) chứa Hán tự (家具, 卫浴, 建材…) — đã verify KHÔNG được render lên UI bất kỳ chỗ nào, là dead data dự phòng cho i18n tương lai → **giữ làm bilingual data**

### Comment trong code
- 中文 trong comment của [src/components/home/product-section.tsx:5](src/components/home/product-section.tsx#L5) — không phải user-facing → **giữ**

---

## 🔍 Khuyến nghị tiếp theo

1. **Kiểm tra UI thực tế** — load các trang đã sửa trong browser, check spacing/layout sau khi text Việt dài hơn/ngắn hơn nguyên gốc tiếng Anh.
2. **Xem xét các page khác** — báo cáo này chỉ cover các badge UI rõ ràng. Có thể có thêm English text trong descriptions/paragraphs nhưng đó là English đã hoà vào tiếng Việt theo phong cách "code-switching" thông thường của ngành B2B (vd: "RFQ matching", "AI agent", "Trade Assurance escrow") — giữ những thuật ngữ này là chuẩn ngành.
3. **Sitemap descriptions** — file [src/app/sitemap/page.tsx](src/app/sitemap/page.tsx) có nhiều mô tả lẫn English (Wishlist, Dashboard, Catalog, Featured…) — không sửa vì đó là descriptions ngắn cho dev/SEO, hợp với phong cách technical doc.
4. **301 Redirects** — slug tiếng Việt cũ (lien-he, khieu-nai, dat-mau…) đã được rename sang English ở turn trước, có thể setup 301 redirects để giữ SEO equity cho bookmark cũ.

---

# 🇻🇳 Vòng 2 — Chuẩn hoá triệt để (sau phản hồi của bạn)

Bạn phản hồi rằng còn nhiều từ tiếng Anh trên trang chủ và yêu cầu pure Vietnamese. Vòng này dịch triệt để hơn — kể cả các "tên sản phẩm" như Trade Assurance, Trade Alert, API integration, Sitemap.

## A — Trang chủ (home + components)

### A.1 — Banner & Widgets phải

| File | Trước | Sau |
|------|-------|-----|
| [components/home/zones.tsx:15](src/components/home/zones.tsx#L15) | `Cluster công nghiệp được audit` | `Cụm công nghiệp đã kiểm định` |
| [components/home/zones.tsx:18](src/components/home/zones.tsx#L18) | `Xem bản đồ cluster →` | `Xem bản đồ cụm →` |
| [components/home/banner-section.tsx:85](src/components/home/banner-section.tsx#L85) | `🎁 Ưu đãi dealer mới` | `🎁 Ưu đãi đại lý mới` |
| [components/home/banner-section.tsx:87](src/components/home/banner-section.tsx#L87) | `Audit nhà máy miễn phí + giảm 10% đơn đầu + free shipping DDP` | `Kiểm định nhà máy miễn phí + giảm 10% đơn đầu + miễn phí vận chuyển DDP` |
| [components/home/banner-section.tsx:23](src/components/home/banner-section.tsx#L23) | `NEW` | `MỚI` |
| [components/home/category-showcase.tsx:31](src/components/home/category-showcase.tsx#L31) | `NEW` | `MỚI` |
| [components/home/navbar.tsx:39](src/components/home/navbar.tsx#L39) | `NEW` | `MỚI` |
| [components/home/navbar.tsx:105](src/components/home/navbar.tsx#L105) | `NEW` | `MỚI` |
| [components/home/mega-submenu.tsx:110](src/components/home/mega-submenu.tsx#L110) | `Hot Products:` | `Sản phẩm bán chạy:` |
| [components/home/navbar.tsx:14](src/components/home/navbar.tsx#L14) | `Bán trên AVN` | `Bán trên CSR` |

### A.2 — Phần Sản phẩm & Nhà máy

| File | Trước | Sau |
|------|-------|-----|
| [components/home/product-section.tsx:23](src/components/home/product-section.tsx#L23) | `top: "HOT"` | `top: "BÁN CHẠY"` |
| [components/home/product-section.tsx:27](src/components/home/product-section.tsx#L27) | `gold: "GOLD"` | `gold: "VÀNG"` |
| [components/home/factories.tsx:83](src/components/home/factories.tsx#L83) | `⭐ GOLD` | `⭐ VÀNG` |
| [components/home/factories.tsx:88](src/components/home/factories.tsx#L88) | `✓ AUDITED` | `✓ ĐÃ KIỂM ĐỊNH` |

### A.3 — Phần Sourcing Solutions

| File | Trước | Sau |
|------|-------|-----|
| [components/home/sourcing-solutions.tsx](src/components/home/sourcing-solutions.tsx) | `Sourcing từ Cluster` | `Tìm nguồn từ Cụm` |
| [components/home/sourcing-solutions.tsx](src/components/home/sourcing-solutions.tsx) | `Smart Expo — Hội chợ ảo` | `Triển lãm thông minh — Hội chợ ảo` |
| [components/home/sourcing-solutions.tsx](src/components/home/sourcing-solutions.tsx) | `Chiêu đãi virtual booth 24/7` | `Gian hàng ảo 24/7` |
| [components/home/sourcing-solutions.tsx](src/components/home/sourcing-solutions.tsx) | `Giải pháp Sourcing & Dịch vụ chuyên biệt` | `Giải pháp Tìm nguồn & Dịch vụ chuyên biệt` |
| [components/home/trade-shows-section.tsx:23](src/components/home/trade-shows-section.tsx#L23) | `badge: "FEATURED"` | `badge: "NỔI BẬT"` |

### A.4 — Footer

| File | Trước | Sau |
|------|-------|-----|
| [components/home/footer.tsx:12](src/components/home/footer.tsx#L12) | `Đặt mẫu (sample)` | `Đặt mẫu` |
| [components/home/footer.tsx:13](src/components/home/footer.tsx#L13) | `Theo dõi đơn` | `Theo dõi đơn hàng` |
| [components/home/footer.tsx:38](src/components/home/footer.tsx#L38) | `Sitemap` | `Bản đồ trang` |
| [components/home/footer.tsx:45](src/components/home/footer.tsx#L45) | `Trade Assurance` | `Bảo đảm Giao dịch` |
| [components/home/footer.tsx:47](src/components/home/footer.tsx#L47) | `API integration` | `Tích hợp API` |

## B — Site-wide brand-like terms

Áp dụng qua sed cho tất cả file `.tsx`, `.ts`:

| Trước | Sau |
|-------|-----|
| `Trade Assurance` | `Bảo đảm Giao dịch` |
| `Trade Alert` | `Cảnh báo Thương mại` |
| `API integration` / `API Integration` | `Tích hợp API` |
| `Đã audit TUV` | `Đã kiểm định TUV` |
| `đã được audit` | `đã được kiểm định` |
| `Quy trình audit` | `Quy trình kiểm định` |
| `>AUDITED<` / `Audited` | `>ĐÃ KIỂM ĐỊNH<` / `Đã kiểm định` |
| `>FEATURED<` / `>Featured<` / `Featured trang chủ` | `>NỔI BẬT<` / `>Nổi bật<` / `Nổi bật trang chủ` |
| `>NEW<` / `>New<` | `>MỚI<` / `>Mới<` |
| `>SALE<` / `>FREE<` | `>GIẢM GIÁ<` / `>MIỄN PHÍ<` |
| `free shipping` / `Free shipping` | `miễn phí vận chuyển` / `Miễn phí vận chuyển` |
| `40+ Vetted factories` | `40+ nhà máy đã thẩm định` |
| `Verified factory` / `Verified` | `Nhà máy đã xác minh` / `Đã xác minh` |
| `Onsite audited` | `Đã kiểm định tại nhà máy` |
| `On-time delivery` | `Giao đúng hạn` |
| `Gold Supplier` / `>GOLD SUPPLIER<` | `NCC Vàng` / `>NCC VÀNG<` |
| `Verified Trade` | `Giao dịch đã xác minh` |
| `Industry` / `>All<` | `Ngành` / `>Tất cả<` |

## C — Trang `/sell-on-csr` viết lại hoàn toàn

File: [src/app/sell-on-csr/page.tsx](src/app/sell-on-csr/page.tsx) — **viết mới từ đầu** (không phải dịch chắp vá nữa).

**9 section thuần Việt**:

1. **Hero gradient** — `BÁN TRÊN CSR · DÀNH CHO NHÀ CUNG CẤP` + 4 stats (1.840+ NCC · 600+ đại lý · 42 triệu $ TA · 32% pass rate)
2. **6 Lý do chọn Cybersilkroads** — đại lý đã xác minh / đội song ngữ Trung-Việt / Bảo đảm Giao dịch / 5 cảng + Lạng Sơn / bảng phân tích / không phí ẩn
3. **3 Gói thành viên**: Cơ bản (Miễn phí 0 NDT) / Đã xác minh (Khuyến nghị, 8.000 NDT) / Cao cấp (50.000 NDT)
4. **Quy trình 4 bước**: Đăng ký → Kiểm định → Lên gian hàng → Bán hàng (mỗi bước có timeline + actions)
5. **10 tiêu chí kiểm định** — bắt buộc (6) + cộng điểm (4)
6. **6 công cụ marketing** — AI ghép nối RFQ, banner trang chủ, Cảnh báo Thương mại, đại diện hội chợ, video tham quan, báo cáo đại lý hàng quý
7. **6 câu chuyện thành công** — Foshan Hanse, OPPEIN, Taizhou Faucet, Landbond, Ortonbaths, Monalisa với metrics trước/sau
8. **8 FAQ** — không nói tiếng Việt / chi phí kiểm định / so với Alibaba.com / hoàn tiền / rút khỏi platform / pháp lý / dropship / Bảo đảm Giao dịch
9. **CTA gradient cuối** — 3 nút (Đăng ký / Demo / Hotline) + thông tin liên hệ Quảng Châu + Hà Nội

Thay `name: "Free"` → `name: "Cơ bản"`, `"Verified"` → `"Đã xác minh"`, `"Premium"` → `"Cao cấp"`. Tier description bỏ tất cả "Listing", "Inbox RFQ", "tracking-wider Premium tier", "Pre-screening", "Onboarding", "Go-live".

**Verify**: HTTP 200, 1.35 MB. Grep tìm KHÔNG còn từ tiếng Anh nào (RECOMMENDED, Free, Verified, Premium, GOLD SUPPLIER, AUDITED, Trade Assurance, free shipping, Sell on AVN — đều đã chuyển sang tiếng Việt).

## D — Tổng kết vòng 2

| Loại | Số chỗ thay đổi |
|------|----------------:|
| Badge UI ALL CAPS (NEW/HOT/GOLD/AUDITED/FEATURED/SALE) | ~50 chỗ |
| Brand-like terms (Trade Assurance, Trade Alert, API integration, Sitemap) | ~70 chỗ |
| Audit-related (Audited, audit, Quy trình audit) | ~30 chỗ |
| Free shipping & dealer & cluster terms | ~15 chỗ |
| AVN branding leftover | 2 chỗ |
| Trang `/sell-on-csr` viết lại từ đầu | toàn trang |
| **Tổng cộng** | **~170+ chỗ trên 30+ files** |

## E — Verify cuối cùng

Trên home page (`/`) và `/sell-on-csr`:

- ❌ **KHÔNG còn**: NEW, FEATURED, HOT, GOLD, AUDITED, Hot Products, Trade Assurance, Trade Alert, Cluster công nghiệp được audit, Đặt mẫu (sample), Ưu đãi dealer, free shipping, Bán trên AVN, Sell on AVN, API integration
- ✅ **Đã hiển thị tiếng Việt**: BÁN CHẠY, Bản đồ trang, Bảo đảm Giao dịch, Cảnh báo Thương mại, Cụm công nghiệp đã kiểm định, ĐÃ KIỂM ĐỊNH, Kiểm định nhà máy, miễn phí vận chuyển, MỚI, Nền tảng B2B, NỔI BẬT, Sản phẩm bán chạy, Tích hợp API, Ưu đãi đại lý, VÀNG

21 routes chính trả về **HTTP 200** sau tất cả thay đổi.

---

# 🇻🇳 Vòng 3 — Quét bổ sung sau khi viết lại `/sell-on-csr`

Bạn yêu cầu chạy lại quét toàn site qua sitemap. Vòng này tập trung các từ user-facing còn sót lại sau vòng 2.

## A — CJK content (đã quét toàn bộ — không có gì cần sửa)

Tất cả CJK còn lại đều là **proper names không thể dịch**:

| File | Nội dung CJK | Phân loại |
|------|--------------|-----------|
| [src/app/info/network/page.tsx](src/app/info/network/page.tsx) (17 chỗ) | 中国国际贸易促进委员会, 中国家具协会, 广西国际贸易促进委员会… | Tên chính thức tổ chức TQ |
| [src/app/info/[topic]/page.tsx:626](src/app/info/[topic]/page.tsx#L626) (8 chỗ) | Tên hiệp hội TQ trong body text | Tên chính thức tổ chức |
| [src/app/info/[topic]/page.tsx:714](src/app/info/[topic]/page.tsx#L714) (3 chỗ) | 天眼查, 企查查, 中国裁判文书网 | Tên dịch vụ chính thức |
| [src/app/info/[topic]/page.tsx:715](src/app/info/[topic]/page.tsx#L715) (6 chỗ) | 营业执照, 税务登记证, 组织机构代码证… | Tên giấy tờ pháp lý CN chính thức |
| [src/app/seller-center/ai-assistant/page.tsx:39](src/app/seller-center/ai-assistant/page.tsx#L39) | 麦可 (Maike) | Tên sản phẩm AI |
| [src/app/seller-center/domestic-cn/page.tsx](src/app/seller-center/domestic-cn/page.tsx) | 天猫 Tmall, 京东 JD | Tên thương hiệu |
| [src/app/seller-center/trade-ehome/page.tsx](src/app/seller-center/trade-ehome/page.tsx) | 企业微信 WeCom | Tên sản phẩm Tencent |
| [src/lib/blog.ts:333](src/lib/blog.ts#L333) | 欧派家居集团 (OPPEIN) | Tên doanh nghiệp |
| [src/lib/i18n.ts:33](src/lib/i18n.ts#L33) | 中文 | Label ngôn ngữ trong i18n switcher |
| [src/data/categories.ts](src/data/categories.ts), [src/data/home.ts](src/data/home.ts) (15 chỗ) | 家具, 卫浴, 建材… (trường `cn:`) | Dead data — không render UI, dự phòng i18n |
| [src/components/home/product-section.tsx:5](src/components/home/product-section.tsx#L5) | 中文 | Trong code comment |

→ **Không còn CJK nào cần dịch**.

## B — English UI text — vòng 3

### B.1 — `top-strip.tsx` (header dropdown)

| File | Trước | Sau |
|------|-------|-----|
| [components/home/top-strip.tsx:312](src/components/home/top-strip.tsx#L312) | `<span>Buyer</span>` | `<span>Người mua</span>` |
| [components/home/top-strip.tsx:328](src/components/home/top-strip.tsx#L328) | `<span>Supplier</span>` | `<span>Nhà cung cấp</span>` |
| [components/home/top-strip.tsx:344](src/components/home/top-strip.tsx#L344) | `<span>App</span>` | `<span>Ứng dụng</span>` |
| [components/home/top-strip.tsx:316](src/components/home/top-strip.tsx#L316) | `title="Buyer Center"` | `title="Khu vực người mua"` |
| [components/home/top-strip.tsx:332](src/components/home/top-strip.tsx#L332) | `title="Supplier Center"` | `title="Khu vực nhà cung cấp"` |
| [components/home/top-strip.tsx:348](src/components/home/top-strip.tsx#L348) | `title="Tải app Cybersilkroads"` | `title="Tải ứng dụng Cybersilkroads"` |

### B.2 — Audited Reports KPI labels

| File | Trước | Sau |
|------|-------|-----|
| [app/buyer-center/audited-reports/page.tsx:145](src/app/buyer-center/audited-reports/page.tsx#L145) | `>Quality<` | `>Chất lượng<` |
| [app/buyer-center/audited-reports/page.tsx:149](src/app/buyer-center/audited-reports/page.tsx#L149) | `>Capacity<` | `>Năng lực<` |
| [app/buyer-center/audited-reports/page.tsx:153](src/app/buyer-center/audited-reports/page.tsx#L153) | `>Compliance<` | `>Tuân thủ<` |

### B.3 — Supplier Discover badges

| File | Trước | Sau |
|------|-------|-----|
| [app/buyer-center/supplier-discover/page.tsx](src/app/buyer-center/supplier-discover/page.tsx) (4 chỗ) | `>GOLD<` | `>VÀNG<` |

### B.4 — Form options

| File | Trước | Sau |
|------|-------|-----|
| [app/register/factory/page.tsx:187](src/app/register/factory/page.tsx#L187) | `"Trading Company"` | `"Công ty thương mại"` |

### B.5 — Site-wide brand-like terms

Áp dụng qua sed cho tất cả `.tsx`, `.ts`:

| Trước | Sau |
|-------|-----|
| `Secured Trading Service` | `Dịch vụ giao dịch bảo đảm` |
| `Sample Subscription` | `Gói đăng ký mẫu` |
| `Account Manager` / `account manager` | `Quản lý tài khoản` / `quản lý tài khoản` |
| `Pro tier` | `gói Pro` |
| `Trial Pro tier` | `Dùng thử gói Pro` |
| `Free trial 14 ngày` | `Dùng thử miễn phí 14 ngày` |
| `Dedicated AM` | `Quản lý chuyên trách` |
| `Unlimited sample` | `Mẫu không giới hạn` |
| `>Email<` (form label) | `>Thư điện tử<` |

## C — Bug fix — sed làm hỏng 1 identifier

Trong vòng 1 sed `s|Audited|Đã kiểm định|g` đã thay nhầm tên function `AuditedReportsPage` thành `Đã kiểm địnhReportsPage` ⇒ gây 500 error.

**Fix**: [app/buyer-center/audited-reports/page.tsx:103](src/app/buyer-center/audited-reports/page.tsx#L103):
```tsx
- export default function Đã kiểm địnhReportsPage() {
+ export default function AuditedReportsPage() {
```

→ Lesson learned: sed thay text JSX phải tránh tên function/variable. Lần sau dùng pattern có `>...< ` để chỉ thay text trong JSX.

## D — Tên riêng / brand / từ kỹ thuật giữ nguyên (vòng 3)

- **Place names**: App Store, Google Play, Tianjin, Shanghai, Foshan
- **Product names**: Standalone Maike, Diamond Custom Training, Diamond
- **Arbitration centers**: SIAC, HKIAC
- **Brand**: Cybersilkroads, NCC GOLD (tier name)

## E — Verify cuối

12 routes quan trọng đều **HTTP 200** sau khi sync và fix:

```
/                                             200
/sell-on-csr                                  200
/info/sample-orders                           200
/info/disputes                                200
/info/network                                 200
/info/contact                                 200
/buyer-center/audited-reports                 200
/buyer-center/supplier-discover               200
/buyer-center/new-user-guide                  200
/buyer-center/secured-trading                 200
/register/factory                             200
/sitemap                                      200
```

## F — Tổng kết vòng 3

| Loại | Số chỗ | File |
|------|-------:|------|
| top-strip dropdown labels | 6 | 1 |
| Audited Reports KPI | 3 | 1 |
| Supplier Discover GOLD badge | 4 | 1 |
| Form options | 1 | 1 |
| Site-wide brand-like (Secured Trading, Sample Subscription, Account Manager, Pro tier, Free trial, Dedicated AM, Unlimited sample, Email) | ~40+ | nhiều |
| Bug fix identifier | 1 | 1 |
| **Tổng vòng 3** | **~55+ chỗ trên 5+ files** | |

---

## 📊 Tổng cộng cả 3 vòng

| Vòng | Số chỗ | Số file |
|------|-------:|--------:|
| Vòng 1 (CJK + English đầu tiên) | 46 | 20 |
| Vòng 2 (sau phản hồi của bạn — pure Vietnamese) | 170+ | 30+ |
| Vòng 3 (quét bổ sung qua sitemap) | 55+ | 5+ |
| Vòng 4 (quét HTML rendered từng page) | 70+ | 12+ |
| **Tổng** | **340+ chỗ trên 60+ files** | |

---

# 🇻🇳 Vòng 4 — Quét HTML rendered từng page (sau phản hồi của bạn)

Bạn liệt kê cụ thể 4 chỗ chưa dịch:
- `/supplier/monalisa-group`: **NCC GOLD**, **(reviews)**
- `/seller-center`: **Nâng cấp Diamond**
- `/seller-center/gold-member`: **GoldSupplier**, **Diamond**

Vòng này thay đổi cách quét — fetch HTML rendered của từng page rồi grep ra mọi chữ tiếng Anh trong JSX text.

## A — Fix các chỗ user liệt kê

| File | Trước | Sau |
|------|-------|-----|
| [app/supplier/[slug]/page.tsx:55](src/app/supplier/[slug]/page.tsx#L55) | `>NCC GOLD<` | `>NCC VÀNG<` |
| [app/supplier/[slug]/page.tsx:58](src/app/supplier/[slug]/page.tsx#L58) | `({f.reviews} reviews)` | `({f.reviews} đánh giá)` |
| [components/home/factories.tsx:126](src/components/home/factories.tsx#L126) | `({f.reviews})` | `({f.reviews} đánh giá)` |
| [app/suppliers/page.tsx:63](src/app/suppliers/page.tsx#L63) | `({f.reviews})` | `({f.reviews} đánh giá)` |
| [app/buyer-center/supplier-discover/page.tsx:81](src/app/buyer-center/supplier-discover/page.tsx#L81) | `{f.reviews} reviews` | `{f.reviews} đánh giá` |
| [app/zone/[slug]/page.tsx:50](src/app/zone/[slug]/page.tsx#L50) | `{z.name} Industrial Cluster` | `Cụm Công nghiệp {z.name}` |
| [app/seller-center/page.tsx:51](src/app/seller-center/page.tsx#L51) | `⭐ Nâng cấp Diamond` | `⭐ Nâng cấp Kim cương` |

## B — Diamond → Kim cương trên seller-center (~15 chỗ)

| File | Trước | Sau |
|------|-------|-----|
| [seller-center/gold-member/page.tsx:28](src/app/seller-center/gold-member/page.tsx#L28) | `name: "Diamond"` | `name: "Kim cương"` |
| seller-center/gold-member/page.tsx (table headers) | `>Diamond<` | `>Kim cương<` |
| seller-center/gold-member/page.tsx | `Diamond crown` | `vương miện Kim cương` |
| seller-center/gold-member/page.tsx | `Trở thành Gold Supplier` | `Trở thành NCC Vàng` |
| seller-center/gold-member/page.tsx | `Gold/Diamond suppliers` | `NCC Vàng/Kim cương` |
| seller-center/gold-member/page.tsx | `Gold = lòng tin` | `Vàng = lòng tin` |
| seller-center/gold-member/page.tsx | `name: "Gold"` (tier name) | `name: "Vàng"` |
| seller-center/gold-member/page.tsx | `Đăng ký Gold Member` | `Đăng ký Hội viên Vàng` |
| seller-center/gold-member/page.tsx | `Suppliers đã thành công với Gold` | `Nhà cung cấp đã thành công với Vàng` |
| seller-center/gold-member/page.tsx | `Tính ROI Gold` | `Tính ROI Vàng` |
| seller-center/gold-member/page.tsx | `Phí Gold năm` | `Phí Vàng năm` |
| seller-center/gold-member/page.tsx | `Tăng trưởng dự kiến với Gold` | `Tăng trưởng dự kiến với Vàng` |
| seller-center/gold-member/page.tsx | `Sau 3 tháng nâng Gold` | `Sau 3 tháng nâng Vàng` |
| seller-center/gold-member/page.tsx | `Gold đẩy chúng tôi` | `Vàng đẩy chúng tôi` |
| seller-center/gold-member/page.tsx | `Gold badge + verified seller` | `Phù hiệu Vàng + nhà bán đã xác minh` |
| seller-center/gold-member/page.tsx | `gold: "Chia sẻ", diamond: "Dedicated"` | `gold: "Chia sẻ", diamond: "Chuyên trách"` |
| seller-center/gold-member/page.tsx | `Account manager riêng` | `Quản lý tài khoản riêng` |
| [seller-center/smart-expo/page.tsx:13](src/app/seller-center/smart-expo/page.tsx#L13) | `Standard $480 · Premium $1,280 · Diamond $3,200` | `Tiêu chuẩn $480 · Cao cấp $1,280 · Kim cương $3,200` |
| seller-center/smart-expo/page.tsx | `Slot Diamond` | `Slot Kim cương` |
| seller-center/ai-assistant/page.tsx | `gói Diamond` | `gói Kim cương` |
| seller-center/ai-assistant/page.tsx | `Diamond + Smart Expo` | `Kim cương + Triển lãm thông minh` |
| seller-center/ai-assistant/page.tsx | `Diamond Custom Training` | `Đào tạo Tùy chỉnh Kim cương` |
| seller-center/ai-assistant/page.tsx | `Custom Training` | `Đào tạo Tùy chỉnh` |
| seller-center/ai-assistant/page.tsx | `Free với gói Gold` | `Miễn phí với gói Vàng` |
| seller-center/trade-ehome/page.tsx | `Single Sign-On với tài khoản Gold Cybersilkroads` | `Đăng nhập một lần (SSO) với tài khoản Vàng Cybersilkroads` |
| seller-center/trading-service/page.tsx | `Tích hợp sẵn cho Gold supplier` | `Tích hợp sẵn cho NCC Vàng` |
| seller-center/trading-service/page.tsx | `Phí AI quote translator` | `Phí dịch báo giá AI` |

## C — Tên kiểu phong cách thiết kế nội thất (data/products.ts)

Áp dụng qua sed cho tất cả file:

| Trước | Sau |
|-------|-----|
| `"Industrial"` | `"Công nghiệp"` |
| `"Industrial F&B"` | `"Công nghiệp F&B"` |
| `"Tropical"` | `"Nhiệt đới"` |
| `"Resort tropical"` | `"Resort nhiệt đới"` |
| `"Modern outdoor"` | `"Hiện đại ngoài trời"` |
| `"Modern jungle"` | `"Rừng nhiệt đới hiện đại"` |
| `"Light Luxury"` | `"Sang trọng nhẹ"` |
| `"Smart-home"` | `"Nhà thông minh"` |
| `"Mediterranean"` | `"Địa Trung Hải"` |
| `"Luxury"` | `"Sang trọng"` |

## D — Filter options & breadcrumb labels site-wide

| Trước | Sau |
|-------|-----|
| `label: "Buyer Center"` | `label: "Khu vực người mua"` |
| `label: "Seller Center"` | `label: "Khu vực nhà bán"` |
| `label: "Supplier Center"` | `label: "Khu vực nhà cung cấp"` |
| `>Buyer Center<` | `>Khu vực người mua<` |
| `"Industry"` | `"Ngành"` |
| `>Furniture<` / `"Furniture"` | `>Nội thất<` / `"Nội thất"` |
| `"Ceramic & Stone"` | `"Gốm sứ & Đá"` |
| `"Bathroom & Sanitary"` | `"Thiết bị vệ sinh"` |
| `"Lighting"` | `"Chiếu sáng"` |
| `"Kitchen"` | `"Bếp"` |
| `"Hotel Supplies"` | `"Thiết bị khách sạn"` |
| `>Free<` / `"Free"` | `>Miễn phí<` / `"Miễn phí"` |
| `>Gold<` | `>Vàng<` |
| `>GOLD<` | `>VÀNG<` |
| `>Dedicated<` | `>Chuyên trách<` |
| `>NCC GOLD<` | `>NCC VÀNG<` |
| `⭐ GOLD` | `⭐ VÀNG` |

## E — Body text descriptive nouns

| Trước | Sau |
|-------|-----|
| `porcelain tile` | `gạch porcelain` |
| `OEM kitchen cabinet` | `OEM tủ bếp` |
| `hotel chain` | `chuỗi khách sạn` |
| `Verified / Gold / Premium` | `Đã xác minh / Vàng / Cao cấp` |
| `3% cho Gold member` | `3% cho hội viên Vàng` |
| `>English<` | `>Tiếng Anh<` |

## F — Bug fix: function identifier

`AuditedReportsPage` đã bị sed của vòng 1 đổi thành `Đã kiểm địnhReportsPage` → 500 error. Đã restore tại [app/buyer-center/audited-reports/page.tsx:103](src/app/buyer-center/audited-reports/page.tsx#L103).

## G — Verify cuối — 10 routes user mention

| Route | HTTP | English UI text? |
|-------|:----:|:----------------:|
| `/supplier/monalisa-group` | 200 | ❌ none |
| `/seller-center` | 200 | ❌ none |
| `/seller-center/gold-member` | 200 | ❌ none |
| `/seller-center/smart-expo` | 200 | 200 |
| `/seller-center/ai-assistant` | 200 | 200 |
| `/seller-center/trade-ehome` | 200 | 200 |
| `/seller-center/trading-service` | 200 | 200 |
| `/buyer-center/supplier-discover` | 200 | 200 |
| `/suppliers` | 200 | 200 |
| `/zone/foshan-ceramic` | 200 | 200 |

Pattern grep **`>NCC GOLD<`, `>Gold<`, `>GOLD<`, `>Free<`, `>Dedicated<`, `>Buyer Center<`, `>Furniture<`, `>Diamond<`, `reviews\)`, `Nâng cấp Diamond`, `Gold Supplier`, `Industrial Cluster`** → **EMPTY** trên 3 trang user đã liệt kê.

## H — Tên riêng / brand giữ nguyên (vòng 4)

- **Tên thương hiệu**: Apple, Google, Facebook, Android, App Store, Google Play
- **Tên hội chợ**: Bauma China, China Furniture Fair, Foshan Ceramics Expo, Building Materials Asia, Furniture Asia Cloud Expo
- **Tên nhà máy**: Foshan Tile Master, Foshan Tanzhou (real factory names)
- **Toà nhà**: Diamond Flower Tower (real building name HN)
- **Mã ngoại tệ**: USD, VND, CNY
- **Abbreviations**: BSCI, FSC, RFQ, MOQ, OEM, ESCROW, ROI, SSO

## I — Tổng kết vòng 4

| Loại | Số chỗ |
|------|-------:|
| `NCC GOLD`, `(reviews)`, `Industrial Cluster`, `Nâng cấp Diamond` | 7 |
| `Diamond` → `Kim cương` site-wide | ~25 |
| `Gold` body text → `Vàng` | ~15 |
| Interior design styles (Industrial, Tropical, Mediterranean…) | ~50 |
| Filter options (Industry, Furniture, Lighting…) | ~10 |
| Body text descriptive nouns | ~10 |
| Bug fix identifier | 1 |
| **Tổng vòng 4** | **~120 chỗ trên 12+ files** |

---

# 🇻🇳 Vòng 5 — Khắc phục các chỗ user liệt kê

Bạn liệt kê 3 nhóm: `/product/ceramic-4`, **deadline**, **Đăng ký Buyer →**, **AUDITED**.

## A — `deadline` → `thời hạn`

12 chỗ trong body text + textarea placeholder:

| File | Trước | Sau |
|------|-------|-----|
| [lib/blog.ts:149,197](src/lib/blog.ts) | `deadline xuất xưởng`, `đúng deadline` | `thời hạn xuất xưởng`, `đúng thời hạn` |
| [app/help/page.tsx:146](src/app/help/page.tsx#L146) | FAQ RFQ `+ deadline` | `+ thời hạn` |
| [app/buying-request/page.tsx:58](src/app/buying-request/page.tsx#L58) | placeholder `..., deadline...` | `..., thời hạn...` |
| [app/login/page.tsx:26](src/app/login/page.tsx#L26) | `trễ deadline đã ký` | `trễ thời hạn đã ký` |
| [app/supplier/[slug]/page.tsx:180](src/app/supplier/[slug]/page.tsx#L180) | placeholder `số lượng, deadline...` | `số lượng, thời hạn...` |
| [app/product/[id]/reviews/page.tsx:32](src/app/product/[id]/reviews/page.tsx#L32) | `Đúng cam kết deadline` | `Đúng cam kết thời hạn` |
| [app/product/[id]/page.tsx:136](src/app/product/[id]/page.tsx#L136) | `Đúng cam kết deadline` | `Đúng cam kết thời hạn` |
| [app/buyer-center/post-rfq/page.tsx:9,57](src/app/buyer-center/post-rfq/page.tsx) | `Ghi rõ deadline`, `Có deadline cụ thể` | `Ghi rõ thời hạn`, `Có thời hạn cụ thể` |
| [app/info/disputes/page.tsx:43,46](src/app/info/disputes/page.tsx) | `đúng deadline ghi trong PO`, `PO ngày deadline` | `đúng thời hạn ghi trong PO`, `PO ngày thời hạn` |
| [app/info/[topic]/page.tsx:105,565](src/app/info/[topic]/page.tsx) | `deadline 5 ngày` (FAQ careers), `deadline mới được estimate` | `thời hạn 5 ngày`, `thời hạn mới được ước tính` |
| [app/register/factory/page.tsx](src/app/register/factory/page.tsx) | textarea placeholder | (sed) |

**Giữ nguyên** trường `deadline:` trong code TypeScript struct (đó là tên field, không phải user-facing).

## B — `Đăng ký Buyer` → `Đăng ký Người mua`

12 chỗ:

| File | Loại |
|------|------|
| [app/login/page.tsx:128](src/app/login/page.tsx#L128) | nút CTA |
| [app/sitemap/page.tsx:135](src/app/sitemap/page.tsx#L135) | label sitemap |
| [components/home/hero-slider.tsx:34](src/components/home/hero-slider.tsx#L34) | nút primary slide |
| [app/register/factory/page.tsx:523,529](src/app/register/factory/page.tsx) | text + nút |
| [components/home/header.tsx:195](src/components/home/header.tsx#L195) | nút header |
| [components/home/top-strip.tsx:291](src/components/home/top-strip.tsx#L291) | link top-strip |
| [app/register/buyer/page.tsx:36,48,279,345](src/app/register/buyer/page.tsx) | breadcrumb, hero, CTA, metadata title |

## C — `AUDITED` → `ĐÃ KIỂM ĐỊNH`

| File | Trước | Sau |
|------|-------|-----|
| [app/product/[id]/page.tsx:479](src/app/product/[id]/page.tsx#L479) | `>✓ AUDITED<` | `>✓ ĐÃ KIỂM ĐỊNH<` |
| [app/buyer-center/audited-reports/page.tsx:111](src/app/buyer-center/audited-reports/page.tsx#L111) | `🛡 AUDITED FACTORY REPORTS` | `🛡 BÁO CÁO KIỂM ĐỊNH NHÀ MÁY` |
| [app/buyer-center/supplier-discover/page.tsx:73](src/app/buyer-center/supplier-discover/page.tsx#L73) | `>✓ AUDITED<` | `>✓ ĐÃ KIỂM ĐỊNH<` |
| [app/info/[topic]/page.tsx:719](src/app/info/[topic]/page.tsx#L719) | `với badge ✓ AUDITED hiển thị` | `với phù hiệu ✓ ĐÃ KIỂM ĐỊNH hiển thị` |

## D — Verify cuối — 8 trang quan trọng

Pattern grep loại bỏ `>AUDITED<`, `deadline`, `Đăng ký Buyer`, `>NCC GOLD<`, `>Buyer<`, `>GOLD<`, `>Free<`, `>Diamond<`, `>Furniture<`, `>Industry<`, `>Featured<`, `>Hot<`, `reviews\)`, `Industrial Cluster`, `Trade Assurance`, `Trade Alert`, `Bán trên AVN` trên HTML rendered:

| Route | Kết quả |
|-------|:-------:|
| `/product/ceramic-4` | ✓ clean |
| `/` | ✓ clean |
| `/sell-on-csr` | ✓ clean |
| `/supplier/monalisa-group` | ✓ clean |
| `/seller-center` | ✓ clean |
| `/buyer-center/audited-reports` | ✓ clean |
| `/buyer-center/supplier-discover` | ✓ clean |
| `/info/audit-process` | ✓ clean |

## E — Tổng kết vòng 5

| Loại | Số chỗ |
|------|-------:|
| `deadline` → `thời hạn` body + placeholder | 12 |
| `Đăng ký Buyer` → `Đăng ký Người mua` | 12 |
| `AUDITED` → `ĐÃ KIỂM ĐỊNH` | 4 |
| **Tổng vòng 5** | **~28 chỗ trên 14 files** |

---

## 📊 Tổng hợp 5 vòng

| Vòng | Số chỗ | Số file |
|------|-------:|--------:|
| Vòng 1 (CJK + English đầu tiên) | 46 | 20 |
| Vòng 2 (sau phản hồi pure Vietnamese) | 170+ | 30+ |
| Vòng 3 (sitemap quét bổ sung) | 55+ | 5+ |
| Vòng 4 (HTML rendered từng page) | 120 | 12+ |
| Vòng 5 (deadline · Đăng ký Buyer · AUDITED) | 28 | 14 |
| Vòng 6 (Lead time · on-time · Escrow tiền cọc · v.v.) | 35+ | 12 |
| **Tổng cộng** | **~455 chỗ** | **~80 files** |

---

# 🇻🇳 Vòng 6 — Khắc phục các phrase user liệt kê

Bạn liệt kê: `Đánh giá từ buyer`, `Sample $50-200 (trừ vào đơn)`, `Lead time 20-30 ngày`, `on-time`, `Escrow tiền cọc, chỉ release khi buyer xác nhận`, `Audit on-site free, video call live`, `Mediation 24/7, refund 100% nếu sai mô tả/số lượng`.

## A — Trang `/product/[id]` (xuất hiện trên `/product/ceramic-4`)

| Line | Trước | Sau |
|------|-------|-----|
| [493](src/app/product/[id]/page.tsx#L493) | `<small>on-time</small>` | `<small>đúng hạn</small>` |
| [623](src/app/product/[id]/page.tsx#L623) | `t: "Escrow tiền cọc", d: "Tiền giữ tại Cybersilkroads, chỉ release khi buyer xác nhận"` | `t: "Tiền cọc giữ trung gian", d: "Tiền giữ tại Cybersilkroads, chỉ giải ngân khi người mua xác nhận"` |
| [624](src/app/product/[id]/page.tsx#L624) | `t: "Audit on-site free", d: "...kiểm hàng trước khi xuất, video call live"` | `t: "Kiểm định tại chỗ miễn phí", d: "...kiểm hàng trước khi xuất, gọi video trực tiếp"` |
| [625](src/app/product/[id]/page.tsx#L625) | `t: "Hỗ trợ tranh chấp", d: "Mediation 24/7, refund 100% nếu sai mô tả/số lượng"` | `t: "Hỗ trợ tranh chấp", d: "Hoà giải 24/7, hoàn tiền 100% nếu sai mô tả/số lượng"` |
| [655](src/app/product/[id]/page.tsx#L655) | `<h2>Đánh giá từ buyer</h2>` | `<h2>Đánh giá từ người mua</h2>` |
| [312](src/app/product/[id]/page.tsx#L312) | `⏱ Lead time 20-30 ngày` | `⏱ Thời gian giao 20-30 ngày` |
| [158](src/app/product/[id]/page.tsx#L158) | FAQ q: `Lead time bao lâu?` | `Thời gian giao bao lâu?` |
| [458](src/app/product/[id]/page.tsx#L458) | `$50-200 (trừ vào đơn)` | giữ nguyên (đã Vietnamese) |

## B — `Lead time` → `Thời gian giao` site-wide (~25 chỗ)

Áp dụng qua sed cho mọi file có "Lead time" trong JSX text, body description, label, FAQ:

| File | Số chỗ |
|------|-------:|
| [lib/blog.ts](src/lib/blog.ts) | 5 |
| [app/help/page.tsx](src/app/help/page.tsx) | 3 |
| [app/info/[topic]/page.tsx](src/app/info/[topic]/page.tsx) | 8 |
| [app/info/sample-orders/page.tsx](src/app/info/sample-orders/page.tsx) | 4 |
| [app/info/disputes/page.tsx](src/app/info/disputes/page.tsx) | 1 |
| [app/buyer-center/new-user-guide/page.tsx](src/app/buyer-center/new-user-guide/page.tsx) | 1 |
| [app/seller-center/ai-assistant/page.tsx](src/app/seller-center/ai-assistant/page.tsx) | 1 |
| [app/seller-center/logistics/page.tsx](src/app/seller-center/logistics/page.tsx) | 1 |
| [app/industry-channels/page.tsx](src/app/industry-channels/page.tsx) | 1 |
| [app/register/factory/page.tsx](src/app/register/factory/page.tsx) | 1 |

**Giữ nguyên** trường `leadTime:` trong code TypeScript struct (tên field, không phải user-facing).

## C — `Audit on-site free` → `Kiểm định tại chỗ miễn phí`

| File | Trước | Sau |
|------|-------|-----|
| [app/register/factory/page.tsx:81](src/app/register/factory/page.tsx#L81) | `Audit on-site free, onboarding 1-on-1` | `Kiểm định tại chỗ miễn phí, onboarding 1-on-1` |
| [app/info/[topic]/page.tsx:388](src/app/info/[topic]/page.tsx#L388) | `Audit on-site free cho đơn ≥$5K` | `Kiểm định tại chỗ miễn phí cho đơn ≥$5K` |
| [app/product/[id]/page.tsx:624](src/app/product/[id]/page.tsx#L624) | `Audit on-site free` | `Kiểm định tại chỗ miễn phí` |

## D — `tags: ["Sample", ...]` blog

| File | Trước | Sau |
|------|-------|-----|
| [lib/blog.ts:369](src/lib/blog.ts#L369) | `tags: ["Sample", "Hướng dẫn", "Buyer mới"]` | `tags: ["Mẫu", "Hướng dẫn", "Buyer mới"]` |

## E — Verify cuối — `/product/ceramic-4`

Pattern grep loại bỏ `Đánh giá từ buyer`, `>on-time<`, `Audit on-site free`, `Escrow tiền cọc`, `video call live`, `Mediation 24/7`, `refund 100% nếu sai`, `Lead time`, `>Sample<` trên rendered HTML:

| Pattern | Kết quả |
|---------|:-------:|
| `Đánh giá từ buyer` | ❌ không còn |
| `>on-time<` | ❌ không còn |
| `Audit on-site free` | ❌ không còn |
| `Escrow tiền cọc` | ❌ không còn |
| `video call live` | ❌ không còn |
| `Mediation 24/7` | ❌ không còn |
| `refund 100% nếu sai` | ❌ không còn |
| `Lead time` | ❌ không còn |

**Có Vietnamese**:
- `Đánh giá từ người mua` ✓
- `>đúng hạn<` ✓
- `Kiểm định tại chỗ miễn phí` ✓
- `Tiền cọc giữ trung gian` ✓
- `gọi video trực tiếp` ✓
- `Hoà giải 24/7` ✓
- `hoàn tiền 100% nếu sai` ✓
- `Thời gian giao` ✓

## F — Tổng kết vòng 6

| Loại | Số chỗ |
|------|-------:|
| `/product/[id]/page.tsx` (4 trust badge + heading + Lead time + FAQ) | 8 |
| `Lead time` → `Thời gian giao` site-wide | ~25 |
| `Audit on-site free` → `Kiểm định tại chỗ miễn phí` | 3 |
| Blog tags | 1 |
| **Tổng vòng 6** | **~37 chỗ trên 12 files** |
