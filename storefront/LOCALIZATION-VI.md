# Đa ngữ VI / EN / CN — hệ i18n đã triển khai (cho Claude Code session khác)

> **Kiến trúc (đã chốt + đã build):** **1 codebase** phục vụ cả 3 ngôn ngữ, locale **detect theo subdomain** (apex=vi, `en.`=en, `cn.`=cn). KHÔNG còn 3 cây nguồn. Chuỗi UI lấy từ **message-catalog**; tên dữ liệu lấy từ **data-dictionary** keyed theo chuỗi VI.

---

## 0. Trạng thái hiện tại (tính tới phiên này)

✅ **Đã xong:**
- Hệ i18n: `src/messages/{vi,en,cn}.ts` (229 key UI) + `src/messages/data.ts` (909 tên dữ liệu) + `src/lib/t.ts` (server) + `src/lib/td.ts` (data, server) + `src/components/i18n-provider.tsx` (client `useT`).
- `layout.tsx`: async, detect locale, `<html lang={locale}>`, bọc `<I18nProvider>`.
- **Trang chủ ~98% trilingual**: chrome (navbar, sticky-header, header, footer, top-strip, mobile-nav, mega-menu), hero, stats, các section, **thẻ danh mục/sản phẩm** (qua data dict), widget RFQ.
- Verify: `shop`=VI (chuẩn, không hồi quy), `en`=EN, `cn`=CN. Ảnh ở `scripts/gen-out/loc-{shop,en,cn}.png`.

