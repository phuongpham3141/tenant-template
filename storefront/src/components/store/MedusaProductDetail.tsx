import Link from "next/link"
import { Breadcrumb } from "@/components/category/breadcrumb"
import { AddToCartButton } from "@/components/store/AddToCartButton"
import { formatVnd } from "@/lib/store/format"
import { variantPrice, firstVariantId, type StoreProduct } from "@/lib/store/catalog"

export function MedusaProductDetail({ product }: { product: StoreProduct }) {
  const price = variantPrice(product)
  const variantId = firstVariantId(product)
  const md = product.metadata ?? {}
  const images: string[] = (product.images ?? []).map((i: any) => i.url).filter(Boolean)
  const hero = product.thumbnail || images[0]
  const cat = product.categories?.[0]

  return (
    <>
      <Breadcrumb
        trail={[
          { label: "Trang chủ", href: "/" },
          { label: "Sản phẩm", href: "/products" },
          { label: product.title },
        ]}
      />
      <div className="max-w-[1200px] mx-auto px-4 mt-4 grid grid-cols-[1fr_440px] gap-8 max-lg:grid-cols-1">
        {/* Gallery */}
        <div>
          <div className="aspect-square bg-surface-1 rounded-lg overflow-hidden border border-line">
            {hero ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={hero} alt={product.title} className="w-full h-full object-cover" />
            ) : null}
          </div>
          {images.length > 1 && (
            <div className="flex gap-2 mt-3">
              {images.slice(0, 6).map((src) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={src} src={src} alt="" className="w-16 h-16 object-cover rounded border border-line" />
              ))}
            </div>
          )}
        </div>

        {/* Info + CTA */}
        <div className="self-start">
          <span className="inline-block bg-success/10 text-success text-[11.5px] font-semibold px-2 py-0.5 rounded mb-2">
            ● Sản phẩm thật · Medusa
          </span>
          <h1 className="text-[22px] font-bold text-ink leading-snug mb-3">{product.title}</h1>

          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-accent text-[30px] font-extrabold">{formatVnd(price)}</span>
            {md.unit ? <span className="text-mute text-[14px]">/{md.unit}</span> : null}
          </div>

          <dl className="text-[13px] text-mute space-y-1.5 mb-5 border-y border-line py-4">
            {md.supplier && (
              <div className="flex justify-between gap-4">
                <dt>Nhà cung cấp</dt>
                <dd className="text-ink font-medium text-right">{md.supplier}</dd>
              </div>
            )}
            {md.moq && (
              <div className="flex justify-between gap-4">
                <dt>Số lượng tối thiểu (MOQ)</dt>
                <dd className="text-ink font-medium text-right">{md.moq} {md.unit}</dd>
              </div>
            )}
            {md.rating && (
              <div className="flex justify-between gap-4">
                <dt>Đánh giá</dt>
                <dd className="text-ink font-medium text-right">★ {md.rating}</dd>
              </div>
            )}
            {cat && (
              <div className="flex justify-between gap-4">
                <dt>Danh mục</dt>
                <dd className="text-ink font-medium text-right">{cat.name}</dd>
              </div>
            )}
          </dl>

          {price != null && variantId ? (
            <AddToCartButton variantId={variantId} />
          ) : (
            <div className="text-[13px] text-mute">Sản phẩm tạm chưa có giá. Vui lòng liên hệ báo giá.</div>
          )}

          <div className="mt-4 flex gap-3">
            <Link href="/cart" className="text-[13px] text-brand hover:underline">
              Xem giỏ hàng →
            </Link>
            <Link href="/products" className="text-[13px] text-mute hover:text-brand">
              Tiếp tục mua sắm
            </Link>
          </div>
        </div>
      </div>

      {/* Description */}
      {product.description && (
        <div className="max-w-[1200px] mx-auto px-4 mt-8 mb-10">
          <h2 className="text-[16px] font-bold text-ink mb-3">Mô tả sản phẩm</h2>
          <p className="text-[14px] text-mute leading-relaxed whitespace-pre-line">{product.description}</p>
        </div>
      )}
    </>
  )
}
