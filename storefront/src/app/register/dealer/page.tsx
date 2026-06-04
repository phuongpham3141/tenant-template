import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { NAV_CATEGORIES } from "@/data/home";

export default function RegisterDealerPage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "首页", href: "/" }, { label: "经销商注册" }]} />
      <div className="max-w-[1100px] mx-auto px-4 mt-6 mb-10 grid grid-cols-[1fr_320px] gap-6 max-md:grid-cols-1">
        <div className="bg-paper border border-line rounded p-6">
          <span className="inline-block bg-accent text-white px-2.5 py-1 text-[10.5px] font-bold rounded-sm tracking-wider mb-3">🎁 新经销商优惠</span>
          <h1 className="text-[24px] font-extrabold text-ink mb-1">经销商注册——领取 3 项专属优惠</h1>
          <p className="text-[13px] text-mute mb-5">面向 2026 Q1 前 100 名经销商的限量活动。免费注册。</p>

          <div className="grid grid-cols-3 gap-3 mb-5 max-md:grid-cols-1">
            {[
              { icon: "🏭", t: "免费验厂", d: "对您选定的工厂提供 1 次实地验厂（价值 $400）" },
              { icon: "💰", t: "首单 9 折", d: "适用于平台内供应商的 $5K+ 订单" },
              { icon: "🚚", t: "DDP 免费", d: "免首单 DDP 运费（最高 $300）" },
            ].map((p) => (
              <div key={p.t} className="border border-line rounded p-3 bg-[#FFF7E6]">
                <div className="text-[26px] mb-1">{p.icon}</div>
                <b className="block text-[13px] text-ink mb-1">{p.t}</b>
                <p className="text-[11.5px] text-mute leading-snug">{p.d}</p>
              </div>
            ))}
          </div>

          <form action="/buyer-center" method="get" className="space-y-4">
            <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
              <div>
                <label className="block text-[12.5px] font-semibold text-ink mb-1.5">姓名 <span className="text-accent">*</span></label>
                <input name="name" required className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand" />
              </div>
              <div>
                <label className="block text-[12.5px] font-semibold text-ink mb-1.5">公司 <span className="text-accent">*</span></label>
                <input name="company" required className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand" />
              </div>
              <div>
                <label className="block text-[12.5px] font-semibold text-ink mb-1.5">邮箱 <span className="text-accent">*</span></label>
                <input name="email" type="email" required className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand" />
              </div>
              <div>
                <label className="block text-[12.5px] font-semibold text-ink mb-1.5">电话 / Zalo <span className="text-accent">*</span></label>
                <input name="phone" required className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand" />
              </div>
              <div>
                <label className="block text-[12.5px] font-semibold text-ink mb-1.5">税号</label>
                <input name="tax" className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand" />
              </div>
              <div>
                <label className="block text-[12.5px] font-semibold text-ink mb-1.5">年营业额</label>
                <select name="revenue" className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] bg-white">
                  <option>10 亿越南盾以下</option>
                  <option>10 – 50 亿越南盾</option>
                  <option>50 – 200 亿越南盾</option>
                  <option>200 亿越南盾以上</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-[12.5px] font-semibold text-ink mb-1.5">经营行业</label>
                <div className="grid grid-cols-3 gap-2 max-md:grid-cols-2">
                  {NAV_CATEGORIES.slice(0, 9).map((c) => (
                    <label key={c.slug} className="flex items-center gap-1.5 text-[12px] text-mute cursor-pointer">
                      <input type="checkbox" name="industry" value={c.slug} className="accent-brand" /> {c.icon} {c.name}
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <label className="flex items-start gap-2 text-[12px] text-mute mt-4">
              <input type="checkbox" required className="accent-brand mt-0.5" />
              <span>同意 <Link href="/info/terms-of-service" className="text-brand">条款</Link>，并在 90 天内使用免费验厂。</span>
            </label>
            <button type="submit" className="w-full py-3 bg-accent text-white rounded-sm font-bold text-[14px] hover:opacity-90 mt-3">注册经销商 & 领取优惠 →</button>
          </form>
        </div>

        <aside className="bg-paper border border-line rounded p-5 self-start">
          <b className="block text-[14px] font-bold text-ink mb-3">🎯 其他经销商怎么说</b>
          <div className="space-y-3 text-[12px] text-ink">
            <div className="border-l-2 border-gold pl-3">
              <p className="leading-relaxed">“免费验厂帮我避开了 1 家假冒供应商——实际价值远超 $400。”</p>
              <span className="text-[11px] text-mute mt-1 block">— 陈光兴，南方建材</span>
            </div>
            <div className="border-l-2 border-gold pl-3">
              <p className="leading-relaxed">“DDP 免费加首单 9 折，首批货为我省下了 2,200 万越南盾。”</p>
              <span className="text-[11px] text-mute mt-1 block">— 黎秋恒，西贡展厅</span>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}

export const metadata = { title: "经销商注册 — Huayuesc" };
