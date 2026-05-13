const DECIMALS: Record<string, number> = {
  VND: 0, KRW: 0, JPY: 0,
  USD: 2, EUR: 2, CNY: 2, SGD: 2, THB: 2, HKD: 2, TWD: 2, AUD: 2, GBP: 2, CAD: 2,
}

export function formatMoney(amountMinor: bigint | number | string, currency: string, locale: string = "vi-VN"): string {
  const d = DECIMALS[currency] ?? 2
  const big = typeof amountMinor === "bigint" ? amountMinor : BigInt(amountMinor)
  const major = Number(big) / 10 ** d
  return new Intl.NumberFormat(locale, { style: "currency", currency }).format(major)
}

export function fromMinor(minor: bigint | number | string, currency: string): number {
  const d = DECIMALS[currency] ?? 2
  const big = typeof minor === "bigint" ? minor : BigInt(minor)
  return Number(big) / 10 ** d
}

export function toMinor(amount: number, currency: string): bigint {
  const d = DECIMALS[currency] ?? 2
  return BigInt(Math.round(amount * 10 ** d))
}
