import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { COMPANY } from "@/data/company";

// ─── DATA ────────────────────────────────────────────────────────────────

const HERO_STATS = [
  { n: "63", l: "Tỉnh thành VN", icon: "🇻🇳" },
  { n: "3", l: "Cluster TQ chủ lực", icon: "🇨🇳" },
  { n: "4", l: "Nhóm đối tác phân phối", icon: "🤝" },
  { n: "2", l: "Văn phòng vận hành", icon: "🏢" },
];

const DISTRIBUTION_PARTNERS = [
  {
    icon: "🏪",
    color: "#005F6B",
    title: "Đại lý phân phối VLXD",
    summary: "Chuỗi cửa hàng, showroom gạch, kho vật liệu",
    desc: "Đại lý gạch porcelain, sanitary, đá ốp lát, sơn, sàn gỗ tại tỉnh/thành.",
    benefits: [
      "Giá DDP tận kho",
      "Bảo hành theo nhà máy gốc",
      "Hỗ trợ đổi trả qua đội Hà Nội",
      "Catalog & sample tiếng Việt",
    ],
  },
  {
    icon: "🏗",
    color: "#9C6A1F",
    title: "Nhà thầu xây dựng",
    summary: "Công ty xây dựng, nhà thầu BĐS, nhà ở xã hội",
    desc: "Báo giá theo dự án, giao theo tiến độ thi công, sample miễn phí cho đơn ≥30 bộ.",
    benefits: [
      "Báo giá dự án trọn gói",
      "Giao chia theo tiến độ thi công",
      "Sample free cho đơn ≥30 bộ",
      "Bảo hành + đổi trả qua Huayue",
    ],
  },
  {
    icon: "🎨",
    color: "#7C2D12",
    title: "Công ty thiết kế nội thất",
    summary: "Studio thiết kế, interior design",
    desc: "Catalogue tiếng Việt + 3D visual miễn phí cho khách VIP có đơn ≥30 bộ.",
    benefits: [
      "Catalogue nhãn hàng TQ tiếng Việt",
      "Sample wood/stone/fabric thực tế",
      "3D visual miễn phí cho khách VIP",
      "Chiết khấu ưu đãi dự án trọn gói",
    ],
  },
  {
    icon: "🔌",
    color: "#7C3AED",
    title: "Đại lý điện máy & thiết bị bếp",
    summary: "Chuỗi điện máy, dealer khu vực",
    desc: "Bình nóng lạnh, bếp gas, máy hút mùi, nắp bồn cầu thông minh.",
    benefits: [
      "Hợp đồng đại lý độc quyền khu vực",
      "Bảo hành chính hãng TQ",
      "Hỗ trợ marketing tại điểm bán",
      "Giá nhập tốt hơn nhà phân phối tự nhập",
    ],
  },
];

const CN_CLUSTERS = [
  {
    province: "Quảng Đông",
    provinceCn: "广东省",
    color: "#C8102E",
    weight: "Cluster chính",
    cities: [
      { name: "Phật Sơn (佛山)", spec: "Gốm sứ, sanitary, gạch porcelain — 1.200+ nhà máy" },
      { name: "Lecong / Shunde (乐从顺德)", spec: "Sofa, nội thất gỗ — chợ nội thất lớn nhất TQ" },
      { name: "Đông Quan (东莞)", spec: "Tủ bếp, tủ áo, MDF cao cấp" },
      { name: "Trung Sơn (中山)", spec: "Đèn LED, đồ điện gia dụng" },
      { name: "Triều Châu (潮州)", spec: "Gạch men trang trí" },
    ],
  },
  {
    province: "Phúc Kiến",
    provinceCn: "福建省",
    color: "#0E7490",
    weight: "Cluster phụ",
    cities: [
      { name: "Tấn Giang (晋江)", spec: "Đá tự nhiên, sàn gỗ kỹ thuật" },
      { name: "Hạ Môn (厦门)", spec: "Gỗ nhập khẩu chế biến" },
    ],
  },
  {
    province: "Sơn Đông + Khác",
    provinceCn: "山东省",
    color: "#475569",
    weight: "Bổ sung",
    cities: [
      { name: "Vĩnh Khang (永康)", spec: "Cơ khí, ngũ kim" },
      { name: "Tần Hoàng Đảo (秦皇岛)", spec: "Kính xây dựng" },
      { name: "Mỹ Đích (美的 Trung Sơn)", spec: "Đồ điện gia dụng cao cấp" },
    ],
  },
];

