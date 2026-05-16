"use client"

import { useState } from "react"
import Link from "next/link"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const res = await fetch("/api/auth/password-reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      if (res.ok) {
        setSubmitted(true)
      } else if (res.status === 400) {
        setError("Email không hợp lệ")
      } else {
        setError("Có lỗi xảy ra. Vui lòng thử lại sau.")
      }
    } catch {
      setError("Không kết nối được máy chủ. Kiểm tra mạng.")
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="max-w-md mx-auto py-12 px-4 text-center">
        <h1 className="text-[22px] font-bold text-ink mb-3">Đã gửi email</h1>
        <p className="text-mute mb-4">
          Nếu tài khoản tồn tại, chúng tôi đã gửi link đặt lại mật khẩu đến <strong>{email}</strong>.
        </p>
        <p className="text-[12.5px] text-mute mb-6">
          Vui lòng kiểm tra hộp thư trong vòng 5 phút. Nếu không thấy, hãy kiểm tra thư mục spam.
        </p>
        <Link href="/login" className="text-brand hover:underline text-[13px] font-semibold">
          ← Quay lại Đăng nhập
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto py-12 px-4">
      <h1 className="text-[22px] font-bold text-ink mb-2">Quên mật khẩu</h1>
      <p className="text-mute text-[13.5px] mb-6">
        Nhập email tài khoản của bạn. Chúng tôi sẽ gửi link đặt lại mật khẩu trong vài phút.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4 bg-paper border border-line rounded p-5">
        <div>
          <label htmlFor="email" className="block text-[12px] font-bold text-ink mb-1">
            Email <span className="text-brand">*</span>
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-line rounded text-[13px] focus:border-brand focus:outline-none"
            placeholder="email@congty.com"
            autoComplete="email"
          />
        </div>

        {error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded px-3 py-2 text-[12.5px]" role="alert">
            {error}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={loading || !email}
          className="w-full py-2.5 bg-brand text-white rounded-sm text-[13px] font-bold cursor-pointer hover:bg-brand-light disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Đang gửi..." : "Gửi link đặt lại"}
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