⏳ **Còn lại:**
1. **top-strip popovers**: các mảng module-level `BUYER_LINKS / SELLER_LINKS / ACCOUNT_LINKS / RECENT_*` còn tiếng Việt (render qua `{it.label}`). Cần chuyển mảng vào trong component (sau `const t`) hoặc đổi sang key + `t()` lúc render. (Xem mẫu §4.)
2. **Deep hover panel data**: `mega-submenu` (CategoryOverviewPanel/SubItemPanel) hiện nhận `t` qua prop nhưng tên dữ liệu sâu (`it.name`, `s.title`, `sub.name`, `h.name`, `b.name`) chưa bọc — cần truyền thêm `td` prop từ navbar/banner và bọc. (Hover-only, ưu tiên thấp.)
3. **product-section ProductCard**: `p.title`/`p.badges` (component `ProductCard` tách riêng) — truyền `td` vào hoặc bọc.
4. **~38 trang app** (`src/app/**/page.tsx`): buyer-center/*, info/*, register/*, products, product/[id], category/[slug], suppliers, search, login… chưa dịch.
5. **Gộp container prod**: retire `storefront-en`/`storefront-cn`, trỏ `en.huayuesc.vn`/`cn.huayuesc.vn` về cùng storefront (dev đã route sẵn). Cần xác nhận chủ trang (trang con chưa dịch thì sẽ ra VI trên en/cn).

---

## 1. Cách hệ hoạt động

| | Chuỗi UI tĩnh (nút, nhãn, menu) | Tên dữ liệu (sản phẩm, danh mục, zone) |
|---|---|---|
| Nguồn | `src/messages/vi.ts` (+ en/cn) | `src/data/home.ts` (VI) |
| Tra | `t("namespace.key")` | `td("<chuỗi VI nguyên văn>")` |
| Server Component | `const t = await getT();` (`@/lib/t`) | `const td = await getTd();` (`@/lib/td`) |
| Client Component | `const t = useT();` (`@/components/i18n-provider`) | (chưa có client td — dữ liệu render ở server) |
| Thiếu key → | trả về key (dễ thấy) | trả về chuỗi VI (graceful) |

- Locale: `detectLocaleFromHost(host)` trong `src/lib/i18n.ts` (apex→vi, `en.`→en, `cn.`→cn).
- `headers()` ở Next 16 là **async** → `const h = await headers()`.
- **mega-submenu** dùng được ở CẢ server (navbar/banner) lẫn client (sticky) nên KHÔNG được import `getT` (next/headers) — nhận `t` (và sau này `td`) qua **prop**.

---

## 2. Quy trình thêm/sửa bản dịch (đã có script sẵn)

**Chuỗi UI:**
```bash
# 1) thêm key vào scripts/vi-src.json  (key: "tiếng Việt")
# 2) dịch VI->EN+CN (DeepSeek, key ở /tmp/.dskey)
docker run --rm --network host -v "$PWD":/work -v /tmp/.dskey:/tmp/.dskey:ro -w /work \
  ghcr.io/puppeteer/puppeteer:latest node scripts/ds-translate.mjs scripts/vi-src.json scripts/gen-out/msg
# 3) regenerate src/messages/{vi,en,cn}.ts
docker run --rm --user "$(id -u):$(id -g)" -v "$PWD":/work -w /work \
  ghcr.io/puppeteer/puppeteer:latest node scripts/build-i18n-infra.mjs
# 4) trong component: thay chuỗi cứng bằng {t("key")}
```

**Tên dữ liệu (data dict):**
```bash
docker run --rm -v "$PWD":/work -w /work ghcr.io/puppeteer/puppeteer:latest node scripts/extract-data.mjs        # gom chuỗi VI
docker run --rm --network host -v "$PWD":/work -v /tmp/.dskey:/tmp/.dskey:ro -w /work \
  ghcr.io/puppeteer/puppeteer:latest node scripts/translate-data.mjs                                            # batched VI->EN/CN
docker run --rm --user "$(id -u):$(id -g)" -v "$PWD":/work -w /work \
  ghcr.io/puppeteer/puppeteer:latest node scripts/build-data-dict.mjs                                           # src/messages/data.ts
# rồi bọc render: {x.name} -> {td(x.name)}  (component phải async + const td = await getTd())
```
> ⚠️ Quyền: `scripts/gen-out` thuộc uid **10042 (pptruser)** → chạy script ghi vào đó **KHÔNG `--user`**. Script ghi vào `src/` (thuộc dev) → chạy **`--user "$(id -u):$(id -g)"`**. DeepSeek cần `--network host`.

---

## 3. Dịch 1 trang app (mẫu workflow đã dùng cho home)

Đã có pattern: 1 agent/đọc 1 file → trả `{file,isClient,keys,edits}` (xem `scripts/i18n-extract-home.*` / `wf-out.json` / `process-wf.mjs` / `apply-wf-edits.mjs`). Áp dụng lại cho `src/app/**/page.tsx`:
1. Workflow trích keys + edits song song.
2. `process-wf.mjs` gộp keys vào `vi-src.json` + gom `wf-edits.json`.
3. `ds-translate` + `build-i18n-infra`.
4. `apply-wf-edits.mjs` áp dụng (cảnh báo NOT-FOUND → vá tay).
5. Verify `curl -H "Host: en.huayuesc.local"` + ảnh.

**BẪY đã gặp (phải tránh):**
- **Không** đặt `t()` trong **hằng module-level** (chạy lúc import, chưa có locale) → `t is not defined`. Đặt mảng dữ liệu **trong** component sau `const t`, hoặc dùng key + `t()` lúc render.
- Component dùng ở **cả server lẫn client** (như mega-submenu) → nhận `t`/`td` qua **prop**, không import `getT`.
- Client component → `useT()`, KHÔNG `getT()`.

---

## 4. Quy tắc dịch
- Chỉ chuỗi hiển thị (text `>...<`, `placeholder`, `title`, `aria-label`, `alt` câu, `<option>`).
- KHÔNG đổi: className, href, **slug**, key, biến/hàm, comment, emoji, **thương hiệu** (Bravat, Kito, Sylvania, Midea, TTLock, Huayuesc, CSR), **mã chuẩn** (JIS SS400, EN S275JR, ASTM A36, ISO…), số/đơn vị (mm, kg, m/s, °).
- Tier đối tác = **Kim cương/Diamond/钻石** (không "Vàng"). Verified→**Đối tác/Partner/合作伙伴** (không "Đã xác minh").
- Tiền tệ theo locale (đã có trong `LOCALES`): VI→VND, EN→USD, CN→CNY.

## 5. Glossary lõi (VI / EN / CN)
Home·Trang chủ·首页 | Products·Sản phẩm·产品 | Suppliers·Đối tác·合作伙伴 | Trade Shows·Hội chợ·展会 | Buying Request·Yêu cầu mua hàng·采购需求 | Factory Tour·Tham quan nhà máy·工厂参观 | ALL CATEGORIES·TẤT CẢ DANH MỤC·全部分类 | Cart·Giỏ hàng·购物车 | Search·Tìm kiếm·搜索 | Quote·Báo giá·报价 | Register·Đăng ký·注册 | Best sellers·Bán chạy nhất·热销.

## 6. Hạ tầng (nhắc lại)
- VM `ssh huayuesc` `/home/dev/projects/tenant-template/storefront`. Container serve = `dev-storefront` (Next16 dev, HMR). Caddy dev đã route `shop|en|cn|vi.huayuesc.local → storefront:3001`.
- **Local linter tự revert `*.tsx` về tiếng Anh** → sửa bằng **node-transform chạy trong container trên VM** (như mọi script `scripts/*.mjs` ở trên), KHÔNG Write `.tsx` local rồi để lâu. Verify bằng `grep` trên VM.
- Verify ảnh: `scripts/shot-locales.cjs` (`--host-resolver-rules=MAP <sub>.huayuesc.local:80 192.168.40.3:18080`, KHÔNG set Host header trực tiếp).
- DeepSeek key: `/tmp/.dskey` trên VM (model `deepseek-chat`).

## 7. Gộp container prod (Phase cuối)
1. Sửa `caddy/Caddyfile.prod`: khối `en.huayuesc.vn` + `cn.huayuesc.vn` → `reverse_proxy storefront:3001` (giống apex).
2. `docker stop storefront-en storefront-cn` + xoá 2 image `huayuesc-storefront-{en,cn}:dev`. Gỡ bước build chúng trong `scripts/ci/build-and-push.sh`.
3. `next.config.mjs > allowedDevOrigins` đã có `*.huayuesc.vn`.
4. Verify `curl -H "Host: en.huayuesc.vn"` qua edge.

_Trang chủ VN là chuẩn bố cục/giọng văn. Mỗi thay đổi: build `✓ Compiled` + curl 3 host + ảnh._
