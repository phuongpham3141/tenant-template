"use server"

import { revalidatePath } from "next/cache"
import { requireSession } from "@/lib/session"
import { supplierApi } from "@/lib/sdk/supplier"

export async function followSupplierAction(supplierId: string) {
  await requireSession()
  await supplierApi.follow(supplierId)
  revalidatePath(`/supplier/${supplierId}`)
  return { ok: true }
}

export async function unfollowSupplierAction(supplierId: string) {
  await requireSession()
  await supplierApi.unfollow(supplierId)
  revalidatePath(`/supplier/${supplierId}`)
  return { ok: true }
}
