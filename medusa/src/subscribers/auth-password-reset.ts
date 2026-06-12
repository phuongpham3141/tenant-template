import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework"
import { sendEmail, emailLayout } from "../lib/email"

/**
 * Gui email reset password (P0-3 Sprint 13).
 * Medusa v2 emit auth.password_reset khi POST /auth/customer/emailpass/reset-password
 * data: { entity_id (email), token, actor_type }
 */
export default async function passwordResetHandler({ event }: SubscriberArgs<{ entity_id: string; token: string; actor_type: string }>) {
  const { entity_id: email, token, actor_type } = event.data

  const base = actor_type === "user"
    ? (process.env.MEDUSA_ADMIN_URL || "https://admin.cybersilkroads.com/app")
    : (process.env.STOREFRONT_URL || "https://shop.cybersilkroads.com")

  const resetUrl = actor_type === "user"
    ? base + "/reset-password?token=" + encodeURIComponent(token)
    : base + "/reset-password?token=" + encodeURIComponent(token) + "&email=" + encodeURIComponent(email)

  await sendEmail({
    to: email,
    subject: "Dat lai mat khau — Cybersilkroads",
    html: emailLayout(
      "Dat lai mat khau",
      "<p>Ban (hoac ai do) vua yeu cau dat lai mat khau cho tai khoan <strong>" + email + "</strong>.</p>" +
      '<p style="margin:24px 0"><a href="' + resetUrl + '" style="background:#005F6B;color:#fff;padding:12px 28px;border-radius:6px;text-decoration:none;font-weight:bold">Dat lai mat khau</a></p>' +
      "<p>Link het han sau 15 phut. Neu khong phai ban, bo qua email nay.</p>"
    ),
  })
}

export const config: SubscriberConfig = {
  event: "auth.password_reset",
}
