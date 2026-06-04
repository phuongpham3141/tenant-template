import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { SellerSidebar } from "@/components/seller/sidebar";

const MODES = [
  {
    icon: "📦",
    title: "LCL 海运（拼箱）",
    leadtime: "10-14 天",
    cost: "$45-70/CBM",
    bestFor: "小订单 < 15 CBM，家具/纺织起订量",
    pros: ["成本最低", "无需装满整柜", "适合新供应商"],
  },
  {
    icon: "🚢",
    title: "FCL 海运（整柜）",
    leadtime: "8-12 天",
    cost: "$1,800-3,200/40' 柜",
    bestFor: "大订单 > 28 CBM、酒店连锁、项目工程",
    pros: ["按立方计单价最低", "安全（不与他货拼装）", "实时追踪"],
  },
  {
    icon: "✈",
    title: "空运快递",
    leadtime: "2-4 天",
    cost: "$5.8-9.2/kg",
    bestFor: "样品、高端货、急单",
    pros: ["速度最快", "逐小时详细追踪", "适合电子、珠宝"],
  },
];

const FORWARDERS = [
  { name: "Maersk", coverage: "全球", img: 51 },
  { name: "COSCO Shipping", coverage: "中国-东南亚", img: 52 },
  { name: "DHL Express", coverage: "全球空运", img: 53 },
  { name: "FedEx", coverage: "空运优先", img: 54 },
  { name: "VietExpress", coverage: "中越 DDP", img: 55 },
  { name: "Cainiao Logistics", coverage: "中国-东南亚拼货", img: 56 },
  { name: "Yang Ming", coverage: "台湾-越南海运", img: 57 },
  { name: "Evergreen", coverage: "海运集装箱", img: 58 },
];

const ROUTES = [
  { from: "广州", to: "海防", mode: "FCL 40'", time: "8 天", price: "$1,950" },
  { from: "宁波", to: "胡志明市（吉莱港）", mode: "FCL 40'", time: "11 天", price: "$2,420" },
  { from: "厦门", to: "岘港", mode: "FCL 20'", time: "9 天", price: "$1,180" },
  { from: "深圳", to: "河内（内排）", mode: "空运快递", time: "3 天", price: "$6.4/kg" },
  { from: "上海", to: "海防", mode: "LCL", time: "12 天", price: "$58/CBM" },
  { from: "凭祥", to: "谅山（友谊关）", mode: "陆运", time: "1 天", price: "$680/车" },
];

