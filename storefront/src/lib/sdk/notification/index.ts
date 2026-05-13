import { api } from "../../api/client"

export interface NotificationItem {
  id: string
  channel: string
  template_code: string
  status: string
  body_preview?: string
  link?: string
  created_at: string
  read_at?: string
}

export const notificationApi = {
  list: (params: { unread_only?: boolean; limit?: number } = {}) =>
    api<{ notifications: NotificationItem[]; unread_count: number }>(`/store/notifications`, { query: params as any }),
  markRead: (id: string) => api(`/store/notifications/${id}/read`, { method: "POST" }),
  markAllRead: () => api(`/store/notifications/mark-all-read`, { method: "POST" }),
  preferences: () => api<{ channels: Record<string, boolean> }>(`/store/notifications/preferences`),
  updatePreferences: (prefs: Record<string, boolean>) =>
    api(`/store/notifications/preferences`, { method: "PUT", body: prefs }),
}
