import Link from "next/link";

export function Breadcrumb({ trail }: { trail: { label: string; href?: string }[] }) {
  return (
    <div className="max-w-[1400px] mx-auto px-4 mt-4 text-[12px] text-mute flex items-center gap-1.5 flex-wrap">
      {trail.map((t, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {t.href ? (
            <Link href={t.href} className="hover:text-brand">
              {t.label}
            </Link>
          ) : (
            <span className="text-ink font-medium">{t.label}</span>
          )}
          {i < trail.length - 1 && <span className="text-mute2">›</span>}
        </span>
      ))}
    </div>
  );
}
