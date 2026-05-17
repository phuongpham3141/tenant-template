import { defineRouteConfig } from "@medusajs/admin-sdk"
import { Container, Heading, Table, Badge, Button } from "@medusajs/ui"
import { useEffect, useState } from "react"

interface Rfq {
  id: string
  code: string
  buyer_id: string
  title_i18n: Record<string, string>
  target_quantity: number
  unit_code: string
  urgency: string
  status: string
  created_at: string
}

// Status enums match schema CHECK constraint (L19)
const STATUS_LABELS: Record<string, string> = {
  draft: "Bản nháp",
  published: "Đã đăng",
  quoting: "Đang báo giá",
  awarded: "Đã chốt",
  converted: "Đã tạo đơn",
  closed: "Đã đóng",
  expired: "Hết hạn",
  cancelled: "Hủy",
}

const URGENCY_LABELS: Record<string, string> = {
  normal: "Bình thường",
  fast: "Nhanh",
  urgent: "Khẩn cấp",
  immediate: "Cực gấp",
}

const RFQsPage = () => {
  const [rfqs, setRfqs] = useState<Rfq[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("published")
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    fetch(`/admin/rfqs?status=${filter}&limit=50`, { credentials: "include" })
      .then((r) => {
        if (!r.ok) throw new Error("Lấy dữ liệu thất bại")
        return r.json()
      })
      .then((d) => {
        setRfqs(d.rfqs || [])
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message || "Có lỗi xảy ra")
        setLoading(false)
      })
  }, [filter])

  return (
    <Container className="p-6">
      <Heading level="h1" className="mb-4">
        Yêu cầu báo giá (RFQ)
      </Heading>

      <div className="flex gap-2 mb-4 flex-wrap">
        {Object.entries(STATUS_LABELS).map(([key, label]) => (
          <Button
            key={key}
            variant={filter === key ? "primary" : "secondary"}
            onClick={() => setFilter(key)}
            size="small"
          >
            {label}
          </Button>
        ))}
      </div>

      {loading ? (
        <p>Đang tải...</p>
      ) : error ? (
        <p className="text-ui-fg-error">{error}</p>
      ) : rfqs.length === 0 ? (
        <p className="text-ui-fg-muted">Không có yêu cầu báo giá nào.</p>
      ) : (
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Mã</Table.HeaderCell>
              <Table.HeaderCell>Tiêu đề</Table.HeaderCell>
              <Table.HeaderCell>Số lượng</Table.HeaderCell>
              <Table.HeaderCell>Đơn vị</Table.HeaderCell>
              <Table.HeaderCell>Mức độ</Table.HeaderCell>
              <Table.HeaderCell>Ngày tạo</Table.HeaderCell>
              <Table.HeaderCell>Trạng thái</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {rfqs.map((rfq) => (
              <Table.Row key={rfq.id}>
                <Table.Cell>{rfq.code}</Table.Cell>
                <Table.Cell>
                  {rfq.title_i18n?.vi || rfq.title_i18n?.en || "—"}
                </Table.Cell>
                <Table.Cell>{rfq.target_quantity}</Table.Cell>
                <Table.Cell>{rfq.unit_code}</Table.Cell>
                <Table.Cell>
                  <Badge>{URGENCY_LABELS[rfq.urgency] || rfq.urgency}</Badge>
                </Table.Cell>
                <Table.Cell>
                  {new Date(rfq.created_at).toLocaleDateString("vi-VN")}
                </Table.Cell>
                <Table.Cell>
                  <Badge>{STATUS_LABELS[rfq.status] || rfq.status}</Badge>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}
    </Container>
  )
}

export const config = defineRouteConfig({
  label: "Yêu cầu báo giá",
})

export default RFQsPage
