import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { LOGIN_PROVIDERS } from "@/components/icons/social";

/**
 * /login — full standalone page (used when user lands here directly).
 * Layout: 2 columns on desktop. Left = login card (social + form), right
 * = value props + 2 register CTAs (Buyer + Supplier). Mobile collapses
 * to single column with right column moving below.
 */

const VALUE_PROPS = [
  {
    icon: "🏭",
    title: "40+ 家已验厂工厂",
    desc: "已认证供应商，附实地验厂报告、生产线照片与视频。",
  },
  {
    icon: "💰",
    title: "24 小时内报价",
    desc: "发送 1 份询价，1 个工作日内收到 5–10 家合适工厂的报价。",
  },
  {
    icon: "🛡",
    title: "交易保障",
    desc: "若货物与描述不符、数量有误或逾期交货，100% 退款。",
  },
  {
    icon: "🚚",
    title: "DDP 送货到仓 18 天",
    desc: "一站式运输 + 关税 + 清关，从广州/宁波到河内/胡志明市。",
  },
];

export default function LoginPage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "首页", href: "/" }, { label: "登录" }]} />
      <div className="max-w-[1100px] mx-auto px-4 mt-6 mb-10 grid grid-cols-[480px_1fr] gap-8 max-md:grid-cols-1 max-md:gap-5">
        {/* === LEFT: login card =========================================== */}
        <div className="bg-paper border border-line rounded p-6 max-md:p-4">
          {/* Tabs */}
          <div className="flex border-b border-line mb-5 -mx-6 -mt-6 max-md:-mx-4 max-md:-mt-4">
            <span className="flex-1 px-4 py-3 text-center text-[14px] font-bold border-b-2 border-brand text-brand cursor-default">
              登录
            </span>
            <Link
              href="/register/buyer"
              className="flex-1 px-4 py-3 text-center text-[14px] font-semibold border-b-2 border-transparent text-mute hover:text-brand cursor-pointer"
            >
              注册
            </Link>
          </div>

          {/* Social login */}
          <div className="grid grid-cols-3 gap-2 mb-5">
            {LOGIN_PROVIDERS.map((p) => (
              <Link
                key={p.name}
                href={`/login/oauth/${p.name.toLowerCase()}`}
                className="flex items-center justify-center gap-2 py-2.5 border border-line rounded-sm text-[12.5px] font-semibold text-ink cursor-pointer hover:border-brand hover:bg-bg"
                aria-label={`使用 ${p.name} 登录`}
              >
                <span className="flex-shrink-0">{p.icon}</span>
                <span>{p.name}</span>
              </Link>
            ))}
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-line" />
            <span className="text-[10.5px] text-mute2 uppercase tracking-wider">
              或使用邮箱登录
            </span>
            <div className="flex-1 h-px bg-line" />
          </div>

          {/* Form */}
          <form action="/buyer-center" method="get" className="space-y-3">
            <div>
              <label className="block text-[12.5px] font-semibold text-ink mb-1.5">
                邮箱或电话
              </label>
              <input
                name="login"
                placeholder="email@example.com 或 09xx xxx xxx"
                className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand"
              />
            </div>
            <div>
              <label className="block text-[12.5px] font-semibold text-ink mb-1.5">
                密码
              </label>
              <input
                name="password"
                type="password"
                placeholder="••••••••"
                className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand"
              />
            </div>
            <div className="flex justify-between items-center text-[12px]">
              <label className="flex items-center gap-1.5 text-mute cursor-pointer">
                <input type="checkbox" className="accent-brand" />
                记住登录
              </label>
              <Link href="/info/quen-mat-khau" className="text-brand hover:underline cursor-pointer">
                忘记密码？
              </Link>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-brand text-white rounded-sm font-bold text-[14px] cursor-pointer hover:bg-brand-light"
            >
              登录
            </button>
          </form>

          {/* Register CTAs */}
          <div className="mt-6 pt-5 border-t border-line">
            <p className="text-[12.5px] text-mute mb-3 text-center">还没有账户？</p>
            <div className="grid grid-cols-2 gap-2.5">
              <Link
                href="/register/buyer"
                className="flex flex-col items-center text-center px-3 py-3.5 border-2 border-brand rounded-sm cursor-pointer hover:bg-brand/5 transition"
              >
                <span className="text-[22px] mb-1">🛍</span>
                <b className="block text-[13px] text-brand mb-0.5">采购商注册</b>
                <small className="text-[10.5px] text-mute leading-tight">
                  越南采购商、经销商
                </small>
              </Link>
              <Link
                href="/register/factory"
                className="flex flex-col items-center text-center px-3 py-3.5 border-2 border-gold rounded-sm bg-gold/5 cursor-pointer hover:bg-gold/15 transition"
              >
                <span className="text-[22px] mb-1">🏭</span>
                <b className="block text-[13px] text-brand-dark mb-0.5">供应商注册</b>
                <small className="text-[10.5px] text-mute leading-tight">
                  中国工厂
                </small>
              </Link>
            </div>
          </div>

          {/* Help links */}
          <div className="mt-5 pt-4 border-t border-line text-[11.5px] text-mute text-center space-x-3">
            <Link href="/help" className="hover:text-brand cursor-pointer">帮助中心</Link>
            <span>·</span>
            <Link href="/info/terms-of-service" className="hover:text-brand cursor-pointer">条款</Link>
            <span>·</span>
            <Link href="/info/privacy-policy" className="hover:text-brand cursor-pointer">隐私</Link>
          </div>
        </div>

        {/* === RIGHT: value props ========================================== */}
        <aside className="space-y-4">
          {/* Hero card */}
          <div
            className="rounded text-white p-5 relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, #005F6B 0%, #003A42 100%)" }}
          >
            <span className="inline-block bg-gold text-brand-dark px-2.5 py-1 text-[10.5px] font-bold rounded-sm tracking-wider mb-3">
              ⚡ Huayuesc 2026
            </span>
            <h2 className="text-[22px] font-extrabold leading-tight mb-2">
              直采进口的入口 <br />来自中国 <span className="text-gold">40+ 家工厂</span>
            </h2>
            <p className="text-[12.5px] opacity-85 leading-relaxed">
              登录即可继续未完成的询价、追踪订单、收藏产品并管理合同——尽在一处。
            </p>
          </div>

          {/* Value props grid */}
          <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
            {VALUE_PROPS.map((v) => (
              <div key={v.title} className="bg-paper border border-line rounded p-3.5">
                <div className="text-[24px] mb-1.5">{v.icon}</div>
                <b className="block text-[13px] text-ink mb-1">{v.title}</b>
                <p className="text-[11.5px] text-mute leading-snug">{v.desc}</p>
              </div>
            ))}
          </div>

          {/* Stats strip */}
          <div className="bg-paper border border-line rounded p-4 grid grid-cols-3 gap-3 text-center">
            <div>
              <b className="block text-[18px] text-brand font-extrabold">600+</b>
              <small className="text-[11px] text-mute">已注册越南经销商</small>
            </div>
            <div className="border-x border-line">
              <b className="block text-[18px] text-brand font-extrabold">2,400+</b>
              <small className="text-[11px] text-mute">已认证产品</small>
            </div>
            <div>
              <b className="block text-[18px] text-brand font-extrabold">$8.2M</b>
              <small className="text-[11px] text-mute">2025 年交易额</small>
            </div>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-2 text-[11px] text-mute">
            <span className="px-2.5 py-1 bg-bg border border-line rounded-sm">✓ 越南工贸部</span>
            <span className="px-2.5 py-1 bg-bg border border-line rounded-sm">✓ ISO 27001</span>
            <span className="px-2.5 py-1 bg-bg border border-line rounded-sm">✓ SSL 加密</span>
            <span className="px-2.5 py-1 bg-bg border border-line rounded-sm">✓ TÜV 审核</span>
          </div>
        </aside>
      </div>
    </>
  );
}

export const metadata = { title: "登录 — Huayuesc" };
