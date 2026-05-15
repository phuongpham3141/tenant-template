import Link from "next/link";
import { cookies } from "next/headers";
import { SocialIcons } from "@/components/icons/social";
import { LangSwitcher } from "@/components/lang-switcher";

/**
 * Top strip — slim utility bar above the main header.
 *
 * Layout: single row at every breakpoint (no flex-wrap). On tablet the
 * gap shrinks so 7 items still fit in 768px.
 *
 * Auth-aware: reads the `auth_token` cookie server-side. When logged in,
 * the "Đăng nhập / Đăng ký" item is replaced by "Tài khoản" — keeping
 * the same item count (7), so the row stays balanced either way.
 */

type LinkRow = {
  label: string;
  href: string;
  desc?: string;
  icon?: string;          // emoji glyph shown left of label
  badge?: string;         // optional pill text (e.g. "12", "MỚI", "VIP")
  badgeTone?: "info" | "success" | "warning" | "accent" | "muted";
  thumb?: string;         // 32×32 image thumbnail (favorites)
};

const BUYER_LINKS: LinkRow[] = [
  { icon: "📊", label: "Trang tổng quan", href: "/buyer-center", desc: "Xem RFQ, đơn hàng, tin nhắn" },
  { icon: "📨", label: "Yêu cầu báo giá (RFQ)", href: "/buyer-center/rfqs", desc: "Quản lý báo giá đã gửi", badge: "3", badgeTone: "info" },
  { icon: "📦", label: "Đơn hàng của tôi", href: "/buyer-center/orders", desc: "Tracking & vận chuyển", badge: "5", badgeTone: "info" },
  { icon: "❤️", label: "Sản phẩm yêu thích", href: "/buyer-center/favorites", badge: "12", badgeTone: "muted" },
  { icon: "📍", label: "Sổ địa chỉ", href: "/buyer-center/addresses" },
  { icon: "📄", label: "Hợp đồng & hoá đơn", href: "/buyer-center/invoices" },
];

const SELLER_LINKS: LinkRow[] = [
  { icon: "📊", label: "Trang tổng quan", href: "/seller-center", desc: "Doanh số, đơn nhận, tin nhắn" },
  { icon: "🏷", label: "Sản phẩm của tôi", href: "/seller-center/products" },
  { icon: "💬", label: "Báo giá đã gửi", href: "/seller-center/quotes" },
  { icon: "📥", label: "Đơn hàng nhận được", href: "/seller-center/orders", badge: "8", badgeTone: "info" },
  { icon: "🏭", label: "Đăng ký nhà máy", href: "/sell-on-csr", desc: "Trở thành Nhà cung cấp đã xác minh" },
  { icon: "🛡", label: "Bảo đảm Giao dịch", href: "/info/trade-assurance", desc: "Trung gian bảo vệ thanh toán xuyên biên giới", badge: "TRUNG GIAN", badgeTone: "success" },
];

const ACCOUNT_LINKS: LinkRow[] = [
  { icon: "👤", label: "Hồ sơ cá nhân", href: "/account/profile" },
  { icon: "🔒", label: "Bảo mật & mật khẩu", href: "/account/security" },
  { icon: "💳", label: "Phương thức thanh toán", href: "/account/payment" },
  { icon: "🔔", label: "Thông báo", href: "/account/notifications", badge: "2", badgeTone: "accent" },
  { icon: "🚪", label: "Đăng xuất", href: "/logout" },
];

const RECENT_ORDERS: LinkRow[] = [
  {
    icon: "🚚",
    label: "PO-202611-0042",
    href: "/buyer-center/orders/PO-202611-0042",
    desc: "Vải nylon 600D · Foshan Textile",
    badge: "Đang vận chuyển",
    badgeTone: "info",
  },
  {
    icon: "✅",
    label: "PO-202611-0038",
    href: "/buyer-center/orders/PO-202611-0038",
    desc: "Cáp HDMI 2.1 · Shenzhen Cable",
    badge: "Đã giao",
    badgeTone: "success",
  },
  {
    icon: "🔧",
    label: "PO-202610-0091",
    href: "/buyer-center/orders/PO-202610-0091",
    desc: "Khoá kéo YKK · Hangzhou Zip Co",
    badge: "Đang SX",
    badgeTone: "warning",
  },
];

