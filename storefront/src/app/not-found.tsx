import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg px-4">
      <div className="max-w-md text-center">
        <div className="text-7xl font-bold text-brand mb-4">404</div>
        <h1 className="text-2xl font-bold text-ink mb-2">
          Không tìm thấy trang
        </h1>
        <p className="text-mute mb-6">
          Trang bạn tìm không tồn tại hoặc đã được di chuyển.
        </p>
        <div className="flex gap-3 justify-center">
          <Link
            href="/"
            className="px-5 py-2 bg-brand text-paper rounded hover:bg-brand-dark transition"
          >
            Về trang chủ
          </Link>
          <Link
            href="/products"
            className="px-5 py-2 border border-line text-ink rounded hover:bg-surface-1 transition"
          >
            Khám phá sản phẩm
          </Link>
        </div>
      </div>
    </div>
  )
}
