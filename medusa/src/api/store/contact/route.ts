import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

/**
 * POST /store/contact — Submit form Liên hệ (D7 Sprint 6 carry-over).
 *
 * Sprint 9A Pha 2a: validate + log + return success.
 * Sprint 10+: gửi email SMTP/SendGrid + persist communication module.
 */
export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const body = (req.body as any) ?? {}

  const required = ["name", "email", "subject", "message"]
  const missing = required.filter((f) => !String(body[f] ?? "").trim())
  if (missing.length > 0) {
    return res.status(400).json({
      message: "Thiếu thông tin bắt buộc",
      fields: missing,
    })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(String(body.email))) {
    return res.status(400).json({ message: "Email không hợp lệ" })
  }

  if (body.phone) {
    const phoneRegex = /^(0|\+84|\+86)[\d\s\-()]{7,}$/
    if (!phoneRegex.test(String(body.phone).replace(/\s/g, ""))) {
      return res.status(400).json({ message: "Số điện thoại không hợp lệ" })
    }
  }

  console.log("Contact form submitted:", {
    name: body.name,
    email: body.email,
    phone: body.phone || null,
    subject: body.subject,
    timestamp: new Date().toISOString(),
  })

  return res.status(200).json({
    message: "Đã nhận liên hệ. Chúng tôi sẽ phản hồi trong vòng 24 giờ.",
  })
}
