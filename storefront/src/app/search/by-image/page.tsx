import Link from "next/link";
import { Breadcrumb } from "@/components/category/breadcrumb";

export const metadata = {
  title: "以图搜索 — 华越供应链",
  description:
    "上传产品图片，即可从中国 40 余家已认证工厂中找到相似产品。AI 图像识别，5 秒内推荐匹配产品。",
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
          { label: "首页", href: "/" },
          { label: "以图搜索" },
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
              以图搜索产品
            </h1>
            <p className="text-[13.5px] text-mute max-w-[640px] mx-auto leading-relaxed max-md:text-[12.5px]">
              AI 5 秒内识别图像，推荐 40 余家拥有相似产品的工厂。适合您有样品图片却不确定准确名称/关键词的情况。
            </p>
            {q && (
              <p className="text-[12px] text-mute2 mt-2">
                已接收关键词：<b className="text-ink">{q}</b> · 您可同时上传图片
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
                将图片拖放到此处
              </h3>
              <p className="text-[12.5px] text-mute mb-4">
                或点击从本地选择文件 ·{" "}
                <span className="text-brand font-medium">JPG / PNG / WEBP</span>{" "}
                · 最大 10MB
              </p>
              <input
                id="img-upload"
                type="file"
                name="image"
                accept="image/*"
                className="hidden"
              />
              <span className="inline-block px-6 py-2.5 bg-brand text-white font-bold text-[13px] rounded-sm hover:bg-brand-light cursor-pointer">
                📷 从本地选择图片
              </span>
            </label>
          </form>

          {/* OR sample images */}
          <div className="mt-6">
            <p className="text-[12.5px] text-center text-mute mb-3">
              或试用样例图片：
            </p>
            <div className="grid grid-cols-6 gap-2 max-w-[600px] mx-auto max-md:grid-cols-3">
              {[
                { seed: "sample-chair", label: "椅子" },
                { seed: "sample-tile", label: "瓷砖" },
                { seed: "sample-lamp", label: "灯具" },
                { seed: "sample-faucet", label: "龙头" },
                { seed: "sample-sofa", label: "沙发" },
                { seed: "sample-cabinet", label: "橱柜" },
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
                title: "上传图片",
                desc: "拍摄或从本地上传产品图片。支持 JPG/PNG/WEBP。",
              },
              {
                icon: "🤖",
                title: "AI 分析",
                desc: "系统识别产品特征：外形、颜色、材质。",
              },
              {
                icon: "🏭",
                title: "即时结果",
                desc: "展示相似产品 + 可供货的已验厂工厂。",
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
            <b className="text-brand">💡 获得最佳结果的技巧：</b> 在明亮背景下拍摄产品，细节清晰、无遮挡。可一次上传多张图片（每张最大 10MB），让 AI 分析更精准。
          </div>

          {/* CTA fallback */}
          <div className="mt-5 text-center text-[12.5px] text-mute">
            没有图片？试试{" "}
            <Link href="/search" className="text-brand hover:underline font-medium">
              按关键词搜索
            </Link>{" "}
            或{" "}
            <Link
              href="/buying-request"
              className="text-accent hover:underline font-medium"
            >
              发送询价描述
            </Link>{" "}
            让供应商直接联系您。
          </div>
        </div>
      </div>
    </>
  );
}
