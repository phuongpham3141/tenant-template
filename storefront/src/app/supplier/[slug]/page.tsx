import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { FACTORIES, SECTIONS } from "@/data/home";
import type { Factory } from "@/data/home";

function getFactory(slug: string): Factory {
  return (
    FACTORIES.find((f) => f.slug === slug) ?? {
      initials: slug.slice(0, 2).toUpperCase(),
      slug,
      name: slug.split("-").map((w) => w[0]?.toUpperCase() + w.slice(1)).join(" ") + " Co., Ltd.",
      location: "Foshan, Guangdong · CN",
      rating: 4.7,
      reviews: "350",
      meta: "Verified factory",
      badges: { audited: true, years: "8Y" },
      tags: ["OEM", "ODM", "Export"],
    }
  );
}

const CERTS = ["CE", "ISO 9001", "BSCI", "Sedex", "FSC", "RoHS"];

export default async function SupplierPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const f = getFactory(slug);
  const allProducts = SECTIONS.flatMap((s) => s.products);
  const ownProducts = allProducts.filter((p) => p.seller.toLowerCase().includes(f.name.split(" ")[0].toLowerCase())).slice(0, 8);
  const heroProducts = ownProducts.length >= 4 ? ownProducts : allProducts.slice(0, 8);

  return (
    <>
      <Breadcrumb
        trail={[
          { label: "Trang chủ", href: "/" },
          { label: "Nhà cung cấp", href: "/suppliers" },
          { label: f.name },
        ]}
      />

      {/* Banner */}
      <div className="max-w-[1400px] mx-auto px-4 mt-4">
        <div className="relative rounded overflow-hidden h-[220px] bg-brand-dark">
          <img src={`https://picsum.photos/seed/${f.slug}-cover/1400/300`} alt="" className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 px-7 py-6 flex items-end gap-5 text-white" style={{ background: "linear-gradient(transparent 30%, rgba(0,37,87,0.95))" }}>
            <div className="w-20 h-20 bg-white border-4 border-gold rounded flex items-center justify-center font-extrabold text-[28px] text-brand flex-shrink-0">
              {f.initials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                {f.badges.gold && <span className="bg-gold text-brand-dark text-[10px] px-2 py-0.5 rounded-sm font-bold">GOLD SUPPLIER</span>}
                {f.badges.audited && <span className="bg-success text-white text-[10px] px-2 py-0.5 rounded-sm font-bold">AUDITED</span>}
                <span className="bg-white/20 text-white text-[10px] px-2 py-0.5 rounded-sm font-bold">{f.badges.years}</span>
                <span className="text-[12.5px] text-gold">★ {f.rating} ({f.reviews} reviews)</span>
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

        {/* Tabs */}
        <div className="flex gap-0 border-b border-line bg-paper mt-0 px-4">
          {["Trang chủ NCC", "Sản phẩm", "Hồ sơ công ty", "Năng lực sản xuất", "Liên hệ"].map((t, i) => (
            <a key={t} className={`px-4 py-3 text-[13px] cursor-pointer border-b-2 ${i === 0 ? "text-brand border-brand font-semibold" : "text-mute border-transparent hover:text-brand"}`}>
              {t}
            </a>
          ))}
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 mt-5 grid grid-cols-[1fr_340px] gap-5 max-md:grid-cols-1">
        <div>
          {/* About */}
          <div className="bg-paper border border-line rounded p-5">
            <h2 className="text-[16px] font-bold text-ink mb-3">Về {f.name}</h2>
            <div className="text-[13px] text-ink leading-relaxed space-y-3">
              <p>{f.name} thành lập từ {2026 - parseInt(f.badges.years)} với hơn {f.badges.years} kinh nghiệm trong lĩnh vực {f.tags.join(", ")}. Nhà máy tọa lạc tại {f.location}, một trong những trung tâm công nghiệp lớn nhất Trung Quốc.</p>
              <p>Hiện tại, {f.name} sở hữu 3 cơ sở sản xuất với tổng diện tích trên 200.000 m², hơn 1.500 công nhân và đội ngũ R&D 80 kỹ sư. Năng suất {f.meta}, đáp ứng đơn hàng từ 50 quốc gia.</p>
              <p>Khách hàng chính bao gồm các thương hiệu lớn tại Bắc Mỹ, châu Âu, Đông Nam Á. Tại Việt Nam, đã hợp tác với hơn 80 dealer thông qua AlibabaVN từ 2018, được audit bởi đội ngũ Quảng Châu của chúng tôi 2 lần/năm.</p>
              <p>Nhà máy hỗ trợ OEM/ODM theo bản vẽ, MOQ linh hoạt từ 50 đơn vị, lead time tiêu chuẩn 25 ngày, vận chuyển DDP về Việt Nam qua kho Bằng Tường.</p>
            </div>
          </div>

          {/* Key facts */}
          <div className="bg-paper border border-line rounded p-5 mt-4">
            <h2 className="text-[16px] font-bold text-ink mb-3">Thông tin chính</h2>
            <div className="grid grid-cols-3 gap-4 text-[13px] max-md:grid-cols-2">
              {[
                ["Diện tích nhà máy", "200,000 m²"],
                ["Số nhân viên", "1,500+"],
                ["Năm thành lập", `${2026 - parseInt(f.badges.years)}`],
                ["Kim ngạch", "$120M / năm"],
                ["Kim ngạch xuất khẩu", "$80M / năm (66%)"],
                ["Thị trường chính", "VN, US, EU, JP, KR"],
              ].map(([k, v]) => (
                <div key={k}>
                  <div className="text-[11.5px] text-mute uppercase tracking-wider">{k}</div>
                  <b className="block text-ink mt-1">{v}</b>
                </div>
              ))}
            </div>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-4 gap-3 mt-4 max-md:grid-cols-2">
            {[
              { icon: "🥇", title: "Gold Supplier", desc: f.badges.gold ? `${f.badges.years} continuous` : "Audited tier" },
              { icon: "✅", title: "Verified", desc: "Onsite audited" },
              { icon: "📦", title: "On-time delivery", desc: "98.5% rate" },
              { icon: "🛡", title: "Trade Assurance", desc: "100% covered" },
            ].map((b) => (
              <div key={b.title} className="bg-paper border border-line rounded p-3 text-center">
                <div className="text-[28px]">{b.icon}</div>
                <b className="block text-[12.5px] text-ink mt-1">{b.title}</b>
                <div className="text-[11px] text-mute">{b.desc}</div>
              </div>
            ))}
          </div>

          {/* Hot products */}
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

          {/* Production lines */}
          <div className="mt-5">
            <h2 className="text-[16px] font-bold text-ink mb-3">Dây chuyền sản xuất</h2>
            <div className="grid grid-cols-4 gap-2 max-md:grid-cols-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-video bg-[#F5F5F5] rounded overflow-hidden">
                  <img src={`https://picsum.photos/seed/${f.slug}-line-${i}/400/240`} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Certs */}
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
        </div>

        {/* Right: contact form */}
        <aside className="space-y-4">
          <div className="bg-paper border border-line rounded overflow-hidden">
            <div className="bg-brand text-white px-4 py-2.5 font-semibold text-[13px]">Liên hệ {f.name}</div>
            <form action="/buying-request" method="get" className="p-4 space-y-2.5">
              <input name="name" placeholder="Họ tên" className="w-full px-3 py-2 border border-line rounded-sm text-[12.5px] outline-none focus:border-brand" />
              <input name="email" type="email" placeholder="Email" className="w-full px-3 py-2 border border-line rounded-sm text-[12.5px] outline-none focus:border-brand" />
              <input name="phone" placeholder="Điện thoại / Zalo" className="w-full px-3 py-2 border border-line rounded-sm text-[12.5px] outline-none focus:border-brand" />
              <textarea name="q" placeholder="Yêu cầu chi tiết: sản phẩm, số lượng, deadline..." className="w-full px-3 py-2 border border-line rounded-sm text-[12.5px] outline-none focus:border-brand min-h-[100px] resize-none" />
              <button type="submit" className="w-full py-2.5 bg-accent text-white rounded-sm font-bold text-[13px] hover:opacity-90">📨 Gửi RFQ — Báo giá trong 24h</button>
            </form>
          </div>

          <div className="bg-paper border border-line rounded p-4">
            <b className="block text-[13px] font-semibold text-ink mb-2">Tags chính</b>
            <div className="flex gap-1 flex-wrap">
              {f.tags.map((t) => (
                <span key={t} className="text-[11px] bg-[#F5F5F5] text-mute px-2 py-1 rounded-sm">{t}</span>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const f = getFactory(slug);
  return { title: `${f.name} — AlibabaVN` };
}
