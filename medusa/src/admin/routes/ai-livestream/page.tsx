import { defineRouteConfig } from "@medusajs/admin-sdk"
import { Container, Heading, Tabs } from "@medusajs/ui"

/**
 * AI Livestream admin dashboard (R22 extension).
 *
 * Tabs:
 * - Hồ sơ AI: personas library (avatar + voice + locale)
 * - Lịch phát sóng: upcoming + active streams
 * - Thống kê: engagement metrics
 *
 * Hiện tại = skeleton wrap existing /admin/ai-livestream/* API.
 * Sprint 10+: CRUD UI personas + schedules calendar + analytics charts.
 */
const AILivestreamPage = () => {
  return (
    <Container className="p-6">
      <Heading level="h1" className="mb-4">
        AI Livestream
      </Heading>

      <Tabs defaultValue="personas">
        <Tabs.List>
          <Tabs.Trigger value="personas">Hồ sơ AI</Tabs.Trigger>
          <Tabs.Trigger value="schedules">Lịch phát sóng</Tabs.Trigger>
          <Tabs.Trigger value="analytics">Thống kê</Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="personas">
          <div className="mt-4 space-y-2">
            <p className="text-ui-fg-base">
              Quản lý hồ sơ AI host (avatar, giọng nói, phong cách bán hàng).
            </p>
            <p className="text-ui-fg-muted text-sm">
              Endpoint: <code>GET /admin/ai-livestream/personas</code>
            </p>
            <p className="text-ui-fg-muted text-sm">
              Giao diện CRUD đầy đủ sẽ ra ở Sprint 10+.
            </p>
          </div>
        </Tabs.Content>

        <Tabs.Content value="schedules">
          <div className="mt-4 space-y-2">
            <p className="text-ui-fg-base">
              Lịch phát sóng livestream sắp tới và đang chạy.
            </p>
            <p className="text-ui-fg-muted text-sm">
              Endpoint: <code>GET /admin/ai-livestream/schedules</code>
            </p>
            <p className="text-ui-fg-muted text-sm">
              Bảng lịch và điều khiển bắt đầu/tạm dừng sẽ ra ở Sprint 10+.
            </p>
          </div>
        </Tabs.Content>

        <Tabs.Content value="analytics">
          <div className="mt-4 space-y-2">
            <p className="text-ui-fg-base">
              Thống kê tương tác livestream (lượt xem, chat, mua hàng).
            </p>
            <p className="text-ui-fg-muted text-sm">
              Endpoint: <code>GET /admin/ai-livestream/ledger</code>
            </p>
            <p className="text-ui-fg-muted text-sm">
              Biểu đồ và bộ lọc thống kê sẽ ra ở Sprint 10+.
            </p>
          </div>
        </Tabs.Content>
      </Tabs>
    </Container>
  )
}

export const config = defineRouteConfig({
  label: "AI Livestream",
})

export default AILivestreamPage
