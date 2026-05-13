import { api } from "../../api/client"

export const aiApi = {
  translateProduct: (productId: string, targetLocale: "vi" | "en" | "cn") =>
    api<{ title: string; description: string }>(`/store/ai/translate-product`, { method: "POST", body: { product_id: productId, target_locale: targetLocale } }),
  visualSearch: (imageUrl: string) =>
    api<{ products: Array<{ id: string; score: number }> }>(`/store/ai/visual-search`, { method: "POST", body: { image_url: imageUrl } }),
  translateChat: (messageId: string, targetLocale: "vi" | "en" | "cn") =>
    api<{ translation: string }>(`/store/ai/translate-chat`, { method: "POST", body: { message_id: messageId, target_locale: targetLocale } }),
  recommendSuppliers: (rfqId: string) =>
    api<{ matches: Array<{ supplier_id: string; match_score: number; reasoning: string }> }>(`/store/ai/rfq-match`, { method: "POST", body: { rfq_id: rfqId } }),
}
