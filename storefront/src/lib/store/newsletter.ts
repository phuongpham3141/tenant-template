"use server"

// Thêm email vào audience "General" của Resend (danh sách marketing).
const AUDIENCE = process.env.RESEND_AUDIENCE_ID || "2b0298ed-eb86-4ad6-b1cf-0124d0c5b18c"
const KEY = process.env.RESEND_API_KEY

export async function subscribeNewsletter(emailRaw: string) {
  const email = (emailRaw || "").trim().toLowerCase()
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return { error: "Email không hợp lệ." }
  }
  if (!KEY) return { error: "Hệ thống email chưa sẵn sàng." }
  try {
    const res = await fetch(`https://api.resend.com/audiences/${AUDIENCE}/contacts`, {
      method: "POST",
      headers: { Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ email, unsubscribed: false }),
    })
    // 2xx = thêm mới OK; 409/422 = đã tồn tại → coi như thành công (idempotent)
    if (res.ok || res.status === 409 || res.status === 422) {
      return { ok: true }
    }
    return { error: "Đăng ký chưa thành công, vui lòng thử lại." }
  } catch {
    return { error: "Lỗi kết nối, vui lòng thử lại sau." }
  }
}
