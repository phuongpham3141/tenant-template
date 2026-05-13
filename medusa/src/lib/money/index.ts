export interface Money {
  amountMinor: bigint
  currency: string
}

const CURRENCY_DECIMALS: Record<string, number> = {
  VND: 0,
  KRW: 0,
  JPY: 0,
  USD: 2,
  EUR: 2,
  CNY: 2,
  SGD: 2,
  THB: 2,
  HKD: 2,
  TWD: 2,
}

export function decimalsFor(currency: string): number {
  return CURRENCY_DECIMALS[currency.toUpperCase()] ?? 2
}

export function toMinor(amount: number | string, currency: string): bigint {
  const d = decimalsFor(currency)
  const v = typeof amount === "string" ? Number(amount) : amount
  if (!Number.isFinite(v)) throw new Error(`Invalid amount ${amount}`)
  return BigInt(Math.round(v * 10 ** d))
}

export function fromMinor(minor: bigint | number | string, currency: string): number {
  const d = decimalsFor(currency)
  const big = typeof minor === "bigint" ? minor : BigInt(minor)
  return Number(big) / 10 ** d
}

export function formatMoney(minor: bigint | number, currency: string, locale = "vi-VN"): string {
  const amount = fromMinor(minor as bigint, currency)
  return new Intl.NumberFormat(locale, { style: "currency", currency }).format(amount)
}

export function addMoney(a: Money, b: Money): Money {
  if (a.currency !== b.currency) throw new Error(`Currency mismatch ${a.currency} vs ${b.currency}`)
  return { amountMinor: a.amountMinor + b.amountMinor, currency: a.currency }
}

export function subMoney(a: Money, b: Money): Money {
  if (a.currency !== b.currency) throw new Error(`Currency mismatch ${a.currency} vs ${b.currency}`)
  return { amountMinor: a.amountMinor - b.amountMinor, currency: a.currency }
}

export function mulMoney(a: Money, factor: number): Money {
  return { amountMinor: BigInt(Math.round(Number(a.amountMinor) * factor)), currency: a.currency }
}

export interface FxSnapshot {
  id: string
  fromCurrency: string
  toCurrency: string
  rate: number
  capturedAt: Date
}

export function convertMoney(m: Money, fx: FxSnapshot): Money {
  if (m.currency !== fx.fromCurrency) {
    throw new Error(`FX from ${fx.fromCurrency}, got ${m.currency}`)
  }
  const fromMajor = fromMinor(m.amountMinor, m.currency)
  const toMajor = fromMajor * fx.rate
  return { amountMinor: toMinor(toMajor, fx.toCurrency), currency: fx.toCurrency }
}
