import Link from "next/link";
import type { Factory, Product } from "@/data/home";
import { Vr360Frame } from "./Vr360Frame";

const CERTS = ["CE", "ISO 9001", "BSCI", "Sedex", "FSC", "RoHS"];

const TABS: { n: 1 | 2 | 3 | 4 | 5 | 6 | 7; label: string; icon: string }[] = [
  { n: 1, label: "Trang chủ NCC", icon: "🏠" },
  { n: 7, label: "Trợ lý AI", icon: "🤖" },
  { n: 6, label: "Tour 360°", icon: "🎬" },
  { n: 2, label: "Sản phẩm", icon: "📦" },
  { n: 3, label: "Hồ sơ công ty", icon: "🏢" },
  { n: 4, label: "Năng lực sản xuất", icon: "🏭" },
  { n: 5, label: "Liên hệ", icon: "📞" },
];

export function SupplierDetail({
  factory: f,
  heroProducts,
  ownProducts,
  allProducts,
}: {
  factory: Factory;
  heroProducts: Product[];
  ownProducts: Product[];
  allProducts: Product[];
}) {
  const foundedYear = 2026 - parseInt(f.badges.years);
  const productList = ownProducts.length > 0 ? ownProducts : allProducts.slice(0, 24);
  // Per-supplier unique radio name to avoid collision when multiple supplier
  // pages are pre-rendered. Default checked = tab 1 (Trang chủ NCC).
  const radioName = `sup-${f.slug}`;

  return (
    <div className="sup-root">
      {/* Hidden radios — drive tab + panel visibility via :has() */}
      {TABS.map((t) => (
        <input
          key={`r-${t.n}`}
          type="radio"
          name={radioName}
          id={`${radioName}-${t.n}`}
          defaultChecked={t.n === 1}
          className={`hidden sup-radio-${t.n}`}
        />
      ))}

      {/* Banner */}
      <div className="max-w-[1400px] mx-auto px-4 mt-4">
        <div className="relative rounded overflow-hidden h-[220px] bg-brand-dark">
          <img src={`/img/${f.slug}-cover.jpg?v=3`} alt="" className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 px-7 py-6 flex items-end gap-5 text-white" style={{ background: "linear-gradient(transparent 30%, rgba(0,37,87,0.95))" }}>
            <div className="w-20 h-20 bg-white border-4 border-gold rounded flex items-center justify-center font-extrabold text-[28px] text-brand flex-shrink-0">
              {f.initials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                {f.badges.gold && <span className="bg-gold text-brand-dark text-[10px] px-2 py-0.5 rounded-sm font-bold">NCC VÀNG</span>}
                {f.badges.audited && <span className="bg-success text-white text-[10px] px-2 py-0.5 rounded-sm font-bold">ĐÃ KIỂM ĐỊNH</span>}
                <span className="bg-white/20 text-white text-[10px] px-2 py-0.5 rounded-sm font-bold">{f.badges.years}</span>
                <span className="text-[12.5px] text-gold">★ {f.rating} ({f.reviews} đánh giá)</span>
              </div>
              <h1 className="text-[26px] font-extrabold leading-tight max-md:text-[20px]">{f.name}</h1>
              <div className="text-[12.5px] opacity-90 flex items-center gap-3 flex-wrap mt-1">
                <span><span className="cn-flag" /> {f.location}</span>
                <span>•</span>
                <span><b className="text-gold">{f.meta}</b></span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs nav — labels styled as buttons, click toggles radio */}
        <div className="flex gap-0 border-b border-line bg-paper mt-0 px-4 overflow-x-auto" role="tablist">
          {TABS.map((t) => (
            <label
              key={t.n}
              htmlFor={`${radioName}-${t.n}`}
              role="tab"
              className={`sup-tab sup-tab-${t.n} px-4 py-3 text-[13px] cursor-pointer border-b-2 -mb-px whitespace-nowrap transition`}
            >
              <span className="mr-1.5">{t.icon}</span>
              {t.label}
            </label>
          ))}
        </div>
      </div>

      {/* All 5 panels rendered server-side — CSS shows only the active one */}
      <div className="max-w-[1400px] mx-auto px-4 mt-5 grid grid-cols-[1fr_340px] gap-5 max-md:grid-cols-1">
        <div>
          <div className="sup-panel sup-panel-1">
            <HomeTab f={f} foundedYear={foundedYear} heroProducts={heroProducts} />
          </div>
          <div className="sup-panel sup-panel-2">
            <ProductsTab f={f} products={productList} radioName={radioName} />
          </div>
          <div className="sup-panel sup-panel-3">
            <CompanyTab f={f} foundedYear={foundedYear} />
          </div>
          <div className="sup-panel sup-panel-4">
            <CapacityTab f={f} />
          </div>
          <div className="sup-panel sup-panel-5">
            <ContactTab f={f} />
          </div>
          <div className="sup-panel sup-panel-6">
            <Vr360Tab f={f} />
          </div>
          <div className="sup-panel sup-panel-7">
            <AiTab f={f} foundedYear={foundedYear} />
          </div>
        </div>

        {/* Right sidebar — chung cho mọi tab */}
        <aside className="space-y-4">
          <div className="bg-paper border border-line rounded overflow-hidden">
            <div className="bg-brand text-white px-4 py-2.5 font-semibold text-[13px]">Liên hệ {f.name}</div>
            <form action="/buying-request" method="get" className="p-4 space-y-2.5">
              <input name="name" placeholder="Họ tên" className="w-full px-3 py-2 border border-line rounded-sm text-[12.5px] outline-none focus:border-brand" />
              <input name="email" type="email" placeholder="Email" className="w-full px-3 py-2 border border-line rounded-sm text-[12.5px] outline-none focus:border-brand" />
              <input name="phone" placeholder="Điện thoại / Zalo" className="w-full px-3 py-2 border border-line rounded-sm text-[12.5px] outline-none focus:border-brand" />
              <textarea name="q" placeholder="Yêu cầu chi tiết: sản phẩm, số lượng, thời hạn..." className="w-full px-3 py-2 border border-line rounded-sm text-[12.5px] outline-none focus:border-brand min-h-[100px] resize-none" />
              <button type="submit" className="w-full py-2.5 bg-accent text-white rounded-sm font-bold text-[13px] hover:opacity-90">📨 Gửi yêu cầu báo giá — phản hồi trong 24h</button>
            </form>
          </div>

          <div className="bg-paper border border-line rounded p-4">
            <b className="block text-[13px] font-semibold text-ink mb-2">Thẻ chính</b>
            <div className="flex gap-1 flex-wrap">
              {f.tags.map((t) => (
                <span key={t} className="text-[11px] bg-[#F5F5F5] text-mute px-2 py-1 rounded-sm">{t}</span>
              ))}
            </div>
          </div>

          <div className="bg-paper border border-line rounded p-4">
            <b className="block text-[13px] font-semibold text-ink mb-2">🛡 Bảo vệ giao dịch</b>
            <ul className="space-y-1.5 text-[12px] text-mute leading-relaxed">
              <li>✓ Bảo đảm Giao dịch — hoàn 100% nếu sai</li>
              <li>✓ Tài khoản trung gian VCB · BIDV · BoC</li>
              <li>✓ Kiểm định trước xuất xưởng (AQL 2.5)</li>
              <li>✓ Bảo hiểm vận chuyển 110% giá trị</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}

/* =================================================================== */
/* TAB 1 — TRANG CHỦ NCC                                               */
/* =================================================================== */
function HomeTab({ f, foundedYear, heroProducts }: { f: Factory; foundedYear: number; heroProducts: Product[] }) {
  return (
    <>
      <div className="bg-paper border border-line rounded p-5">
        <h2 className="text-[16px] font-bold text-ink mb-3">Về {f.name}</h2>
        <div className="text-[13px] text-ink leading-relaxed space-y-3">
          <p>{f.name} thành lập từ {foundedYear} với hơn {f.badges.years} kinh nghiệm trong lĩnh vực {f.tags.join(", ")}. Nhà máy tọa lạc tại {f.location}, một trong những trung tâm công nghiệp lớn nhất Trung Quốc.</p>
          <p>Hiện tại, {f.name} sở hữu 3 cơ sở sản xuất với tổng diện tích trên 200.000 m², hơn 1.500 công nhân và đội ngũ R&D 80 kỹ sư. Năng suất {f.meta}, đáp ứng đơn hàng từ 50 quốc gia.</p>
          <p>Khách hàng chính bao gồm các thương hiệu lớn tại Bắc Mỹ, châu Âu, Đông Nam Á. Tại Việt Nam, đã hợp tác với hơn 80 đại lý thông qua Cybersilkroads từ 2018, được kiểm định bởi đội ngũ của chúng tôi 2 lần/năm.</p>
          <p>Nhà máy hỗ trợ OEM/ODM theo bản vẽ, MOQ linh hoạt từ 50 đơn vị, thời gian giao tiêu chuẩn 25 ngày, vận chuyển DDP về Việt Nam qua kho Bằng Tường.</p>
        </div>
      </div>

      <div className="bg-paper border border-line rounded p-5 mt-4">
        <h2 className="text-[16px] font-bold text-ink mb-3">Thông tin chính</h2>
        <div className="grid grid-cols-3 gap-4 text-[13px] max-md:grid-cols-2">
          {[
            ["Diện tích nhà máy", "200,000 m²"],
            ["Số nhân viên", "1,500+"],
            ["Năm thành lập", `${foundedYear}`],
            ["Doanh thu", "$120M / năm"],
            ["Doanh thu xuất khẩu", "$80M / năm (66%)"],
            ["Thị trường chính", "VN, US, EU, JP, KR"],
          ].map(([k, v]) => (
            <div key={k}>
              <div className="text-[11.5px] text-mute uppercase tracking-wider">{k}</div>
              <b className="block text-ink mt-1">{v}</b>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3 mt-4 max-md:grid-cols-2">
        {[
          { icon: "🥇", title: "NCC Vàng", desc: f.badges.gold ? `${f.badges.years} liên tục` : "Đã kiểm định" },
          { icon: "✅", title: "Đã xác minh", desc: "Đã kiểm định tại nhà máy" },
          { icon: "📦", title: "Giao đúng hạn", desc: "Tỷ lệ 98,5%" },
          { icon: "🛡", title: "Bảo đảm Giao dịch", desc: "Bảo vệ 100%" },
        ].map((b) => (
          <div key={b.title} className="bg-paper border border-line rounded p-3 text-center">
            <div className="text-[28px]">{b.icon}</div>
            <b className="block text-[12.5px] text-ink mt-1">{b.title}</b>
            <div className="text-[11px] text-mute">{b.desc}</div>
          </div>
        ))}
      </div>

      <div className="mt-5">
        <h2 className="text-[16px] font-bold text-ink mb-3">Sản phẩm chủ lực</h2>
        <div className="grid grid-cols-4 gap-3 max-md:grid-cols-2">
          {heroProducts.map((p) => (
            <Link key={p.id} href={`/product/${p.id}`} className="bg-paper border border-line rounded-sm overflow-hidden hover:border-brand block">
              <div className="aspect-square bg-[#F5F5F5]">
                {p.image ? <img src={p.image} alt={p.title} className="w-full h-full object-cover" /> : null}
              </div>
              <div className="p-2.5">
                <h4 className="text-[12px] text-ink line-clamp-2 mb-1">{p.title}</h4>
                <div className="text-accent font-bold text-[13px]">{p.price}<small className="text-mute font-normal text-[10px]">{p.unit}</small></div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <h2 className="text-[16px] font-bold text-ink mb-3">Dây chuyền sản xuất</h2>
        <div className="grid grid-cols-4 gap-2 max-md:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="aspect-video bg-[#F5F5F5] rounded overflow-hidden">
              <img src={`/img/${f.slug}-line-${i}.jpg?v=3`} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <h2 className="text-[16px] font-bold text-ink mb-3">Chứng nhận</h2>
        <div className="flex gap-3 flex-wrap">
          {CERTS.map((c) => (
            <div key={c} className="px-4 py-2 bg-paper border border-line rounded-sm text-[12.5px] font-semibold text-ink">
              ✓ {c}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/* =================================================================== */
/* TAB 2 — SẢN PHẨM                                                    */
/* =================================================================== */
function ProductsTab({ f, products, radioName }: { f: Factory; products: Product[]; radioName: string }) {
  const categories = ["Tất cả", ...Array.from(new Set(products.flatMap((p) => p.tags ?? []))).slice(0, 6)];
  return (
    <div className="bg-paper border border-line rounded p-5">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div>
          <h2 className="text-[18px] font-bold text-ink">Danh mục sản phẩm</h2>
          <p className="text-[12px] text-mute mt-0.5">{products.length} sản phẩm đã đăng — cập nhật hàng tuần</p>
        </div>
        <div className="text-[12px] text-mute">
          <span>📊 Đã bán: <b className="text-ink">42,000+ đơn vị</b></span>
          <span className="ml-3">⭐ Rating TB: <b className="text-ink">{f.rating}</b></span>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap mb-4 pb-3 border-b border-line">
        {categories.map((c, i) => (
          <span
            key={c}
            className={`text-[11.5px] px-3 py-1.5 rounded-sm cursor-pointer ${
              i === 0 ? "bg-brand text-white font-semibold" : "bg-bg border border-line text-mute hover:border-brand"
            }`}
          >
            {c}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-4 gap-3 max-lg:grid-cols-3 max-md:grid-cols-2">
        {products.map((p) => (
          <Link key={p.id} href={`/product/${p.id}`} className="bg-paper border border-line rounded-sm overflow-hidden hover:border-brand transition block">
            <div className="aspect-square bg-[#F5F5F5] relative">
              {p.image ? <img src={p.image} alt={p.title} className="w-full h-full object-cover" /> : null}
              {p.badges?.includes("new") && (
                <span className="absolute top-1.5 left-1.5 bg-success text-white text-[9px] px-1.5 py-0.5 rounded-sm font-bold">MỚI</span>
              )}
              {p.badges?.includes("top") && (
                <span className="absolute top-1.5 left-1.5 bg-gold text-brand-dark text-[9px] px-1.5 py-0.5 rounded-sm font-bold">BÁN CHẠY</span>
              )}
            </div>
            <div className="p-2.5">
              <h4 className="text-[12px] text-ink line-clamp-2 mb-1 min-h-[32px]">{p.title}</h4>
              <div className="text-accent font-bold text-[13px]">
                {p.price}<small className="text-mute font-normal text-[10px]">{p.unit}</small>
              </div>
              <div className="text-[10.5px] text-mute mt-1 flex justify-between">
                <span>{p.moq}</span>
                <span>★{p.rating}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 max-md:grid-cols-1">
        <div className="bg-bg border border-line rounded p-3.5">
          <b className="block text-[13px] text-ink mb-1">📦 MOQ linh hoạt</b>
          <p className="text-[12px] text-mute leading-snug">
            MOQ tối thiểu từ 50 đơn vị. Kết hợp đa SKU để đạt MOQ. Giảm 5-12% theo bậc số lượng (200, 500, 1.000).
          </p>
        </div>
        <div className="bg-bg border border-line rounded p-3.5">
          <b className="block text-[13px] text-ink mb-1">🧪 Đặt mẫu trước MOQ</b>
          <p className="text-[12px] text-mute leading-snug">
            $50-200/mẫu, được khấu trừ 100% khi đặt MOQ. Giao về Việt Nam 8-12 ngày qua Trung tâm Mẫu Quảng Châu.
          </p>
        </div>
      </div>

      <div className="mt-4 flex justify-center">
        <label
          htmlFor={`${radioName}-5`}
          className="px-6 py-2.5 bg-brand text-white rounded-sm text-[13px] font-bold hover:bg-brand-light cursor-pointer"
        >
          📨 Gửi yêu cầu báo giá đa SKU →
        </label>
      </div>
    </div>
  );
}

/* =================================================================== */
/* TAB 3 — HỒ SƠ CÔNG TY                                               */
/* =================================================================== */
function CompanyTab({ f, foundedYear }: { f: Factory; foundedYear: number }) {
  const milestones = [
    { y: foundedYear, t: "Thành lập", d: `Khởi nghiệp từ xưởng nhỏ tại ${f.location.split(",")[0]} với 12 công nhân.` },
    { y: foundedYear + 3, t: "Cơ sở 2", d: "Mở rộng cơ sở sản xuất thứ 2 — tổng diện tích vượt 50.000 m²." },
    { y: foundedYear + 6, t: "Xuất khẩu đầu tiên", d: "Đơn xuất khẩu đầu tiên sang EU — đạt chứng nhận CE/RoHS." },
    { y: foundedYear + 9, t: "Đối tác Cybersilkroads", d: "Trở thành đối tác chiến lược, đạt phù hiệu Đã kiểm định + Vàng." },
    { y: 2025, t: "Mở rộng ASEAN", d: "Doanh thu Việt Nam vượt $8M/năm — top 3 thị trường ASEAN của công ty." },
  ];

  const leaders = [
    { name: "Wang Lei", role: "CEO & Founder", initials: "WL", years: f.badges.years },
    { name: "Li Mei", role: "Giám đốc Vận hành (COO)", initials: "LM", years: "12 năm" },
    { name: "Zhang Wei", role: "Giám đốc R&D", initials: "ZW", years: "8 năm" },
    { name: "Nguyễn Thu Hà", role: "Trưởng đại diện Việt Nam", initials: "NH", years: "5 năm" },
  ];

  return (
    <>
      <div className="bg-paper border border-line rounded p-5">
        <h2 className="text-[18px] font-bold text-ink mb-3">Hồ sơ doanh nghiệp {f.name}</h2>
        <p className="text-[13px] text-ink leading-relaxed mb-4">
          {f.name} là doanh nghiệp tư nhân sản xuất chuyên ngành {f.tags.join(", ")} có lịch sử {f.badges.years} kinh nghiệm. Trụ sở chính tại {f.location}, công ty đã phát triển từ một xưởng nhỏ thành tập đoàn có 3 cơ sở sản xuất, hơn 1.500 công nhân và mạng lưới phân phối tại 50 quốc gia.
        </p>
        <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
          <div className="bg-bg border border-line rounded p-3">
            <b className="block text-[10.5px] uppercase tracking-wider text-mute mb-1">Thông tin pháp lý</b>
            <ul className="text-[12.5px] text-ink space-y-1">
              <li>• Mã số doanh nghiệp Trung Quốc: <b>91440605MA****</b></li>
              <li>• Vốn đăng ký: <b>50 triệu NDT</b></li>
              <li>• Loại hình: <b>Trách nhiệm hữu hạn</b></li>
              <li>• Đăng ký xuất nhập khẩu: <b>GACC + AEO</b></li>
            </ul>
          </div>
          <div className="bg-bg border border-line rounded p-3">
            <b className="block text-[10.5px] uppercase tracking-wider text-mute mb-1">Tài chính</b>
            <ul className="text-[12.5px] text-ink space-y-1">
              <li>• Doanh thu 2025: <b>$120 triệu</b></li>
              <li>• Tăng trưởng so với năm trước: <b>+18%</b></li>
              <li>• Tỷ lệ xuất khẩu: <b>66%</b></li>
              <li>• Điểm tín dụng Tianyancha: <b>92/100</b></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-paper border border-line rounded p-5 mt-4">
        <h2 className="text-[16px] font-bold text-ink mb-4">Lịch sử phát triển</h2>
        <div className="relative pl-6">
          <div className="absolute left-[7px] top-1 bottom-1 w-0.5 bg-line" />
          {milestones.map((m, i) => (
            <div key={i} className="relative mb-4 last:mb-0">
              <div className="absolute -left-[1.4rem] top-0.5 w-4 h-4 rounded-full bg-brand border-2 border-paper" />
              <div className="flex items-baseline gap-2 mb-1">
                <b className="text-[14px] text-brand">{m.y}</b>
                <b className="text-[13.5px] text-ink">{m.t}</b>
              </div>
              <p className="text-[12.5px] text-mute leading-relaxed">{m.d}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-paper border border-line rounded p-5 mt-4">
        <h2 className="text-[16px] font-bold text-ink mb-3">Đội ngũ lãnh đạo</h2>
        <div className="grid grid-cols-4 gap-3 max-lg:grid-cols-2 max-md:grid-cols-1">
          {leaders.map((l) => (
            <div key={l.name} className="bg-bg border border-line rounded p-3 text-center">
              <div className="w-14 h-14 mx-auto rounded-full bg-brand text-white flex items-center justify-center font-extrabold text-[16px] mb-2">
                {l.initials}
              </div>
              <b className="block text-[13px] text-ink">{l.name}</b>
              <div className="text-[11px] text-mute mt-0.5">{l.role}</div>
              <div className="text-[10.5px] text-mute2 mt-1">{l.years} kinh nghiệm</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4 max-md:grid-cols-1">
        <div className="bg-paper border border-line rounded p-5">
          <h3 className="text-[15px] font-bold text-ink mb-3">🏆 Giải thưởng & ghi nhận</h3>
          <ul className="space-y-1.5 text-[12.5px] text-ink">
            <li>• Top 100 nhà sản xuất {f.tags[0]} Trung Quốc 2024</li>
            <li>• Giải thưởng Thiết kế Sáng tạo CIFF 2023</li>
            <li>• Doanh nghiệp xuất khẩu xuất sắc Quảng Đông 2022</li>
            <li>• Chứng nhận Doanh nghiệp Công nghệ cao</li>
            <li>• Top 50 thương hiệu được tin cậy Foshan</li>
          </ul>
        </div>
        <div className="bg-paper border border-line rounded p-5">
          <h3 className="text-[15px] font-bold text-ink mb-3">🤝 Hiệp hội thành viên</h3>
          <ul className="space-y-1.5 text-[12.5px] text-ink">
            <li>• CCPIT (Hội đồng Xúc tiến Thương mại Trung Quốc)</li>
            <li>• Hiệp hội {f.tags[0]} Trung Quốc</li>
            <li>• Foshan Chamber of International Commerce</li>
            <li>• Đối tác chính thức Cybersilkroads từ 2018</li>
          </ul>
        </div>
      </div>
    </>
  );
}

/* =================================================================== */
/* TAB 4 — NĂNG LỰC SẢN XUẤT                                          */
/* =================================================================== */
function CapacityTab({ f }: { f: Factory }) {
  return (
    <>
      <div className="bg-paper border border-line rounded p-5">
        <h2 className="text-[18px] font-bold text-ink mb-3">Năng lực sản xuất {f.name}</h2>
        <p className="text-[13px] text-ink leading-relaxed mb-4">
          3 cơ sở sản xuất tại {f.location} với tổng diện tích trên 200.000 m². 12 dây chuyền sản xuất tự động + 4 phòng QC + 2 phòng R&D. Năng suất {f.meta} đáp ứng đơn hàng từ 50 quốc gia.
        </p>
        <div className="grid grid-cols-4 gap-3 max-md:grid-cols-2">
          {[
            { n: "200K m²", l: "Tổng diện tích", icon: "🏭" },
            { n: "1,500+", l: "Công nhân", icon: "👷" },
            { n: "12", l: "Dây chuyền tự động", icon: "🔧" },
            { n: "80", l: "Kỹ sư R&D", icon: "🧪" },
          ].map((s) => (
            <div key={s.l} className="bg-bg border border-line rounded p-3 text-center">
              <div className="text-[22px]">{s.icon}</div>
              <b className="block text-[18px] font-extrabold text-brand mt-1">{s.n}</b>
              <div className="text-[11px] text-mute">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-paper border border-line rounded p-5 mt-4">
        <h2 className="text-[16px] font-bold text-ink mb-3">Dây chuyền sản xuất</h2>
        <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
          {[
            { n: 1, name: "Dây chuyền chính", capacity: "12.000 đơn vị/tháng", auto: "85% tự động", staff: "120 công nhân" },
            { n: 2, name: "Dây chuyền OEM tùy chỉnh", capacity: "3.000 đơn vị/tháng", auto: "60% tự động", staff: "85 công nhân" },
            { n: 3, name: "Dây chuyền cao cấp", capacity: "1.500 đơn vị/tháng", auto: "Thủ công", staff: "45 nghệ nhân" },
            { n: 4, name: "Dây chuyền R&D / mẫu mới", capacity: "200 đơn vị/tháng", auto: "Thủ công", staff: "20 kỹ sư" },
          ].map((l) => (
            <div key={l.n} className="bg-bg border border-line rounded p-3 flex gap-3">
              <div className="aspect-video w-32 flex-shrink-0 bg-[#F5F5F5] rounded overflow-hidden">
                <img src={`/img/${f.slug}-line${l.n}.jpg?v=3`} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <b className="block text-[13px] text-ink">Dây chuyền {l.n} — {l.name}</b>
                <div className="text-[11.5px] text-mute mt-1 space-y-0.5">
                  <div>📦 Năng suất: <b className="text-ink">{l.capacity}</b></div>
                  <div>⚙️ Mức độ: <b className="text-ink">{l.auto}</b></div>
                  <div>👷 Nhân lực: <b className="text-ink">{l.staff}</b></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-paper border border-line rounded p-5 mt-4">
        <h2 className="text-[16px] font-bold text-ink mb-3">Máy móc & thiết bị</h2>
        <div className="grid grid-cols-3 gap-3 max-md:grid-cols-1">
          {[
            { n: "12 máy", t: "CNC trục 5 đầu", brand: "DMG Mori (Đức)" },
            { n: "8 máy", t: "Robot hàn / cắt laser", brand: "FANUC (Nhật)" },
            { n: "6 máy", t: "Phun sơn tự động", brand: "Wagner (Đức)" },
            { n: "4 dây", t: "Đóng gói tự động", brand: "Bosch (Đức)" },
            { n: "20 máy", t: "Máy may công nghiệp", brand: "JUKI (Nhật)" },
            { n: "10 máy", t: "Máy ép thủy lực", brand: "Schuler (Đức)" },
          ].map((m, i) => (
            <div key={i} className="bg-bg border border-line rounded p-3">
              <b className="block text-[15px] text-brand">{m.n}</b>
              <div className="text-[12.5px] text-ink mt-0.5">{m.t}</div>
              <div className="text-[11px] text-mute mt-1">{m.brand}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-paper border border-line rounded p-5 mt-4">
        <h2 className="text-[16px] font-bold text-ink mb-3">Hệ thống Kiểm soát Chất lượng (QC)</h2>
        <div className="space-y-3">
          {[
            { stage: "1. Kiểm nguyên liệu đầu vào (IQC)", desc: "Kiểm 100% lô nguyên liệu. Phòng QC riêng với máy quang phổ XRF, máy đo độ ẩm, lab test cơ tính. Lưu mẫu 18 tháng." },
            { stage: "2. Kiểm trong sản xuất (IPQC)", desc: "Kiểm tại 5 trạm dọc dây chuyền. Sample size theo AQL 2.5. Phát hiện lỗi sớm — giảm phế phẩm xuống <0,8%." },
            { stage: "3. Kiểm thành phẩm (FQC)", desc: "Kiểm 100% trước đóng gói. Đo kích thước bằng caliper điện tử, kiểm finish bằng máy đo bóng, test functional." },
            { stage: "4. Kiểm trước xuất xưởng (Pre-shipment)", desc: "Inspector Cybersilkroads kiểm độc lập theo AQL 2.5 cho mọi đơn ≥$5K. Báo cáo PDF + 100+ ảnh + video gửi buyer trong 4 giờ." },
          ].map((q, i) => (
            <div key={i} className="border-l-4 border-brand bg-bg pl-4 py-2.5">
              <b className="block text-[13px] text-ink">{q.stage}</b>
              <p className="text-[12px] text-mute mt-0.5 leading-relaxed">{q.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4 max-md:grid-cols-1">
        <div className="bg-paper border border-line rounded p-5">
          <h3 className="text-[15px] font-bold text-ink mb-3">🧪 Nghiên cứu & phát triển</h3>
          <ul className="space-y-1.5 text-[12.5px] text-ink">
            <li>• 80 kỹ sư R&D toàn thời gian</li>
            <li>• Đầu tư R&D: <b>4,5% doanh thu</b></li>
            <li>• 47 bằng sáng chế đã cấp</li>
            <li>• 12 mẫu mới ra mỗi quý</li>
            <li>• Lab thiết kế 3D + máy in 3D công nghiệp</li>
          </ul>
        </div>
        <div className="bg-paper border border-line rounded p-5">
          <h3 className="text-[15px] font-bold text-ink mb-3">🌱 Bền vững & môi trường</h3>
          <ul className="space-y-1.5 text-[12.5px] text-ink">
            <li>• ISO 14001 — quản lý môi trường</li>
            <li>• Năng lượng mặt trời mái xưởng — 30% nhu cầu</li>
            <li>• Hệ thống xử lý nước thải tuần hoàn</li>
            <li>• Tỷ lệ tái chế phế liệu: <b>92%</b></li>
            <li>• FSC chain-of-custody cho gỗ</li>
          </ul>
        </div>
      </div>
    </>
  );
}

/* =================================================================== */
/* TAB 5 — LIÊN HỆ                                                     */
/* =================================================================== */
function ContactTab({ f }: { f: Factory }) {
  return (
    <>
      <div className="bg-paper border border-line rounded p-5">
        <h2 className="text-[18px] font-bold text-ink mb-2">Liên hệ {f.name}</h2>
        <p className="text-[13px] text-mute leading-relaxed">
          Mọi giao tiếp đi qua Cybersilkroads để được bảo vệ bằng Bảo đảm Giao dịch + dịch tự động Trung-Việt. Quản lý tài khoản chuyên trách phản hồi trong giờ làm việc <b className="text-ink">dưới 30 phút</b>.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4 max-md:grid-cols-1">
        <div className="bg-paper border border-line rounded p-5">
          <span className="inline-block text-[10.5px] uppercase tracking-wider font-bold bg-brand/10 text-brand px-2 py-0.5 rounded-sm mb-2">
            🇨🇳 Trụ sở chính
          </span>
          <h3 className="text-[15px] font-bold text-ink mb-1">{f.name}</h3>
          <p className="text-[12.5px] text-mute leading-relaxed mb-3">
            Tòa nhà sản xuất chính, Khu công nghiệp Tianhe, {f.location}
          </p>
          <ul className="space-y-1 text-[12px] text-ink">
            <li>📞 Hotline: <b>+86 757 8888 1234</b></li>
            <li>💬 WeChat / WhatsApp: <b>+86 138 0000 1234</b></li>
            <li>✉ Email: <b>sales@{f.slug.replace(/-/g, "")}.com.cn</b></li>
            <li>🕒 Giờ làm việc: <b>T2-T7, 8:30-18:00 (GMT+8)</b></li>
            <li>🌐 Ngôn ngữ: <b>Trung, Anh, qua phiên dịch CSR: Việt</b></li>
          </ul>
        </div>

        <div className="bg-paper border border-line rounded p-5">
          <span className="inline-block text-[10.5px] uppercase tracking-wider font-bold bg-gold/15 text-[#9C6A1F] px-2 py-0.5 rounded-sm mb-2">
            🇻🇳 Đại diện Việt Nam
          </span>
          <h3 className="text-[15px] font-bold text-ink mb-1">Văn phòng Cybersilkroads Hà Nội</h3>
          <p className="text-[12.5px] text-mute leading-relaxed mb-3">
            Tầng 21, Tòa Diamond Flower, 48 Lê Văn Lương, Cầu Giấy, Hà Nội
          </p>
          <ul className="space-y-1 text-[12px] text-ink">
            <li>📞 Hotline: <b>1900 6688</b> (miễn phí trong nước)</li>
            <li>💬 Zalo: <b>+84 24 3556 7788</b></li>
            <li>✉ Email: <b>vn-{f.slug}@cybersilkroads.com</b></li>
            <li>🕒 Giờ làm việc: <b>T2-T6, 8:30-18:00 (GMT+7)</b></li>
            <li>🌐 Ngôn ngữ: <b>Tiếng Việt, hỗ trợ dịch sang tiếng Trung</b></li>
          </ul>
        </div>
      </div>

      <div className="bg-paper border-2 border-brand rounded p-5 mt-4">
        <div className="flex items-start gap-4 max-md:flex-col">
          <div className="w-16 h-16 rounded-full bg-brand text-white flex items-center justify-center font-extrabold text-[20px] flex-shrink-0">
            NH
          </div>
          <div className="flex-1">
            <span className="inline-block text-[10.5px] uppercase tracking-wider font-bold bg-brand text-white px-2 py-0.5 rounded-sm mb-1">
              Quản lý tài khoản chuyên trách
            </span>
            <h3 className="text-[16px] font-bold text-ink mt-1">Nguyễn Thu Hà</h3>
            <p className="text-[12px] text-mute">Sourcing Specialist · 5 năm chuyên ngành {f.tags[0]}</p>
            <p className="text-[12.5px] text-ink mt-2 leading-relaxed">
              Hà phụ trách đại lý Việt Nam của {f.name} — từ tư vấn sản phẩm, đàm phán giá, theo dõi sản xuất, đến giải quyết tranh chấp. Phản hồi qua Zalo / Email trong dưới 30 phút giờ làm việc.
            </p>
            <div className="mt-3 flex gap-2 flex-wrap">
              <a href="tel:19006688" className="px-3 py-1.5 bg-brand text-white rounded-sm text-[12px] font-semibold hover:bg-brand-light">📞 Gọi ngay</a>
              <a href="https://zalo.me/cybersilkroads" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-[#0068FF] text-white rounded-sm text-[12px] font-semibold hover:opacity-90">💬 Chat Zalo</a>
              <a href="mailto:hr@cybersilkroads.com" className="px-3 py-1.5 border border-line text-ink rounded-sm text-[12px] font-semibold hover:border-brand">✉ Email</a>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mt-4 max-md:grid-cols-1">
        <div className="bg-paper border border-line rounded p-4 hover:border-brand transition cursor-pointer">
          <div className="text-[28px] mb-2">📨</div>
          <b className="block text-[13px] text-ink mb-1">Gửi yêu cầu báo giá</b>
          <p className="text-[11.5px] text-mute leading-snug mb-2">Form 60 giây — phản hồi trong 24h. Kèm spec, số lượng, thời hạn.</p>
          <Link href="/buying-request" className="text-[12px] text-brand font-semibold hover:underline">Mở form RFQ →</Link>
        </div>
        <div className="bg-paper border border-line rounded p-4 hover:border-brand transition cursor-pointer">
          <div className="text-[28px] mb-2">🎥</div>
          <b className="block text-[13px] text-ink mb-1">Đặt lịch gọi video</b>
          <p className="text-[11.5px] text-mute leading-snug mb-2">Video call trực tiếp với phòng kinh doanh + xưởng (có dịch song song Trung-Việt).</p>
          <Link href="/buyer-center/meet-suppliers" className="text-[12px] text-brand font-semibold hover:underline">Đặt lịch →</Link>
        </div>
        <div className="bg-paper border border-line rounded p-4 hover:border-brand transition cursor-pointer">
          <div className="text-[28px] mb-2">🏭</div>
          <b className="block text-[13px] text-ink mb-1">Tham quan nhà máy</b>
          <p className="text-[11.5px] text-mute leading-snug mb-2">Đoàn buyer Việt Nam đi cùng đội Cybersilkroads — chi phí ~$580/4 ngày.</p>
          <Link href="/factory-tour" className="text-[12px] text-brand font-semibold hover:underline">Đăng ký →</Link>
        </div>
      </div>

      <div className="bg-paper border border-line rounded p-5 mt-4">
        <h3 className="text-[15px] font-bold text-ink mb-3">📍 Vị trí nhà máy</h3>
        <div className="aspect-[16/7] bg-bg border border-line rounded flex items-center justify-center text-mute">
          <div className="text-center">
            <div className="text-[42px] mb-2">🗺</div>
            <p className="text-[13px]">{f.location}</p>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(f.location)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-3 px-4 py-2 bg-brand text-white rounded-sm text-[12px] font-bold hover:bg-brand-light"
            >
              🧭 Mở Google Maps →
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

/* =================================================================== */
/* TAB 6 — TOUR 360°                                                   */
/* =================================================================== */
function Vr360Tab({ f }: { f: Factory }) {
  // Demo comId mặc định (OPPEIN) khi NCC chưa có VR riêng — để bạn xem được demo.
  const DEMO_COM_ID = "eKtTcaCAvhrm";
  const comId = f.vr360ComId ?? DEMO_COM_ID;
  const isOwnVr = !!f.vr360ComId;
  const vrUrl = `https://world-port.made-in-china.com/viewVR?comId=${comId}`;

  // Lấy tên hiển thị cho overlay che logo (loại bỏ hậu tố pháp lý + tỉnh thành dài)
  const overlayName = f.name
    // Bỏ tỉnh / thành phố đầu chuỗi
    .replace(/^(Guangdong|Guangzhou|Hangzhou|Shenzhen|Foshan|Shanghai|Hong Kong|Taizhou|Dongguan|Ningbo|Beijing|Tianjin)\s+/i, "")
    // Bỏ phần trong ngoặc cuối (vd "(HK)")
    .replace(/\s*[(（][^)）]*[)）]\s*$/g, "")
    // Bỏ hậu tố pháp lý + dot kèm theo
    .replace(/\s*,?\s*(Co\.,?\s*Ltd\.?|Co\.\s*Ltd\.?|Co\.,\s*Ltd|Inc\.?|Ltd\.?|Corp\.?|Limited|Holdings|Group)\.?$/gi, "")
    .replace(/\s*,?\s*(Co\.,?\s*Ltd\.?|Co\.\s*Ltd\.?|Co\.,\s*Ltd|Inc\.?|Ltd\.?|Corp\.?|Limited|Holdings|Group)\.?$/gi, "")
    // Dọn space + ký tự thừa
    .replace(/\s+/g, " ")
    .replace(/[\s.,;:]+$/g, "")
    .trim()
    .toUpperCase();

  return (
    <>
      {/* Hero intro */}
      <div className="bg-paper border border-line rounded p-5">
        <div className="mb-3">
          <span className="inline-block bg-accent/15 text-accent text-[10.5px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-sm mb-1">
            🎬 Tour ảo 360°
          </span>
          <h2 className="text-[18px] font-bold text-ink">Tham quan nhà máy {f.name} qua VR</h2>
          <p className="text-[13px] text-mute mt-1 leading-relaxed">
            Trải nghiệm thực địa nhà máy không cần bay sang Trung Quốc. Kéo chuột xoay 360°, click các điểm nóng để xem dây chuyền, kho thành phẩm, phòng QC, phòng họp gặp khách.
          </p>
        </div>

        {!isOwnVr && (
          <div className="bg-gold/10 border border-gold/30 text-[#7C5A1F] rounded p-3 mb-3 text-[12.5px] flex items-start gap-2">
            <span className="text-[18px] flex-shrink-0">ℹ️</span>
            <span>
              <b>Đây là demo</b> — Tour 360° riêng của <b>{f.name}</b> đang được Cybersilkroads ghi hình. Liên hệ quản lý tài khoản để được thông báo khi sẵn sàng. Hiện tại bạn đang xem tour mẫu.
            </span>
          </div>
        )}

        {/* VR iframe + 2 overlay + nút fullscreen native (giữ trong Cybersilkroads) */}
        <Vr360Frame vrUrl={vrUrl} overlayName={overlayName} factoryName={f.name} />

        <p className="text-[11px] text-mute2 italic mt-2 text-center">
          Tour cung cấp bởi đối tác kỹ thuật VR ·{" "}
          {isOwnVr ? "Tour riêng cho nhà máy này" : "Demo (NCC này đang chuẩn bị tour riêng)"}
        </p>
      </div>

      {/* What you can see */}
      <div className="bg-paper border border-line rounded p-5 mt-4">
        <h3 className="text-[15px] font-bold text-ink mb-3">Bạn có thể thấy gì trong tour</h3>
        <div className="grid grid-cols-3 gap-3 max-md:grid-cols-1">
          {[
            { icon: "🏭", t: "Toàn cảnh nhà máy", d: "Drone shot ngoại thất, biển hiệu, cổng vào, khu vực đậu xe container." },
            { icon: "⚙️", t: "Dây chuyền sản xuất", d: "Các trạm sản xuất chính, máy móc đang vận hành, công nhân thực tế." },
            { icon: "📦", t: "Kho thành phẩm", d: "Quy mô kho, cách đóng gói, dán nhãn, palletization chuẩn xuất khẩu." },
            { icon: "🔬", t: "Phòng QC", d: "Thiết bị kiểm tra chất lượng, lab thử nghiệm material, lưu mẫu." },
            { icon: "🎨", t: "Showroom mẫu", d: "Sản phẩm hoàn thiện trưng bày — hữu ích để chọn variant trước RFQ." },
            { icon: "🤝", t: "Phòng họp", d: "Không gian gặp khách trực tiếp — đặt lịch video call với phòng kinh doanh." },
          ].map((s) => (
            <div key={s.t} className="bg-bg border border-line rounded p-3">
              <div className="text-[24px] mb-1">{s.icon}</div>
              <b className="block text-[13px] text-ink">{s.t}</b>
              <p className="text-[11.5px] text-mute mt-0.5 leading-snug">{s.d}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How to use */}
      <div className="bg-paper border border-line rounded p-5 mt-4">
        <h3 className="text-[15px] font-bold text-ink mb-3">Hướng dẫn điều khiển</h3>
        <div className="grid grid-cols-2 gap-4 text-[12.5px] max-md:grid-cols-1">
          <ul className="space-y-1.5 text-ink">
            <li>🖱 <b>Kéo chuột</b> để xoay góc nhìn 360°</li>
            <li>🔍 <b>Cuộn chuột</b> hoặc nút +/− để zoom in/out</li>
            <li>🎯 <b>Click các chấm sáng</b> trong ảnh để di chuyển sang khu vực khác</li>
            <li>🗺 <b>Bản đồ thu nhỏ</b> ở góc giúp định vị bạn đang ở đâu</li>
          </ul>
          <ul className="space-y-1.5 text-ink">
            <li>📱 <b>Trên di động</b>: nghiêng máy để xoay (gyroscope), hoặc chạm và kéo</li>
            <li>🥽 <b>Có kính VR?</b> Click biểu tượng kính ở thanh dưới để vào chế độ VR</li>
            <li>⛶ <b>Toàn màn hình</b>: nút trên cùng — trải nghiệm tốt nhất</li>
            <li>🎧 <b>Bật âm thanh</b> để nghe tiếng máy thực tế (nếu có)</li>
          </ul>
        </div>
      </div>

      {/* CTA */}
      <div className="rounded p-5 text-white mt-4" style={{ background: "linear-gradient(135deg, var(--color-brand) 0%, var(--color-brand-dark) 100%)" }}>
        <div className="flex items-start justify-between gap-4 max-md:flex-col">
          <div>
            <h3 className="text-[16px] font-bold mb-1">Muốn xem nhà máy thực, không phải VR?</h3>
            <p className="text-[12.5px] opacity-90 leading-relaxed">
              Cybersilkroads tổ chức đoàn tham quan nhà máy 4 ngày 3 đêm tại Quảng Châu / Thâm Quyến / Foshan. Chi phí ~$580/người, đi cùng đội Cybersilkroads + phiên dịch.
            </p>
          </div>
          <Link
            href="/factory-tour"
            className="px-5 py-2.5 bg-gold text-brand-dark rounded-sm text-[13px] font-bold hover:bg-[#E8943A] whitespace-nowrap"
          >
            ✈ Đăng ký tham quan thực
          </Link>
        </div>
      </div>
    </>
  );
}

function AiTab({ f, foundedYear }: { f: Factory; foundedYear: number }) {
  const shortName = f.name.split(/\s+/).slice(0, 2).join(" ");
  const yearsExperience = 2026 - foundedYear;
  const tags = f.tags.slice(0, 3).join(", ");

  const conversation: { role: "ai" | "user"; text: string; time: string }[] = [
    {
      role: "ai",
      time: "09:14",
      text: `Xin chào! Tôi là **CSR AI** — trợ lý ảo của ${f.name}. Tôi đã được huấn luyện trên toàn bộ catalogue, bảng giá, chứng chỉ và lịch sử đơn hàng của ${shortName}. Tôi có thể trả lời ngay các câu hỏi về sản phẩm, MOQ, lead time, đặt mẫu, thanh toán và quy trình OEM/ODM. Bạn cần giúp gì hôm nay?`,
    },
    { role: "user", time: "09:15", text: `Sản phẩm chủ lực và MOQ tối thiểu của ${shortName} là gì?` },
    {
      role: "ai",
      time: "09:15",
      text: `${shortName} có ${yearsExperience} năm kinh nghiệm tại ${f.location.split(" · ")[0]}, chuyên ${tags.toLowerCase()}. 3 dòng sản phẩm chính:\n\n📦 **Hàng custom theo bản vẽ** — MOQ từ 10 bộ, lead time 25–30 ngày\n📦 **Hàng modular tiêu chuẩn** — MOQ từ 20 bộ, lead time 18–22 ngày\n📦 **Hàng có sẵn (stock items)** — MOQ từ 5 bộ, giao trong 7–10 ngày\n\nVới đơn ≥ 50 bộ, MOQ có thể thương lượng giảm tới 30%. Bạn quan tâm dòng nào, tôi gửi bảng giá chi tiết ngay?`,
    },
    { role: "user", time: "09:17", text: "Tôi muốn đặt hàng mẫu trước khi chốt số lượng lớn. Quy trình ra sao?" },
    {
      role: "ai",
      time: "09:17",
      text: `Quy trình đặt mẫu của ${shortName} gồm 5 bước:\n\n1️⃣ Gửi yêu cầu kèm bản vẽ/ảnh tham khảo qua nút **Yêu cầu báo giá** (sidebar trang này)\n2️⃣ Đội thiết kế ${shortName} render 3D **miễn phí** trong 3–5 ngày\n3️⃣ Sau khi xác nhận thiết kế, đặt cọc 50% phí mẫu — khoảng **$80–250/sản phẩm** tuỳ độ phức tạp\n4️⃣ Sản xuất mẫu **7–15 ngày** tại xưởng\n5️⃣ Vận chuyển mẫu về Việt Nam qua DHL/Fedex (~5 ngày, $80–120 tuỳ kg)\n\n💰 **Hoàn 100% phí mẫu** vào đơn chính thức nếu đơn ≥ $5,000.`,
    },
    { role: "user", time: "09:19", text: "Thanh toán có hỗ trợ Trade Assurance không? Có chứng chỉ xuất EU/Mỹ không?" },
    {
      role: "ai",
      time: "09:19",
      text: `Cả hai đều có ✅\n\n**Phương thức thanh toán:**\n🛡️ **Cybersilkroads Escrow** (khuyến nghị) — nền tảng giữ tiền cọc, chỉ giải ngân khi hàng đến đúng chất lượng\n💳 **L/C** qua VietinBank / Vietcombank\n🏦 **T/T** — 30% cọc + 70% sau khi xem ảnh hàng đóng kiện\n🔄 **OA 30/60 ngày** — với khách đối tác cũ (cần xét duyệt)\n\n**Chứng chỉ xuất khẩu:**\n🏅 CE Marking (EU) · ISO 9001:2015 · BSCI · Sedex SMETA 4-pillar · FSC-COC · CARB Phase 2 / TSCA Title VI (Mỹ)\n\nDownload bộ chứng chỉ đầy đủ tại tab **Hồ sơ công ty** → mục Chứng chỉ chất lượng.`,
    },
    { role: "user", time: "09:21", text: "Tôi đặt 30 bộ hàng custom thì giá khoảng bao nhiêu USD?" },
    {
      role: "ai",
      time: "09:21",
      text: `Để báo giá chính xác cho 30 bộ hàng custom, tôi cần thêm:\n\n📐 Kích thước trung bình mỗi bộ\n🪵 Vật liệu mong muốn (MDF / HDF / gỗ tự nhiên / acrylic / lacquer)\n🔧 Phụ kiện kèm (Blum / Hettich / Häfele hay phụ kiện thường)\n🚚 Điều kiện giao (FOB Quảng Châu / CIF Hải Phòng / DDP Hà Nội)\n\n**Khoảng giá tham khảo cho 30 bộ tiêu chuẩn:**\n• Cấp Economy: **$280–380/bộ**\n• Cấp Mid-range: **$520–680/bộ**\n• Cấp Premium: **$1,150–1,580/bộ**\n\n👉 Bạn muốn tôi tạo RFQ tự động hoá theo cấu hình cụ thể không? Bấm nút **Tạo RFQ** bên dưới.`,
    },
  ];

  const trainingSources = [
    { icon: "📦", label: "Catalogue 2,400+ SKU sản phẩm", value: f.tags.join(" · ") },
    { icon: "💵", label: "Bảng giá theo MOQ + Incoterms", value: "FOB / CIF / DDP" },
    { icon: "🏅", label: "Bộ chứng chỉ chất lượng", value: "CE · ISO 9001 · BSCI · FSC · CARB" },
    { icon: "📜", label: "Lịch sử đơn hàng + đánh giá khách", value: `${f.reviews} đánh giá · ★ ${f.rating}` },
    { icon: "⏱️", label: "Lead time thực tế theo dòng SP", value: "Custom 25–30 · Modular 18–22 · Stock 7–10 ngày" },
    { icon: "🔄", label: "Quy trình OEM/ODM + đặt mẫu", value: "5 bước · 7–15 ngày · hoàn phí mẫu" },
  ];

  const quickTopics = [
    "💵 Bảng giá theo MOQ",
    "📐 Đặt mẫu + 3D render",
    "🚚 Lead time + vận chuyển",
    "🏅 Chứng chỉ EU / Mỹ",
    "🛡️ Thanh toán + Escrow",
    "🔧 OEM / ODM custom",
    "📞 Lịch họp Zoom với sales",
    "🔍 So sánh với NCC khác",
  ];

  return (
    <>
      <div className="bg-paper border border-line rounded p-5 mb-4">
        <div className="flex items-start gap-4 max-md:flex-col">
          <div className="w-14 h-14 rounded-full flex items-center justify-center text-white text-[26px] flex-shrink-0" style={{ background: "linear-gradient(135deg, var(--color-brand) 0%, #008899 100%)" }}>
            🤖
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h2 className="text-[18px] font-bold text-fg">CSR AI · {shortName}</h2>
              <span className="bg-success text-white text-[10px] px-2 py-0.5 rounded-sm font-bold">● ONLINE</span>
              <span className="bg-gold text-brand-dark text-[10px] px-2 py-0.5 rounded-sm font-bold">BETA</span>
            </div>
            <p className="text-[12.5px] text-mute leading-relaxed">
              Trợ lý ảo được huấn luyện riêng trên dữ liệu của <b>{f.name}</b>. Trả lời <b>tức thì 24/7</b> bằng tiếng Việt về sản phẩm, MOQ, lead time, đặt mẫu, chứng chỉ, thanh toán và OEM/ODM. Mọi câu trả lời đều có nguồn gốc từ catalogue + tài liệu chính thức của xưởng.
            </p>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-line">
          <div className="text-[11.5px] font-bold text-mute uppercase tracking-wide mb-2">📚 Dữ liệu AI được huấn luyện trên:</div>
          <div className="grid grid-cols-2 gap-2 max-md:grid-cols-1">
            {trainingSources.map((s) => (
              <div key={s.label} className="flex items-start gap-2 p-2 bg-bg rounded border border-line">
                <span className="text-[18px] flex-shrink-0">{s.icon}</span>
                <div className="min-w-0">
                  <div className="text-[12px] font-semibold text-fg leading-tight">{s.label}</div>
                  <div className="text-[11px] text-mute2 truncate">{s.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-paper border border-line rounded p-4 mb-4">
        <div className="text-[12px] font-bold text-mute mb-2">💡 Bấm chủ đề để xem AI trả lời mẫu:</div>
        <div className="flex flex-wrap gap-2">
          {quickTopics.map((t) => (
            <button
              key={t}
              type="button"
              className="px-3 py-1.5 bg-bg border border-line rounded-full text-[12px] text-fg hover:border-brand hover:text-brand cursor-pointer transition"
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="border border-line rounded overflow-hidden bg-paper">
        <div className="px-4 py-2.5 flex items-center justify-between text-white" style={{ background: "linear-gradient(90deg, var(--color-brand), #066875)" }}>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center text-[14px]">🤖</div>
            <div>
              <div className="text-[13px] font-bold leading-tight">CSR AI</div>
              <div className="text-[10.5px] opacity-90 leading-tight">Phản hồi trung bình 1.2s · Tiếng Việt + English</div>
            </div>
          </div>
          <span className="text-[10.5px] bg-white/15 px-2 py-1 rounded">DEMO</span>
        </div>

        <div className="p-4 space-y-3 bg-bg" style={{ maxHeight: 520, overflowY: "auto" }}>
          {conversation.map((m, i) => {
            if (m.role === "ai") {
              return (
                <div key={i} className="flex items-start gap-2">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[13px] flex-shrink-0 mt-0.5" style={{ background: "linear-gradient(135deg, var(--color-brand), #008899)" }}>
                    🤖
                  </div>
                  <div className="max-w-[80%]">
                    <div className="bg-white border border-line rounded-lg rounded-tl-none px-3 py-2 text-[12.5px] text-fg leading-relaxed whitespace-pre-line">
                      {m.text.split(/(\*\*[^*]+\*\*)/).map((seg, j) =>
                        seg.startsWith("**") && seg.endsWith("**")
                          ? <b key={j}>{seg.slice(2, -2)}</b>
                          : <span key={j}>{seg}</span>
                      )}
                    </div>
                    <div className="text-[10px] text-mute2 mt-1 ml-1">CSR AI · {m.time}</div>
                  </div>
                </div>
              );
            }
            return (
              <div key={i} className="flex items-start gap-2 justify-end">
                <div className="max-w-[80%]">
                  <div className="text-white rounded-lg rounded-tr-none px-3 py-2 text-[12.5px] leading-relaxed" style={{ background: "linear-gradient(135deg, var(--color-brand), #066875)" }}>
                    {m.text}
                  </div>
                  <div className="text-[10px] text-mute2 mt-1 mr-1 text-right">Bạn · {m.time}</div>
                </div>
                <div className="w-7 h-7 rounded-full bg-bg border border-line flex items-center justify-center text-[13px] flex-shrink-0 mt-0.5">
                  👤
                </div>
              </div>
            );
          })}

          <div className="flex items-start gap-2">
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[13px] flex-shrink-0 mt-0.5" style={{ background: "linear-gradient(135deg, var(--color-brand), #008899)" }}>
              🤖
            </div>
            <div className="bg-white border border-line rounded-lg rounded-tl-none px-4 py-3 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-mute2 inline-block" />
              <span className="w-1.5 h-1.5 rounded-full bg-mute2 inline-block" />
              <span className="w-1.5 h-1.5 rounded-full bg-mute2 inline-block" />
              <span className="text-[10.5px] text-mute2 ml-2">CSR AI đang soạn...</span>
            </div>
          </div>
        </div>

        <div className="border-t border-line p-3 bg-paper">
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Hỏi về sản phẩm, MOQ, đặt mẫu, lead time, OEM... (Demo — sắp ra mắt Q3/2026)"
              disabled
              className="flex-1 px-3 py-2 border border-line rounded text-[12.5px] bg-bg cursor-not-allowed"
            />
            <button
              type="button"
              disabled
              className="px-4 py-2 bg-mute2 text-white rounded text-[12.5px] font-bold cursor-not-allowed whitespace-nowrap"
            >
              📤 Gửi
            </button>
          </div>
          <div className="flex items-start gap-2 mt-2 text-[10.5px] text-mute2 leading-relaxed">
            <span>🚧</span>
            <span>Tính năng chat trực tiếp với AI sẽ ra mắt <b className="text-fg">Q3/2026</b>. Hiện bạn đang xem demo conversation. Cần hỏi gấp? Bấm <b>Yêu cầu báo giá</b> ở sidebar — sales đội {shortName} phản hồi trong 2h (giờ làm việc TQ).</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-4 max-md:grid-cols-1">
        <div className="bg-paper border border-line rounded p-4">
          <div className="text-[13px] font-bold text-fg mb-2">✅ AI có thể trả lời:</div>
          <ul className="text-[12px] text-mute space-y-1.5 leading-relaxed">
            <li>• Sản phẩm cụ thể (giá, MOQ, lead time, vật liệu)</li>
            <li>• Quy trình đặt mẫu + đặt hàng custom</li>
            <li>• Chứng chỉ chất lượng và file kèm</li>
            <li>• Phương thức thanh toán + bảo hiểm</li>
            <li>• So sánh sản phẩm trong cùng catalogue</li>
            <li>• Tư vấn vật liệu phù hợp ngân sách</li>
            <li>• Logistics: cảng FOB, thời gian biển, DDP Hà Nội</li>
          </ul>
        </div>
        <div className="bg-paper border border-line rounded p-4">
          <div className="text-[13px] font-bold text-fg mb-2">❌ AI không thay thế:</div>
          <ul className="text-[12px] text-mute space-y-1.5 leading-relaxed">
            <li>• Đàm phán giá đặc biệt với đơn lớn</li>
            <li>• Ký hợp đồng OEM dài hạn</li>
            <li>• Quyết định pháp lý / tranh chấp</li>
            <li>• Báo giá dự án phức tạp ≥ $50K</li>
            <li>• Khách hàng VIP cần Account Manager riêng</li>
          </ul>
          <div className="mt-3 pt-3 border-t border-line text-[11.5px] text-mute2">
            👉 Mọi đơn hàng vẫn được sales {shortName} confirm trước khi sản xuất. AI chỉ giúp bạn <b className="text-fg">trả lời nhanh trước</b> để đỡ chờ múi giờ.
          </div>
        </div>
      </div>
    </>
  );
}
