import { defineRouteConfig } from "@medusajs/admin-sdk"
import { Container, Heading, Table, Badge, Button } from "@medusajs/ui"
import { useEffect, useState } from "react"

interface SupplierApplication {
  id: string
  company_name: string
  business_type: string
  contact_name: string
  contact_phone: string | null
  contact_email: string
  status: string
  created_at: string
}

const STATUS_LABELS: Record<string, string> = {
  submitted: "Mới gửi",
  under_review: "Đang xem xét",
  needs_info: "Cần bổ sung",
  approved: "Đã duyệt",
  rejected: "Từ chối",
}

const SupplierApplicationsPage = () => {
  const [apps, setApps] = useState<SupplierApplication[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("submitted")
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    fetch(`/admin/supplier-applications?status=${filter}&limit=50`, {
      credentials: "include",
    })
      .then((r) => {
        if (!r.ok) throw new Error("Lấy dữ liệu thất bại")
        return r.json()
      })
      .then((d) => {
        setApps(d.supplier_applications || [])
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
        Đơn đăng ký Nhà cung cấp
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
      ) : apps.length === 0 ? (
        <p className="text-ui-fg-muted">Không có đơn đăng ký nào.</p>
      ) : (
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Tên công ty</Table.HeaderCell>
              <Table.HeaderCell>Loại</Table.HeaderCell>
              <Table.HeaderCell>Liên hệ</Table.HeaderCell>
              <Table.HeaderCell>Ngày gửi</Table.HeaderCell>
              <Table.HeaderCell>Trạng thái</Table.HeaderCell>
              <Table.HeaderCell>Thao tác</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {apps.map((app) => (
              <Table.Row key={app.id}>
                <Table.Cell>{app.company_name}</Table.Cell>
                <Table.Cell>{app.business_type}</Table.Cell>
                <Table.Cell>
                  <div>{app.contact_name}</div>
                  <div className="text-ui-fg-muted text-xs">
                    {app.contact_phone || app.contact_email}
                  </div>
                </Table.Cell>
                <Table.Cell>
                  {new Date(app.created_at).toLocaleDateString("vi-VN")}
                </Table.Cell>
                <Table.Cell>
                  <Badge>{STATUS_LABELS[app.status] || app.status}</Badge>
                </Table.Cell>
                <Table.Cell>
                  <Button size="small" variant="secondary">
                    Xem chi tiết
                  </Button>
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
  label: "Đơn đăng ký NCC",
})

export default SupplierApplicationsPage