const PARTNERSHIP_MECHANISMS = [
  {
    icon: "📚",
    title: "Catalogue song ngữ Việt-Trung",
    desc: "Huayue dịch và xuất bản catalogue nhãn hàng TQ sang tiếng Việt, có sẵn cho đại lý in/share cho khách.",
  },
  {
    icon: "🎤",
    title: "Hội nghị giới thiệu sản phẩm mới",
    desc: "Tổ chức hằng năm tại Hà Nội & HCM, mời thương hiệu TQ giới thiệu sản phẩm mới, kết nối trực tiếp với BĐS / nhà thầu / công ty thiết kế.",
  },
  {
    icon: "💡",
    title: "Diễn đàn chuyên đề",
    desc: "VLXD thân thiện môi trường, kỹ thuật đồ điện gia dụng, công nghệ gạch porcelain mới — gặp gỡ chuyên gia hai nước.",
  },
  {
    icon: "📢",
    title: "Truyền thông online + offline",
    desc: "Chiến dịch quảng bá thương hiệu TQ trên báo ngành VN, Facebook/Zalo, sự kiện trực tiếp — đưa thương hiệu tiếp cận buyer bản địa.",
  },
  {
    icon: "✈",
    title: "Tour nhà máy Trung Quốc",
    desc: "Đoàn buyer Việt Nam đi thăm nhà máy 2-4 lần/năm: Canton Fair (4 & 10), CIFF (3 & 9), Foshan Pottery (4 & 10). Huayue tổ chức trọn gói.",
  },
];

const TRADE_FAIRS = [
  { month: "T3", name: "CIFF Quảng Châu", desc: "China International Furniture Fair — ngành nội thất", color: "#005F6B" },
  { month: "T4", name: "Canton Fair Phase 1-3", desc: "Hội chợ B2B lớn nhất Trung Quốc", color: "#C8102E" },
  { month: "T4", name: "Foshan Pottery Show", desc: "Chuyên gạch porcelain và sanitary", color: "#9C6A1F" },
  { month: "T6", name: "VIETBUILD HCM", desc: "Hội chợ vật liệu xây dựng VN — Huayue mời đoàn nhà máy TQ", color: "#7C3AED" },
  { month: "T9", name: "CIFF Thượng Hải", desc: "CIFF session 2 — quy mô lớn hơn Quảng Châu", color: "#005F6B" },
  { month: "T10", name: "Canton Fair Autumn", desc: "Phiên thu — đa dạng ngành hàng", color: "#C8102E" },
  { month: "T10", name: "Foshan Pottery Autumn", desc: "Phiên thu — bộ sưu tập mới gốm sứ", color: "#9C6A1F" },
  { month: "T11", name: "VIETBUILD Hà Nội", desc: "Phiên Bắc Bộ", color: "#7C3AED" },
];

const BUYER_BENEFITS = [
  { icon: "💰", title: "Giá thật tại gốc", desc: "Không qua tay trung gian, không markup ngầm, có audit trail từ xưởng." },
  { icon: "✅", title: "Chất lượng kiểm tại nguồn", desc: "Đội QC Huayue Quảng Châu kiểm AQL 2.5 trước xuất xưởng." },
  { icon: "🚛", title: "Trọn gói DDP về VN", desc: "Bao gồm logistics + thông quan + thuế + giao tận kho. Không lo đặt tàu, hải quan." },
  { icon: "🇻🇳", title: "Hỗ trợ tiếng Việt", desc: "Toàn bộ giao tiếp qua đội Hà Nội — không cần biết tiếng Trung." },
  { icon: "🎁", title: "Sample & 3D miễn phí", desc: "Cho đơn ≥30 bộ — đầu tư trước để chốt đúng mẫu." },
  { icon: "📊", title: "Cập nhật thị trường", desc: "Báo cáo giá nhà máy hàng tháng, tỷ giá CNY/VND, chính sách thuế mới." },
];

