import Link from "next/link";
import { HOT_SEARCHES } from "@/data/home";

export function Header() {
  return (
    <header className="bg-paper py-4 border-b-[3px] border-brand">
      <div className="max-w-[1400px] mx-auto px-4 grid grid-cols-[240px_1fr_auto] gap-6 items-center max-md:grid-cols-[auto_auto] max-md:gap-2.5">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 cursor-pointer">
          <div className="w-10 h-10 bg-brand text-white flex items-center justify-center rounded font-extrabold text-[20px] tracking-tight max-md:w-[34px] max-md:h-[34px] max-md:text-[16px]">
            AV
          </div>
          <div className="leading-tight">
            <b className="block font-extrabold text-[20px] text-brand tracking-tight max-md:text-[16px]">
              AlibabaVN
            </b>
            <small className="text-[10.5px] text-mute tracking-wider uppercase max-md:text-[9px]">
              Nền tảng sourcing hàng Trung Quốc
            </small>
          </div>
        </Link>

        {/* Search — pure CSS tab toggle via radio + peer */}
        <div className="relative max-md:col-span-full max-md:order-3">
          <div className="grid grid-cols-[auto_auto_auto_1fr] gap-0">
            {/* All radios are siblings of labels and forms — peer pattern requires it */}
            <input
              type="radio"
              name="search-tab"
              id="st-products"
              defaultChecked
              className="hidden peer/products"
            />
            <input
              type="radio"
              name="search-tab"
              id="st-suppliers"
              className="hidden peer/suppliers"
            />
            <input
              type="radio"
              name="search-tab"
              id="st-rfq"
              className="hidden peer/rfq"
            />

            {/* Tab labels — row 1 */}
            <label
              htmlFor="st-products"
              className="row-start-1 col-start-1 px-5 py-2 font-medium text-[13px] rounded-t mr-0.5 cursor-pointer transition bg-[#E0E5EC] text-mute hover:bg-[#D0D5DC] peer-checked/products:bg-brand peer-checked/products:text-white max-md:px-3 max-md:py-1.5 max-md:text-[12px] max-md:flex-1 max-md:text-center"
            >
              Sản phẩm
            </label>
            <label
              htmlFor="st-suppliers"
              className="row-start-1 col-start-2 px-5 py-2 font-medium text-[13px] rounded-t mr-0.5 cursor-pointer transition bg-[#E0E5EC] text-mute hover:bg-[#D0D5DC] peer-checked/suppliers:bg-brand peer-checked/suppliers:text-white max-md:px-3 max-md:py-1.5 max-md:text-[12px] max-md:flex-1 max-md:text-center"
            >
              Nhà cung cấp
            </label>
            <label
              htmlFor="st-rfq"
              className="row-start-1 col-start-3 px-5 py-2 font-medium text-[13px] rounded-t mr-0.5 cursor-pointer transition bg-[#E0E5EC] text-mute hover:bg-[#D0D5DC] peer-checked/rfq:bg-brand peer-checked/rfq:text-white max-md:px-3 max-md:py-1.5 max-md:text-[12px] max-md:flex-1 max-md:text-center"
            >
              Báo giá
            </label>

            {/* Forms — row 2, each spans full width, only active one is :flex */}
            <form
              action="/search"
              method="get"
              className="row-start-2 col-span-full hidden peer-checked/products:flex border-2 border-brand rounded-[0_4px_4px_4px] overflow-hidden bg-white"
            >
              <div className="px-3.5 bg-[#F5F7FA] flex items-center gap-1.5 text-[13px] text-mute border-r border-line max-md:hidden">
                Tất cả ▾
              </div>
              <input
                name="q"
                className="flex-1 px-3.5 py-3 outline-none font-sans text-[14px] max-md:px-2.5 max-md:py-2 max-md:text-[13px]"
                placeholder="Nhập từ khoá sản phẩm cần tìm..."
              />
              <button
                type="submit"
                className="px-8 bg-brand text-white font-bold text-[14px] tracking-wide hover:bg-brand-light cursor-pointer whitespace-nowrap max-md:px-3 max-md:text-[12.5px]"
              >
                🔍 TÌM
              </button>
            </form>
            <form
              action="/suppliers"
              method="get"
              className="row-start-2 col-span-full hidden peer-checked/suppliers:flex border-2 border-brand rounded-[0_4px_4px_4px] overflow-hidden bg-white"
            >
              <div className="px-3.5 bg-[#F5F7FA] flex items-center gap-1.5 text-[13px] text-mute border-r border-line max-md:hidden">
                Tất cả ▾
              </div>
              <input
                name="q"
                className="flex-1 px-3.5 py-3 outline-none font-sans text-[14px] max-md:px-2.5 max-md:py-2 max-md:text-[13px]"
                placeholder="Nhập tên nhà cung cấp hoặc khu vực..."
              />
              <button
                type="submit"
                className="px-8 bg-brand text-white font-bold text-[14px] tracking-wide hover:bg-brand-light cursor-pointer whitespace-nowrap max-md:px-3 max-md:text-[12.5px]"
              >
                🏭 TÌM NCC
              </button>
            </form>
            <form
              action="/buying-request"
              method="get"
              className="row-start-2 col-span-full hidden peer-checked/rfq:flex border-2 border-brand rounded-[0_4px_4px_4px] overflow-hidden bg-white"
            >
              <div className="px-3.5 bg-[#F5F7FA] flex items-center gap-1.5 text-[13px] text-mute border-r border-line max-md:hidden">
                Tất cả ▾
              </div>
              <input
                name="q"
                className="flex-1 px-3.5 py-3 outline-none font-sans text-[14px] max-md:px-2.5 max-md:py-2 max-md:text-[13px]"
                placeholder="Mô tả ngắn nhu cầu để gửi RFQ..."
              />
              <button
                type="submit"
                className="px-8 bg-accent text-white font-bold text-[14px] tracking-wide hover:bg-[#B81827] cursor-pointer whitespace-nowrap max-md:px-3 max-md:text-[12.5px]"
              >
                📨 GỬI RFQ
              </button>
            </form>
          </div>

          {/* Hot search */}
          <div className="text-[11.5px] text-mute flex gap-3 py-1.5 flex-wrap max-md:hidden">
            <b className="text-ink">Tìm kiếm phổ biến:</b>
            {HOT_SEARCHES.map((s) => (
              <Link key={s} href={`/search?q=${encodeURIComponent(s)}`} className="text-brand cursor-pointer">
                {s}
              </Link>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div className="flex gap-3 items-center max-md:gap-1.5 max-md:justify-self-end">
          <Link href="/buying-request" className="px-5 py-2.5 border-[1.5px] border-brand text-brand rounded font-semibold text-[13px] hover:bg-brand hover:text-white cursor-pointer max-md:hidden">
            📥 Gửi RFQ
          </Link>
          <Link href="/register/buyer" className="px-5 py-2.5 bg-brand text-white rounded font-semibold text-[13px] hover:bg-brand-light cursor-pointer max-md:px-3 max-md:py-2 max-md:text-[12px]">
            Đăng ký Buyer →
          </Link>
        </div>
      </div>
    </header>
  );
}
