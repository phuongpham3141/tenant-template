import Link from "@/components/i18n-link";
import { Breadcrumb } from "@/components/category/breadcrumb";
import { getT } from "@/lib/t";

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
  const t = await getT();
  const sp = await searchParams;
  const q = typeof sp.q === "string" ? sp.q : "";

  return (
    <>
      <Breadcrumb
        trail={[
          { label: t("search_by_image.breadcrumb_home"), href: "/" },
          { label: t("search_by_image.breadcrumb_self") },
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
              {t("search_by_image.hero_title")}
            </h1>
            <p className="text-[13.5px] text-mute max-w-[640px] mx-auto leading-relaxed max-md:text-[12.5px]">
              {t("search_by_image.hero_desc")}
            </p>
            {q && (
              <p className="text-[12px] text-mute2 mt-2">
                {t("search_by_image.keyword_received_prefix")} <b className="text-ink">{q}</b> {t("search_by_image.keyword_received_suffix")}
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
                {t("search_by_image.drop_title")}
              </h3>
              <p className="text-[12.5px] text-mute mb-4">
                {t("search_by_image.choose_file_prefix")}{" "}
                <span className="text-brand font-medium">{t("search_by_image.formats")}</span>{" "}
                {t("search_by_image.size_limit")}
              </p>
              <input
                id="img-upload"
                type="file"
                name="image"
                accept="image/*"
                className="hidden"
              />
              <span className="inline-block px-6 py-2.5 bg-brand text-white font-bold text-[13px] rounded-sm hover:bg-brand-light cursor-pointer">
                {t("search_by_image.choose_image_btn")}
              </span>
            </label>
          </form>

          {/* OR sample images */}
          <div className="mt-6">
            <p className="text-[12.5px] text-center text-mute mb-3">
              {t("search_by_image.sample_prompt")}
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
                      src={`/img/${s.seed}.jpg?v=6`}
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
                title: t("search_by_image.step_upload_title"),
                desc: t("search_by_image.step_upload_desc"),
              },
              {
                icon: "🤖",
                title: t("search_by_image.step_ai_title"),
                desc: t("search_by_image.step_ai_desc"),
              },
              {
                icon: "🏭",
                title: t("search_by_image.step_results_title"),
                desc: t("search_by_image.step_results_desc"),
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
            <b className="text-brand">{t("search_by_image.tips_label")}</b>{" "}
            {t("search_by_image.tips_body")}
          </div>

          {/* CTA fallback */}
          <div className="mt-5 text-center text-[12.5px] text-mute">
            {t("search_by_image.cta_no_image")}{" "}
            <Link href="/search" className="text-brand hover:underline font-medium">
              {t("search_by_image.cta_search_keyword")}
            </Link>{" "}
            {t("search_by_image.cta_or")}{" "}
            <Link
              href="/buying-request"
              className="text-accent hover:underline font-medium"
            >
              {t("search_by_image.cta_send_rfq")}
            </Link>{" "}
            {t("search_by_image.cta_tail")}
          </div>
        </div>
      </div>
    </>
  );
}
