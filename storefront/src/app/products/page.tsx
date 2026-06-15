import Link from "next/link"
import { Breadcrumb } from "@/components/category/breadcrumb"
import { listProducts, listCategories, variantPrice } from "@/lib/store/catalog"
import { formatVnd } from "@/lib/store/format"

export const dynamic = "force-dynamic"
export const metadata = { title: "Tất cả sản phẩm — Cybersilkroads" }

const LIMIT = 24

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; cat?: string; q?: string }>
}) {
  const sp = await searchParams
  const page = Math.max(1, parseInt(sp.page ?? "1") || 1)
  const categoryId = sp.cat

  let products: any[] = []
  let count = 0
  let categories: Array<{ id: string; name: string; handle: string }> = []
  let loadError = false
  try {
    const [res, cats] = await Promise.all([
      listProducts({ limit: LIMIT, offset: (page - 1) * LIMIT, categoryId, q: sp.q }),
      listCategories(),
    ])
    products = res.products
    count = res.count
    categories = cats
  } catch {
    loadError = true
  }

  const totalPages = Math.max(1, Math.ceil(count / LIMIT))
  const qs = (over: Record<string, string | undefined>) => {
    const p = new URLSearchParams()
    const cat = over.cat !== undefined ? over.cat : categoryId
    const pg = over.page !== undefined ? over.page : String(page)
    if (cat) p.set("cat", cat)
    if (pg && pg !== "1") p.set("page", pg)
    if (sp.q) p.set("q", sp.q)
    const s = p.toString()
    return s ? `/products?${s}` : "/products"
  }

  return (
    <>
      <Breadcrumb trail={[{ label: "Trang chủ", href: "/" }, { label: "Tất cả sản phẩm" }]} />
      <div className="max-w-[1400px] mx-auto px-4 mt-4">
        <div className="bg-paper border border-line rounded p-5">
          <h1 className="text-[24px] font-extrabold text-ink leading-tight">Tất cả sản phẩm</h1>
          <p className="text-[13px] text-mute mt-1">
            {count} sản phẩm thật từ catalog Cybersilkroads · Giá VND · Giao dịch & thanh toán trực tuyến
          </p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 mt-4 grid grid-cols-[240px_1fr] gap-5 max-md:grid-cols-1">
        {/* Sidebar — danh mục thật */}
        <aside className="bg-paper border border-line rounded p-4 self-start">
          <b className="block text-[13px] font-semibold text-ink mb-2">Danh mục</b>
          <ul className="space-y-1.5">
            <li>
              <Link
                href={qs({ cat: "", page: "1" })}
                className={`block text-[12.5px] ${!categoryId ? "text-brand font-semibold" : "text-mute hover:text-brand"}`}
              >
                Tất cả ({count})
              </Link>
            </li>
            {categories.map((c) => (
              <li key={c.id}>
                <Link
                  href={qs({ cat: c.id, page: "1" })}
                  className={`block text-[12.5px] ${categoryId === c.id ? "text-brand font-semibold" : "text-mute hover:text-brand"}`}
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </aside>

        {/* Grid */}
        <div>
          {loadError ? (
            <div className="bg-paper border border-line rounded p-8 text-center text-mute text-[13px]">
              Không tải được sản phẩm từ máy chủ. Vui lòng thử lại.
            </div>
          ) : (
            <>
              <div className="text-[12px] text-mute mb-2">
                Hiển thị {products.length} / {count} sản phẩm
                {categoryId ? " (đã lọc theo danh mục)" : ""}
              </div>
              <div className="grid grid-cols-4 gap-3 max-md:grid-cols-2">
                {products.map((p) => {
                  const price = variantPrice(p)
                  const md = p.metadata ?? {}
                  return (
                    <Link
                      key={p.id}
                      href={`/product/${p.handle}`}
                      className="bg-paper border border-line rounded-sm overflow-hidden hover:border-brand block"
                    >
                      <div className="aspect-square bg-surface-1">
                        {p.thumbnail ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={p.thumbnail} alt={p.title} className="w-full h-full object-cover" />
                        ) : null}
                      </div>
                      <div className="p-2.5">
                        <h4 className="text-[12.5px] text-ink line-clamp-2 mb-1 min-h-[32px]">{p.title}</h4>
                        <div className="text-accent font-bold text-[14px] mb-1">
                          {formatVnd(price)}
                          {md.unit ? <small className="text-mute font-normal text-[11px]">/{md.unit}</small> : null}
                        </div>
                        <div className="text-[11px] text-mute flex justify-between">
                          <span>{md.moq ? `MOQ ${md.moq}` : ""}</span>
                          <span>{md.rating ? `★${md.rating}` : ""}</span>
                        </div>
                        {md.supplier ? (
                          <div className="text-[11px] text-mute mt-1.5 pt-1.5 border-t border-dashed border-line truncate">
                            {md.supplier}
                          </div>
                        ) : null}
                      </div>
                    </Link>
                  )
                })}
              </div>

              {products.length === 0 && (
                <div className="bg-paper border border-line rounded p-8 text-center text-mute text-[13px]">
                  Chưa có sản phẩm trong danh mục này.
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-1 mt-6 mb-7">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <Link
                      key={p}
                      href={qs({ page: String(p) })}
                      className={`min-w-[34px] px-2.5 py-1.5 text-[12.5px] rounded-sm text-center ${
                        p === page ? "bg-brand text-white font-semibold" : "border border-line text-mute hover:border-brand"
                      }`}
                    >
                      {p}
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  )
}
