import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { BuyerSidebar } from "@/components/buyer/sidebar";

const ORDERS = [
  { id: "AVN-7831", supplier: "Dongpeng Ceramics", product: "Porcelain tile 600×1200", qty: "1,800 ㎡", total: "$15,300", status: "运输中", date: "12/04/2026" },
  { id: "AVN-7820", supplier: "KUKA Home", product: "Sofa L-shape velvet", qty: "30 套", total: "$12,600", status: "已交货", date: "08/04/2026" },
  { id: "AVN-7815", supplier: "Ortonbaths Group", product: "Smart toilet", qty: "80 个", total: "$14,400", status: "生产中", date: "05/04/2026" },
  { id: "AVN-7808", supplier: "OPPEIN Home", product: "Kitchen cabinet OEM", qty: "1 套", total: "$3,200", status: "已交货", date: "02/04/2026" },
  { id: "AVN-7795", supplier: "Monalisa Group", product: "Marble slab 1600×3200", qty: "120 ㎡", total: "$5,040", status: "投诉", date: "28/03/2026" },
  { id: "AVN-7780", supplier: "Landbond Furniture", product: "King size bed walnut", qty: "10 个", total: "$3,800", status: "已交货", date: "20/03/2026" },
  { id: "AVN-7765", supplier: "Taizhou Faucet", product: "Brushed brass mixer", qty: "200 个", total: "$7,600", status: "处理中", date: "15/03/2026" },
];

const STATUS_COLOR: Record<string, string> = {
  "处理中": "bg-mute2/20 text-mute",
  "生产中": "bg-brand/15 text-brand",
  "运输中": "bg-gold/30 text-brand-dark",
  "已交货": "bg-success/20 text-success",
  "投诉": "bg-accent/20 text-accent",
};

const TABS = ["全部", "处理中", "运输中", "已交货", "投诉"];

export default function OrdersPage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "首页", href: "/" }, { label: "采购商中心", href: "/buyer-center" }, { label: "订单" }]} />
      <div className="max-w-[1400px] mx-auto px-4 mt-4 mb-7 grid grid-cols-[240px_1fr] gap-5 max-md:grid-cols-1">
        <BuyerSidebar active="/buyer-center/orders" />
        <div>
          <div className="bg-paper border border-line rounded p-4 mb-4 flex justify-between items-center max-md:flex-col max-md:items-start max-md:gap-3">
            <div>
              <h1 className="text-[20px] font-bold text-ink">我的订单</h1>
              <p className="text-[12px] text-mute mt-0.5">共 {ORDERS.length} 个订单 · 12 分钟前更新</p>
            </div>
            <Link href="/products" className="px-4 py-2 bg-brand text-white rounded-sm font-semibold text-[12.5px]">+ 新建订单</Link>
          </div>

          <div className="bg-paper border border-line rounded">
            <div className="flex gap-0 border-b border-line px-2">
              {TABS.map((t, i) => (
                <a key={t} className={`px-4 py-3 text-[12.5px] cursor-pointer border-b-2 -mb-px ${i === 0 ? "text-brand border-brand font-semibold" : "text-mute border-transparent hover:text-brand"}`}>
                  {t}
                </a>
              ))}
            </div>
            <table className="w-full text-[12.5px]">
              <thead className="bg-[#FAFBFC] text-mute">
                <tr>
                  <th className="text-left px-3 py-2.5 font-medium">订单编号</th>
                  <th className="text-left px-3 py-2.5 font-medium">供应商</th>
                  <th className="text-left px-3 py-2.5 font-medium">产品</th>
                  <th className="text-left px-3 py-2.5 font-medium">数量</th>
                  <th className="text-left px-3 py-2.5 font-medium">金额</th>
                  <th className="text-left px-3 py-2.5 font-medium">下单日期</th>
                  <th className="text-left px-3 py-2.5 font-medium">状态</th>
                  <th className="text-left px-3 py-2.5 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {ORDERS.map((o) => (
                  <tr key={o.id} className="border-t border-line hover:bg-[#FAFBFC]">
                    <td className="px-3 py-3 text-brand font-semibold">{o.id}</td>
                    <td className="px-3 py-3 text-ink">{o.supplier}</td>
                    <td className="px-3 py-3 text-ink truncate max-w-[200px]">{o.product}</td>
                    <td className="px-3 py-3 text-mute">{o.qty}</td>
                    <td className="px-3 py-3 text-accent font-semibold">{o.total}</td>
                    <td className="px-3 py-3 text-mute">{o.date}</td>
                    <td className="px-3 py-3">
                      <span className={`text-[11px] px-2 py-0.5 rounded-sm font-semibold ${STATUS_COLOR[o.status]}`}>{o.status}</span>
                    </td>
                    <td className="px-3 py-3">
                      <Link href="/info/order-tracking" className="text-brand text-[12px] hover:underline">详情 →</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export const metadata = { title: "订单 — 采购商中心" };
