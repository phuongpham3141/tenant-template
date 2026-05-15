import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { BuyerSidebar } from "@/components/buyer/sidebar";
import { EmptyState } from "@/components/ui/EmptyState";

const MOCK_THREADS = [
  { id: "T-921", supplier: "Dongpeng Ceramics", lastMessage: "Báo giá đã gửi qua email, anh check giúp", time: "12 phút", unread: 2, avatar: "🏭" },
  { id: "T-920", supplier: "KUKA Home", lastMessage: "Mẫu vải đã được giao đến HCM", time: "2 giờ", unread: 0, avatar: "🛋" },
  { id: "T-918", supplier: "Ortonbaths Group", lastMessage: "OK em sẽ check warranty lại với hãng", time: "Hôm qua", unread: 1, avatar: "🚽" },
  { id: "T-915", supplier: "OPPEIN Home", lastMessage: "Đơn AVN-7808 đã chốt", time: "2 ngày", unread: 0, avatar: "🍳" },
  { id: "T-908", supplier: "Monalisa Group", lastMessage: "Khiếu nại đã forward cho QC", time: "1 tuần", unread: 0, avatar: "🪨" },
];

export default function BuyerMessagesPage() {
  const isEmpty = MOCK_THREADS.length === 0;
  const activeThread = MOCK_THREADS[0];

  return (
    <>
      <Breadcrumb trail={[{ label: "Trang chủ", href: "/" }, { label: "Khu vực người mua", href: "/buyer-center" }, { label: "Tin nhắn" }]} />
      <div className="max-w-[1400px] mx-auto px-4 mt-4 mb-7 grid grid-cols-[240px_1fr] gap-5 max-md:grid-cols-1">
        <BuyerSidebar active="/buyer-center/messages" />
        <div>
          <div className="bg-paper border border-line rounded p-4 mb-4">
            <h1 className="text-[20px] font-bold text-ink">Tin nhắn</h1>
            <p className="text-[12px] text-mute mt-0.5">
              Hộp thoại với {MOCK_THREADS.length} nhà cung cấp ·{" "}
              <span className="text-accent font-semibold">
                {MOCK_THREADS.reduce((s, t) => s + t.unread, 0)} chưa đọc
              </span>
            </p>
          </div>

          {isEmpty ? (
            <div className="bg-paper border border-line rounded">
              <EmptyState
                title="Chưa có tin nhắn nào"
                message="Bắt đầu hội thoại với nhà cung cấp từ trang sản phẩm hoặc khi nhận báo giá."
                ctaText="Khám phá nhà cung cấp"
                ctaHref="/suppliers"
              />
            </div>
          ) : (
            <div className="bg-paper border border-line rounded overflow-hidden grid grid-cols-[320px_1fr] max-md:grid-cols-1 min-h-[480px]">
              <div className="border-r border-line max-md:border-r-0 max-md:border-b">
                <div className="p-3 border-b border-line bg-surface-2">
                  <input
                    type="search"
                    placeholder="Tìm hội thoại..."
                    className="w-full px-3 py-1.5 text-[12.5px] border border-line rounded-sm outline-none focus:border-brand"
                  />
                </div>
                <ul className="divide-y divide-line max-h-[440px] overflow-y-auto">
                  {MOCK_THREADS.map((t, idx) => (
                    <li key={t.id}>
                      <button
                        type="button"
                        className={`w-full text-left p-3 hover:bg-surface-2 transition flex gap-3 ${idx === 0 ? "bg-surface-3" : ""}`}
                      >
                        <div className="w-10 h-10 rounded-full bg-surface-1 flex items-center justify-center text-[20px] flex-shrink-0">
                          {t.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-baseline mb-0.5">
                            <span className="font-semibold text-ink text-[13px] truncate">{t.supplier}</span>
                            <span className="text-[10.5px] text-mute2 flex-shrink-0 ml-2">{t.time}</span>
                          </div>
                          <p className="text-[12px] text-mute truncate">{t.lastMessage}</p>
                        </div>
                        {t.unread > 0 && (
                          <span className="bg-accent text-paper text-[10px] rounded-full min-w-[18px] h-[18px] px-1 flex items-center justify-center font-semibold flex-shrink-0 self-center">
                            {t.unread}
                          </span>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col max-md:hidden">
                <div className="p-3 border-b border-line flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-surface-1 flex items-center justify-center text-[18px]">
                    {activeThread.avatar}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-ink text-[14px]">{activeThread.supplier}</p>
                    <p className="text-[11px] text-mute">Online · phản hồi trong 1 giờ</p>
                  </div>
                  <Link href={`/buyer-center/rfqs/RFQ-8421`} className="text-brand text-[12px] hover:underline">
                    Xem RFQ liên quan →
                  </Link>
                </div>

                <div className="flex-1 p-4 space-y-3 bg-surface-1 overflow-y-auto max-h-[360px]">
                  <div className="flex gap-2">
                    <div className="w-7 h-7 rounded-full bg-paper border border-line flex items-center justify-center text-[14px] flex-shrink-0">
                      {activeThread.avatar}
                    </div>
                    <div className="bg-paper rounded-lg p-2.5 max-w-[70%]">
                      <p className="text-[12.5px] text-ink">Chào anh, em đã chuẩn bị xong báo giá cho RFQ-8421.</p>
                      <span className="text-[10px] text-mute2">10:14</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-7 h-7 rounded-full bg-paper border border-line flex items-center justify-center text-[14px] flex-shrink-0">
                      {activeThread.avatar}
                    </div>
                    <div className="bg-paper rounded-lg p-2.5 max-w-[70%]">
                      <p className="text-[12.5px] text-ink">{activeThread.lastMessage}</p>
                      <span className="text-[10px] text-mute2">10:21</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 border-t border-line">
                  <form className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Nhập tin nhắn..."
                      className="flex-1 px-3 py-2 border border-line rounded-sm text-[12.5px] outline-none focus:border-brand"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-brand text-paper rounded-sm text-[12.5px] font-semibold hover:bg-brand-dark transition"
                    >
                      Gửi
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export const metadata = { title: "Tin nhắn — Trung tâm Buyer" };
