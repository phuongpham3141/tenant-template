import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { NAV_CATEGORIES } from "@/data/home";
import { LOGIN_PROVIDERS } from "@/components/icons/social";

const BENEFITS = [
  { icon: "🏭", title: "免费验厂", desc: "对您选定的工厂提供 1 次实地验厂——价值 $400" },
  { icon: "💰", title: "首单 9 折", desc: "适用于已认证供应商的 $5K+ 订单" },
  { icon: "🚚", title: "首单 DDP 免费", desc: "免至河内/胡志明市的 DDP 运费（最高 $300）" },
  { icon: "🛡", title: "交易保障", desc: "货物交付不符 100% 退款——无需讨价还价" },
];

const TESTIMONIALS = [
  {
    quote: "免费验厂帮我避开了 1 家假冒供应商——实际价值远超 $400。",
    author: "陈光兴",
    role: "南方建材 · 河内",
  },
  {
    quote: "首单 DDP 免费为我 5K 米牛津布那批货省下了 2,200 万越南盾。",
    author: "黎秋恒",
    role: "西贡展厅 · 胡志明市",
  },
];

const STEPS = [
  { n: 1, title: "填写信息", desc: "60 秒表单——姓名、公司、行业" },
  { n: 2, title: "验证邮箱/电话", desc: "OTP 通过 Zalo 或邮箱发送" },
  { n: 3, title: "激活采购商控制台", desc: "访问询价、验厂、交易保障" },
  { n: 4, title: "开始采购", desc: "与广州专家一对一咨询" },
];

