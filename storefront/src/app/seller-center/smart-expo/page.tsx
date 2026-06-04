import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { SellerSidebar } from "@/components/seller/sidebar";

const UPCOMING = [
  { date: "12-16/06/2026", title: "Furniture Asia Cloud Expo", topic: "沙发 · 卧室 · 办公家具", buyer: "东南亚 + 澳大利亚", img: 21 },
  { date: "20-24/06/2026", title: "Smart Home & Lighting", topic: "LED · 智能开关 · IoT", buyer: "越南 + 泰国", img: 22 },
  { date: "08-12/07/2026", title: "Building Materials Asia", topic: "瓷砖 · 卫浴 · 门窗", buyer: "越南 + 印度尼西亚", img: 23 },
  { date: "22-26/07/2026", title: "Garments & Textiles", topic: "针织品 · 牛仔 · 家用纺织", buyer: "全东南亚", img: 24 },
];

const STEPS = [
  { n: 1, title: "选择展位套餐", desc: "标准版 $480 · 高级版 $1,280 · 钻石版 $3,200——含 3D 设计、介绍视频、直播时段。" },
  { n: 2, title: "上传 SKU + 素材", desc: "至少 12 款热门产品、1 段 60-90 秒工厂参观视频、中越双语公司简介。" },
  { n: 3, title: "实时直播 + 聊天", desc: "展会 5 天内：每天 2 场直播、AI 自动中越互译聊天、与采购商一对一预约。" },
];

const BOOTHS = [
  { name: "KUKA Home Furniture", industry: "沙发 · 卧室", visits: "2,840", img: 31 },
  { name: "Foshan Tile Master", industry: "Porcelain Tile", visits: "1,920", img: 32 },
  { name: "Shenzhen LED Co.", industry: "Smart Lighting", visits: "1,650", img: 33 },
  { name: "Ortonbaths Group", industry: "Sanitary Ware", visits: "2,210", img: 34 },
  { name: "Guangzhou Garment", industry: "Apparel OEM", visits: "1,480", img: 35 },
  { name: "Jiangsu Steel Door", industry: "Door & Window", visits: "1,180", img: 36 },
];

const STATS = [
  { v: "50K+", l: "年访问采购商" },
  { v: "3.2K+", l: "已搭建展位" },
  { v: "12", l: "每年按行业展会" },
  { v: "$48M", l: "2025 展会成交 GMV" },
];

export default function SmartExpoPage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "首页", href: "/" }, { label: "供应商中心", href: "/seller-center" }, { label: "Smart Expo 云展会" }]} />
      <div className="max-w-[1400px] mx-auto px-4 mt-4 mb-7 grid grid-cols-[280px_1fr] gap-5 max-md:grid-cols-1">
        <SellerSidebar active="/seller-center/smart-expo" />
        <div>
          <div className="bg-gradient-to-br from-accent/90 to-brand text-white rounded p-6 mb-4">
            <div className="inline-block bg-white text-accent px-2.5 py-1 text-[11px] font-bold rounded-sm tracking-wider mb-3">🎪 SMART EXPO CLOUD</div>
            <h1 className="text-[26px] font-bold leading-tight">线上展会——媲美广交会，成本仅 1/8</h1>
            <p className="text-[14px] opacity-90 mt-2 leading-relaxed max-w-[680px]">
              3D 展位、工厂参观直播、AI 实时中越互译聊天、与 50K+ 越南及东南亚采购商一对一预约。一场展会 = 2-3 个月线下开发客户。
            </p>
          </div>

          <div className="grid grid-cols-4 gap-3 mb-4 max-md:grid-cols-2">
            {STATS.map((s) => (
              <div key={s.l} className="bg-paper border border-line rounded p-4 text-center">
                <b className="block text-[24px] font-extrabold text-brand">{s.v}</b>
                <span className="text-[11.5px] text-mute mt-1 block">{s.l}</span>
              </div>
            ))}
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <div className="flex justify-between items-center mb-4">
              <b className="text-[15px] text-ink">📅 即将举办的展会（最近 4 场）</b>
              <Link href="#" className="text-brand text-[12px]">全年日程 →</Link>
            </div>
            <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
              {UPCOMING.map((u) => (
                <div key={u.title} className="border border-line rounded overflow-hidden hover:border-brand grid grid-cols-[120px_1fr] max-md:grid-cols-1">
                  <img src={`/img/seller-expo-${u.img}.jpg?v=5`} alt="" className="w-full h-full object-cover max-md:h-[140px]" />
                  <div className="p-3">
                    <span className="text-[10.5px] text-accent font-bold uppercase tracking-wider">{u.date}</span>
                    <b className="block text-[13.5px] text-ink mt-1 mb-1">{u.title}</b>
                    <p className="text-[11.5px] text-mute mb-2">{u.topic}</p>
                    <p className="text-[11px] text-mute mb-3"><span className="font-semibold">采购商：</span> {u.buyer}</p>
                    <button className="bg-brand text-white text-[11.5px] font-semibold px-3 py-1 rounded-sm">报名展位 →</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <b className="block text-[15px] text-ink mb-4">🚀 创建线上展位——3 步</b>
            <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
              {STEPS.map((s) => (
                <div key={s.n} className="border border-line rounded p-4">
                  <div className="w-10 h-10 bg-accent text-white rounded-full flex items-center justify-center font-bold text-[16px] mb-3">{s.n}</div>
                  <b className="block text-[13px] text-ink mb-1">{s.title}</b>
                  <p className="text-[11.5px] text-mute leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <div className="flex justify-between items-center mb-4">
              <b className="text-[15px] text-ink">🎨 样板展位——6 个典型 booth</b>
              <Link href="#" className="text-brand text-[12px]">查看其余 3.2K 个 booth →</Link>
            </div>
            <div className="grid grid-cols-3 gap-3 max-md:grid-cols-2">
              {BOOTHS.map((b) => (
                <div key={b.name} className="border border-line rounded overflow-hidden hover:border-brand">
                  <div className="aspect-video bg-[#F5F5F5] relative">
                    <img src={`/img/seller-booth-${b.img}.jpg?v=5`} alt="" className="w-full h-full object-cover" />
                    <span className="absolute top-2 right-2 bg-success text-white text-[10px] font-bold px-2 py-0.5 rounded-sm">3D</span>
                  </div>
                  <div className="p-3">
                    <b className="block text-[12.5px] text-ink leading-tight mb-0.5">{b.name}</b>
                    <span className="text-[11px] text-mute block mb-2">{b.industry}</span>
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-mute">👁 {b.visits} 次访问</span>
                      <Link href="#" className="text-brand font-semibold">查看 booth →</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-brand-dark text-white rounded p-5 text-center">
            <b className="block text-[18px] mb-2">🎟 报名 Furniture Asia 展位（6 月 12-16 日）</b>
            <p className="text-[12.5px] opacity-90 mb-4">钻石展位仅剩 8 个——高级版剩 24 个。5 月 25 日前报名享 7 折。</p>
            <button className="bg-gold text-brand-dark px-7 py-3 rounded-sm font-bold text-[14px]">立即创建线上展位</button>
          </div>
        </div>
      </div>
    </>
  );
}

export const metadata = { title: "Smart Expo — 云展会 — 供应商中心" };
