import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { FACTORIES } from "@/data/home";

const TOURS = FACTORIES.slice(0, 8).map((f, i) => ({
  factory: f,
  duration: ["12:30", "8:45", "15:20", "9:10", "11:55", "7:30", "13:40", "10:25"][i],
}));

export default function FactoryTourPage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "首页", href: "/" }, { label: "实地验厂" }]} />
      <div className="max-w-[1400px] mx-auto px-4 mt-4">
        <div className="relative rounded overflow-hidden h-[240px] bg-brand-dark">
          <img src="/img/factory-tour.jpg?v=5" alt="" className="w-full h-full object-cover opacity-55" />
          <div className="absolute inset-0 px-8 py-7 flex flex-col justify-center text-white" style={{ background: "linear-gradient(90deg, rgba(0,37,87,0.95), rgba(0,37,87,0.4))" }}>
            <span className="inline-block self-start bg-gold text-brand-dark px-2.5 py-1 text-[11px] font-bold rounded-sm tracking-wider mb-2">🏭 FACTORY TOUR</span>
            <h1 className="text-[30px] font-extrabold leading-tight max-md:text-[22px]">在线工厂参观</h1>
            <p className="text-[13.5px] opacity-90 max-w-[640px] mt-2">在 40+ 家合作工厂拍摄的 360° 视频参观。放心下单——清楚知道货在何处、由谁生产。</p>
          </div>
        </div>
      </div>

      {/* Featured tour */}
      <div className="max-w-[1400px] mx-auto px-4 mt-5">
        <h2 className="text-[18px] font-bold text-ink mb-3">🎬 本周精选参观</h2>
        <div className="bg-paper border border-line rounded overflow-hidden grid grid-cols-[1fr_320px] max-md:grid-cols-1">
          <div className="relative aspect-video bg-brand-dark">
            <img src="/img/factory-tour-featured.jpg?v=5" alt="Featured tour" className="w-full h-full object-cover opacity-80" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-white/95 rounded-full flex items-center justify-center text-[34px] cursor-pointer hover:scale-110 transition">
                ▶
              </div>
            </div>
            <span className="absolute bottom-3 right-3 bg-black/70 text-white text-[12px] px-2 py-1 rounded-sm">15:42</span>
          </div>
          <div className="p-5 flex flex-col justify-center">
            <span className="inline-block self-start bg-accent text-white px-2 py-0.5 text-[10.5px] font-bold rounded-sm tracking-wider mb-2">精选</span>
            <h3 className="text-[20px] font-bold text-ink mb-1">Dongpeng Ceramics — Foshan Plant 3</h3>
            <p className="text-[12.5px] text-mute leading-relaxed mb-4">参观 2025 年新投资的 porcelain 生产线：Sacmi 30,000 吨压机、8 色 HD 数码喷印、250 米烧成窑。年产能 50M ㎡。</p>
            <div className="flex gap-3 text-[11.5px] text-mute mb-4 flex-wrap">
              <span>📍 佛山</span>
              <span>•</span>
              <span>⏱ 15:42</span>
              <span>•</span>
              <span>👁 24,300 次浏览</span>
            </div>
            <Link href="/supplier/dongpeng-ceramics" className="px-5 py-2.5 bg-brand text-white rounded-sm font-semibold text-[13px] text-center">查看供应商详情 →</Link>
          </div>
        </div>
      </div>

      {/* Tour grid */}
      <div className="max-w-[1400px] mx-auto px-4 mt-7">
        <h2 className="text-[18px] font-bold text-ink mb-3">全部工厂参观</h2>
        <div className="grid grid-cols-4 gap-3 max-md:grid-cols-2">
          {TOURS.map(({ factory, duration }) => (
            <Link key={factory.slug} href={`/supplier/${factory.slug}`} className="bg-paper border border-line rounded-sm overflow-hidden hover:border-brand block">
              <div className="relative aspect-video bg-[#F5F5F5]">
                <img src={`/img/tour-${factory.slug}.jpg?v=5`} alt={factory.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/15">
                  <div className="w-12 h-12 bg-white/95 rounded-full flex items-center justify-center text-[18px]">▶</div>
                </div>
                <span className="absolute bottom-2 right-2 bg-black/70 text-white text-[11px] px-1.5 py-0.5 rounded-sm">{duration}</span>
              </div>
              <div className="p-2.5">
                <h4 className="text-[12.5px] font-semibold text-ink line-clamp-1">{factory.name}</h4>
                <div className="text-[11px] text-mute mt-0.5 flex justify-between">
                  <span>{factory.location.split(",")[0]}</span>
                  <span>★ {factory.rating}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Booking */}
      <div className="max-w-[1400px] mx-auto px-4 mt-7 mb-7">
        <div className="bg-paper border border-line rounded p-6">
          <div className="flex justify-between items-end mb-4 max-md:flex-col max-md:items-start max-md:gap-3">
            <div>
              <h2 className="text-[20px] font-bold text-ink">📅 预约实地参观</h2>
              <p className="text-[12.5px] text-mute mt-1">我们在真实工厂组织一对一参观。配翻译、广州机场接送。</p>
            </div>
            <Link href="/buying-request" className="px-5 py-2.5 bg-accent text-white rounded-sm font-semibold text-[13px]">预约参观 →</Link>
          </div>
          <div className="grid grid-cols-5 gap-3 max-md:grid-cols-2">
            {FACTORIES.slice(0, 5).map((f) => (
              <Link key={f.slug} href={`/supplier/${f.slug}`} className="border border-line rounded p-3 text-center hover:border-brand block">
                <div className="w-12 h-12 bg-paper border border-line rounded-sm flex items-center justify-center font-extrabold text-[16px] text-brand mx-auto mb-2">{f.initials}</div>
                <b className="block text-[11.5px] text-ink line-clamp-2 leading-tight mb-1">{f.name}</b>
                <span className="text-[10.5px] text-mute">{f.location.split(",")[0]}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export const metadata = { title: "实地验厂 — 华越供应链" };
