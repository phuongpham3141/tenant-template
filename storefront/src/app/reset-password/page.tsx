import { Suspense } from "react"
import { ResetPasswordForm } from "./ResetPasswordForm"

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-md mx-auto py-12 px-4 text-center text-mute">
          Đang tải...
        </div>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  )
}
