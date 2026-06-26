"use client"

import { useState, useTransition } from "react"
import { subscribeNewsletter } from "@/lib/store/newsletter"

export function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [pending, start] = useTransition()
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null)

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setMsg(null)
    start(async () => {
      const r = await subscribeNewsletter(email)
      if (r?.ok) {
        setMsg({ ok: true, text: "Cảm ơn! Bạn đã đăng ký nhận tin thành công." })
        setEmail("")
      } else {
        setMsg({ ok: false, text: r?.error || "Đăng ký không thành công." })
      }
    })
  }

  return (
    <div className="border-b border-white/10 pb-7 mb-7 grid grid-cols-[1fr_auto] gap-6 items-center max-md:grid-cols-1 max-md:gap-3">
      <div>
        <h3 className="text-[16px] font-bold text-white mb-1">Đăng ký nhận tin Cybersilkroads</h3>
        <p className="text-[12.5px] opacity-75">Nhận thông tin sản phẩm mới, ưu đãi và xu hướng thị trường B2B qua email.</p>
      </div>
      <form onSubmit={onSubmit} className="flex gap-2 max-md:flex-col">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email của bạn"
          className="px-3 py-2.5 rounded text-[13px] text-ink bg-white w-[260px] max-md:w-full outline-none"
        />
        <button
          type="submit"
          disabled={pending}
          className="bg-accent text-white font-semibold px-5 py-2.5 rounded text-[13px] hover:opacity-90 disabled:opacity-50 whitespace-nowrap"
        >
          {pending ? "Đang gửi…" : "Đăng ký"}
        </button>
      </form>
      {msg && (
        <p className={`col-span-2 text-[12.5px] max-md:col-span-1 ${msg.ok ? "text-green-300" : "text-red-300"}`}>
          {msg.text}
        </p>
      )}
    </div>
  )
}
