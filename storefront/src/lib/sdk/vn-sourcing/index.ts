import { api } from "../../api/client"

export interface InterpreterCard {
  id: string
  user_id: string
  display_name?: string
  languages: string[]
  specialties: string[]
  hourly_rate_usd_minor: string
  rating: number
  total_sessions: number
  bio?: string
}

export interface FactoryVisitDetail {
  id: string
  customer_id: string
  supplier_id: string
  scheduled_date: string
  status: string
  attendees: number
  agenda: string
  interpreter_session_id?: string
  outcome?: string
}

export const vnSourcingApi = {
  interpreters: (params: { language?: string; specialty?: string } = {}) =>
    api<{ interpreters: InterpreterCard[] }>("/store/vn-sourcing/interpreters", { query: params }),
  bookInterpreter: (input: { interpreter_id: string; scheduled_start_at: string; duration_minutes: number; mode: "in_person" | "video" | "phone" | "chat"; context_type: string; currency: string }) =>
    api<{ session: any }>("/store/vn-sourcing/interpreter-sessions", { method: "POST", body: input }),
  scheduleFactoryVisit: (input: { supplier_id: string; scheduled_date: string; attendees: number; agenda: string; interpreter_session_id?: string }) =>
    api<{ visit: FactoryVisitDetail }>("/store/vn-sourcing/factory-visits", { method: "POST", body: input }),
  requestSample: (input: { supplier_id: string; product_id?: string; description: string; quantity: number; shipping_address: any; currency: string }) =>
    api(`/store/vn-sourcing/samples`, { method: "POST", body: input }),
  freightQuotes: (params: { origin_country: string; origin_port: string; dest_country: string; dest_port: string; container_type: string; volume_cbm?: number; weight_kg: number }) =>
    api<{ quotes: any[] }>(`/store/vn-sourcing/freight-quotes`, { query: params }),
}
