/**
 * VNPay payment integration (P0-4 Sprint 13 — sandbox)
 *
 * Spec VNPay 2.1.0: HMAC-SHA512 tren sorted query string.
 * Env: VNP_TMN_CODE + VNP_HASH_SECRET + VNP_URL + VNP_RETURN_URL
 */
import crypto from "crypto"

function sortAndEncode(params: Record<string, string>): string {
  return Object.keys(params)
    .sort()
    .map((k) => k + "=" + encodeURIComponent(params[k]).replace(/%20/g, "+"))
    .join("&")
}

function hmac512(data: string, secret: string): string {
  return crypto.createHmac("sha512", secret).update(Buffer.from(data, "utf-8")).digest("hex")
}

function formatDateGMT7(d: Date): string {
  const t = new Date(d.getTime() + 7 * 3600 * 1000)
  const p = (n: number, l = 2) => String(n).padStart(l, "0")
  return (
    t.getUTCFullYear().toString() + p(t.getUTCMonth() + 1) + p(t.getUTCDate()) +
    p(t.getUTCHours()) + p(t.getUTCMinutes()) + p(t.getUTCSeconds())
  )
}

export interface CreateVnpayUrlInput {
  amountVnd: number          // VND (chua nhan 100)
  orderId: string            // vnp_TxnRef — unique
  orderInfo: string          // mo ta don hang (khong dau)
  ipAddr: string
}

export function createVnpayPaymentUrl(input: CreateVnpayUrlInput): { url: string } {
  const tmnCode = process.env.VNP_TMN_CODE || ""
  const secret = process.env.VNP_HASH_SECRET || ""
  const vnpUrl = process.env.VNP_URL || "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html"
  const returnUrl = process.env.VNP_RETURN_URL || "https://shop.cybersilkroads.com/checkout/vnpay-return"

  if (!tmnCode || !secret) throw new Error("VNP_TMN_CODE/VNP_HASH_SECRET chua cau hinh")

  const now = new Date()
  const expire = new Date(now.getTime() + 15 * 60 * 1000)

  const params: Record<string, string> = {
    vnp_Version: "2.1.0",
    vnp_Command: "pay",
    vnp_TmnCode: tmnCode,
    vnp_Amount: String(Math.round(input.amountVnd) * 100),
    vnp_CreateDate: formatDateGMT7(now),
    vnp_ExpireDate: formatDateGMT7(expire),
    vnp_CurrCode: "VND",
    vnp_IpAddr: input.ipAddr || "127.0.0.1",
    vnp_Locale: "vn",
    vnp_OrderInfo: input.orderInfo.slice(0, 200),
    vnp_OrderType: "other",
    vnp_ReturnUrl: returnUrl,
    vnp_TxnRef: input.orderId,
  }

  const signData = sortAndEncode(params)
  const secureHash = hmac512(signData, secret)
  return { url: vnpUrl + "?" + signData + "&vnp_SecureHash=" + secureHash }
}

/** Verify checksum tu Return URL / IPN */
export function verifyVnpaySignature(query: Record<string, any>): { valid: boolean; data: Record<string, string> } {
  const secret = process.env.VNP_HASH_SECRET || ""
  const received = String(query.vnp_SecureHash || "")

  const data: Record<string, string> = {}
  for (const k of Object.keys(query)) {
    if (k === "vnp_SecureHash" || k === "vnp_SecureHashType") continue
    if (k.startsWith("vnp_")) data[k] = String(query[k])
  }

  const signData = sortAndEncode(data)
  const expected = hmac512(signData, secret)
  return { valid: expected === received, data }
}
