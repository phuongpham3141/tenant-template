import { redirect } from "next/navigation"
import { getSession, type SessionData } from "../session"

export async function requireBuyer(): Promise<SessionData> {
  const session = await getSession()
  if (!session) redirect("/login?reason=auth_required")
  if (!session.roles.some((r) => ["buyer", "dealer", "tenant_admin"].includes(r))) {
    redirect("/?reason=role_mismatch")
  }
  return session
}

export async function requireSupplier(): Promise<SessionData> {
  const session = await getSession()
  if (!session) redirect("/login?reason=auth_required")
  if (!session.roles.some((r) => ["supplier_admin", "supplier_user", "tenant_admin"].includes(r))) {
    redirect("/?reason=role_mismatch")
  }
  return session
}

export async function requireAdmin(): Promise<SessionData> {
  const session = await getSession()
  if (!session) redirect("/login?reason=auth_required")
  if (!session.roles.includes("tenant_admin")) {
    redirect("/?reason=role_mismatch")
  }
  return session
}
