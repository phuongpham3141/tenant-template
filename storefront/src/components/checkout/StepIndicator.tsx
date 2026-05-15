"use client"

import Link from "next/link"

interface StepIndicatorProps {
  currentStep: 1 | 2 | 3
}

const steps = [
  { num: 1, label: "Vận chuyển", href: "/checkout/shipping" },
  { num: 2, label: "Thanh toán", href: "/checkout/payment" },
  { num: 3, label: "Xác nhận", href: "/checkout/review" },
] as const

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <ol className="flex items-center justify-center mb-8">
      {steps.map((step, idx) => {
        const isActive = step.num === currentStep
        const isCompleted = step.num < currentStep
        const isClickable = step.num <= currentStep

        const circle = (
          <span
            className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
              isActive
                ? "bg-brand text-paper"
                : isCompleted
                ? "bg-success text-paper"
                : "bg-surface-1 text-mute"
            }`}
            aria-current={isActive ? "step" : undefined}
          >
            {isCompleted ? "✓" : step.num}
          </span>
        )

        const label = (
          <span className={`text-xs mt-1 ${isActive ? "text-brand font-semibold" : "text-mute"}`}>
            {step.label}
          </span>
        )

        return (
          <li key={step.num} className="flex items-center">
            <div className="flex flex-col items-center">
              {isClickable ? (
                <Link href={step.href} className="flex flex-col items-center">
                  {circle}
                  {label}
                </Link>
              ) : (
                <>
                  {circle}
                  {label}
                </>
              )}
            </div>
            {idx < steps.length - 1 && (
              <div
                className={`w-16 md:w-24 h-0.5 mx-2 ${
                  isCompleted ? "bg-success" : "bg-line"
                }`}
                aria-hidden="true"
              />
            )}
          </li>
        )
      })}
    </ol>
  )
}
