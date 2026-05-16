"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"

export function ResetPasswordForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get("token")

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!token) {
      setError("Link không hợp lệ. Vui lòng yêu cầu link mới từ trang Quên mật khẩu.")
    }
  }, [token])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password.length < 8) {
      setError("Mật khẩu phải có ít nhất 8 ký tự")
      return
    }
    if (password !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp")
      return
    }

    setLoading(true)
    setError("")

    try {
      const res = await fetch("/api/auth/password-reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, new_password: password }),
      })

      if (res.ok) {
        setDone(true)
        setTimeout(() => router.push("/login"), 3000)
      } else if (res.status === 400) {
        setError("Link đã hết hạn hoặc không hợp lệ. Vui lòng yêu cầu link mới.")
      } else if (res.status === 422) {
        setError("Mật khẩu không đáp ứng yêu cầu bảo mật.")
      } else {
        setError("Có lỗi xảy ra. Vui lòng thử lại sau.")
      }
    } catch {
      setError("Không kết nối được máy chủ. Kiểm tra mạng.")
    } finally {
      setLoading(false)
    }
  }

  if (done) {
    return (
      <div className="max-w-md mx-auto py-12 px-4 text-center">
        <h1 className="text-[22px] font-bold text-ink mb-3">Đặt lại thành công</h1>
        <p className="text-mute mb-2">Mật khẩu đã được cập nhật.</p>
        <p className="text-[12.5px] text-mute">
          Đang chuyển đến trang Đăng nhập trong 3 giây...
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto py-12 px-4">
      <h1 className="text-[22px] font-bold text-ink mb-2">Đặt lại mật khẩu</h1>
      <p className="text-mute text-[13.5px] mb-6">
        Nhập mật khẩu mới của bạn (tối thiểu 8 ký tự).
      </p>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-paper border border-line rounded p-5"
      >
        <div>
          <label htmlFor="password" className="block text-[12px] font-bold text-ink mb-1">
            Mật khẩu mới <span className="text-brand">*</span>
          </label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-line rounded text-[13px] focus:border-brand focus:outline-none"
            placeholder="Ít nhất 8 ký tự"
            autoComplete="new-password"
            minLength={8}
            disabled={!token}
          />
        </div>

        <div>
          <label htmlFor="confirm" className="block text-[12px] font-bold text-ink mb-1">
            Xác nhận mật khẩu <span className="text-brand">*</span>
          </label>
          <input
            id="confirm"
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-3 py-2 border border-line rounded text-[13px] focus:border-brand focus:outline-none"
            placeholder="Nhập lại mật khẩu"
            autoComplete="new-password"
            minLength={8}
            disabled={!token}
          />
        </div>

        {error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded px-3 py-2 text-[12.5px]" role="alert">
            {error}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={loading || !token || !password || !confirmPassword}
          className="w-full py-2.5 bg-brand text-white rounded-sm text-[13px] font-bold cursor-pointer hover:bg-brand-light disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Đang cập nhật..." : "Đặt lại mật khẩu"}
        </button>

        <div className="text-center text-[12.5px]">
          <Link href="/login" className="text-brand hover:underline">
            ← Quay lại Đăng nhập
          </Link>
        </div>
      </form>
    </div>
  )
}
