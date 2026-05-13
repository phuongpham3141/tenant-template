import Link from "next/link";

const NAV_GROUPS = [
  {
    title: "Tổng quan",
    items: [
      { label: "Trung tâm người bán", href: "/seller-center", icon: "🏭" },
    ],
  },
  {
    title: "Dịch vụ supplier",
    items: [
      { label: "Đăng ký Gold Member", href: "/seller-center/gold-member", icon: "🥇" },
      { label: "Sàn dịch vụ XNK", href: "/seller-center/trade-services", icon: "🛒" },
      { label: "Foreign Trade e-Home", href: "/seller-center/trade-ehome", icon: "🏡" },
      { label: "Smart Expo đám mây", href: "/seller-center/smart-expo", icon: "🎪" },
      { label: "Dịch vụ giao dịch", href: "/seller-center/trading-service", icon: "🔒" },
    ],
  },
  {
    title: "Mở rộng thị trường",
    items: [
      { label: "Logistics quốc tế", href: "/seller-center/logistics", icon: "🚢" },
      { label: "Xuất khẩu Bắc Mỹ", href: "/seller-center/export-na", icon: "🌎" },
      { label: "Nội địa Trung Quốc", href: "/seller-center/domestic-cn", icon: "🇨🇳" },
    ],
  },
  {
    title: "Công cụ",
    items: [
      { label: "Trợ lý AI Maike", href: "/seller-center/ai-assistant", icon: "🤖" },
    ],
  },
];

export function SellerSidebar({ active }: { active?: string }) {
  return (
    <aside className="bg-paper border border-line rounded p-3 self-start">
      <div className="px-3 py-2.5 border-b border-line mb-2">
        <b className="block text-[14px] text-ink">Công ty TNHH KUKA Home</b>
        <span className="text-[11.5px] text-mute">
          <span className="inline-block bg-gold/30 text-brand-dark px-1.5 py-0.5 rounded-sm font-bold mr-1">Vàng</span>
          Supplier · Quảng Châu
        </span>
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
                    active === n.href ? "bg-brand text-white font-semibold" : "text-ink hover:bg-[#F5F7FA]"
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
