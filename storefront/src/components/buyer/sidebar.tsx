import Link from "next/link";

const NAV_GROUPS = [
  {
    title: "Services",
    items: [
      { label: "New Buyer Guide", href: "/buyer-center/new-user-guide", icon: "📖" },
      { label: "Audited Factory Reports", href: "/buyer-center/audited-reports", icon: "🛡" },
      { label: "Meet Suppliers", href: "/buyer-center/meet-suppliers", icon: "🤝" },
      { label: "Trade Assurance Service", href: "/buyer-center/secured-trading", icon: "🔒" },
      { label: "Buyer Center", href: "/buyer-center", icon: "🏠" },
      { label: "Contact Us", href: "/buyer-center/contact", icon: "📞" },
    ],
  },
  {
    title: "Discover",
    items: [
      { label: "Product Directory", href: "/buyer-center/product-directory", icon: "🗂" },
      { label: "Discover Suppliers", href: "/buyer-center/supplier-discover", icon: "🏭" },
      { label: "Post an RFQ", href: "/buyer-center/post-rfq", icon: "📨" },
    ],
  },
  {
    title: "Quick Access",
    items: [
      { label: "Favorites", href: "/buyer-center/favorites", icon: "❤" },
      { label: "Browsing History", href: "/buyer-center/browsing-history", icon: "🕘" },
    ],
  },
];

export function BuyerSidebar({ active }: { active?: string }) {
  return (
    <aside className="bg-paper border border-line rounded p-3 self-start">
      <div className="px-3 py-2.5 border-b border-line mb-2">
        <b className="block text-[14px] text-ink">Tran Van A</b>
        <span className="text-[11.5px] text-mute">Buyer · Hanoi</span>
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
