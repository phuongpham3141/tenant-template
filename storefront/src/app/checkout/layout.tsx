import Link from "next/link"

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-bg">
      <header className="border-b border-line bg-paper">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="font-bold text-xl text-brand">
            Cybersilkroads
          </Link>
          <Link href="/cart" className="text-mute hover:text-ink transition">
            ← Quay lại giỏ hàng
          </Link>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-4 py-8">{children}</main>
    </div>
  )
}
