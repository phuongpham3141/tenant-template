import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";

export default function LoginPage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "Trang chủ", href: "/" }, { label: "Đăng nhập" }]} />
      <div className="max-w-[480px] mx-auto px-4 mt-6 mb-10">
        <div className="bg-paper border border-line rounded p-6">
          <div className="flex gap-0 border-b border-line mb-5 -mx-6 -mt-6">
            <a className="flex-1 px-4 py-3 text-center text-[14px] font-semibold border-b-2 border-brand text-brand">Đăng nhập</a>
            <Link href="/register/buyer" className="flex-1 px-4 py-3 text-center text-[14px] font-semibold border-b-2 border-transparent text-mute hover:text-brand">Đăng ký</Link>
          </div>

          <form action="/buyer-center" method="get" className="space-y-3">
            <div>
              <label className="block text-[12.5px] font-semibold text-ink mb-1.5">Email hoặc số điện thoại</label>
              <input name="login" placeholder="email@example.com hoặc 09xx xxx xxx" className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand" />
            </div>
            <div>
              <label className="block text-[12.5px] font-semibold text-ink mb-1.5">Mật khẩu</label>
              <input name="password" type="password" placeholder="••••••••" className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand" />
            </div>
            <div className="flex justify-between items-center text-[12px]">
              <label className="flex items-center gap-1.5 text-mute cursor-pointer">
                <input type="checkbox" className="accent-brand" /> Ghi nhớ đăng nhập
              </label>
              <Link href="/info/quen-mat-khau" className="text-brand hover:underline">Quên mật khẩu?</Link>
            </div>
            <button type="submit" className="w-full py-3 bg-brand text-white rounded-sm font-bold text-[14px] hover:bg-brand-light">Đăng nhập</button>
          </form>

          <div className="mt-5 pt-5 border-t border-line">
            <p className="text-[12px] text-mute text-center mb-3">Hoặc đăng nhập với</p>
            <div className="grid grid-cols-3 gap-2">
              <button className="py-2.5 border border-line rounded-sm text-[12.5px] font-semibold hover:border-brand">📘 Facebook</button>
              <button className="py-2.5 border border-line rounded-sm text-[12.5px] font-semibold hover:border-brand">🔍 Google</button>
              <button className="py-2.5 border border-line rounded-sm text-[12.5px] font-semibold hover:border-brand">💬 Zalo</button>
            </div>
          </div>

          <div className="mt-5 pt-5 border-t border-line text-center text-[12.5px] text-mute">
            Chưa có tài khoản? <Link href="/register/buyer" className="text-brand font-semibold">Đăng ký Buyer →</Link>
          </div>
          <div className="mt-2 text-center text-[12.5px] text-mute">
            Bạn là nhà máy? <Link href="/sell-on-avn" className="text-brand font-semibold">Đăng ký NCC →</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export const metadata = { title: "Đăng nhập — AlibabaVN" };
