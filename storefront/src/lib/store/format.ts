export function formatVnd(amount: number | null | undefined): string {
  if (amount == null) return "Liên hệ"
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(amount)
}
