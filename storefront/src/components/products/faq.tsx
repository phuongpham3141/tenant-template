export function Faq({ title, faqs }: { title: string; faqs: { q: string; a: string }[] }) {
  return (
    <div className="max-w-[1400px] mx-auto px-4 mt-6">
      <h3 className="text-[16px] font-bold text-ink mb-3">
        Câu hỏi thường gặp về {title}
      </h3>
      <div className="bg-paper border border-line rounded divide-y divide-line">
        {faqs.map((f, i) => (
          <details key={i} open={i === 0} className="group p-4">
            <summary className="flex gap-3 items-start cursor-pointer list-none">
              <span className="w-6 h-6 bg-success text-white rounded-full flex items-center justify-center font-bold text-[13px] flex-shrink-0">
                Q
              </span>
              <span className="flex-1 text-[14px] font-semibold text-ink leading-snug">
                {f.q}
              </span>
              <span className="text-mute2 text-[12px] group-open:rotate-180 transition-transform">
                ▾
              </span>
            </summary>
            <div className="text-[13px] text-mute leading-relaxed mt-3 ml-9">
              {f.a}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
