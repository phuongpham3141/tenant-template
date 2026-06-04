import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";

const UPCOMING = [
  { name: "Vietnam Expo 2026", date: "12 - 15 Apr 2026", venue: "河内 ICE", industry: "综合", country: "VN" },
  { name: "Furniture China 2026", date: "8 - 11 Sep 2026", venue: "上海 NECC", industry: "家具", country: "CN" },
  { name: "Ceramics China", date: "18 - 21 May 2026", venue: "佛山潭洲", industry: "瓷砖", country: "CN" },
  { name: "Hong Kong Lighting Fair", date: "27 - 30 Oct 2026", venue: "HKCEC", industry: "LED 灯具", country: "HK" },
  { name: "Bauma China 2026", date: "12 - 16 Oct 2026", venue: "上海 SNIEC", industry: "建筑材料", country: "CN" },
  { name: "Kitchen & Bath China", date: "1 - 4 Jun 2026", venue: "上海 NECC", industry: "厨卫", country: "CN" },
];

export default function TradeShowsPage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "首页", href: "/" }, { label: "展会" }]} />
      <div className="max-w-[1400px] mx-auto px-4 mt-4">
        <div className="relative rounded overflow-hidden h-[220px] bg-brand-dark">
          <img src="/img/tradeshow-hero.jpg?v=5" alt="" className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 px-8 py-7 flex flex-col justify-center text-white" style={{ background: "linear-gradient(90deg, rgba(0,37,87,0.95), rgba(0,37,87,0.4))" }}>
            <span className="inline-block self-start bg-gold text-brand-dark px-2.5 py-1 text-[11px] font-bold rounded-sm tracking-wider mb-2">⚡ 贸易展会</span>
            <h1 className="text-[34px] font-extrabold leading-tight max-md:text-[24px]">与华越一同参展</h1>
            <p className="text-[13.5px] opacity-90 max-w-[600px] mt-2">订票、签证协助、酒店预订、工厂参观行程。每年参加 8+ 场中国大型展会。</p>
          </div>
        </div>
      </div>

      {/* Featured Canton Fair */}
      <div className="max-w-[1400px] mx-auto px-4 mt-5">
        <div className="bg-paper border-2 border-gold rounded p-5 grid grid-cols-[1fr_280px] gap-5 max-md:grid-cols-1">
          <div>
            <span className="inline-block bg-accent text-white px-2.5 py-1 text-[10.5px] font-bold rounded-sm tracking-wider mb-2">精选 · 最大 B2B 展会</span>
            <h2 className="text-[22px] font-bold text-ink mb-1">🇨🇳 2026 广交会——广州交易会</h2>
            <p className="text-[13px] text-mute leading-relaxed mb-3">全球最大 B2B 展会——每年 2 届，在广州琶洲举办，60,000+ 供应商、200,000+ 国际采购商。华越每届组织 50 名越南经销商参展。</p>
            <div className="grid grid-cols-2 gap-3 mb-4 max-md:grid-cols-1">
              <div className="border border-line rounded p-3 bg-[#FAFBFC]">
                <b className="block text-[13px] text-ink">📅 第一期——2026 春季</b>
                <span className="text-[12px] text-mute">15 Apr – 5 May 2026（3 个阶段）</span>
                <p className="text-[11.5px] text-mute mt-1">建筑材料、机械、能源</p>
              </div>
              <div className="border border-line rounded p-3 bg-[#FAFBFC]">
                <b className="block text-[13px] text-ink">📅 第二期——2026 秋季</b>
                <span className="text-[12px] text-mute">15 Oct – 4 Nov 2026（3 个阶段）</span>
                <p className="text-[11.5px] text-mute mt-1">家具、卫浴、灯具、纺织</p>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Link href="/buying-request" className="px-5 py-2.5 bg-gold text-brand-dark rounded-sm font-bold text-[13px]">预订广交会门票 →</Link>
              <Link href="/info/audit-process" className="px-5 py-2.5 border border-brand text-brand rounded-sm font-semibold text-[13px]">查看广交会往届</Link>
            </div>
          </div>
          <img src="/img/cantonfair.jpg?v=5" alt="Canton Fair" className="w-full h-full object-cover rounded" />
        </div>
      </div>

      {/* Upcoming list */}
      <div className="max-w-[1400px] mx-auto px-4 mt-5">
        <h2 className="text-[18px] font-bold text-ink mb-3">即将举办的展会</h2>
        <div className="bg-paper border border-line rounded overflow-hidden">
          {UPCOMING.map((s, i) => (
            <div key={s.name} className={`grid grid-cols-[1fr_180px_220px_140px_120px] gap-4 px-4 py-3.5 text-[13px] hover:bg-[#FAFBFC] max-md:grid-cols-1 max-md:gap-1 ${i > 0 ? "border-t border-line" : ""}`}>
              <b className="text-ink">{s.name}</b>
              <span className="text-mute">📅 {s.date}</span>
              <span className="text-mute">📍 {s.venue}</span>
              <span className="text-brand">{s.industry}</span>
              <Link href="/buying-request" className="text-brand text-[12px] font-semibold hover:underline">订票 →</Link>
            </div>
          ))}
        </div>
      </div>

      {/* Gallery past */}
      <div className="max-w-[1400px] mx-auto px-4 mt-5">
        <h2 className="text-[18px] font-bold text-ink mb-3">回顾往届</h2>
        <div className="grid grid-cols-4 gap-2 max-md:grid-cols-2">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="aspect-video bg-[#F5F5F5] rounded overflow-hidden">
              <img src={`/img/tradeshow-past-${i}.jpg?v=5`} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-[1400px] mx-auto px-4 mt-5 mb-7">
        <div className="bg-brand-dark text-white rounded p-6 flex justify-between items-center max-md:flex-col max-md:gap-4 max-md:text-center">
          <div>
            <h3 className="text-[20px] font-bold mb-1">🎫 预订含全程协助的参观门票</h3>
            <p className="text-[13px] opacity-85">华越一站式包办：门票、签证、酒店、翻译、工厂参观。价格 $890/3 天起。</p>
          </div>
          <Link href="/buying-request" className="px-6 py-3 bg-gold text-brand-dark rounded-sm font-bold text-[14px]">报名行程 →</Link>
        </div>
      </div>
    </>
  );
}

export const metadata = { title: "展会 — Huayuesc" };
