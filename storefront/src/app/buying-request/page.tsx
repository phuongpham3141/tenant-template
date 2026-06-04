import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { NAV_CATEGORIES } from "@/data/home";

const RECENT_RFQS = [
  { id: "RFQ-8421", title: "Porcelain 瓷砖 600x1200 用于 2,000㎡ 项目", time: "12 分钟前", quotes: 7 },
  { id: "RFQ-8417", title: "L 形丝绒沙发，用于胡志明市展厅", time: "45 分钟前", quotes: 5 },
  { id: "RFQ-8412", title: "四星级酒店智能马桶，起订量 80 个", time: "2 小时前", quotes: 9 },
  { id: "RFQ-8408", title: "LED 筒灯 12W，1000 个", time: "3 小时前", quotes: 12 },
  { id: "RFQ-8401", title: "橱柜 OEM 专属图纸", time: "5 小时前", quotes: 4 },
];

export default async function BuyingRequestPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; qty?: string; desc?: string }>;
}) {
  const sp = await searchParams;

  return (
    <>
      <Breadcrumb trail={[{ label: "首页", href: "/" }, { label: "询价" }]} />
      <div className="max-w-[1400px] mx-auto px-4 mt-4">
        <div className="relative rounded overflow-hidden h-[180px] bg-brand-dark">
          <img src="/img/rfq-hero.jpg?v=5" alt="" className="w-full h-full object-cover opacity-55" />
          <div className="absolute inset-0 px-8 py-6 flex flex-col justify-center text-white" style={{ background: "linear-gradient(90deg, rgba(0,37,87,0.95), rgba(0,37,87,0.4))" }}>
            <span className="inline-block self-start bg-gold text-brand-dark px-2.5 py-1 text-[11px] font-bold rounded-sm tracking-wider mb-2">📨 RFQ — REQUEST FOR QUOTATION</span>
            <h1 className="text-[30px] font-extrabold leading-tight max-md:text-[22px]">发送询价——24 小时内获得报价</h1>
            <p className="text-[13.5px] opacity-90 mt-1">一次描述——发送至 5-10 家匹配工厂。报价含样品、交期、DDP 到越南。</p>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 mt-5 grid grid-cols-[1fr_340px] gap-5 max-md:grid-cols-1 mb-7">
        {/* Form */}
        <form action="/buying-request" method="get" className="bg-paper border border-line rounded p-5">
          <h2 className="text-[18px] font-bold text-ink mb-4">询价表单</h2>
          <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
            <div className="col-span-2">
              <label className="block text-[12.5px] font-semibold text-ink mb-1.5">所需产品 <span className="text-accent">*</span></label>
              <input name="q" defaultValue={sp.q ?? ""} placeholder="例：porcelain 瓷砖 600x1200 calacatta white" className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand" />
            </div>
            <div>
              <label className="block text-[12.5px] font-semibold text-ink mb-1.5">分类</label>
              <select name="category" className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] bg-white">
                <option value="">-- 选择分类 --</option>
                {NAV_CATEGORIES.map((c) => (
                  <option key={c.slug} value={c.slug}>{c.icon} {c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[12.5px] font-semibold text-ink mb-1.5">数量 + 单位 <span className="text-accent">*</span></label>
              <input name="qty" defaultValue={sp.qty ?? ""} placeholder="例：500 ㎡ 或 30 套" className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand" />
            </div>
            <div className="col-span-2">
              <label className="block text-[12.5px] font-semibold text-ink mb-1.5">详细描述</label>
              <textarea name="desc" defaultValue={sp.desc ?? ""} rows={5} placeholder="产品描述：尺寸、颜色、材质、标准、期限……" className="w-full px-3 py-2 border border-line rounded-sm text-[13px] outline-none focus:border-brand resize-none" />
            </div>
            <div className="col-span-2">
              <label className="block text-[12.5px] font-semibold text-ink mb-1.5">参考图片</label>
              <div className="border-2 border-dashed border-line rounded p-4 text-center text-[12.5px] text-mute hover:border-brand cursor-pointer">
                📎 拖放图片或 <a className="text-brand underline">点击选择文件</a> — 最多 5 张，每张不超过 5MB
              </div>
            </div>
            <div>
              <label className="block text-[12.5px] font-semibold text-ink mb-1.5">目的港</label>
              <select name="port" className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] bg-white">
                <option>吉莱港 – 胡志明市</option>
                <option>海防港 – 海防</option>
                <option>岘港 – 岘港</option>
                <option>DDP 到仓（推荐）</option>
              </select>
            </div>
            <div>
              <label className="block text-[12.5px] font-semibold text-ink mb-1.5">预算 / 单位</label>
              <select name="budget" className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] bg-white">
                <option>灵活</option>
                <option>$10 以下</option>
                <option>$10 – $50</option>
                <option>$50 – $200</option>
                <option>$200 以上</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-[12.5px] font-semibold text-ink mb-1.5">紧急程度</label>
              <div className="flex gap-3 flex-wrap text-[12.5px]">
                {["普通（24h）", "加急（12h）", "紧急（6h）"].map((u, i) => (
                  <label key={u} className="flex items-center gap-1.5 px-3 py-1.5 border border-line rounded-sm cursor-pointer hover:border-brand">
                    <input type="radio" name="urgency" defaultChecked={i === 0} className="accent-brand" /> {u}
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-5 pt-4 border-t border-line flex gap-3 items-center">
            <button type="submit" className="px-7 py-3 bg-accent text-white rounded-sm font-bold text-[14px] hover:opacity-90">🚀 立即发送询价</button>
            <span className="text-[12px] text-mute">免费 · 无需注册 · 24 小时内报价</span>
          </div>
          {sp.q && (
            <div className="mt-4 p-3 bg-success/10 border border-success/30 rounded text-[12.5px] text-success">
              ✓ 询价已发送至匹配供应商。我们将在 24 小时内通过邮件回复。
            </div>
          )}
        </form>

        {/* Sidebar */}
        <aside className="space-y-4">
          <div className="bg-paper border border-line rounded p-4">
            <b className="block text-[14px] font-bold text-ink mb-3">3 步流程</b>
            {[
              { n: 1, t: "发送询价", d: "一次描述，系统自动匹配合适工厂" },
              { n: 2, t: "收到 5-10 份报价", d: "24 小时内，附样品图、交期、DDP" },
              { n: 3, t: "选择最优供应商", d: "比对、直接沟通、下单样品、确认订单" },
            ].map((s) => (
              <div key={s.n} className="flex gap-3 mb-3 last:mb-0">
                <div className="w-8 h-8 bg-brand text-white rounded-full flex items-center justify-center font-bold text-[13px] flex-shrink-0">{s.n}</div>
                <div>
                  <b className="block text-[13px] text-ink">{s.t}</b>
                  <p className="text-[11.5px] text-mute leading-snug">{s.d}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-paper border border-line rounded p-4">
            <b className="block text-[13px] font-bold text-ink mb-2">🛡 华越承诺</b>
            <ul className="text-[12px] text-mute space-y-1.5">
              <li>✓ 免费报价，无下单义务</li>
              <li>✓ 下单前免费验厂</li>
              <li>✓ 交易保障支付保护</li>
              <li>✓ 7×24 中文支持</li>
            </ul>
          </div>

          <div className="bg-paper border border-line rounded p-4">
            <b className="block text-[13px] font-bold text-ink mb-2">最近询价</b>
            <div className="space-y-2.5 text-[11.5px]">
              {RECENT_RFQS.map((r) => (
                <div key={r.id} className="border-b border-dashed border-line pb-2 last:border-0">
                  <div className="flex justify-between text-[10.5px] text-mute mb-0.5">
                    <span>{r.id}</span>
                    <span>{r.time}</span>
                  </div>
                  <b className="block text-[12px] text-ink leading-snug mb-0.5">{r.title}</b>
                  <span className="text-success text-[11px]">✓ 已收到 {r.quotes} 份报价</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}

export const metadata = { title: "发送询价 — Huayuesc" };
