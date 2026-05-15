import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { NAV_CATEGORIES } from "@/data/home";
import { LOGIN_PROVIDERS } from "@/components/icons/social";

const BENEFITS = [
  { icon: "🏭", title: "KIỂM ĐỊNH MIỄN PHÍ", desc: "1 lần kiểm định tại chỗ nhà máy bạn chọn — giá trị $400" },
  { icon: "💰", title: "Giảm 10% đơn đầu", desc: "Áp dụng cho đơn $5K+ từ Nhà cung cấp đã xác minh" },
  { icon: "🚚", title: "Miễn phí DDP đơn đầu", desc: "Miễn cước DDP tới Hà Nội/HCM (tối đa $300)" },
  { icon: "🛡", title: "Bảo đảm Giao dịch", desc: "Hoàn 100% nếu hàng giao sai — không cần thương lượng" },
];

const TESTIMONIALS = [
  {
    quote: "Kiểm định miễn phí giúp tôi tránh được 1 NCC giả mạo — giá trị thật hơn $400.",
    author: "Trần Quang Hưng",
    role: "VLXD Phương Nam · Hà Nội",
  },
  {
    quote: "DDP miễn phí đơn đầu tiết kiệm cho tôi 22 triệu cho lô vải Oxford 5K mét.",
    author: "Lê Thu Hằng",
    role: "Showroom Sài Gòn · TP HCM",
  },
];

const STEPS = [
  { n: 1, title: "Điền thông tin", desc: "Form 60 giây — họ tên, công ty, ngành" },
  { n: 2, title: "Xác minh email/SĐT", desc: "OTP gửi qua Zalo hoặc email" },
  { n: 3, title: "Kích hoạt bảng điều khiển người mua", desc: "Truy cập RFQ, audit, Bảo đảm Giao dịch" },
  { n: 4, title: "Bắt đầu tìm nguồn", desc: "Tư vấn 1-1 với chuyên gia tại Quảng Châu" },
];

