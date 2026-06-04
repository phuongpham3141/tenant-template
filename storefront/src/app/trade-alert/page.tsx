import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { NAV_CATEGORIES } from "@/data/home";

const SAMPLE_ALERTS = [
  { tag: "PRICE", title: "11 月 porcelain 瓷砖价格下降 8%", time: "2 天前", text: "佛山产量增长 15% 拉低价格。备货迎春节的良机。" },
  { tag: "NEW SUPPLIER", title: "30 家新陶瓷工厂入驻华越", time: "3 天前", text: "全部已通过验厂，集中于新兴产业集群。起订量 100㎡ 起。" },
  { tag: "TREND", title: "2025 年智能马桶增长 240%", time: "5 天前", text: "Ortonbaths、TOTO、Kohler 领跑。面向越南市场价位 $150-450/个。" },
  { tag: "FAIR", title: "广交会第二期开放报名", time: "1 周前", text: "5 天行程，提供签证、酒店、3 家工厂参观。前 50 名早鸟采购商享 85 折。" },
  { tag: "POLICY", title: "2026 年起家具进口关税降至 15%", time: "1 周前", text: "新法令于 2026 年 1 月 1 日生效——为家具经销商节省 5-10% 成本。" },
  { tag: "DEAL", title: "Dongpeng 对 500㎡+ 订单减 12%", time: "2 周前", text: "适用于 Calacatta porcelain 系列。2026 年 11 月 30 日截止。" },
];

const TAG_COLORS: Record<string, string> = {
  PRICE: "bg-accent",
  "NEW SUPPLIER": "bg-success",
  TREND: "bg-brand",
  FAIR: "bg-gold text-brand-dark",
  POLICY: "bg-mute",
  DEAL: "bg-accent",
};

export default function TradeAlertPage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "首页", href: "/" }, { label: "交易预警" }]} />
      <div className="max-w-[1400px] mx-auto px-4 mt-4 grid grid-cols-[1fr_360px] gap-5 max-md:grid-cols-1">
        <div>
          <div className="relative rounded overflow-hidden h-[200px] bg-brand-dark">
            <img src="/img/tradealert.jpg?v=5" alt="" className="w-full h-full object-cover opacity-55" />
            <div className="absolute inset-0 px-7 py-6 flex flex-col justify-center text-white" style={{ background: "linear-gradient(90deg, rgba(0,37,87,0.95), rgba(0,37,87,0.4))" }}>
              <span className="inline-block self-start bg-gold text-brand-dark px-2.5 py-1 text-[11px] font-bold rounded-sm tracking-wider mb-2">📬 NEWSLETTER B2B</span>
              <h1 className="text-[28px] font-extrabold leading-tight max-md:text-[22px]">每周获取产品资讯与行业趋势</h1>
              <p className="text-[13px] opacity-90 mt-2">12,000+ 越南采购商正在接收交易预警。完全免费，可随时取消订阅。</p>
            </div>
          </div>

          {/* Sample alerts */}
          <h2 className="text-[16px] font-bold text-ink mt-5 mb-3">近期交易预警内容示例</h2>
          <div className="space-y-3">
            {SAMPLE_ALERTS.map((a) => (
              <div key={a.title} className="bg-paper border border-line rounded p-4 hover:border-brand">
                <div className="flex justify-between items-start gap-3 mb-1.5">
                  <span className={`text-white text-[10px] px-2 py-0.5 rounded-sm font-bold tracking-wider ${TAG_COLORS[a.tag] ?? "bg-brand"}`}>{a.tag}</span>
                  <span className="text-[11.5px] text-mute">{a.time}</span>
                </div>
                <b className="block text-[14px] text-ink mb-1">{a.title}</b>
                <p className="text-[12.5px] text-mute leading-relaxed">{a.text}</p>
              </div>
            ))}
          </div>
        </div>

        <aside>
          <form action="/trade-alert" method="get" className="bg-paper border border-line rounded overflow-hidden sticky top-4">
            <div className="bg-brand text-white px-4 py-3 font-semibold text-[14px]">📬 订阅交易预警</div>
            <div className="p-4">
              <p className="text-[12px] text-mute mb-3">输入邮箱 + 关注行业。每周 1-2 封邮件，绝不打扰。</p>
              <input name="email" type="email" placeholder="email@example.com" className="w-full px-3 py-2 border border-line rounded-sm text-[13px] mb-2 outline-none focus:border-brand" />
              <select name="industry" className="w-full px-3 py-2 border border-line rounded-sm text-[13px] mb-2 bg-white">
                <option value="">-- 关注行业 --</option>
                {NAV_CATEGORIES.map((c) => (
                  <option key={c.slug} value={c.slug}>{c.icon} {c.name}</option>
                ))}
              </select>
              <select name="lang" className="w-full px-3 py-2 border border-line rounded-sm text-[13px] mb-3 bg-white">
                <option value="vi">🇻🇳 越南语</option>
                <option value="en">🇬🇧 English</option>
              </select>
              <button type="submit" className="w-full py-2.5 bg-accent text-white rounded-sm font-bold text-[13px]">免费订阅</button>
              <p className="text-[11px] text-mute text-center mt-3">
                已有账户？ <Link href="/login" className="text-brand">登录</Link>
              </p>
            </div>
          </form>

          <div className="bg-paper border border-line rounded p-4 mt-4 text-[12px] text-mute leading-relaxed">
            <b className="block text-[13px] text-ink mb-2">订阅者权益</b>
            <ul className="space-y-1.5">
              <li>✓ 每周原材料价格预警</li>
              <li>✓ 新入驻供应商报告</li>
              <li>✓ 广交会行程优惠码</li>
              <li>✓ 每月 1 次免费网络研讨会</li>
            </ul>
          </div>
        </aside>
      </div>
      <div className="mb-7" />
    </>
  );
}

export const metadata = { title: "交易预警 — Huayuesc" };
