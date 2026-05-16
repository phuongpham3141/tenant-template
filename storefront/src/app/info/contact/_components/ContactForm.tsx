"use client"

import { useState } from "react"
import { submitContact } from "@/actions/contact"

export function ContactForm() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setSuccess(null)
    setError(null)

    const fd = new FormData(e.currentTarget)
    const result = await submitContact({
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? "") || undefined,
      subject: String(fd.get("subject") ?? ""),
      message: String(fd.get("message") ?? ""),
    })

    setLoading(false)
    if (result.success) {
      setSuccess(result.message ?? "Đã nhận liên hệ.")
      e.currentTarget.reset()
    } else {
      setError(result.error ?? "Có lỗi xảy ra.")
    }
  }

  return (
    <div className="max-w-[720px] mx-auto px-4 mb-9">
      <div className="text-center mb-5">
        <h2 className="text-[22px] font-bold text-ink max-md:text-[18px]">
          Gửi tin nhắn cho chúng tôi
        </h2>
        <p className="text-[13px] text-mute mt-1">
          Phản hồi trong vòng 24 giờ làm việc — phù hợp cho yêu cầu chi tiết, đính kèm tài liệu
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-paper border border-line rounded p-5 space-y-3"
      >
        <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
          <label className="block">
            <span className="block text-[12px] font-bold text-ink mb-1">
              Họ và tên <span className="text-brand">*</span>
            </span>
            <input
              type="text"
              name="name"
              required
              placeholder="Nguyễn Văn A"
              className="w-full border border-line rounded px-3 py-2 text-[13px] focus:border-brand focus:outline-none"
            />
          </label>

          <label className="block">
            <span className="block text-[12px] font-bold text-ink mb-1">
              Email <span className="text-brand">*</span>
            </span>
            <input
              type="email"
              name="email"
              required
              placeholder="ban@congty.com"
              className="w-full border border-line rounded px-3 py-2 text-[13px] focus:border-brand focus:outline-none"
            />
          </label>
        </div>

        <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
          <label className="block">
            <span className="block text-[12px] font-bold text-ink mb-1">
              Số điện thoại
            </span>
            <input
              type="tel"
              name="phone"
              placeholder="0901 234 567"
              className="w-full border border-line rounded px-3 py-2 text-[13px] focus:border-brand focus:outline-none"
            />
          </label>

          <label className="block">
            <span className="block text-[12px] font-bold text-ink mb-1">
              Chủ đề <span className="text-brand">*</span>
            </span>
            <input
              type="text"
              name="subject"
              required
              placeholder="Tư vấn sourcing nhà máy"
              className="w-full border border-line rounded px-3 py-2 text-[13px] focus:border-brand focus:outline-none"
            />
          </label>
        </div>

        <label className="block">
          <span className="block text-[12px] font-bold text-ink mb-1">
            Nội dung <span className="text-brand">*</span>
          </span>
          <textarea
            name="message"
            required
            rows={5}
            placeholder="Mô tả chi tiết nhu cầu của bạn..."
            className="w-full border border-line rounded px-3 py-2 text-[13px] focus:border-brand focus:outline-none resize-y"
          />
        </label>

        {error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded px-3 py-2 text-[12.5px]">
            {error}
          </div>
        ) : null}

        {success ? (
          <div className="bg-green-50 border border-green-200 text-green-700 rounded px-3 py-2 text-[12.5px]">
            {success}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 bg-brand text-white rounded-sm text-[13px] font-bold cursor-pointer hover:bg-brand-light disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Đang gửi..." : "Gửi tin nhắn"}
        </button>

        <p className="text-[11px] text-mute text-center mt-2">
          Bằng cách gửi form, bạn đồng ý chúng tôi liên hệ qua email/điện thoại để phản hồi yêu cầu.
        </p>
      </form>
    </div>
  )
}
