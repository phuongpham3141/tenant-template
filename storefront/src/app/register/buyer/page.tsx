import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { NAV_CATEGORIES } from "@/data/home";

export default function RegisterBuyerPage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "Trang chủ", href: "/" }, { label: "Đăng ký Buyer" }]} />
      <div className="max-w-[1100px] mx-auto px-4 mt-6 mb-10 grid grid-cols-[1fr_320px] gap-6 max-md:grid-cols-1">
        <div className="bg-paper border border-line rounded p-6">
          <h1 className="text-[24px] font-extrabold text-ink mb-1">Đăng ký Buyer miễn phí</h1>
          <p className="text-[13px] text-mute mb-5">Chỉ 2 phút — bắt đầu nhập khẩu trực tiếp từ 40+ nhà máy.</p>
          <form action="/buyer-center" method="get" className="space-y-4">
            <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
              <div>
                <label className="block text-[12.5px] font-semibold text-ink mb-1.5">Họ tên <span className="text-accent">*</span></label>
                <input name="name" required className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand" />
              </div>
              <div>
                <label className="block text-[12.5px] font-semibold text-ink mb-1.5">Công ty</label>
                <input name="company" className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand" />
              </div>
              <div>
                <label className="block text-[12.5px] font-semibold text-ink mb-1.5">Email <span className="text-accent">*</span></label>
                <input name="email" type="email" required className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand" />
              </div>
              <div>
                <label className="block text-[12.5px] font-semibold text-ink mb-1.5">Điện thoại / Zalo <span className="text-accent">*</span></label>
                <input name="phone" required className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand" />
              </div>
              <div>
                <label className="block text-[12.5px] font-semibold text-ink mb-1.5">Mật khẩu <span className="text-accent">*</span></label>
                <input name="password" type="password" required className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand" />
              </div>
              <div>
                <label className="block text-[12.5px] font-semibold text-ink mb-1.5">Tỉnh / Thành</label>
                <select name="city" className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] bg-white">
                  <option>Hà Nội</option>
                  <option>TP Hồ Chí Minh</option>
                  <option>Đà Nẵng</option>
                  <option>Hải Phòng</option>
                  <option>Cần Thơ</option>
                  <option>Khác</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-[12.5px] font-semibold text-ink mb-1.5">Ngành quan tâm</label>
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
              <span>Tôi đồng ý với <Link href="/info/dieu-khoan" className="text-brand">Điều khoản</Link> và <Link href="/info/chinh-sach-bao-mat" className="text-brand">Chính sách bảo mật</Link> của AlibabaVN.</span>
            </label>
            <button type="submit" className="w-full py-3 bg-brand text-white rounded-sm font-bold text-[14px] hover:bg-brand-light mt-3">Đăng ký Buyer →</button>
            <p className="text-[12px] text-mute text-center mt-3">
              Đã có tài khoản? <Link href="/login" className="text-brand font-semibold">Đăng nhập</Link>
            </p>
          </form>
        </div>

        <aside className="bg-paper border border-line rounded p-5 self-start">
          <b className="block text-[14px] font-bold text-ink mb-3">🎁 Quyền lợi Buyer</b>
          <ul className="text-[12.5px] text-ink space-y-2.5">
            <li className="flex gap-2"><span className="text-success">✓</span> Audit nhà máy MIỄN PHÍ trước khi đặt</li>
            <li className="flex gap-2"><span className="text-success">✓</span> Báo giá &lt;24h từ 5-10 nhà máy</li>
            <li className="flex gap-2"><span className="text-success">✓</span> Trade Assurance — hoàn 100% nếu sai</li>
            <li className="flex gap-2"><span className="text-success">✓</span> Trade Alert miễn phí — xu hướng giá</li>
            <li className="flex gap-2"><span className="text-success">✓</span> Hỗ trợ tiếng Việt 24/7</li>
          </ul>
          <div className="mt-5 pt-4 border-t border-line text-[11.5px] text-mute">
            <b className="block text-ink mb-1">600+ dealer Việt Nam</b>
            đã đăng ký và nhập khẩu thành công qua AlibabaVN từ 2018.
          </div>
        </aside>
      </div>
    </>
  );
}

export const metadata = { title: "Đăng ký Buyer — AlibabaVN" };
