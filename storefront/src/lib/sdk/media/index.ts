import { api } from "../../api/client"

export interface UploadTicket {
  asset_id: string
  upload_url: string
  storage_key: string
  expires_at: string
}

export const mediaApi = {
  requestUpload: (input: { owner_type: "supplier" | "product" | "user"; owner_id: string; media_type: "image" | "video" | "spin_360" | "document"; filename: string; mime_type: string; file_size_bytes: number }) =>
    api<UploadTicket>("/store/media/upload-ticket", { method: "POST", body: input }),
  confirmUpload: (assetId: string) => api(`/store/media/${assetId}/confirm`, { method: "POST" }),
  delete: (assetId: string) => api(`/store/media/${assetId}`, { method: "DELETE" }),
}