export default function RegisterBuyerPage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "Trang chủ", href: "/" }, { label: "Đăng ký Người mua" }]} />
      <div className="max-w-[1200px] mx-auto px-4 mt-6 mb-10">
        {/* HEADER BANNER */}
        <div
          className="rounded text-white px-7 py-6 mb-5 grid grid-cols-[1fr_auto] gap-5 items-center max-md:grid-cols-1 max-md:px-5 max-md:py-4"
          style={{ background: "linear-gradient(135deg, var(--color-brand) 0%, var(--color-brand-dark) 100%)" }}
        >
          <div>
            <span className="inline-block bg-gold text-brand-dark px-2.5 py-1 text-[10.5px] font-bold rounded-sm tracking-wider mb-2.5">
              🎁 ƯU ĐÃI NGƯỜI MUA MỚI Q1/2026
            </span>
            <h1 className="text-[26px] font-extrabold leading-tight mb-1.5 max-md:text-[22px]">
              Đăng ký Người mua miễn phí — <span className="text-gold">nhận 4 ưu đãi</span>
            </h1>
            <p className="text-[13px] opacity-90 leading-relaxed max-w-[600px]">
              Tham gia 600+ đại lý Việt Nam đang nhập khẩu trực tiếp từ Quảng Châu, Ninh Ba, Hạ Môn.
              Báo giá &lt; 24h, kiểm định miễn phí, vận chuyển DDP tận kho.
            </p>
          </div>
          <div className="flex flex-col gap-2 text-[12px] opacity-90 min-w-[180px]">
            <div className="flex justify-between">
              <span>👥 Người mua đã đăng ký</span>
              <b>600+</b>
            </div>
            <div className="flex justify-between">
              <span>🏭 NCC đã xác minh</span>
              <b>40+</b>
            </div>
            <div className="flex justify-between">
              <span>💰 Giao dịch 2025</span>
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
                ⚡ Đăng ký nhanh trong 5 giây bằng:
              </p>
              <div className="grid grid-cols-3 gap-2">
                {LOGIN_PROVIDERS.map((p) => (
                  <Link
                    key={p.name}
                    href={`/register/oauth/${p.name.toLowerCase()}?role=buyer`}
                    className="flex items-center justify-center gap-2 py-2.5 border border-line rounded-sm text-[12.5px] font-semibold text-ink cursor-pointer hover:border-brand hover:bg-bg"
                    aria-label={`Đăng ký với ${p.name}`}
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
                Hoặc điền form
              </span>
              <div className="flex-1 h-px bg-line" />
            </div>

            <form action="/buyer-center" method="get" className="space-y-4">
              <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
                <div>
                  <label className="block text-[12.5px] font-semibold text-ink mb-1.5">
                    Họ tên <span className="text-accent">*</span>
                  </label>
                  <input
                    name="name"
                    required
                    placeholder="Nguyễn Văn A"
                    className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand"
                  />
                </div>
                <div>
                  <label className="block text-[12.5px] font-semibold text-ink mb-1.5">
                    Công ty
                  </label>
                  <input
                    name="company"
                    placeholder="Công ty TNHH ABC"
                    className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand"
                  />
                </div>
                <div>
                  <label className="block text-[12.5px] font-semibold text-ink mb-1.5">
                    Email <span className="text-accent">*</span>
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="ban@congty.vn"
                    className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand"
                  />
                </div>
                <div>
                  <label className="block text-[12.5px] font-semibold text-ink mb-1.5">
                    Điện thoại / Zalo <span className="text-accent">*</span>
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
                    Mật khẩu <span className="text-accent">*</span>
                  </label>
                  <input
                    name="password"
                    type="password"
                    required
                    placeholder="Tối thiểu 8 ký tự"
                    className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand"
                  />
                </div>
                <div>
                  <label className="block text-[12.5px] font-semibold text-ink mb-1.5">
                    Tỉnh / Thành
                  </label>
                  <select
                    name="city"
                    className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] bg-white"
                  >
                    <option>Hà Nội</option>
                    <option>TP Hồ Chí Minh</option>
                    <option>Đà Nẵng</option>
                    <option>Hải Phòng</option>
                    <option>Cần Thơ</option>
                    <option>Khác</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[12.5px] font-semibold text-ink mb-1.5">
                    Quy mô doanh nghiệp
                  </label>
                  <select
                    name="size"
                    className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] bg-white"
                  >
                    <option>Cá nhân / Hộ kinh doanh</option>
                    <option>Dưới 10 nhân viên</option>
                    <option>10 – 50 nhân viên</option>
                    <option>50 – 200 nhân viên</option>
                    <option>Trên 200 nhân viên</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[12.5px] font-semibold text-ink mb-1.5">
                    Doanh thu / năm
                  </label>
                  <select
                    name="revenue"
                    className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] bg-white"
                  >
                    <option>Dưới 1 tỷ</option>
                    <option>1 – 5 tỷ</option>
                    <option>5 – 20 tỷ</option>
                    <option>Trên 20 tỷ</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-[12.5px] font-semibold text-ink mb-1.5">
                    Ngành quan tâm <span className="text-mute2 font-normal text-[11px]">(chọn nhiều)</span>
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
                    Bạn nghe Cybersilkroads từ đâu?
                  </label>
                  <select
                    name="source"
                    className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] bg-white"
                  >
                    <option>Tìm kiếm Google</option>
                    <option>Nhóm Facebook / Zalo</option>
                    <option>Bạn bè giới thiệu</option>
                    <option>Hội chợ / Sự kiện</option>
                    <option>Tiếp thị qua email</option>
                    <option>Khác</option>
                  </select>
                </div>
              </div>

              <label className="flex items-start gap-2 text-[12px] text-mute mt-4">
                <input type="checkbox" required className="accent-brand mt-0.5" />
                <span>
                  Tôi đồng ý với{" "}
                  <Link href="/info/terms-of-service" className="text-brand cursor-pointer hover:underline">
                    Điều khoản
                  </Link>{" "}
                  và{" "}
                  <Link href="/info/privacy-policy" className="text-brand cursor-pointer hover:underline">
                    Chính sách bảo mật
                  </Link>{" "}
                  của Cybersilkroads.
                </span>
              </label>
              <label className="flex items-start gap-2 text-[12px] text-mute">
                <input type="checkbox" defaultChecked className="accent-brand mt-0.5" />
                <span>Nhận Cảnh báo Thương mại hàng tuần — xu hướng giá, sản phẩm bán chạy, sự kiện ngành.</span>
              </label>

              <button
                type="submit"
                className="w-full py-3 bg-brand text-white rounded-sm font-bold text-[14px] cursor-pointer hover:bg-brand-light mt-3"
              >
                Đăng ký Người mua & Nhận ưu đãi →
              </button>
              <p className="text-[12px] text-mute text-center">
                Đã có tài khoản?{" "}
                <Link href="/login" className="text-brand font-semibold cursor-pointer hover:underline">
                  Đăng nhập
                </Link>
              </p>
            </form>
          </div>

          {/* === RIGHT: side info ======================================== */}
          <aside className="space-y-4 self-start">
            <div className="bg-paper border border-line rounded p-5">
              <b className="block text-[14px] font-bold text-ink mb-3">📋 Quy trình 4 bước</b>
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
              <b className="block text-[14px] font-bold text-ink mb-3">💬 Người mua khác nói gì</b>
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
              style={{ background: "linear-gradient(135deg,var(--color-accent),#E8364A)" }}
            >
              <b className="block text-[14px] font-bold mb-1">🏭 Bạn là nhà máy?</b>
              <p className="text-[11.5px] opacity-90 leading-snug mb-2.5">
                Đăng ký Nhà cung cấp đã xác minh để nhận RFQ trực tiếp từ 600+ đại lý Việt Nam.
              </p>
              <Link
                href="/register/factory"
                className="inline-block px-3 py-1.5 bg-white text-accent text-[12px] font-bold rounded-sm cursor-pointer hover:bg-bg"
              >
                Đăng ký Nhà cung cấp →
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}

export const metadata = { title: "Đăng ký Người mua — Cybersilkroads" };
