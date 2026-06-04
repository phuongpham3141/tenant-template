import Link from "next/link";

const NAV_GROUPS = [
  {
    title: "服务",
    items: [
      { label: "新用户指南", href: "/buyer-center/new-user-guide", icon: "📖" },
      { label: "已认证工厂报告", href: "/buyer-center/audited-reports", icon: "🛡" },
      { label: "对接供应商", href: "/buyer-center/meet-suppliers", icon: "🤝" },
      { label: "交易保障服务", href: "/buyer-center/secured-trading", icon: "🔒" },
      { label: "采购商中心", href: "/buyer-center", icon: "🏠" },
      { label: "联系我们", href: "/buyer-center/contact", icon: "📞" },
    ],
  },
  {
    title: "查找",
    items: [
      { label: "产品目录", href: "/buyer-center/product-directory", icon: "🗂" },
      { label: "发现供应商", href: "/buyer-center/supplier-discover", icon: "🏭" },
      { label: "发布询价", href: "/buyer-center/post-rfq", icon: "📨" },
    ],
  },
  {
    title: "快速访问",
    items: [
      { label: "收藏", href: "/buyer-center/favorites", icon: "❤" },
      { label: "浏览历史", href: "/buyer-center/browsing-history", icon: "🕘" },
    ],
  },
];

export function BuyerSidebar({ active }: { active?: string }) {
  return (
    <aside className="bg-paper border border-line rounded p-3 self-start">
      <div className="px-3 py-2.5 border-b border-line mb-2">
        <b className="block text-[14px] text-ink">陈文 A</b>
        <span className="text-[11.5px] text-mute">采购商 · 河内</span>
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
