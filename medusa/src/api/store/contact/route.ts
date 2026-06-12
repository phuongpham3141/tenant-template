import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { sendEmail, emailLayout } from "../../../lib/email"

/**
 * POST /store/contact — Form lien he (D7) + email notify (P0-3 Sprint 13).
 */
export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const body = (req.body as any) ?? {}

  const required = ["name", "email", "subject", "message"]
  const missing = required.filter((f) => !String(body[f] ?? "").trim())
  if (missing.length > 0) {
    return res.status(400).json({ message: "Thieu thong tin bat buoc", fields: missing })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(String(body.email))) {
    return res.status(400).json({ message: "Email khong hop le" })
  }

  if (body.phone) {
    const phoneRegex = /^(0|\+84|\+86)[\d\s\-()]{7,}$/
    if (!phoneRegex.test(String(body.phone).replace(/\s/g, ""))) {
      return res.status(400).json({ message: "So dien thoai khong hop le" })
    }
  }

  const contactEmail = process.env.CONTACT_EMAIL || "phuongpham3141@gmail.com"
  const esc = (s: any) => String(s ?? "").replace(/</g, "&lt;").replace(/>/g, "&gt;")

  // Gui email notify (khong block response neu email loi — van nhan form)
  const result = await sendEmail({
    to: contactEmail,
    replyTo: String(body.email),
    subject: "[Lien he] " + String(body.subject).slice(0, 100),
    html: emailLayout(
      "Lien he moi tu website",
      "<p><strong>Ho ten:</strong> " + esc(body.name) + "</p>" +
      "<p><strong>Email:</strong> " + esc(body.email) + "</p>" +
      (body.phone ? "<p><strong>SDT:</strong> " + esc(body.phone) + "</p>" : "") +
      "<p><strong>Tieu de:</strong> " + esc(body.subject) + "</p>" +
      "<p><strong>Noi dung:</strong></p><div style=\"background:#f3f4f6;padding:12px;border-radius:6px\">" + esc(body.message) + "</div>"
    ),
  })

  console.log("[contact] form tu " + body.email + " — email sent: " + result.ok)
  return res.status(200).json({ message: "Da nhan lien he. Chung toi se phan hoi som nhat." })
}
