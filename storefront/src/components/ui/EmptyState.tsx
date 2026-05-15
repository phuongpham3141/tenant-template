import { ReactNode } from "react"
import Link from "next/link"

interface EmptyStateProps {
  icon?: ReactNode
  title: string
  message?: string
  ctaText?: string
  ctaHref?: string
  ctaAction?: () => void
  variant?: "default" | "compact"
}

export function EmptyState({
  icon,
  title,
  message,
  ctaText,
  ctaHref,
  ctaAction,
  variant = "default",
}: EmptyStateProps) {
  const padding = variant === "compact" ? "py-8" : "py-16"

  return (
    <div className={`flex flex-col items-center justify-center text-center px-4 ${padding}`}>
      {icon && (
        <div className="mb-4 text-mute2 [&>svg]:w-12 [&>svg]:h-12">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-semibold text-ink mb-2">{title}</h3>
      {message && (
        <p className="text-sm text-mute max-w-md mb-6">{message}</p>
      )}
      {ctaText && ctaHref && (
        <Link
          href={ctaHref}
          className="inline-flex items-center px-4 py-2 bg-brand text-paper rounded hover:bg-brand-dark transition"
        >
          {ctaText}
        </Link>
      )}
      {ctaText && ctaAction && !ctaHref && (
        <button
          onClick={ctaAction}
          className="inline-flex items-center px-4 py-2 bg-brand text-paper rounded hover:bg-brand-dark transition"
        >
          {ctaText}
        </button>
      )}
    </div>
  )
}
