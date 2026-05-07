import Link from "next/link";

export function TopStrip() {
  return (
    <div className="bg-brand-dark text-white text-[12px]">
      <div className="max-w-[1400px] mx-auto px-4 py-1.5 flex justify-between items-center flex-wrap gap-2">
        <div className="flex gap-3.5 items-center">
          <Link href="/login" className="text-white/85 hover:text-white flex items-center gap-1 cursor-pointer">
            💡 Hi, Đăng nhập / Đăng ký
          </Link>
          <Link href="/buyer-center" className="text-white/85 hover:text-white cursor-pointer hidden sm:inline">
            Trung tâm người mua
          </Link>
          <Link href="/seller-center" className="text-white/85 hover:text-white cursor-pointer hidden sm:inline">
            Trung tâm nhà cung cấp
          </Link>
          <Link href="/app" className="text-white/85 hover:text-white cursor-pointer hidden md:inline">
            📱 Tải app Android / iOS
          </Link>
        </div>
        <div className="flex gap-4 items-center">
          <Link href="/buyer-center" className="text-white/85 hover:text-white cursor-pointer">AlibabaVN của tôi</Link>
          <Link href="/buyer-center/orders" className="text-white/85 hover:text-white cursor-pointer hidden sm:inline">Đơn hàng</Link>
          <Link href="/buyer-center/favorites" className="text-white/85 hover:text-white cursor-pointer hidden sm:inline">Yêu thích</Link>
          <Link href="/info/locale" className="text-white/85 hover:text-white cursor-pointer flex items-center gap-1">
            🌐 VI · VND ▾
          </Link>
        </div>
      </div>
    </div>
  );
}