const RECENT_FAVORITES: LinkRow[] = [
  {
    thumb: "/img/fav-oxford.jpg?v=2",
    label: "Vải Oxford 420D chống thấm",
    href: "/products/vai-oxford-420d",
    desc: "Hồ Bắc Textile · $3.20/m",
  },
  {
    thumb: "/img/fav-led.jpg?v=2",
    label: "Đèn LED panel 60×60",
    href: "/products/den-led-panel",
    desc: "Quảng Đông Lighting · $12/cái",
  },
  {
    thumb: "/img/fav-powerbank.jpg?v=2",
    label: "Pin sạc dự phòng 20000mAh",
    href: "/products/pin-sac-20000",
    desc: "Thâm Quyến Power · $8.50/cái",
  },
];

/* === Inline SVG icons (16×16) ============================================ */

const I_USER = (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-4 h-4">
    <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-3.34 0-10 1.67-10 5v3h20v-3c0-3.33-6.66-5-10-5Z" />
  </svg>
);
const I_BUYER = (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-4 h-4">
    <path d="M7 4h-2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.6-.25.96 0 1.1.9 2 2 2h12v-2h-11.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49a.998.998 0 0 0-.87-1.48h-14.39l-.94-2Zm0 16a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm10 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
  </svg>
);
const I_FACTORY = (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-4 h-4">
    <path d="M22 22h-20v-12l6 4v-4l6 4v-4l6 4v-4h2v12Zm-15-2h2v-4h-2v4Zm4 0h2v-4h-2v4Zm4 0h2v-4h-2v4Zm-13-15.5 1.5-1.5h3l1.5 1.5v4.5h-6v-4.5Z" />
  </svg>
);
const I_PHONE = (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-4 h-4">
    <path d="M17 1.01 7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2v-18c0-1.1-.9-1.99-2-1.99Zm0 18.99h-10v-14h10v14Zm-3-1h-4v1h4v-1Z" />
  </svg>
);
const I_BOX = (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-4 h-4">
    <path d="M12 2 2 6.5v11l10 4.5 10-4.5v-11l-10-4.5Zm0 2.18 6.92 3.11-2.49 1.11-7-3.06 2.57-1.16Zm-7.7 4.43 7.7 3.36v8.7l-7.7-3.46v-8.6Zm9.7 12.06v-8.7l3-1.31v3.05l2-.9v-3.04l2.7-1.16v8.6l-7.7 3.46Z" />
  </svg>
);
const I_HEART = (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-4 h-4">
    <path d="M12 21.35-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09 1.09-1.28 2.76-2.09 4.5-2.09 3.08 0 5.5 2.42 5.5 5.5 0 3.78-3.4 6.86-8.55 11.54l-1.45 1.31Z" />
  </svg>
);
const I_GLOBE = (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-4 h-4">
    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm-1 17.93A8 8 0 0 1 4.06 13h2.96c.13 1.95.5 3.79 1.06 5.31A8.02 8.02 0 0 1 11 19.93Zm-3.94-8.93H4.06A8 8 0 0 1 11 4.07v2.62c-1.94.44-3.55 2.16-3.94 4.31Zm5.94 8.86V13h2.94c-.34 1.92-1.04 3.55-1.94 4.66-.31.39-.66.74-1 1.27Zm0-8.86c.39-2.15 2-3.87 3.94-4.31v6.31h-3.94v-2Zm6.94 8h-2.96c-.13-1.95-.5-3.79-1.06-5.31a8.02 8.02 0 0 1 4.02 5.31Z" />
  </svg>
);

/* Social-login icons come from @/components/icons/social (shared with /login) */
const I_GOOGLE = SocialIcons.google;
const I_APPLE = SocialIcons.apple;
const I_FACEBOOK = SocialIcons.facebook;

/* ========================================================================= */

