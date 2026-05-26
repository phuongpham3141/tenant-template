import Link from "next/link";

const NAV_ITEMS = [
  { icon: "🏠", label: "Trang chủ", href: "/" },
  { icon: "🗂", label: "Danh mục", href: "#nav-categories" },
  { icon: "📨", label: "RFQ", href: "/buying-request", primary: true },
  { icon: "💬", label: "Tin nhắn", href: "/buyer-center" },
  { icon: "👤", label: "Tài khoản", href: "/login" },
];

export function MobileBottomNav() {
  return (
    <>
      {/* Spacer to prevent content from being hidden behind fixed nav */}
      <div className="hidden max-md:block h-[60px]" aria-hidden="true" />
      <nav className="hidden max-md:grid grid-cols-5 gap-0 fixed bottom-0 left-0 right-0 z-50 bg-paper border-t border-line shadow-[0_-2px_8px_rgba(0,0,0,0.08)]">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={`flex flex-col items-center justify-center gap-0.5 py-2 active:bg-[#F5F5F5] ${
              item.primary ? "text-accent" : "text-mute"
            }`}
          >
            <span
              className={`text-[20px] leading-none ${
                item.primary
                  ? "w-9 h-9 rounded-full bg-accent text-white flex items-center justify-center -mt-3 shadow-md"
                  : ""
              }`}
            >
              {item.icon}
            </span>
            <span className="text-[10px] font-medium leading-none">{item.label}</span>
          </Link>
        ))}
      </nav>
    </>
  );
}
