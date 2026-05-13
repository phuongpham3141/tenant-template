export interface Interpreter {
  id: string
  tenantId: string
  userId: string
  languages: Array<"vi" | "en" | "zh" | "yue">
  specialties: string[]
  hourlyRateUsdMinor: bigint
  rating: number
  totalSessions: number
  status: "active" | "busy" | "vacation" | "inactive"
  bio?: string
}

export interface InterpreterSession {
  id: string
  tenantId: string
  customerId: string
  interpreterId: string
  scheduledStartAt: Date
  durationMinutes: number
  mode: "in_person" | "video" | "phone" | "chat"
  contextType: "factory_visit" | "negotiation" | "trade_show" | "phone_call" | "other"
  status: "requested" | "confirmed" | "in_progress" | "completed" | "cancelled" | "no_show"
  totalCostMinor: bigint
  currency: string
  feedbackRating?: number
  recordingUrl?: string
}

export interface FactoryVisit {
  id: string
  tenantId: string
  customerId: string
  supplierId: string
  scheduledDate: Date
  interpreterSessionId?: string
  attendees: number
  agenda: string
  status: "requested" | "scheduled" | "in_progress" | "completed" | "cancelled"
  meetingNotes?: string
  outcome?: "rfq_created" | "sample_requested" | "mou_signed" | "no_progress"
  photoUrls: string[]
  videoUrl?: string
}

export interface AuditReport {
  id: string
  tenantId: string
  supplierId: string
  auditType: "factory_audit" | "social_audit" | "quality_audit" | "environmental"
  auditorAgency: string
  scheduledDate: Date
  completedDate?: Date
  overallScore?: number
  passFail?: "pass" | "conditional" | "fail"
  reportPdfUrl?: string
  certificateUrl?: string
  expiresAt?: Date
  findings: Array<{ category: string; severity: "minor" | "major" | "critical"; description: string; correctiveAction?: string }>
}

export interface MouContract {
  id: string
  tenantId: string
  customerId: string
  supplierId: string
  status: "draft" | "negotiating" | "signed" | "active" | "terminated" | "expired"
  startDate: Date
  endDate: Date
  terms: Record<string, unknown>
  signedPdfUrl?: string
  totalCommittedUsdMinor: bigint
}

export interface SampleRequest {
  id: string
  tenantId: string
  customerId: string
  supplierId: string
  productId?: string
  description: string
  quantity: number
  shippingAddress: Record<string, unknown>
  sampleFeeMinor: bigint
  shippingFeeMinor: bigint
  currency: string
  status: "requested" | "approved" | "shipped" | "delivered" | "rejected"
  trackingNumber?: string
  receivedAt?: Date
  feedbackRating?: number
}

export interface FreightQuote {
  id: string
  tenantId: string
  customerId: string
  originCountry: string
  originPort: string
  destCountry: string
  destPort: string
  containerType: "20ft" | "40ft" | "40hq" | "lcl" | "air"
  volumeCbm?: number
  weightKg: number
  forwarderName: string
  priceUsdMinor: bigint
  transitDays: number
  validUntil: Date
}
