export class FormError extends Error {
  constructor(public code: string, message: string, public field?: string) {
    super(message)
  }
}

export const ErrorMessages: Record<string, Record<string, string>> = {
  vi: {
    invalid_input: "Dữ liệu không hợp lệ",
    consent_required: "Bạn cần đồng ý điều khoản",
    unauthenticated: "Vui lòng đăng nhập",
    forbidden: "Bạn không có quyền thực hiện hành động này",
    rate_limit: "Quá nhiều yêu cầu, vui lòng thử lại sau",
    payment_failed: "Thanh toán thất bại",
    inventory_unavailable: "Sản phẩm hết hàng",
    rfq_expired: "RFQ đã hết hạn",
  },
  en: {
    invalid_input: "Invalid input",
    consent_required: "You must accept the terms",
    unauthenticated: "Please sign in",
    forbidden: "You do not have permission for this action",
    rate_limit: "Too many requests, please retry later",
    payment_failed: "Payment failed",
    inventory_unavailable: "Product out of stock",
    rfq_expired: "RFQ expired",
  },
  cn: {
    invalid_input: "输入无效",
    consent_required: "请接受条款",
    unauthenticated: "请登录",
    forbidden: "您没有此操作权限",
    rate_limit: "请求过多，请稍后重试",
    payment_failed: "支付失败",
    inventory_unavailable: "商品缺货",
    rfq_expired: "询价单已过期",
  },
}

export function translateError(code: string, locale: "vi" | "en" | "cn"): string {
  return ErrorMessages[locale]?.[code] ?? ErrorMessages.en[code] ?? code
}
