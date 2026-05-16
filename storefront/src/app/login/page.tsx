import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { LOGIN_PROVIDERS } from "@/components/icons/social";
import { LoginForm } from "./LoginForm";

/**
 * /login — full standalone page (used when user lands here directly).
 * Layout: 2 columns on desktop. Left = login card (social + form), right
 * = value props + 2 register CTAs (Buyer + Supplier). Mobile collapses
 * to single column with right column moving below.
 */

const VALUE_PROPS = [
  {
    icon: "🏭",
    title: "40+ nhà máy đã audit",
    desc: "Nhà cung cấp đã xác minh với báo cáo kiểm định on-site, ảnh và video dây chuyền sản xuất.",
  },
  {
    icon: "💰",
    title: "Báo giá < 24h",
    desc: "Gửi 1 RFQ, nhận 5–10 báo giá từ nhà máy phù hợp trong 1 ngày làm việc.",
  },
  {
    icon: "🛡",
    title: "Bảo đảm Giao dịch",
    desc: "Hoàn 100% nếu hàng giao sai mô tả, sai số lượng hoặc trễ thời hạn đã ký.",
  },
  {
    icon: "🚚",
    title: "DDP tận kho 18 ngày",
    desc: "Trọn gói vận chuyển + thuế + thông quan từ Quảng Châu/Ninh Ba về Hà Nội/HCM.",
  },
];

export default function LoginPage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "Trang chủ", href: "/" }, { label: "Đăng nhập" }]} />
      <div className="max-w-[1100px] mx-auto px-4 mt-6 mb-10 grid grid-cols-[480px_1fr] gap-8 max-md:grid-cols-1 max-md:gap-5">
        {/* === LEFT: login card =========================================== */}
        <div className="bg-paper border border-line rounded p-6 max-md:p-4">
          {/* Tabs */}
          <div className="flex border-b border-line mb-5 -mx-6 -mt-6 max-md:-mx-4 max-md:-mt-4">
            <span className="flex-1 px-4 py-3 text-center text-[14px] font-bold border-b-2 border-brand text-brand cursor-default">
              Đăng nhập
            </span>
            <Link
              href="/register/buyer"
              className="flex-1 px-4 py-3 text-center text-[14px] font-semibold border-b-2 border-transparent text-mute hover:text-brand cursor-pointer"
            >
              Đăng ký
            </Link>
          </div>

          {/* Social login */}
          <div className="grid grid-cols-3 gap-2 mb-5">
            {LOGIN_PROVIDERS.map((p) => (
              <Link
                key={p.name}
                href={`/login/oauth/${p.name.toLowerCase()}`}
                className="flex items-center justify-center gap-2 py-2.5 border border-line rounded-sm text-[12.5px] font-semibold text-ink cursor-pointer hover:border-brand hover:bg-bg"
                aria-label={`Đăng nhập với ${p.name}`}
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
              Hoặc đăng nhập bằng email
            </span>
            <div className="flex-1 h-px bg-line" />
          </div>

          {/* Form */}
          <LoginForm />

          {/* Register CTAs */}
          <div className="mt-6 pt-5 border-t border-line">
            <p className="text-[12.5px] text-mute mb-3 text-center">Chưa có tài khoản?</p>
            <div className="grid grid-cols-2 gap-2.5">
              <Link
                href="/register/buyer"
                className="flex flex-col items-center text-center px-3 py-3.5 border-2 border-brand rounded-sm cursor-pointer hover:bg-brand/5 transition"
              >
                <span className="text-[22px] mb-1">🛍</span>
                <b className="block text-[13px] text-brand mb-0.5">Đăng ký Người mua</b>
                <small className="text-[10.5px] text-mute leading-tight">
                  Người mua, đại lý Việt Nam
                </small>
              </Link>
              <Link
                href="/register/factory"
                className="flex flex-col items-center text-center px-3 py-3.5 border-2 border-gold rounded-sm bg-gold/5 cursor-pointer hover:bg-gold/15 transition"
              >
                <span className="text-[22px] mb-1">🏭</span>
                <b className="block text-[13px] text-brand-dark mb-0.5">Đăng ký Nhà cung cấp</b>
                <small className="text-[10.5px] text-mute leading-tight">
                  Nhà máy Trung Quốc
                </small>
              </Link>
            </div>
          </div>

          {/* Help links */}
          <div className="mt-5 pt-4 border-t border-line text-[11.5px] text-mute text-center space-x-3">
            <Link href="/help" className="hover:text-brand cursor-pointer">Trung tâm trợ giúp</Link>
            <span>·</span>
            <Link href="/info/terms-of-service" className="hover:text-brand cursor-pointer">Điều khoản</Link>
            <span>·</span>
            <Link href="/info/privacy-policy" className="hover:text-brand cursor-pointer">Bảo mật</Link>
          </div>
        </div>

        {/* === RIGHT: value props ========================================== */}
        <aside className="space-y-4">
          {/* Hero card */}
          <div
            className="rounded text-white p-5 relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, var(--color-brand) 0%, var(--color-brand-dark) 100%)" }}
          >
            <span className="inline-block bg-gold text-brand-dark px-2.5 py-1 text-[10.5px] font-bold rounded-sm tracking-wider mb-3">
              ⚡ Cybersilkroads 2026
            </span>
            <h2 className="text-[22px] font-extrabold leading-tight mb-2">
              Cánh cửa nhập khẩu trực tiếp <br />từ <span className="text-gold">40+ nhà máy</span> Trung Quốc
            </h2>
            <p className="text-[12.5px] opacity-85 leading-relaxed">
              Đăng nhập để tiếp tục RFQ đang dở, theo dõi đơn hàng, lưu sản phẩm yêu thích
              và quản lý hợp đồng — tất cả ở một nơi.
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
              <small className="text-[11px] text-mute">Dealer VN đã đăng ký</small>
            </div>
            <div className="border-x border-line">
              <b className="block text-[18px] text-brand font-extrabold">2,400+</b>
              <small className="text-[11px] text-mute">Sản phẩm đã verified</small>
            </div>
            <div>
              <b className="block text-[18px] text-brand font-extrabold">$8.2M</b>
              <small className="text-[11px] text-mute">Giao dịch / năm 2025</small>
            </div>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-2 text-[11px] text-mute">
            <span className="px-2.5 py-1 bg-bg border border-line rounded-sm">✓ Bộ Công Thương</span>
            <span className="px-2.5 py-1 bg-bg border border-line rounded-sm">✓ ISO 27001</span>
            <span className="px-2.5 py-1 bg-bg border border-line rounded-sm">✓ Bảo mật SSL</span>
            <span className="px-2.5 py-1 bg-bg border border-line rounded-sm">✓ Audit TUV</span>
          </div>
        </aside>
      </div>
    </>
  );
}

export const metadata = { title: "Đăng nhập — Cybersilkroads" };
