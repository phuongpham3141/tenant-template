"use server"

const BACKEND_URL =
  process.env.MEDUSA_INTERNAL_URL ??
  process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL ??
  "http://api.huayuesc.local"
const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY ?? ""
const TENANT_ID = process.env.NEXT_PUBLIC_TENANT_ID ?? "csr"

export interface ContactFormData {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}

export interface ContactResult {
  success: boolean
  message?: string
  error?: string
}

export async function submitContact(data: ContactFormData): Promise<ContactResult> {
  if (
    !data.name?.trim() ||
    !data.email?.trim() ||
    !data.subject?.trim() ||
    !data.message?.trim()
  ) {
    return { success: false, error: "Vui lòng điền đầy đủ thông tin bắt buộc" }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(data.email)) {
    return { success: false, error: "Email không hợp lệ" }
  }

  if (data.phone) {
    const phoneRegex = /^(0|\+84|\+86)[\d\s\-()]{7,}$/
    if (!phoneRegex.test(data.phone.replace(/\s/g, ""))) {
      return { success: false, error: "Số điện thoại không hợp lệ" }
    }
  }

  try {
    const res = await fetch(`${BACKEND_URL}/store/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-publishable-api-key": PUBLISHABLE_KEY,
        "x-tenant-id": TENANT_ID,
      },
      body: JSON.stringify(data),
      cache: "no-store",
    })

    const result = await res.json().catch(() => ({}))

    if (res.ok) {
      return {
        success: true,
        message:
          result.message ||
          "Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi trong vòng 24 giờ.",
      }
    }
    return {
      success: false,
      error: result.message || "Có lỗi xảy ra. Vui lòng thử lại sau.",
    }
  } catch (error) {
    console.error("Contact submit error:", error)
    return { success: false, error: "Không kết nối được máy chủ. Kiểm tra mạng." }
  }
}
