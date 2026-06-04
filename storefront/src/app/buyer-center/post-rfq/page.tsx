import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { BuyerSidebar } from "@/components/buyer/sidebar";
import { NAV_CATEGORIES } from "@/data/home";

const TIPS = [
  { icon: "📐", t: "详细描述技术参数", d: "尺寸、材质、颜色、重量——越具体，报价越精准。" },
  { icon: "🖼", t: "附上参考图片", d: "一图胜千言——供应商的理解速度可提升 10 倍。" },
  { icon: "📅", t: "注明交付期限", d: "明确期限（例：6 月 15 日前收货）便于供应商在赶不及时尽早回绝。" },
  { icon: "💵", t: "给出预算区间", d: "提前告知预算便于供应商匹配对应档次——避免报价过高或过低失准。" },
];

export default async function PostRfqPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; qty?: string; desc?: string }>;
}) {
  const sp = await searchParams;

  return (
    <>
      <Breadcrumb trail={[{ label: "首页", href: "/" }, { label: "采购商中心", href: "/buyer-center" }, { label: "发布询价" }]} />
      <div className="max-w-[1400px] mx-auto px-4 mt-4 mb-7 grid grid-cols-[240px_1fr] gap-5 max-md:grid-cols-1">
        <BuyerSidebar active="/buyer-center/post-rfq" />
        <div>
          <div className="bg-brand-dark text-white rounded p-5 mb-4">
            <div className="inline-block bg-gold text-brand-dark px-2.5 py-1 text-[11px] font-bold rounded-sm tracking-wider mb-2">📨 RFQ — REQUEST FOR QUOTATION</div>
            <h1 className="text-[22px] font-bold leading-tight">发布询价</h1>
            <p className="text-[13px] opacity-90 mt-2 leading-relaxed">
              一次描述——发送至 5–10 家匹配工厂。24 小时内收到含样品、交期及 DDP 到越南的报价。免费，无需定金。
            </p>
          </div>

          <div className="grid grid-cols-[1fr_280px] gap-4 max-md:grid-cols-1">
            <form action="/buying-request" method="get" className="bg-paper border border-line rounded p-5">
              <h2 className="text-[16px] font-bold text-ink mb-4">标准询价表单</h2>
              <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
                <div className="col-span-2">
                  <label className="block text-[12px] font-semibold text-ink mb-1">所需产品 <span className="text-accent">*</span></label>
                  <input name="q" defaultValue={sp.q ?? ""} placeholder="例：porcelain 瓷砖 600x1200 calacatta white" className="w-full px-3 py-2 border border-line rounded-sm text-[12.5px] outline-none focus:border-brand" />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-ink mb-1">分类</label>
                  <select name="category" className="w-full px-3 py-2 border border-line rounded-sm text-[12.5px] bg-white">
                    <option value="">-- 选择分类 --</option>
                    {NAV_CATEGORIES.map((c) => (
                      <option key={c.slug} value={c.slug}>{c.icon} {c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-ink mb-1">数量 + 单位 <span className="text-accent">*</span></label>
                  <input name="qty" defaultValue={sp.qty ?? ""} placeholder="例：500 ㎡ 或 30 套" className="w-full px-3 py-2 border border-line rounded-sm text-[12.5px] outline-none focus:border-brand" />
                </div>
                <div className="col-span-2">
                  <label className="block text-[12px] font-semibold text-ink mb-1">详细描述</label>
                  <textarea name="desc" defaultValue={sp.desc ?? ""} rows={5} placeholder="产品描述：尺寸、颜色、材质、标准、期限……" className="w-full px-3 py-2 border border-line rounded-sm text-[12.5px] outline-none focus:border-brand resize-none" />
                </div>
                <div className="col-span-2">
                  <label className="block text-[12px] font-semibold text-ink mb-1">参考图片</label>
                  <div className="border-2 border-dashed border-line rounded p-3 text-center text-[12px] text-mute hover:border-brand cursor-pointer">
                    📎 拖放图片或 <a className="text-brand underline">点击选择文件</a> — 最多 5 张，每张不超过 5MB
                  </div>
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-ink mb-1">目的港</label>
                  <select name="port" className="w-full px-3 py-2 border border-line rounded-sm text-[12.5px] bg-white">
                    <option>吉莱港 – 胡志明市</option>
                    <option>海防港 – 海防</option>
                    <option>岘港 – 岘港</option>
                    <option>DDP 到仓（推荐）</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-ink mb-1">预算 / 单位</label>
                  <select name="budget" className="w-full px-3 py-2 border border-line rounded-sm text-[12.5px] bg-white">
                    <option>灵活</option>
                    <option>$10 以下</option>
                    <option>$10 – $50</option>
                    <option>$50 – $200</option>
                    <option>$200 以上</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-[12px] font-semibold text-ink mb-1">紧急程度</label>
                  <div className="flex gap-2 flex-wrap text-[12px]">
                    {["普通（24h）", "加急（12h）", "紧急（6h）"].map((u, i) => (
                      <label key={u} className="flex items-center gap-1.5 px-3 py-1.5 border border-line rounded-sm cursor-pointer hover:border-brand">
                        <input type="radio" name="urgency" defaultChecked={i === 0} className="accent-brand" /> {u}
                      </label>
                    ))}
                  </div>
                </div>
                <label className="col-span-2 flex items-center gap-2 text-[12px] text-mute pt-2">
                  <input type="checkbox" defaultChecked className="accent-brand" /> 为本次询价开启 <b className="text-ink">交易保障服务</b>（担保 + QC + 保险）
                </label>
              </div>
              <div className="mt-4 pt-3 border-t border-line flex gap-3 items-center max-md:flex-col max-md:items-start">
                <button type="submit" className="px-6 py-2.5 bg-accent text-white rounded-sm font-bold text-[13px] hover:opacity-90">🚀 发送询价</button>
                <span className="text-[11.5px] text-mute">免费 · 无需定金 · 24 小时内报价</span>
              </div>
              {sp.q && (
                <div className="mt-3 p-3 bg-success/10 border border-success/30 rounded text-[12px] text-success">
                  ✓ 询价已发送。我们将在 24 小时内通过邮件回复。
                </div>
              )}
            </form>

            <aside className="space-y-3">
              <div className="bg-paper border border-line rounded p-4">
                <b className="block text-[13px] font-bold text-ink mb-3">💡 撰写优质询价的技巧</b>
                <div className="space-y-3">
                  {TIPS.map((tip) => (
                    <div key={tip.t} className="flex gap-2.5">
                      <span className="text-[18px] flex-shrink-0">{tip.icon}</span>
                      <div>
                        <b className="block text-[12px] text-ink">{tip.t}</b>
                        <p className="text-[11px] text-mute leading-snug">{tip.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-success/5 border border-success/30 rounded p-4">
                <b className="block text-[13px] text-success mb-2">🛡 华越承诺</b>
                <ul className="text-[11.5px] text-ink space-y-1">
                  <li>✓ 免费报价，无下单义务</li>
                  <li>✓ 下单前免费验厂</li>
                  <li>✓ 交易保障支付保护</li>
                  <li>✓ 7×24 中文支持</li>
                </ul>
              </div>

              <Link href="/buyer-center/secured-trading" className="block bg-brand text-white rounded p-3 hover:opacity-95 text-center">
                <b className="block text-[12.5px]">🔒 了解交易保障</b>
                <span className="text-[10.5px] opacity-90">您的资金 100% 安全</span>
              </Link>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}

export const metadata = { title: "发布询价 — 采购商中心" };