export default function RegisterBuyerPage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "首页", href: "/" }, { label: "采购商注册" }]} />
      <div className="max-w-[1200px] mx-auto px-4 mt-6 mb-10">
        {/* HEADER BANNER */}
        <div
          className="rounded text-white px-7 py-6 mb-5 grid grid-cols-[1fr_auto] gap-5 items-center max-md:grid-cols-1 max-md:px-5 max-md:py-4"
          style={{ background: "linear-gradient(135deg, #005F6B 0%, #003A42 100%)" }}
        >
          <div>
            <span className="inline-block bg-gold text-brand-dark px-2.5 py-1 text-[10.5px] font-bold rounded-sm tracking-wider mb-2.5">
              🎁 2026 Q1 新采购商优惠
            </span>
            <h1 className="text-[26px] font-extrabold leading-tight mb-1.5 max-md:text-[22px]">
              免费注册采购商——<span className="text-gold">领取 4 项优惠</span>
            </h1>
            <p className="text-[13px] opacity-90 leading-relaxed max-w-[600px]">
              加入 600+ 家从广州、宁波、厦门直接进口的越南经销商。24 小时内报价、免费验厂、DDP 送货到仓。
            </p>
          </div>
          <div className="flex flex-col gap-2 text-[12px] opacity-90 min-w-[180px]">
            <div className="flex justify-between">
              <span>👥 已注册采购商</span>
              <b>600+</b>
            </div>
            <div className="flex justify-between">
              <span>🏭 已认证供应商</span>
              <b>40+</b>
            </div>
            <div className="flex justify-between">
              <span>💰 2025 年交易额</span>
              <b>$8.2M</b>
            </div>
          </div>
        </div>

        {/* BENEFITS */}
        <div className="grid grid-cols-4 gap-3 mb-5 max-md:grid-cols-2">
          {BENEFITS.map((b) => (
            <div key={b.title} className="bg-[#FFF7E6] border border-gold/40 rounded p-3.5">
              <div className="text-[26px] mb-1.5">{b.icon}</div>
              <b className="block text-[13px] text-ink mb-1">{b.title}</b>
              <p className="text-[11.5px] text-mute leading-snug">{b.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-[1fr_320px] gap-6 max-md:grid-cols-1">
          {/* === LEFT: form ============================================== */}
          <div className="bg-paper border border-line rounded p-6 max-md:p-4">
            {/* Quick social signup */}
            <div className="mb-5">
              <p className="text-[12.5px] text-mute mb-2.5">
                ⚡ 5 秒快速注册：
              </p>
              <div className="grid grid-cols-3 gap-2">
                {LOGIN_PROVIDERS.map((p) => (
                  <Link
                    key={p.name}
                    href={`/register/oauth/${p.name.toLowerCase()}?role=buyer`}
                    className="flex items-center justify-center gap-2 py-2.5 border border-line rounded-sm text-[12.5px] font-semibold text-ink cursor-pointer hover:border-brand hover:bg-bg"
                    aria-label={`使用 ${p.name} 注册`}
                  >
                    <span className="flex-shrink-0">{p.icon}</span>
                    <span>{p.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 mb-5">
              <div className="flex-1 h-px bg-line" />
              <span className="text-[10.5px] text-mute2 uppercase tracking-wider">
                或填写表单
              </span>
              <div className="flex-1 h-px bg-line" />
            </div>

            <form action="/buyer-center" method="get" className="space-y-4">
              <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
                <div>
                  <label className="block text-[12.5px] font-semibold text-ink mb-1.5">
                    姓名 <span className="text-accent">*</span>
                  </label>
                  <input
                    name="name"
                    required
                    placeholder="张三"
                    className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand"
                  />
                </div>
                <div>
                  <label className="block text-[12.5px] font-semibold text-ink mb-1.5">
                    公司
                  </label>
                  <input
                    name="company"
                    placeholder="ABC 有限公司"
                    className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand"
                  />
                </div>
                <div>
                  <label className="block text-[12.5px] font-semibold text-ink mb-1.5">
                    邮箱 <span className="text-accent">*</span>
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="sales@company.vn"
                    className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand"
                  />
                </div>
                <div>
                  <label className="block text-[12.5px] font-semibold text-ink mb-1.5">
                    电话 / Zalo <span className="text-accent">*</span>
                  </label>
                  <input
                    name="phone"
                    required
                    placeholder="09xx xxx xxx"
                    className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand"
                  />
                </div>
                <div>
                  <label className="block text-[12.5px] font-semibold text-ink mb-1.5">
                    密码 <span className="text-accent">*</span>
                  </label>
                  <input
                    name="password"
                    type="password"
                    required
                    placeholder="至少 8 个字符"
                    className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand"
                  />
                </div>
                <div>
                  <label className="block text-[12.5px] font-semibold text-ink mb-1.5">
                    省 / 市
                  </label>
                  <select
                    name="city"
                    className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] bg-white"
                  >
                    <option>河内</option>
                    <option>胡志明市</option>
                    <option>岘港</option>
                    <option>海防</option>
                    <option>芹苴</option>
                    <option>其他</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[12.5px] font-semibold text-ink mb-1.5">
                    企业规模
                  </label>
                  <select
                    name="size"
                    className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] bg-white"
                  >
                    <option>个人 / 个体户</option>
                    <option>10 人以下</option>
                    <option>10 – 50 人</option>
                    <option>50 – 200 人</option>
                    <option>200 人以上</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[12.5px] font-semibold text-ink mb-1.5">
                    年营业额
                  </label>
                  <select
                    name="revenue"
                    className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] bg-white"
                  >
                    <option>10 亿越南盾以下</option>
                    <option>10 – 50 亿越南盾</option>
                    <option>50 – 200 亿越南盾</option>
                    <option>200 亿越南盾以上</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-[12.5px] font-semibold text-ink mb-1.5">
                    关注行业 <span className="text-mute2 font-normal text-[11px]">（可多选）</span>
                  </label>
                  <div className="grid grid-cols-3 gap-2 max-md:grid-cols-2">
                    {NAV_CATEGORIES.slice(0, 9).map((c) => (
                      <label
                        key={c.slug}
                        className="flex items-center gap-1.5 text-[12px] text-mute cursor-pointer px-2 py-1.5 border border-line rounded-sm hover:border-brand hover:bg-bg"
                      >
                        <input
                          type="checkbox"
                          name="industry"
                          value={c.slug}
                          className="accent-brand"
                        />
                        <span className="text-[14px]">{c.icon}</span>
                        <span>{c.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="col-span-2">
                  <label className="block text-[12.5px] font-semibold text-ink mb-1.5">
                    您从何处了解到 Huayuesc？
                  </label>
                  <select
                    name="source"
                    className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] bg-white"
                  >
                    <option>Google 搜索</option>
                    <option>Facebook / Zalo 群组</option>
                    <option>朋友推荐</option>
                    <option>展会 / 活动</option>
                    <option>邮件营销</option>
                    <option>其他</option>
                  </select>
                </div>
              </div>

              <label className="flex items-start gap-2 text-[12px] text-mute mt-4">
                <input type="checkbox" required className="accent-brand mt-0.5" />
                <span>
                  我同意 Huayuesc 的{" "}
                  <Link href="/info/terms-of-service" className="text-brand cursor-pointer hover:underline">
                    条款
                  </Link>{" "}
                  和{" "}
                  <Link href="/info/privacy-policy" className="text-brand cursor-pointer hover:underline">
                    隐私政策
                  </Link>
                  。
                </span>
              </label>
              <label className="flex items-start gap-2 text-[12px] text-mute">
                <input type="checkbox" defaultChecked className="accent-brand mt-0.5" />
                <span>接收每周交易预警——价格趋势、热销产品、行业活动。</span>
              </label>

              <button
                type="submit"
                className="w-full py-3 bg-brand text-white rounded-sm font-bold text-[14px] cursor-pointer hover:bg-brand-light mt-3"
              >
                注册采购商 & 领取优惠 →
              </button>
              <p className="text-[12px] text-mute text-center">
                已有账户？{" "}
                <Link href="/login" className="text-brand font-semibold cursor-pointer hover:underline">
                  登录
                </Link>
              </p>
            </form>
          </div>

          {/* === RIGHT: side info ======================================== */}
          <aside className="space-y-4 self-start">
            <div className="bg-paper border border-line rounded p-5">
              <b className="block text-[14px] font-bold text-ink mb-3">📋 4 步流程</b>
              <ol className="space-y-3">
                {STEPS.map((s) => (
                  <li key={s.n} className="flex gap-2.5">
                    <span className="w-6 h-6 flex-shrink-0 rounded-full bg-brand text-white text-[12px] font-bold flex items-center justify-center">
                      {s.n}
                    </span>
                    <div>
                      <b className="block text-[12.5px] text-ink">{s.title}</b>
                      <p className="text-[11px] text-mute leading-snug">{s.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="bg-paper border border-line rounded p-5">
              <b className="block text-[14px] font-bold text-ink mb-3">💬 其他采购商怎么说</b>
              <div className="space-y-3 text-[12px] text-ink">
                {TESTIMONIALS.map((t) => (
                  <div key={t.author} className="border-l-2 border-gold pl-3">
                    <p className="leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                    <span className="text-[11px] text-mute mt-1 block">
                      — {t.author}, <i>{t.role}</i>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="rounded p-4 text-white"
              style={{ background: "linear-gradient(135deg,#E85D4E,#E8364A)" }}
            >
              <b className="block text-[14px] font-bold mb-1">🏭 您是工厂？</b>
              <p className="text-[11.5px] opacity-90 leading-snug mb-2.5">
                注册为已认证供应商，直接接收 600+ 家越南经销商的询价。
              </p>
              <Link
                href="/register/factory"
                className="inline-block px-3 py-1.5 bg-white text-accent text-[12px] font-bold rounded-sm cursor-pointer hover:bg-bg"
              >
                注册供应商 →
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}

export const metadata = { title: "采购商注册 — Huayuesc" };
