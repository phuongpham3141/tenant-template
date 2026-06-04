import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";

export const metadata = {
  title: "Search by Image — Huayuesc",
  description:
    "Upload a product photo to find similar products from 40+ certified factories in China. AI image recognition suggests matching products in 5 seconds.",
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
          { label: "Home", href: "/" },
          { label: "Search by Image" },
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
              Find products by image
            </h1>
            <p className="text-[13.5px] text-mute max-w-[640px] mx-auto leading-relaxed max-md:text-[12.5px]">
              AI image recognition in 5 seconds suggests 40+ factories with
              similar products. Ideal when you have a sample photo but don&apos;t
              know the exact name or keyword.
            </p>
            {q && (
              <p className="text-[12px] text-mute2 mt-2">
                Keyword received: <b className="text-ink">{q}</b> · You can also
                upload a photo
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
                Drag &amp; drop an image here
              </h3>
              <p className="text-[12.5px] text-mute mb-4">
                or click to choose a file from your device ·{" "}
                <span className="text-brand font-medium">JPG / PNG / WEBP</span>{" "}
                · Up to 10MB
              </p>
              <input
                id="img-upload"
                type="file"
                name="image"
                accept="image/*"
                className="hidden"
              />
              <span className="inline-block px-6 py-2.5 bg-brand text-white font-bold text-[13px] rounded-sm hover:bg-brand-light cursor-pointer">
                📷 Choose an image
              </span>
            </label>
          </form>

          {/* OR sample images */}
          <div className="mt-6">
            <p className="text-[12.5px] text-center text-mute mb-3">
              Or try a sample image:
            </p>
            <div className="grid grid-cols-6 gap-2 max-w-[600px] mx-auto max-md:grid-cols-3">
              {[
                { seed: "sample-chair", label: "Chair" },
                { seed: "sample-tile", label: "Tile" },
                { seed: "sample-lamp", label: "Lamp" },
                { seed: "sample-faucet", label: "Faucet" },
                { seed: "sample-sofa", label: "Sofa" },
                { seed: "sample-cabinet", label: "Kitchen Cabinet" },
              ].map((s) => (
                <Link
                  key={s.seed}
                  href={`/search?q=${encodeURIComponent(s.label)}`}
                  className="group block"
                >
                  <div className="aspect-square bg-[#F5F5F5] rounded overflow-hidden border border-line group-hover:border-brand">
                    <img
                      src={`/img/${s.seed}.jpg?v=5`}
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
                title: "Upload an image",
                desc: "Snap or upload a product photo. JPG/PNG/WEBP supported.",
              },
              {
                icon: "🤖",
                title: "AI analysis",
                desc: "The system recognizes product features: shape, color, and material.",
              },
              {
                icon: "🏭",
                title: "Instant results",
                desc: "See similar products plus audited factories that can supply them.",
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
            <b className="text-brand">💡 Tips for the best results:</b> Photograph
            the product against a bright background with clear, unobstructed
            detail. You can upload multiple images at once (up to 10MB each) for
            more accurate AI analysis.
          </div>

          {/* CTA fallback */}
          <div className="mt-5 text-center text-[12.5px] text-mute">
            No image? Try{" "}
            <Link href="/search" className="text-brand hover:underline font-medium">
              searching by keyword
            </Link>{" "}
            or{" "}
            <Link
              href="/buying-request"
              className="text-accent hover:underline font-medium"
            >
              sending a written RFQ
            </Link>{" "}
            so suppliers can reach out directly.
          </div>
        </div>
      </div>
    </>
  );
}
