import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { BuyerSidebar } from "@/components/buyer/sidebar";
import { SECTIONS } from "@/data/home";

const STATS = [
  { v: "12", l: "处理中订单", c: "text-brand" },
  { v: "5", l: "待报价询价", c: "text-accent" },
  { v: "$12,420", l: "2026 Q4 总金额", c: "text-success" },
  { v: "23", l: "收藏产品", c: "text-gold" },
];

const RECENT_RFQS = [
  { id: "RFQ-8421", product: "Porcelain tile 600×1200 calacatta", qty: "2,000 ㎡", quotes: 7, status: "待处理" },
  { id: "RFQ-8417", product: "L形海军蓝丝绒沙发", qty: "30 套", quotes: 5, status: "待处理" },
  { id: "RFQ-8412", product: "四星级酒店智能马桶", qty: "80 个", quotes: 9, status: "已下单" },
];

const ACTIVITY = [
  { time: "12 分钟前", text: "东鹏陶瓷已为 RFQ-8421 发送报价" },
  { time: "1 小时前", text: "订单 AVN-7820 已抵达凭祥仓库" },
  { time: "3 小时前", text: "KUKA Home 已回复您的消息" },
  { time: "昨天", text: "RFQ-8412 已变更为「已下单」状态" },
];

const FEATURED = SECTIONS[0].products.slice(0, 4);

export default function BuyerCenterPage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "首页", href: "/" }, { label: "采购商中心" }]} />
      <div className="max-w-[1400px] mx-auto px-4 mt-4 mb-7 grid grid-cols-[240px_1fr] gap-5 max-md:grid-cols-1">
        <BuyerSidebar active="/buyer-center" />
        <div>
          <div className="bg-paper border border-line rounded p-5 mb-4">
            <h1 className="text-[20px] font-bold text-ink">您好，陈文 A 👋</h1>
            <p className="text-[12.5px] text-mute mt-1">这是您本月的活动概览。</p>
          </div>

          <div className="grid grid-cols-4 gap-3 mb-4 max-md:grid-cols-2">
            {STATS.map((s) => (
              <div key={s.l} className="bg-paper border border-line rounded p-4">
                <b className={`block text-[24px] font-extrabold ${s.c}`}>{s.v}</b>
                <span className="text-[11.5px] text-mute mt-1 block">{s.l}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4 max-md:grid-cols-1">
            <div className="bg-paper border border-line rounded p-4">
              <div className="flex justify-between items-center mb-3">
                <b className="text-[14px] text-ink">最近询价</b>
                <Link href="/buying-request" className="text-brand text-[12px]">+ 新建询价</Link>
              </div>
              <table className="w-full text-[12.5px]">
                <thead className="text-mute">
                  <tr className="border-b border-line">
                    <th className="text-left py-1.5 font-medium">编号</th>
                    <th className="text-left py-1.5 font-medium">产品</th>
                    <th className="text-left py-1.5 font-medium">报价</th>
                    <th className="text-left py-1.5 font-medium">状态</th>
                  </tr>
                </thead>
                <tbody>
                  {RECENT_RFQS.map((r) => (
                    <tr key={r.id} className="border-b border-line last:border-0">
                      <td className="py-2 text-brand">{r.id}</td>
                      <td className="py-2 text-ink truncate max-w-[180px]">{r.product}</td>
                      <td className="py-2 text-success font-semibold">{r.quotes}</td>
                      <td className="py-2 text-mute">{r.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-paper border border-line rounded p-4">
              <b className="block text-[14px] text-ink mb-3">最近动态</b>
              <ul className="space-y-2.5">
                {ACTIVITY.map((a, i) => (
                  <li key={i} className="text-[12.5px] border-b border-dashed border-line pb-2 last:border-0">
                    <span className="text-mute text-[11px] block">{a.time}</span>
                    <span className="text-ink">{a.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-paper border border-line rounded p-4">
            <div className="flex justify-between items-center mb-3">
              <b className="text-[14px] text-ink">为您推荐的产品</b>
              <Link href="/products" className="text-brand text-[12px]">查看更多 →</Link>
            </div>
            <div className="grid grid-cols-4 gap-3 max-md:grid-cols-2">
              {FEATURED.map((p) => (
                <Link key={p.id} href={`/product/${p.id}`} className="border border-line rounded-sm overflow-hidden hover:border-brand block">
                  <div className="aspect-square bg-[#F5F5F5]">
                    {p.image ? <img src={p.image} alt={p.title} className="w-full h-full object-cover" /> : null}
                  </div>
                  <div className="p-2">
                    <h4 className="text-[12px] text-ink line-clamp-2 mb-1">{p.title}</h4>
                    <div className="text-accent font-bold text-[13px]">{p.price}<small className="text-mute font-normal text-[10px]">{p.unit}</small></div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const metadata = { title: "采购商中心 — 华越供应链" };