const FAQS = [
  {
    q: "Tôi muốn trở thành đại lý phân phối của Huayue tại tỉnh tôi — quy trình thế nào?",
    a: "Gửi email partnership@huayuesc.vn kèm: giấy phép kinh doanh, thông tin showroom/kho hiện có, ngành đang phân phối (VLXD / nội thất / điện máy), khu vực coverage. Đội Huayue Hà Nội liên hệ qua điện thoại trong 5 ngày làm việc, có thể đến thăm trực tiếp nếu cần. Sau khi xác minh, ký hợp đồng đại lý — không phí thành viên, chỉ chia commission theo doanh số.",
  },
  {
    q: "Tôi là nhà thầu xây dựng — Huayue hỗ trợ gì cho dự án của tôi?",
    a: "Huayue gửi báo giá DDP tận công trình cho VLXD và trang trí nội thất (gạch, sanitary, đá ốp lát, sơn, sàn gỗ). Hỗ trợ: gửi sample miễn phí cho đơn ≥30 bộ, giao theo tiến độ thi công, bảo hành theo nhà máy gốc + Huayue chịu trách nhiệm đổi trả nếu lỗi. Liên hệ sales@huayuesc.vn hoặc +86 181-2225-6999.",
  },
  {
    q: "Tôi là công ty thiết kế nội thất — có ưu đãi cho khách VIP của tôi không?",
    a: "Có. Huayue cung cấp gói partnership cho công ty thiết kế: catalogue tiếng Việt cho nhãn hàng TQ, sample wood/stone/fabric, hỗ trợ visual 3D miễn phí cho khách hàng cao cấp (đơn ≥30 bộ), chiết khấu ưu đãi cho dự án trọn gói.",
  },
  {
    q: "Tôi muốn đi thăm nhà máy Trung Quốc — Huayue có tổ chức đoàn không?",
    a: "Có. Huayue tổ chức đoàn buyer Việt Nam đi Canton Fair (tháng 4 và 10), CIFF Quảng Châu (tháng 3 và 9), Foshan Pottery Show (tháng 4 và 10). Mỗi đoàn 10-25 buyer, có phiên dịch chuyên ngành và đội sourcing Huayue Quảng Châu đón. Đặt lịch business matching với nhà máy trước chuyến đi. Liên hệ partnership@huayuesc.vn.",
  },
  {
    q: "Tại sao tôi nên mua qua Huayue thay vì tự đi Trung Quốc hoặc mua qua broker?",
    a: "Tự đi TQ: phải biết tiếng Trung, am hiểu thị trường, có quan hệ với nhà máy, lo logistics + thông quan. Mua qua broker: không kiểm soát chất lượng tại nguồn, dễ bị markup ngầm, không có pháp lý rõ ràng. Huayue: pháp nhân VN đăng ký (MST 0111453693), kiểm hàng tại xưởng trước xuất, giao DDP tận kho, hỗ trợ tiếng Việt 24/7, có Bảo đảm Giao dịch — bạn được hoàn tiền nếu hàng sai cam kết.",
  },
];

// ─── PAGE ────────────────────────────────────────────────────────────────

