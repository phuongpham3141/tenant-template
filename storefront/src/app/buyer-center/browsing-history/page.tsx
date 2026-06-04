import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { BuyerSidebar } from "@/components/buyer/sidebar";
import { SECTIONS } from "@/data/home";

const ALL_PRODUCTS = SECTIONS.flatMap((s) => s.products);

const FILTERS = [
  { v: "today", l: "今天" },
  { v: "7d", l: "近 7 天" },
  { v: "30d", l: "近 30 天" },
  { v: "all", l: "全部" },
];

const GROUPS = [
  {
    title: "今天",
    sub: "06/05/2026 · 已浏览 4 个产品",
    items: [
      { p: ALL_PRODUCTS[0], time: "10:42" },
      { p: ALL_PRODUCTS[4], time: "10:38" },
      { p: ALL_PRODUCTS[2], time: "09:15" },
      { p: ALL_PRODUCTS[6], time: "08:50" },
    ],
  },
  {
    title: "昨天",
    sub: "05/05/2026 · 已浏览 4 个产品",
    items: [
      { p: ALL_PRODUCTS[8], time: "16:28" },
      { p: ALL_PRODUCTS[12], time: "14:55" },
      { p: ALL_PRODUCTS[16], time: "11:12" },
      { p: ALL_PRODUCTS[20], time: "09:30" },
    ],
  },
  {
    title: "上周",
    sub: "27/04 – 04/05/2026 · 已浏览 4 个产品",
    items: [
      { p: ALL_PRODUCTS[1], time: "周四 16:20" },
      { p: ALL_PRODUCTS[5], time: "周三 11:45" },
      { p: ALL_PRODUCTS[9], time: "周二 14:10" },
      { p: ALL_PRODUCTS[13], time: "周一 10:08" },
    ],
  },
];

export default function BrowsingHistoryPage() {
  const total = GROUPS.reduce((acc, g) => acc + g.items.length, 0);

  return (
    <>
      <Breadcrumb trail={[{ label: "首页", href: "/" }, { label: "采购商中心", href: "/buyer-center" }, { label: "浏览历史" }]} />
      <div className="max-w-[1400px] mx-auto px-4 mt-4 mb-7 grid grid-cols-[240px_1fr] gap-5 max-md:grid-cols-1">
        <BuyerSidebar active="/buyer-center/browsing-history" />
        <div>
          <div className="bg-paper border border-line rounded p-5 mb-4 flex justify-between items-start max-md:flex-col max-md:gap-3">
            <div>
              <div className="inline-block bg-mute2/30 text-mute px-2.5 py-1 text-[11px] font-bold rounded-sm tracking-wider mb-2">🕘 浏览历史</div>
              <h1 className="text-[22px] font-bold text-ink">浏览历史</h1>
              <p className="text-[12.5px] text-mute mt-1">近 30 天共 {total} 个产品 · 跨设备同步</p>
            </div>
            <label className="flex items-center gap-2 text-[12px] text-mute bg-[#F5F7FA] px-3 py-2 rounded-sm cursor-pointer">
              <input type="checkbox" defaultChecked className="accent-brand" />
              <span>开启历史记录</span>
            </label>
          </div>

          <div className="bg-paper border border-line rounded p-3 mb-4 flex justify-between items-center max-md:flex-col max-md:gap-2">
            <div className="flex gap-1">
              {FILTERS.map((f, i) => (
                <button key={f.v} className={`px-3 py-1.5 text-[12px] rounded-sm ${i === 0 ? "bg-brand text-white font-semibold" : "text-mute hover:text-brand border border-line"}`}>{f.l}</button>
              ))}
            </div>
            <input placeholder="🔍 在历史记录中搜索……" className="px-3 py-1.5 border border-line rounded-sm text-[12px] outline-none focus:border-brand max-md:w-full" />
          </div>

          {GROUPS.map((g) => (
            <div key={g.title} className="bg-paper border border-line rounded p-4 mb-4">
              <div className="flex justify-between items-center mb-3 pb-2 border-b border-line">
                <div>
                  <b className="block text-[14px] text-ink">{g.title}</b>
                  <span className="text-[11px] text-mute">{g.sub}</span>
                </div>
                <button className="text-mute text-[11.5px] hover:text-accent">删除该组</button>
              </div>
              <div className="grid grid-cols-4 gap-3 max-md:grid-cols-2">
                {g.items.map((item, idx) => (
                  <div key={`${g.title}-${idx}`} className="border border-line rounded-sm overflow-hidden hover:border-brand group">
                    <Link href={`/product/${item.p.id}`} className="block">
                      <div className="aspect-square bg-[#F5F5F5]">
                        {item.p.image ? <img src={item.p.image} alt={item.p.title} className="w-full h-full object-cover" /> : null}
                      </div>
                    </Link>
                    <div className="p-2.5">
                      <Link href={`/product/${item.p.id}`}>
                        <h4 className="text-[12px] text-ink line-clamp-2 mb-1 min-h-[30px] hover:text-brand">{item.p.title}</h4>
                      </Link>
                      <div className="text-accent font-bold text-[13px]">{item.p.price}<small className="text-mute font-normal text-[10px]">{item.p.unit}</small></div>
                      <div className="text-[10.5px] text-mute mt-0.5 line-clamp-1">{item.p.seller}</div>
                      <div className="flex justify-between items-center mt-2 pt-2 border-t border-line">
                        <span className="text-[10px] text-mute">🕘 {item.time}</span>
                        <div className="flex gap-1.5">
                          <Link href={`/product/${item.p.id}`} className="text-[10.5px] text-brand hover:underline">再次查看</Link>
                          <span className="text-mute">·</span>
                          <button className="text-[10.5px] text-mute hover:text-accent">删除</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="bg-paper border border-line rounded p-4 flex justify-between items-center max-md:flex-col max-md:gap-3">
            <span className="text-[12px] text-mute">历史记录最长保存 90 天，到期自动清除。关闭记录可停止保存新记录。</span>
            <button className="px-4 py-2 border border-accent text-accent rounded-sm font-semibold text-[12px] hover:bg-accent hover:text-white">🗑 清空全部历史</button>
          </div>
        </div>
      </div>
    </>
  );
}

export const metadata = { title: "浏览历史 — 采购商中心" };
