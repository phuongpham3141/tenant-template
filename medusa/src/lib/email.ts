/**
 * Email utility — Resend REST API (P0-3 Sprint 13)
 *
 * Dung HTTPS API truc tiep (khong can nodemailer dependency).
 * Env: RESEND_API_KEY + EMAIL_FROM (domain da verify tren Resend).
 */

const RESEND_API = "https://api.resend.com/emails"

export interface SendEmailInput {
  to: string | string[]
  subject: string
  html: string
  replyTo?: string
}

export async function sendEmail(input: SendEmailInput): Promise<{ ok: boolean; id?: string; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.EMAIL_FROM || "noreply@cybersilkroads.com"

  if (!apiKey) {
    console.warn("[email] RESEND_API_KEY chua cau hinh — skip send:", input.subject)
    return { ok: false, error: "RESEND_API_KEY missing" }
  }

  try {
    const res = await fetch(RESEND_API, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Cybersilkroads <" + from + ">",
        to: Array.isArray(input.to) ? input.to : [input.to],
        subject: input.subject,
        html: input.html,
        ...(input.replyTo ? { reply_to: input.replyTo } : {}),
      }),
    })

    const body = (await res.json()) as any
    if (!res.ok) {
      console.error("[email] Resend error:", res.status, JSON.stringify(body).slice(0, 300))
      return { ok: false, error: body?.message || String(res.status) }
    }
    return { ok: true, id: body?.id }
  } catch (err: any) {
    console.error("[email] send failed:", err?.message)
    return { ok: false, error: err?.message }
  }
}

/** Template co ban — wrapper brand */
export function emailLayout(title: string, bodyHtml: string): string {
  return (
    '<div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;padding:24px;color:#1f2937">' +
    '<h2 style="color:#005F6B;border-bottom:3px solid #005F6B;padding-bottom:10px">' + title + "</h2>" +
    bodyHtml +
    '<hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0">' +
    '<p style="font-size:12px;color:#6b7280">Cybersilkroads — San TMDT B2B/B2C<br>Email tu dong, vui long khong tra loi truc tiep.</p>' +
    "</div>"
  )
}