export default function LogisticsPage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "首页", href: "/" }, { label: "供应商中心", href: "/seller-center" }, { label: "国际物流" }]} />
      <div className="max-w-[1400px] mx-auto px-4 mt-4 mb-7 grid grid-cols-[280px_1fr] gap-5 max-md:grid-cols-1">
        <SellerSidebar active="/seller-center/logistics" />
        <div>
          <div className="bg-paper border border-line rounded p-5 mb-4">
            <div className="inline-block bg-brand/15 text-brand px-2.5 py-1 text-[11px] font-bold rounded-sm tracking-wider mb-2">🚢 INTERNATIONAL LOGISTICS</div>
            <h1 className="text-[22px] font-bold text-ink">面向供应商的国际物流</h1>
            <p className="text-[13px] text-mute mt-2 leading-relaxed">
              3 种运输方式 + 8 家货代 + 6 条常用中越线路。实时报价、7×24 追踪、DDP 选项让采购商无忧清关。每笔运单均集成 STS 担保。
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-4 max-md:grid-cols-1">
            {MODES.map((m) => (
              <div key={m.title} className="bg-paper border border-line rounded p-4 hover:border-brand">
                <div className="text-[32px] mb-2">{m.icon}</div>
                <b className="block text-[14px] text-ink mb-2">{m.title}</b>
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="bg-[#FAFBFC] rounded p-2">
                    <span className="text-[10px] text-mute block">交货时间</span>
                    <b className="text-[12px] text-brand">{m.leadtime}</b>
                  </div>
                  <div className="bg-[#FAFBFC] rounded p-2">
                    <span className="text-[10px] text-mute block">费用</span>
                    <b className="text-[12px] text-accent">{m.cost}</b>
                  </div>
                </div>
                <p className="text-[11px] text-mute mb-2"><b className="text-ink">适合：</b> {m.bestFor}</p>
                <ul className="space-y-1 border-t border-line pt-2">
                  {m.pros.map((p) => (
                    <li key={p} className="text-[11.5px] text-ink flex gap-1.5"><span className="text-success">✓</span> {p}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <b className="block text-[15px] text-ink mb-4">🧮 快速运费估算（mock）</b>
            <div className="grid grid-cols-5 gap-3 max-md:grid-cols-1">
              <select className="border border-line rounded-sm px-3 py-2 text-[12.5px]">
                <option>起运港：广州</option>
                <option>宁波</option>
                <option>深圳</option>
              </select>
              <select className="border border-line rounded-sm px-3 py-2 text-[12.5px]">
                <option>目的港：海防</option>
                <option>胡志明市</option>
                <option>岘港</option>
              </select>
              <input type="text" placeholder="体积（CBM）" className="border border-line rounded-sm px-3 py-2 text-[12.5px]" />
              <input type="text" placeholder="重量（kg）" className="border border-line rounded-sm px-3 py-2 text-[12.5px]" />
              <button className="bg-brand text-white rounded-sm px-3 py-2 text-[12.5px] font-semibold">估算运费 →</button>
            </div>
            <p className="text-[11px] text-mute mt-3">估算结果即时显示——正式报价将由货代在 2 小时内连同附加费一并提供。</p>
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <b className="block text-[15px] text-ink mb-4">🤝 8 家运输合作伙伴</b>
            <div className="grid grid-cols-4 gap-3 max-md:grid-cols-2">
              {FORWARDERS.map((f) => (
                <div key={f.name} className="border border-line rounded p-3 flex items-center gap-3 hover:border-brand">
                  <img src={`/img/seller-fwd-${f.img}.jpg?v=5`} alt="" className="w-10 h-10 rounded object-cover flex-shrink-0" />
                  <div className="min-w-0">
                    <b className="block text-[12.5px] text-ink truncate">{f.name}</b>
                    <span className="text-[10.5px] text-mute">{f.coverage}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <b className="block text-[15px] text-ink mb-4">🗺 中国 → 越南常用线路</b>
            <table className="w-full text-[12.5px]">
              <thead className="bg-[#FAFBFC] text-mute">
                <tr>
                  <th className="text-left px-3 py-2.5 font-medium">起运港</th>
                  <th className="text-left px-3 py-2.5 font-medium">目的港</th>
                  <th className="text-left px-3 py-2.5 font-medium">方式</th>
                  <th className="text-left px-3 py-2.5 font-medium">时间</th>
                  <th className="text-left px-3 py-2.5 font-medium">参考价格</th>
                </tr>
              </thead>
              <tbody>
                {ROUTES.map((r, i) => (
                  <tr key={i} className="border-t border-line hover:bg-[#FAFBFC]">
                    <td className="px-3 py-2.5 text-ink font-semibold">{r.from}</td>
                    <td className="px-3 py-2.5 text-ink">{r.to}</td>
                    <td className="px-3 py-2.5 text-mute">{r.mode}</td>
                    <td className="px-3 py-2.5 text-brand">{r.time}</td>
                    <td className="px-3 py-2.5 text-accent font-semibold">{r.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-paper border border-line rounded p-5 mb-4">
            <b className="block text-[15px] text-ink mb-3">📍 在线追踪（demo）</b>
            <div className="border border-line rounded p-4 bg-[#FAFBFC]">
              <div className="flex justify-between items-center mb-3">
                <div>
                  <b className="text-[13px] text-ink">Container TEMU-928412 · MAEU-7821</b>
                  <span className="text-[11px] text-mute block">FCL 40' HQ · 广州 → 海防 · ETD 02/05 · ETA 10/05</span>
                </div>
                <span className="bg-success text-white text-[10.5px] font-bold px-2 py-0.5 rounded-sm">在途</span>
              </div>
              <div className="grid grid-cols-5 gap-1 mt-3">
                {["工厂提货", "盐田港", "海运中", "海防港", "采购商仓库"].map((stage, i) => (
                  <div key={stage} className="text-center">
                    <div className={`w-6 h-6 mx-auto rounded-full flex items-center justify-center text-[10px] font-bold ${i <= 2 ? "bg-success text-white" : "bg-mute2/30 text-mute"}`}>{i + 1}</div>
                    <span className={`text-[10.5px] mt-1 block ${i <= 2 ? "text-ink font-semibold" : "text-mute"}`}>{stage}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Link href="#" className="block bg-brand text-white rounded p-5 hover:opacity-95 text-center">
            <b className="block text-[18px] mb-1">📦 为下一单预订运输</b>
            <p className="text-[12.5px] opacity-90">8 家货代 5 分钟内自动报价——任选最便宜或最快方案。</p>
          </Link>
        </div>
      </div>
    </>
  );
}

export const metadata = { title: "国际物流 — 供应商中心" };