export default function NetworkPage() {
  return (
    <>
      <Breadcrumb
        trail={[
          { label: "Trang chủ", href: "/" },
          { label: "Thông tin", href: "/help" },
          { label: "Mạng lưới đối tác" },
        ]}
      />

      {/* ═══ HERO ═══════════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden text-white"
        style={{ background: "linear-gradient(135deg, #002557 0%, #005F6B 50%, #003A42 100%)" }}
      >
        <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden>
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-gold blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-accent blur-3xl" />
        </div>
        <div className="relative max-w-[1200px] mx-auto px-4 py-12 max-md:py-8 grid grid-cols-[auto_1fr] gap-8 items-center max-md:grid-cols-1 max-md:gap-4">
          <div className="w-24 h-24 rounded-2xl bg-gold/20 border-2 border-gold flex items-center justify-center text-[52px] flex-shrink-0 max-md:w-16 max-md:h-16 max-md:text-[36px]">
            🤝
          </div>
          <div>
            <span className="inline-block bg-gold text-brand-dark px-2.5 py-1 text-[10.5px] font-bold rounded-sm tracking-wider mb-3">
              MẠNG LƯỚI ĐỐI TÁC
            </span>
            <h1 className="text-[34px] font-extrabold leading-tight mb-3 max-md:text-[22px]">
              Mạng lưới đối tác — Phân phối Việt Nam &amp; Nhà máy Trung Quốc
            </h1>
            <p className="text-[14.5px] opacity-90 leading-relaxed max-w-[820px] max-md:text-[13px]">
              Huayue xây dựng chuỗi cung ứng dựa trên hai mạng lưới bổ sung lẫn nhau:
              <b className="text-gold"> đối tác phân phối tại 63 tỉnh thành Việt Nam</b> (đầu ra) và{" "}
              <b className="text-gold">nhà máy hàng đầu tại các cluster sản xuất Trung Quốc</b> (đầu vào).
              Đây là cách Huayue triển khai dịch vụ
              <i> 本地化分销渠道拓展</i> song song với <i>源头精选</i> theo brochure.
            </p>
          </div>
        </div>
        <div className="border-t border-white/10 bg-black/15">
          <div className="max-w-[1200px] mx-auto px-4 py-4 grid grid-cols-4 gap-3 max-md:grid-cols-2 max-md:py-3">
            {HERO_STATS.map((s) => (
              <div key={s.l} className="text-center border-r border-white/15 last:border-r-0 max-md:border-r-0 max-md:py-1.5">
                <div className="text-[20px] mb-0.5">{s.icon}</div>
                <b className="block text-[22px] text-gold leading-none max-md:text-[18px]">{s.n}</b>
                <small className="text-[11px] opacity-80 uppercase tracking-wider">{s.l}</small>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TWO NETWORKS DIAGRAM ═══════════════════════════════════════ */}
      <section className="max-w-[1200px] mx-auto px-4 mt-8 max-md:mt-5">
        <div className="text-center mb-6">
          <h2 className="text-[24px] font-bold text-ink mb-1.5 max-md:text-[20px]">
            Hai mạng lưới — một chuỗi cung ứng
          </h2>
          <p className="text-[13px] text-mute max-md:text-[12px]">
            Nhà máy Trung Quốc tinh chọn ⇄ Đối tác phân phối Việt Nam — Huayue làm cầu nối
          </p>
        </div>
        <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-stretch max-md:grid-cols-1">
          {/* CN side */}
          <div className="bg-paper border-2 border-line rounded-lg p-6 max-md:p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[32px]">🇨🇳</span>
              <div>
                <b className="block text-[17px] text-ink leading-tight">Đầu vào — Trung Quốc</b>
                <small className="text-[11.5px] text-mute">Văn phòng Quảng Châu</small>
              </div>
            </div>
            <p className="text-[13px] text-ink/80 mb-3 leading-relaxed">
              Đội sourcing Huayue (Tầng 3, Cảng Shuyu Chuangxing 数娱创兴港 — Hải Châu, Quảng Châu) sàng lọc và audit nhà máy đối tác tại 3 cluster chính.
            </p>
            <ul className="space-y-1.5 text-[12.5px] text-ink/85">
              <li className="flex gap-2"><span className="text-success">●</span> Sourcing &amp; tinh chọn (源头精选)</li>
              <li className="flex gap-2"><span className="text-success">●</span> QC AQL 2.5 trước xuất xưởng</li>
              <li className="flex gap-2"><span className="text-success">●</span> Audit thực địa định kỳ 12 tháng/lần</li>
              <li className="flex gap-2"><span className="text-success">●</span> Phiên dịch &amp; quan hệ hiệp hội</li>
            </ul>
          </div>

          {/* Bridge */}
          <div className="flex items-center justify-center max-md:py-2">
            <div className="bg-brand text-white px-4 py-6 rounded-lg text-center max-md:py-3 max-md:w-full">
              <div className="text-[40px] mb-1 max-md:text-[28px]">🚢</div>
              <b className="block text-[13px] leading-tight">Huayue</b>
              <small className="text-[10.5px] opacity-85">Logistics + Thông quan DDP</small>
            </div>
          </div>

          {/* VN side */}
          <div className="bg-paper border-2 border-line rounded-lg p-6 max-md:p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[32px]">🇻🇳</span>
              <div>
                <b className="block text-[17px] text-ink leading-tight">Đầu ra — Việt Nam</b>
                <small className="text-[11.5px] text-mute">Trụ sở Hải Phòng</small>
              </div>
            </div>
            <p className="text-[13px] text-ink/80 mb-3 leading-relaxed">
              Trụ sở chính tại Toà Bảo Ngọc Building, Xuân Phương, Hà Nội — kho bãi, thông quan, phân phối đến 63 tỉnh thành Việt Nam.
            </p>
            <ul className="space-y-1.5 text-[12.5px] text-ink/85">
              <li className="flex gap-2"><span className="text-accent">●</span> Đại lý phân phối VLXD &amp; nội thất</li>
              <li className="flex gap-2"><span className="text-accent">●</span> Nhà thầu xây dựng &amp; thiết kế nội thất</li>
              <li className="flex gap-2"><span className="text-accent">●</span> Đại lý điện máy &amp; thiết bị nhà bếp</li>
              <li className="flex gap-2"><span className="text-accent">●</span> Kho + thông quan VNACCS tại Hải Phòng</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ═══ 4 DISTRIBUTION PARTNER TYPES ═════════════════════════════ */}
      <section className="max-w-[1200px] mx-auto px-4 mt-10 max-md:mt-7">
        <div className="text-center mb-6">
          <span className="inline-block bg-accent/10 text-accent px-3 py-1 text-[11px] font-bold rounded-sm tracking-wider mb-2">
            ĐẦU RA — VIỆT NAM
          </span>
          <h2 className="text-[22px] font-bold text-ink mb-1.5 max-md:text-[18px]">
            Bốn nhóm đối tác phân phối
          </h2>
          <p className="text-[13px] text-mute max-md:text-[12px]">
            Mỗi nhóm có chương trình hỗ trợ riêng — chia commission theo doanh số, không phí thành viên
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
          {DISTRIBUTION_PARTNERS.map((p) => (
            <div key={p.title} className="bg-paper border border-line rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              <div className="px-5 py-3 text-white flex items-center gap-3" style={{ backgroundColor: p.color }}>
                <span className="text-[28px]">{p.icon}</span>
                <div>
                  <b className="block text-[15px] leading-tight">{p.title}</b>
                  <small className="text-[11px] opacity-90">{p.summary}</small>
                </div>
              </div>
              <div className="p-5 max-md:p-4">
                <p className="text-[13px] text-ink/85 mb-3 leading-relaxed">{p.desc}</p>
                <ul className="space-y-1.5">
                  {p.benefits.map((b) => (
                    <li key={b} className="text-[12.5px] text-ink/85 flex gap-2">
                      <span className="text-success font-bold flex-shrink-0">✓</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ 3 CHINA CLUSTERS MAP ═════════════════════════════════════ */}
      <section className="max-w-[1200px] mx-auto px-4 mt-10 max-md:mt-7">
        <div className="text-center mb-6">
          <span className="inline-block bg-brand/10 text-brand px-3 py-1 text-[11px] font-bold rounded-sm tracking-wider mb-2">
            ĐẦU VÀO — TRUNG QUỐC
          </span>
          <h2 className="text-[22px] font-bold text-ink mb-1.5 max-md:text-[18px]">
            Ba cluster nhà máy chủ lực
          </h2>
          <p className="text-[13px] text-mute max-md:text-[12px]">
            Văn phòng Quảng Châu của Huayue kết nối trực tiếp với các thủ phủ sản xuất TQ
          </p>
        </div>
        <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
          {CN_CLUSTERS.map((c) => (
            <div key={c.province} className="bg-paper border border-line rounded-lg overflow-hidden">
              <div className="px-5 py-4 text-white" style={{ backgroundColor: c.color }}>
                <small className="text-[10px] uppercase tracking-wider opacity-85">{c.weight}</small>
                <b className="block text-[18px] leading-tight mt-0.5">{c.province}</b>
                <span className="text-[12px] opacity-90 italic">{c.provinceCn}</span>
              </div>
              <ul className="divide-y divide-line">
                {c.cities.map((city) => (
                  <li key={city.name} className="px-4 py-2.5">
                    <b className="block text-[13px] text-ink leading-tight">{city.name}</b>
                    <span className="text-[11.5px] text-mute leading-snug">{city.spec}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ PARTNERSHIP MECHANISMS ═══════════════════════════════════ */}
      <section className="bg-bg mt-10 py-10 max-md:py-7 max-md:mt-7">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="text-center mb-6">
            <h2 className="text-[22px] font-bold text-ink mb-1.5 max-md:text-[18px]">
              Cơ chế hợp tác đối tác
            </h2>
            <p className="text-[13px] text-mute max-md:text-[12px]">
              Theo brochure section <i>'Dịch vụ triển lãm thương mại'</i> và <i>'Quảng bá thị trường'</i>
            </p>
          </div>
          <div className="grid grid-cols-5 gap-3 max-lg:grid-cols-3 max-md:grid-cols-1">
            {PARTNERSHIP_MECHANISMS.map((m) => (
              <div key={m.title} className="bg-paper border border-line rounded-lg p-4 text-center hover:border-brand hover:shadow-sm transition-all">
                <div className="text-[38px] mb-2">{m.icon}</div>
                <b className="block text-[13.5px] text-ink mb-2 leading-tight">{m.title}</b>
                <p className="text-[11.5px] text-mute leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TRADE FAIR CALENDAR ══════════════════════════════════════ */}
      <section className="max-w-[1200px] mx-auto px-4 mt-10 max-md:mt-7">
        <div className="text-center mb-6">
          <h2 className="text-[22px] font-bold text-ink mb-1.5 max-md:text-[18px]">
            Lịch trade fair Huayue tham gia hằng năm
          </h2>
          <p className="text-[13px] text-mute max-md:text-[12px]">
            Đoàn buyer Huayue có lịch, phiên dịch chuyên ngành, đón tại sân bay
          </p>
        </div>
        <div className="grid grid-cols-4 gap-3 max-lg:grid-cols-2 max-md:grid-cols-1">
          {TRADE_FAIRS.map((f, i) => (
            <div key={i} className="bg-paper border border-line rounded-lg overflow-hidden flex">
              <div className="px-3 py-3 text-white font-bold text-[15px] flex items-center justify-center min-w-[58px]" style={{ backgroundColor: f.color }}>
                {f.month}
              </div>
              <div className="p-3 flex-1">
                <b className="block text-[13px] text-ink mb-0.5 leading-tight">{f.name}</b>
                <span className="text-[11px] text-mute leading-snug">{f.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ BUYER BENEFITS ═══════════════════════════════════════════ */}
      <section className="max-w-[1200px] mx-auto px-4 mt-10 max-md:mt-7">
        <div className="bg-paper border border-line rounded-lg p-6 max-md:p-4">
          <div className="text-center mb-5">
            <h2 className="text-[22px] font-bold text-ink mb-1.5 max-md:text-[18px]">
              Lợi ích cho buyer &amp; đối tác phân phối VN
            </h2>
            <p className="text-[13px] text-mute max-md:text-[12px]">
              So với tự sourcing trực tiếp hoặc mua qua broker không pháp lý
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
            {BUYER_BENEFITS.map((b) => (
              <div key={b.title} className="border border-line rounded p-4 hover:border-brand hover:bg-bg transition">
                <div className="text-[24px] mb-1.5">{b.icon}</div>
                <b className="block text-[13.5px] text-ink mb-1">{b.title}</b>
                <p className="text-[12px] text-mute leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PULL QUOTE ═══════════════════════════════════════════════ */}
      <section className="max-w-[1100px] mx-auto px-4 mt-10 max-md:mt-7">
        <blockquote className="bg-bg border-l-4 border-gold rounded-r-lg px-6 py-5 max-md:px-4 max-md:py-4">
          <p className="text-[16px] text-ink italic leading-relaxed max-md:text-[14px]">
            "Huayue không phải sàn niêm yết sản phẩm — chúng tôi là chuỗi cung ứng. Hàng đi qua kho thật, container thật, đội thông quan thật. Mạng lưới đối tác chính là mạch máu vận hành: thiếu một bên là chuỗi đứt."
          </p>
          <footer className="mt-3 text-[12.5px] text-mute not-italic">— Đội Partnership, Huayue Việt Nam</footer>
        </blockquote>
      </section>

      {/* ═══ FAQ ═════════════════════════════════════════════════════════ */}
      <section className="max-w-[1100px] mx-auto px-4 mt-10 max-md:mt-7">
        <h2 className="text-[22px] font-bold text-ink mb-4 flex items-center gap-2 max-md:text-[18px]">
          <span>❓</span> Câu hỏi thường gặp
        </h2>
        <div className="space-y-2">
          {FAQS.map((f, i) => (
            <details key={i} {...(i === 0 ? { open: true } : {})} className="border border-line rounded-lg group/faq bg-paper">
              <summary className="px-4 py-3 cursor-pointer list-none [&::-webkit-details-marker]:hidden flex justify-between items-center hover:bg-bg">
                <b className="text-[13.5px] text-ink leading-snug pr-3">{f.q}</b>
                <span className="text-mute2 text-[14px] group-open/faq:rotate-180 transition-transform flex-shrink-0">▾</span>
              </summary>
              <p className="px-4 pb-4 pt-3 text-[13px] text-ink/85 leading-relaxed border-t border-line">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ═══ CTA ═════════════════════════════════════════════════════════ */}
      <section className="max-w-[1200px] mx-auto px-4 my-10 max-md:my-7">
        <div
          className="rounded-lg p-7 text-white max-md:p-5"
          style={{ background: "linear-gradient(135deg, #002557 0%, #005F6B 60%, #003A42 100%)" }}
        >
          <div className="grid grid-cols-[1fr_auto] gap-5 items-center max-md:grid-cols-1">
            <div>
              <span className="inline-block bg-gold text-brand-dark px-2 py-0.5 text-[10px] font-bold rounded-sm tracking-wider mb-2">
                LIÊN HỆ ĐỐI TÁC
              </span>
              <b className="block text-[20px] mb-1.5 max-md:text-[17px]">Trở thành đối tác phân phối Huayue</b>
              <p className="text-[13px] opacity-90 leading-relaxed max-md:text-[12.5px]">
                Đại lý VLXD, nhà thầu xây dựng, công ty thiết kế nội thất hoặc đại lý điện máy — gửi giấy phép kinh doanh và thông tin showroom/kho. Đội Huayue Hà Nội liên hệ trong 5 ngày làm việc.
              </p>
              <p className="text-[12px] opacity-80 mt-2">
                📞 {COMPANY.contact.hotline} · ✉ <a href={`mailto:${COMPANY.contact.emails.partnership}`} className="underline hover:text-gold">{COMPANY.contact.emails.partnership}</a>
              </p>
            </div>
            <div className="flex flex-col gap-2 max-md:w-full">
              <a
                href={`mailto:${COMPANY.contact.emails.partnership}?subject=Đăng%20ký%20đối%20tác%20phân%20phối%20Huayue`}
                className="px-5 py-2.5 bg-gold text-brand-dark rounded font-bold text-[13px] hover:bg-[#E8943A] cursor-pointer text-center whitespace-nowrap"
              >
                ✉ Gửi đăng ký
              </a>
              <Link
                href="/info/contact"
                className="px-5 py-2.5 border-2 border-white/40 text-white rounded font-bold text-[13px] hover:bg-white/10 cursor-pointer text-center whitespace-nowrap"
              >
                📍 Xem văn phòng
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export const metadata = {
  title: "Mạng lưới đối tác — Huayuesc 华越供应链",
  description:
    "Huayue kết nối nhà máy hàng đầu Quảng Đông, Phúc Kiến, Sơn Đông với 4 nhóm đối tác phân phối tại Việt Nam: đại lý VLXD, nhà thầu xây dựng, công ty thiết kế nội thất, đại lý điện máy. 63 tỉnh thành coverage, 2 văn phòng vận hành Hải Phòng + Quảng Châu.",
};