function PopHeader({ title, more, moreHref }: { title: string; more?: string; moreHref?: string }) {
  return (
    <div className="flex justify-between items-center px-4 pt-3 pb-2 border-b border-line">
      <b className="text-[13px] text-ink font-bold">{title}</b>
      {more && moreHref && (
        <Link href={moreHref} className="text-[11.5px] text-brand cursor-pointer hover:underline">
          {more} →
        </Link>
      )}
    </div>
  );
}

const TONE_CLASS: Record<NonNullable<LinkRow["badgeTone"]>, string> = {
  info: "bg-brand/10 text-brand",
  success: "bg-success/15 text-success",
  warning: "bg-gold/20 text-warm",
  accent: "bg-accent/15 text-accent",
  muted: "bg-bg text-mute",
};

function LinkList({ items }: { items: LinkRow[] }) {
  return (
    <ul className="py-2">
      {items.map((it) => (
        <li key={it.href}>
          <Link
            href={it.href}
            className="flex items-center gap-2.5 px-3 py-2 hover:bg-bg cursor-pointer group"
          >
            {/* Leading visual: thumbnail OR icon-in-square */}
            {it.thumb ? (
              <img
                src={it.thumb}
                alt=""
                className="w-9 h-9 flex-shrink-0 rounded-sm object-cover bg-bg border border-line"
              />
            ) : (
              <span className="w-8 h-8 flex-shrink-0 rounded-sm bg-bg border border-line flex items-center justify-center text-[15px] group-hover:bg-paper group-hover:border-brand/40 transition-colors">
                {it.icon || "•"}
              </span>
            )}
            {/* Text body */}
            <span className="flex-1 min-w-0">
              <span className="flex items-center gap-1.5">
                <span className="text-[12.5px] text-ink font-medium truncate">{it.label}</span>
                {it.badge && (
                  <span
                    className={`flex-shrink-0 px-1.5 py-px text-[10px] font-bold rounded-sm leading-tight ${
                      TONE_CLASS[it.badgeTone || "muted"]
                    }`}
                  >
                    {it.badge}
                  </span>
                )}
              </span>
              {it.desc && (
                <span className="block text-[11px] text-mute mt-0.5 truncate">{it.desc}</span>
              )}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

function SocialBtn({
  provider,
  label,
  icon,
}: {
  provider: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <Link
      href={`/login/oauth/${provider}`}
      className="flex items-center justify-center gap-2 py-2 border border-line rounded-sm text-[12.5px] text-ink font-medium cursor-pointer hover:border-brand hover:bg-bg"
    >
      <span className="flex-shrink-0">{icon}</span>
      <span>{label}</span>
    </Link>
  );
}

export async function TopStrip() {
  const cookieStore = await cookies();
  const isLoggedIn = !!cookieStore.get("auth_token")?.value;

  return (
    <div className="bg-brand-dark text-white text-[12px] relative z-50">
      <div className="max-w-[1400px] mx-auto px-4 py-1.5 flex items-center gap-x-3.5 md:max-xl:gap-x-2.5 max-md:gap-x-2 max-md:flex-wrap max-md:gap-y-1">
        {/* LEFT GROUP */}
        <div className="flex gap-3.5 items-center md:max-xl:gap-2.5 max-md:gap-2">
          {/* Login / Register — only when NOT logged in */}
          {!isLoggedIn && (
          <div className="ts-item relative">
            <Link
              href="/login"
              className="ts-trigger text-white/85 hover:text-white flex items-center gap-1.5 cursor-pointer py-1"
            >
              <span aria-hidden="true">👋</span>
              <span>Đăng nhập<span className="md:max-xl:hidden"> <span className="opacity-60">/</span> Đăng ký</span></span>
            </Link>
            <div className="ts-pop absolute left-0 top-full w-[320px] bg-paper text-ink rounded shadow-xl border border-line">
              <PopHeader title="Đăng nhập tài khoản" />
              {/* Social login buttons */}
              <div className="px-4 pt-3 grid grid-cols-3 gap-2">
                <SocialBtn provider="google" label="Google" icon={I_GOOGLE} />
                <SocialBtn provider="apple" label="Apple" icon={I_APPLE} />
                <SocialBtn provider="facebook" label="Facebook" icon={I_FACEBOOK} />
              </div>
              {/* Divider */}
              <div className="px-4 py-3 flex items-center gap-3">
                <div className="flex-1 h-px bg-line" />
                <span className="text-[10.5px] text-mute2 uppercase tracking-wider">Hoặc</span>
                <div className="flex-1 h-px bg-line" />
              </div>
              {/* Email/password form */}
              <form action="/login" method="post" className="px-4 pb-4 space-y-2">
                <input
                  name="email"
                  type="email"
                  placeholder="Email hoặc số điện thoại"
                  className="w-full px-2.5 py-2 border border-line rounded-sm text-[12.5px] outline-none focus:border-brand"
                />
                <input
                  name="password"
                  type="password"
                  placeholder="Mật khẩu"
                  className="w-full px-2.5 py-2 border border-line rounded-sm text-[12.5px] outline-none focus:border-brand"
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-brand text-white rounded-sm font-semibold text-[12.5px] cursor-pointer hover:bg-brand-light"
                >
                  Đăng nhập
                </button>
                <div className="flex justify-between text-[11.5px] pt-1">
                  <Link href="/forgot-password" className="text-mute hover:text-brand cursor-pointer">
                    Quên mật khẩu?
                  </Link>
                  <Link href="/register/buyer" className="text-brand font-semibold cursor-pointer hover:underline">
                    Đăng ký Người mua →
                  </Link>
                </div>
              </form>
              <div className="px-4 pb-3 pt-2 border-t border-line text-[11.5px] text-mute">
                Bạn là nhà cung cấp?{" "}
                <Link href="/sell-on-csr" className="text-brand font-semibold cursor-pointer hover:underline">
                  Đăng ký Nhà cung cấp
                </Link>
              </div>
            </div>
          </div>
          )}

          {/* Buyer Center */}
          <div className="ts-item relative hidden sm:block">
            <Link
              href="/buyer-center"
              className="ts-trigger text-white/85 hover:text-white cursor-pointer py-1 inline-flex items-center gap-1.5"
            >
              {I_BUYER}
              <span>Người mua</span>
              <span className="text-[10px] opacity-70">▾</span>
            </Link>
            <div className="ts-pop absolute left-0 top-full w-[320px] bg-paper text-ink rounded shadow-xl border border-line">
              <PopHeader title="Khu vực người mua" more="Xem tất cả" moreHref="/buyer-center" />
              <LinkList items={BUYER_LINKS} />
            </div>
          </div>

          {/* Seller Center */}
          <div className="ts-item relative hidden sm:block">
            <Link
              href="/seller-center"
              className="ts-trigger text-white/85 hover:text-white cursor-pointer py-1 inline-flex items-center gap-1.5"
            >
              {I_FACTORY}
              <span>Nhà cung cấp</span>
              <span className="text-[10px] opacity-70">▾</span>
            </Link>
            <div className="ts-pop absolute left-0 top-full w-[320px] bg-paper text-ink rounded shadow-xl border border-line">
              <PopHeader title="Khu vực nhà cung cấp" more="Xem tất cả" moreHref="/seller-center" />
              <LinkList items={SELLER_LINKS} />
            </div>
          </div>

          {/* App download (with QR) */}
          <div className="ts-item relative hidden md:block">
            <Link
              href="/app"
              className="ts-trigger text-white/85 hover:text-white cursor-pointer py-1 inline-flex items-center gap-1.5"
            >
              {I_PHONE}
              <span>Ứng dụng</span>
              <span className="text-[10px] opacity-70">▾</span>
            </Link>
            <div className="ts-pop absolute left-0 top-full w-[300px] bg-paper text-ink rounded shadow-xl border border-line">
              <PopHeader title="Tải ứng dụng Cybersilkroads" />
              <div className="p-4 flex gap-3 items-center">
                <div className="w-[110px] h-[110px] bg-bg border border-line rounded flex items-center justify-center text-[10.5px] text-mute text-center leading-tight flex-shrink-0">
                  QR Code
                  <br />
                  scan để tải
                </div>
                <div className="flex-1 space-y-2">
                  <Link
                    href="/app/android"
                    className="flex items-center gap-1.5 px-2.5 py-1.5 border border-line rounded-sm text-[12px] hover:border-brand cursor-pointer"
                  >
                    <span className="text-[14px]">🤖</span>
                    <span>
                      <b className="block font-semibold">Android</b>
                      <small className="text-[10.5px] text-mute">Google Play</small>
                    </span>
                  </Link>
                  <Link
                    href="/app/ios"
                    className="flex items-center gap-1.5 px-2.5 py-1.5 border border-line rounded-sm text-[12px] hover:border-brand cursor-pointer"
                  >
                    <span className="text-[14px]">🍎</span>
                    <span>
                      <b className="block font-semibold">iOS</b>
                      <small className="text-[10.5px] text-mute">App Store</small>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT GROUP — ml-auto pushes to right edge whether on the same
            row as LEFT (desktop) or wrapped onto a new row (mobile). */}
        <div className="flex gap-4 items-center ml-auto justify-end md:max-xl:gap-2.5 max-md:gap-2 max-md:flex-wrap">
          {/* My Cybersilkroads — only when logged in */}
          {isLoggedIn && (
          <div className="ts-item relative">
            <Link
              href="/buyer-center"
              className="ts-trigger text-white/85 hover:text-white cursor-pointer py-1 inline-flex items-center gap-1.5"
            >
              {I_USER}
              <span>Tài khoản</span>
              <span className="text-[10px] opacity-70">▾</span>
            </Link>
            <div className="ts-pop absolute right-0 top-full w-[300px] bg-paper text-ink rounded shadow-xl border border-line">
              <PopHeader title="Tài khoản" />
              <LinkList items={ACCOUNT_LINKS} />
            </div>
          </div>
          )}

          {/* Orders */}
          <div className="ts-item relative hidden sm:block">
            <Link
              href="/buyer-center/orders"
              className="ts-trigger text-white/85 hover:text-white cursor-pointer py-1 inline-flex items-center gap-1.5"
            >
              {I_BOX}
              <span>Đơn hàng</span>
              <span className="text-[10px] opacity-70">▾</span>
            </Link>
            <div className="ts-pop absolute right-0 top-full w-[360px] bg-paper text-ink rounded shadow-xl border border-line">
              <PopHeader title="Đơn hàng gần đây" more="Xem tất cả" moreHref="/buyer-center/orders" />
              <LinkList items={RECENT_ORDERS} />
            </div>
          </div>

          {/* Favorites */}
          <div className="ts-item relative hidden sm:block">
            <Link
              href="/buyer-center/favorites"
              className="ts-trigger text-white/85 hover:text-white cursor-pointer py-1 inline-flex items-center gap-1.5"
            >
              <span className="text-accent">{I_HEART}</span>
              <span>Yêu thích</span>
              <span className="text-[10px] opacity-70">▾</span>
            </Link>
            <div className="ts-pop absolute right-0 top-full w-[360px] bg-paper text-ink rounded shadow-xl border border-line">
              <PopHeader title="Sản phẩm đã lưu" more="Xem tất cả" moreHref="/buyer-center/favorites" />
              <LinkList items={RECENT_FAVORITES} />
            </div>
          </div>

          {/* Language / Currency selector — driven by /lib/i18n */}
          <div className="ts-item relative">
            <span
              className="ts-trigger text-white/85 hover:text-white cursor-pointer flex items-center gap-1.5 py-1"
              tabIndex={0}
            >
              {I_GLOBE}
              <LangSwitcher variant="trigger" />
              <span className="text-[10px] opacity-70">▾</span>
            </span>
            <div className="ts-pop absolute right-0 top-full w-[260px] bg-paper text-ink rounded shadow-xl border border-line">
              <PopHeader title="Ngôn ngữ & tiền tệ" />
              <LangSwitcher variant="full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
