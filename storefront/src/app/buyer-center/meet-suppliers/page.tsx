import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { BuyerSidebar } from "@/components/buyer/sidebar";
import { FACTORIES } from "@/data/home";

const EVENTS = [
  {
    badge: "线下",
    title: "2026 广交会春季展",
    date: "15/04 – 19/04/2026",
    location: "广州 · 中国",
    desc: "亚洲最大进出口展会——25,000 家供应商、5 大品类。华越组织越南采购团，配备翻译并预先安排一对一会谈。",
    color: "bg-accent",
    cta: "报名参团",
  },
  {
    badge: "线上",
    title: "2026 越南国际贸易博览会 – 中国展台",
    date: "08/05 – 11/05/2026",
    location: "讲武展览中心 · 河内",
    desc: "120 家陶瓷、家具、卫浴工厂在河内设展台。华越采购商可免费领票，每个展台预约 30 分钟会谈。",
    color: "bg-brand",
    cta: "免费领票",
  },
  {
    badge: "OEM 专场",
    title: "2026 中国国际家具展 – 上海",
    date: "10/09 – 13/09/2026",
    location: "上海 · 国家会展中心（虹桥）",
    desc: "专为家具行业：KUKA、Landbond、OPPEIN、ZuoYou 均设展台。华越于展会结束后即组织佛山实地验厂（3 天）。",
    color: "bg-gold text-brand-dark",
    cta: "查看行程详情",
  },
];

const BOOKING_STEPS = [
  { n: 1, title: "选择您关注的供应商", desc: "按行业 / 生产区域 / 成立年份筛选，勾选 1–3 家工厂。" },
  { n: 2, title: "选择会谈时段", desc: "预约 30–60 分钟，通过 Zoom/Teams 或在佛山/深圳当面会谈。" },
  { n: 3, title: "发送议程 + 资料", desc: "请求报价、样品、产能报告——提前准备，让会谈更高效。" },
  { n: 4, title: "配翻译的一对一会谈", desc: "华越为前 60 分钟提供免费中越翻译。" },
];

const SUPPLIERS = FACTORIES.slice(0, 6);

export default function MeetSuppliersPage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "首页", href: "/" }, { label: "采购商中心", href: "/buyer-center" }, { label: "对接供应商" }]} />
      <div className="max-w-[1400px] mx-auto px-4 mt-4 mb-7 grid grid-cols-[240px_1fr] gap-5 max-md:grid-cols-1">
        <BuyerSidebar active="/buyer-center/meet-suppliers" />
        <div>
          <div className="bg-paper border border-line rounded p-5 mb-4">
            <div className="inline-block bg-brand/10 text-brand px-2.5 py-1 text-[11px] font-bold rounded-sm tracking-wider mb-2">🤝 对接供应商</div>
            <h1 className="text-[22px] font-bold text-ink">对接供应商</h1>
            <p className="text-[13px] text-mute mt-2 leading-relaxed">
              当面洽谈总比邮件高效。从行业展会到一对一视频会议，华越助您以正确的方式接触工厂：翻译就位、议程规范、后续跟进清晰。
            </p>
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <div className="flex justify-between items-center mb-4">
              <b className="text-[15px] text-ink">📅 近期活动</b>
              <Link href="/factory-tour" className="text-brand text-[12px] hover:underline">查看全部 →</Link>
            </div>
            <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
              {EVENTS.map((e) => (
                <div key={e.title} className="border border-line rounded overflow-hidden hover:border-brand">
                  <div className={`${e.color} text-white px-3 py-1.5 text-[10.5px] font-bold tracking-wider`}>{e.badge}</div>
                  <div className="p-4">
                    <b className="block text-[14px] text-ink leading-tight mb-1.5">{e.title}</b>
                    <div className="text-[11.5px] text-mute mb-1">📅 {e.date}</div>
                    <div className="text-[11.5px] text-mute mb-3">📍 {e.location}</div>
                    <p className="text-[12px] text-ink leading-relaxed mb-3">{e.desc}</p>
                    <button className="w-full px-3 py-2 bg-brand text-white rounded-sm text-[12px] font-semibold hover:opacity-90">{e.cta} →</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <b className="block text-[15px] text-ink mb-1">🎯 预约与工厂一对一会谈</b>
            <p className="text-[12px] text-mute mb-4">4 步流程，华越负责会务安排与翻译。</p>
            <div className="grid grid-cols-4 gap-3 max-md:grid-cols-2 mb-5">
              {BOOKING_STEPS.map((s) => (
                <div key={s.n} className="border border-line rounded p-3">
                  <div className="w-8 h-8 bg-brand text-white rounded-full flex items-center justify-center font-bold text-[13px] mb-2">{s.n}</div>
                  <b className="block text-[12.5px] text-ink leading-tight mb-1">{s.title}</b>
                  <p className="text-[11px] text-mute leading-snug">{s.desc}</p>
                </div>
              ))}
            </div>

            <b className="block text-[13px] text-ink mb-2">选择您想会面的工厂：</b>
            <div className="grid grid-cols-3 gap-3 max-md:grid-cols-1">
              {SUPPLIERS.map((f) => (
                <label key={f.slug} className="border border-line rounded p-3 hover:border-brand cursor-pointer flex gap-3 items-start">
                  <input type="checkbox" className="mt-1 accent-brand" />
                  <div className="w-10 h-10 bg-paper border border-line rounded-sm flex items-center justify-center font-extrabold text-[13px] text-brand flex-shrink-0">{f.initials}</div>
                  <div className="min-w-0 flex-1">
                    <b className="block text-[12.5px] text-ink leading-tight line-clamp-2">{f.name}</b>
                    <span className="text-[10.5px] text-mute">{f.location}</span>
                    <div className="text-[10.5px] text-success mt-0.5">★ {f.rating} · {f.badges.years}</div>
                  </div>
                </label>
              ))}
            </div>
            <button className="mt-4 px-5 py-2.5 bg-accent text-white rounded-sm font-bold text-[12.5px] hover:opacity-90">📅 预约会谈</button>
          </div>

          <Link href="/factory-tour" className="block bg-brand-dark text-white rounded p-5 hover:opacity-95">
            <div className="flex justify-between items-center max-md:flex-col max-md:items-start max-md:gap-3">
              <div>
                <div className="inline-block bg-gold text-brand-dark px-2 py-0.5 text-[10px] font-bold rounded-sm tracking-wider mb-2">🆕 360° VR</div>
                <b className="block text-[16px] mb-1">360° 工厂云参观</b>
                <p className="text-[12.5px] opacity-90">暂时无法飞往佛山？通过 360° 摄像头参观生产线、成品仓、QC 车间，并与 QC 主管在线直播互动。</p>
              </div>
              <span className="bg-gold text-brand-dark px-5 py-2.5 rounded-sm font-bold text-[13px] whitespace-nowrap">开始参观 →</span>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export const metadata = { title: "对接供应商 — 采购商中心" };
