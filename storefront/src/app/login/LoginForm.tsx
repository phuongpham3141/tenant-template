"use client"

import { useState, FormEvent } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export function LoginForm() {
  const router = useRouter()
  const [identifier, setIdentifier] = useState("")
  const [password, setPassword] = useState("")
  const [remember, setRemember] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password, remember_me: remember }),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok) {
        const supplierId = data?.user?.supplier_id
        router.push(supplierId ? "/seller-center" : "/buyer-center")
        router.refresh()
        return
      }
      if (res.status === 400) {
        setError("Vui lòng kiểm tra lại thông tin đăng nhập")
      } else if (res.status === 401) {
        setError("Email/số điện thoại hoặc mật khẩu không đúng")
      } else if (res.status === 429) {
        setError("Bạn đã thử quá nhiều lần. Vui lòng đợi vài phút")
      } else {
        setError("Có lỗi xảy ra. Vui lòng thử lại")
      }
    } catch {
      setError("Không kết nối được máy chủ. Vui lòng kiểm tra mạng")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3" noValidate>
      <div>
        <label htmlFor="login-identifier" className="block text-[12.5px] font-semibold text-ink mb-1.5">
          Email hoặc số điện thoại
        </label>
        <input
          id="login-identifier"
          name="identifier"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          required
          autoComplete="username"
          placeholder="email@example.com hoặc 09xx xxx xxx"
          className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand"
        />
      </div>
      <div>
        <label htmlFor="login-password" className="block text-[12.5px] font-semibold text-ink mb-1.5">
          Mật khẩu
        </label>
        <input
          id="login-password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
          placeholder="••••••••"
          className="w-full px-3 py-2.5 border border-line rounded-sm text-[13px] outline-none focus:border-brand"
        />
      </div>
      <div className="flex justify-between items-center text-[12px]">
        <label className="flex items-center gap-1.5 text-mute cursor-pointer">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className="accent-brand"
          />
          Ghi nhớ đăng nhập
        </label>
        <Link href="/info/contact" className="text-brand hover:underline cursor-pointer">
          Quên mật khẩu?
        </Link>
      </div>
      {error && (
        <div
          role="alert"
          className="px-3 py-2 bg-red/10 border border-red/30 text-red rounded-sm text-[12.5px]"
        >
          {error}
        </div>
      )}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-brand text-paper rounded-sm font-bold text-[14px] cursor-pointer hover:bg-brand-light disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? "Đang đăng nhập..." : "Đăng nhập"}
      </button>
    </form>
  )
}
