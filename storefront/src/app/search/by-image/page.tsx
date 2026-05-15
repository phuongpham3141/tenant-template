import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";

export const metadata = {
  title: "Tìm bằng hình ảnh — Cybersilkroads",
  description:
    "Tải ảnh sản phẩm lên để tìm sản phẩm tương tự từ hơn 40 nhà máy đã được kiểm định tại Trung Quốc. AI nhận diện ảnh, gợi ý sản phẩm phù hợp trong 5 giây.",
};

export default async function ByImageSearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[] }>;
}) {
  const sp = await searchParams;
  const q = typeof sp.q === "string" ? sp.q : "";

  return (
    <>
      <Breadcrumb
        trail={[
          { label: "Trang chủ", href: "/" },
          { label: "Tìm bằng hình ảnh" },
        ]}
      />

      <div className="max-w-[1100px] mx-auto px-4 mt-6 mb-10 max-md:px-3 max-md:mt-3 max-md:mb-6">
        <div className="bg-paper border border-line rounded-md p-8 max-md:p-5">
          {/* Hero header */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 mx-auto rounded-full bg-brand/10 flex items-center justify-center text-[32px] mb-3">
              📷
            </div>
            <h1 className="text-[26px] font-bold text-ink mb-2 max-md:text-[20px]">
              Tìm sản phẩm bằng hình ảnh
            </h1>
            <p className="text-[13.5px] text-mute max-w-[640px] mx-auto leading-relaxed max-md:text-[12.5px]">
              AI nhận diện ảnh trong 5 giây, gợi ý hơn 40 nhà máy có sản phẩm
              tương tự. Phù hợp khi bạn có ảnh sản phẩm mẫu nhưng không biết
              tên/keyword chính xác.
            </p>
            {q && (
              <p className="text-[12px] text-mute2 mt-2">
                Đã nhận từ khoá: <b className="text-ink">{q}</b> · Bạn có thể
                tải ảnh lên kèm theo
              </p>
            )}
          </div>

          {/* Upload area */}
          <form
            action="/search"
            method="get"
            className="border-2 border-dashed border-brand/40 hover:border-brand bg-[#F5F7FA] rounded-lg p-10 text-center transition cursor-pointer block max-md:p-6"
          >
            <label htmlFor="img-upload" className="cursor-pointer block">
              <div className="text-[64px] mb-3">🖼️</div>
              <h3 className="text-[16px] font-bold text-ink mb-1.5">
                Kéo & thả ảnh vào đây
              </h3>
              <p className="text-[12.5px] text-mute mb-4">
                hoặc click để chọn file từ máy ·{" "}
                <span className="text-brand font-medium">JPG / PNG / WEBP</span>{" "}
                · Tối đa 10MB
              </p>
              <input
                id="img-upload"
                type="file"
                name="image"
                accept="image/*"
                className="hidden"
              />
              <span className="inline-block px-6 py-2.5 bg-brand text-white font-bold text-[13px] rounded-sm hover:bg-brand-light cursor-pointer">
                📷 Chọn ảnh từ máy
              </span>
            </label>
          </form>

          {/* OR sample images */}
          <div className="mt-6">
            <p className="text-[12.5px] text-center text-mute mb-3">
              Hoặc thử với ảnh mẫu:
            </p>
            <div className="grid grid-cols-6 gap-2 max-w-[600px] mx-auto max-md:grid-cols-3">
              {[
                { seed: "sample-chair", label: "Ghế" },
                { seed: "sample-tile", label: "Gạch" },
                { seed: "sample-lamp", label: "Đèn" },
                { seed: "sample-faucet", label: "Vòi" },
                { seed: "sample-sofa", label: "Sofa" },
                { seed: "sample-cabinet", label: "Tủ bếp" },
              ].map((s) => (
                <Link
                  key={s.seed}
                  href={`/search?q=${encodeURIComponent(s.label)}`}
                  className="group block"
                >
                  <div className="aspect-square bg-[#F5F5F5] rounded overflow-hidden border border-line group-hover:border-brand">
                    <img
                      src={`/img/${s.seed}.jpg?v=4`}
                      alt={s.label}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <span className="block text-[11px] text-center text-mute mt-1 group-hover:text-brand">
                    {s.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* How it works */}
          <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-line max-md:grid-cols-1">
            {[
              {
                icon: "📤",
                title: "Tải ảnh lên",
                desc: "Chụp hoặc tải ảnh sản phẩm từ máy. Hỗ trợ JPG/PNG/WEBP.",
              },
              {
                icon: "🤖",
                title: "AI phân tích",
                desc: "Hệ thống nhận diện đặc điểm sản phẩm: hình dáng, màu sắc, vật liệu.",
              },
              {
                icon: "🏭",
                title: "Kết quả tức thì",
                desc: "Hiển thị sản phẩm tương tự + nhà máy đã audit có thể cung cấp.",
              },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-[32px] mb-1.5">{s.icon}</div>
                <b className="block text-[13.5px] text-ink mb-1">{s.title}</b>
                <p className="text-[11.5px] text-mute leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          {/* Tips */}
          <div className="mt-6 p-4 bg-gold/10 border border-gold/30 rounded text-[12px] text-ink leading-relaxed">
            <b className="text-brand">💡 Mẹo cho kết quả tốt nhất:</b> Chụp ảnh
            sản phẩm trên nền sáng, thấy rõ chi tiết, không bị che. Có thể tải
            nhiều ảnh cùng lúc (mỗi ảnh tối đa 10MB) để AI phân tích chính xác
            hơn.
          </div>

          {/* CTA fallback */}
          <div className="mt-5 text-center text-[12.5px] text-mute">
            Không có ảnh? Thử{" "}
            <Link href="/search" className="text-brand hover:underline font-medium">
              tìm bằng từ khoá
            </Link>{" "}
            hoặc{" "}
            <Link
              href="/buying-request"
              className="text-accent hover:underline font-medium"
            >
              gửi RFQ mô tả
            </Link>{" "}
            để NCC liên hệ trực tiếp.
          </div>
        </div>
      </div>
    </>
  );
}
