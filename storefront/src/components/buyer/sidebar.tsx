import Link from "next/link";

const NAV_GROUPS = [
  {
    title: "Dịch vụ",
    items: [
      { label: "Hướng dẫn người mua mới", href: "/buyer-center/new-user-guide", icon: "📖" },
      { label: "Báo cáo nhà máy đã thẩm định", href: "/buyer-center/audited-reports", icon: "🛡" },
      { label: "Gặp nhà cung cấp", href: "/buyer-center/meet-suppliers", icon: "🤝" },
      { label: "Dịch vụ giao dịch bảo đảm", href: "/buyer-center/secured-trading", icon: "🔒" },
      { label: "Trung tâm người mua", href: "/buyer-center", icon: "🏠" },
      { label: "Liên hệ chúng tôi", href: "/buyer-center/contact", icon: "📞" },
    ],
  },
  {
    title: "Tìm kiếm",
    items: [
      { label: "Danh bạ sản phẩm", href: "/buyer-center/product-directory", icon: "🗂" },
      { label: "Khám phá nhà cung cấp", href: "/buyer-center/supplier-discover", icon: "🏭" },
      { label: "Đăng yêu cầu báo giá", href: "/buyer-center/post-rfq", icon: "📨" },
    ],
  },
  {
    title: "Giao dịch của tôi",
    items: [
      { label: "Đơn hàng", href: "/buyer-center/orders", icon: "📦" },
      { label: "Yêu cầu báo giá", href: "/buyer-center/rfqs", icon: "📋" },
      { label: "Tin nhắn", href: "/buyer-center/messages", icon: "💬" },
    ],
  },
  {
    title: "Tài khoản",
    items: [
      { label: "Hồ sơ", href: "/buyer-center/profile", icon: "👤" },
      { label: "Yêu thích", href: "/buyer-center/favorites", icon: "❤" },
      { label: "Lịch sử duyệt", href: "/buyer-center/browsing-history", icon: "🕘" },
    ],
  },
];

export function BuyerSidebar({ active }: { active?: string }) {
  return (
    <aside className="bg-paper border border-line rounded p-3 self-start">
      <div className="px-3 py-2.5 border-b border-line mb-2">
        <b className="block text-[14px] text-ink">Trần Văn A</b>
        <span className="text-[11.5px] text-mute">Buyer · Hà Nội</span>
      </div>
      {NAV_GROUPS.map((group, gi) => (
        <div key={group.title} className={gi === 0 ? "" : "mt-3 pt-2 border-t border-line"}>
          <div className="px-3 py-1.5 text-[10.5px] font-bold uppercase tracking-wider text-mute">
            {group.title}
          </div>
          <ul className="space-y-0.5">
            {group.items.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-sm text-[13px] ${
                    active === n.href ? "bg-brand text-white font-semibold" : "text-ink hover:bg-surface-3"
                  }`}
                >
                  <span className="w-5 text-center">{n.icon}</span>
                  <span className="leading-tight">{n.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </aside>
  );
}
