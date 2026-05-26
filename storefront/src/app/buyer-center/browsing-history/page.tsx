import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { BuyerSidebar } from "@/components/buyer/sidebar";
import { SECTIONS } from "@/data/home";

const ALL_PRODUCTS = SECTIONS.flatMap((s) => s.products);

const FILTERS = [
  { v: "today", l: "Hôm nay" },
  { v: "7d", l: "7 ngày qua" },
  { v: "30d", l: "30 ngày qua" },
  { v: "all", l: "Tất cả" },
];

const GROUPS = [
  {
    title: "Hôm nay",
    sub: "06/05/2026 · 4 sản phẩm đã xem",
    items: [
      { p: ALL_PRODUCTS[0], time: "10:42" },
      { p: ALL_PRODUCTS[4], time: "10:38" },
      { p: ALL_PRODUCTS[2], time: "09:15" },
      { p: ALL_PRODUCTS[6], time: "08:50" },
    ],
  },
  {
    title: "Hôm qua",
    sub: "05/05/2026 · 4 sản phẩm đã xem",
    items: [
      { p: ALL_PRODUCTS[8], time: "16:28" },
      { p: ALL_PRODUCTS[12], time: "14:55" },
      { p: ALL_PRODUCTS[16], time: "11:12" },
      { p: ALL_PRODUCTS[20], time: "09:30" },
    ],
  },
  {
    title: "Tuần trước",
    sub: "27/04 – 04/05/2026 · 4 sản phẩm đã xem",
    items: [
      { p: ALL_PRODUCTS[1], time: "Th. 5, 16:20" },
      { p: ALL_PRODUCTS[5], time: "Th. 4, 11:45" },
      { p: ALL_PRODUCTS[9], time: "Th. 3, 14:10" },
      { p: ALL_PRODUCTS[13], time: "Th. 2, 10:08" },
    ],
  },
];

export default function BrowsingHistoryPage() {
  const total = GROUPS.reduce((acc, g) => acc + g.items.length, 0);

  return (
    <>
      <Breadcrumb trail={[{ label: "Trang chủ", href: "/" }, { label: "Khu vực người mua", href: "/buyer-center" }, { label: "Lịch sử duyệt" }]} />
      <div className="max-w-[1400px] mx-auto px-4 mt-4 mb-7 grid grid-cols-[240px_1fr] gap-5 max-md:grid-cols-1">
        <BuyerSidebar active="/buyer-center/browsing-history" />
        <div>
          <div className="bg-paper border border-line rounded p-5 mb-4 flex justify-between items-start max-md:flex-col max-md:gap-3">
            <div>
              <div className="inline-block bg-mute2/30 text-mute px-2.5 py-1 text-[11px] font-bold rounded-sm tracking-wider mb-2">🕘 LỊCH SỬ DUYỆT</div>
              <h1 className="text-[22px] font-bold text-ink">Lịch sử duyệt</h1>
              <p className="text-[12.5px] text-mute mt-1">{total} sản phẩm trong 30 ngày qua · Đồng bộ giữa thiết bị</p>
            </div>
            <label className="flex items-center gap-2 text-[12px] text-mute bg-[#F5F7FA] px-3 py-2 rounded-sm cursor-pointer">
              <input type="checkbox" defaultChecked className="accent-brand" />
              <span>Bật theo dõi lịch sử</span>
            </label>
          </div>

          <div className="bg-paper border border-line rounded p-3 mb-4 flex justify-between items-center max-md:flex-col max-md:gap-2">
            <div className="flex gap-1">
              {FILTERS.map((f, i) => (
                <button key={f.v} className={`px-3 py-1.5 text-[12px] rounded-sm ${i === 0 ? "bg-brand text-white font-semibold" : "text-mute hover:text-brand border border-line"}`}>{f.l}</button>
              ))}
            </div>
            <input placeholder="🔍 Tìm trong lịch sử..." className="px-3 py-1.5 border border-line rounded-sm text-[12px] outline-none focus:border-brand max-md:w-full" />
          </div>

          {GROUPS.map((g) => (
            <div key={g.title} className="bg-paper border border-line rounded p-4 mb-4">
              <div className="flex justify-between items-center mb-3 pb-2 border-b border-line">
                <div>
                  <b className="block text-[14px] text-ink">{g.title}</b>
                  <span className="text-[11px] text-mute">{g.sub}</span>
                </div>
                <button className="text-mute text-[11.5px] hover:text-accent">Xoá nhóm</button>
              </div>
              <div className="grid grid-cols-4 gap-3 max-md:grid-cols-2">
                {g.items.map((item, idx) => (
                  <div key={`${g.title}-${idx}`} className="border border-line rounded-sm overflow-hidden hover:border-brand group">
                    <Link href={`/product/${item.p.id}`} className="block">
                      <div className="aspect-square bg-[#F5F5F5]">
                        {item.p.image ? <img src={item.p.image} alt={item.p.title} className="w-full h-full object-cover" /> : null}
                      </div>
                    </Link>
                    <div className="p-2.5">
                      <Link href={`/product/${item.p.id}`}>
                        <h4 className="text-[12px] text-ink line-clamp-2 mb-1 min-h-[30px] hover:text-brand">{item.p.title}</h4>
                      </Link>
                      <div className="text-accent font-bold text-[13px]">{item.p.price}<small className="text-mute font-normal text-[10px]">{item.p.unit}</small></div>
                      <div className="text-[10.5px] text-mute mt-0.5 line-clamp-1">{item.p.seller}</div>
                      <div className="flex justify-between items-center mt-2 pt-2 border-t border-line">
                        <span className="text-[10px] text-mute">🕘 {item.time}</span>
                        <div className="flex gap-1.5">
                          <Link href={`/product/${item.p.id}`} className="text-[10.5px] text-brand hover:underline">Xem lại</Link>
                          <span className="text-mute">·</span>
                          <button className="text-[10.5px] text-mute hover:text-accent">Xoá</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="bg-paper border border-line rounded p-4 flex justify-between items-center max-md:flex-col max-md:gap-3">
            <span className="text-[12px] text-mute">Lịch sử được lưu tối đa 90 ngày, sau đó tự xoá. Tắt theo dõi để dừng lưu mới.</span>
            <button className="px-4 py-2 border border-accent text-accent rounded-sm font-semibold text-[12px] hover:bg-accent hover:text-white">🗑 Xoá toàn bộ lịch sử</button>
          </div>
        </div>
      </div>
    </>
  );
}

export const metadata = { title: "Lịch sử duyệt — Buyer Center" };
