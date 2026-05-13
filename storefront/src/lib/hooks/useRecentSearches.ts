"use client"

import { useCallback, useEffect, useState } from "react"

const STORAGE_KEY = "csr_recent_searches_v1"
const MAX_ITEMS = 10
const MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000

interface RecentSearch {
  query: string
  at: number
}

function load(): RecentSearch[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as RecentSearch[]
    if (!Array.isArray(parsed)) return []
    const cutoff = Date.now() - MAX_AGE_MS
    return parsed.filter((r) => r && r.query && r.at >= cutoff)
  } catch {
    return []
  }
}

function persist(items: RecentSearch[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items.slice(0, MAX_ITEMS)))
  } catch {
    // ignore (private mode / quota)
  }
}

export function useRecentSearches() {
  const [items, setItems] = useState<RecentSearch[]>([])

  useEffect(() => {
    setItems(load())
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) setItems(load())
    }
    window.addEventListener("storage", onStorage)
    return () => window.removeEventListener("storage", onStorage)
  }, [])

  const add = useCallback((query: string) => {
    const trimmed = query.trim()
    if (!trimmed) return
    setItems((cur) => {
      const filtered = cur.filter((r) => r.query.toLowerCase() !== trimmed.toLowerCase())
      const next = [{ query: trimmed, at: Date.now() }, ...filtered].slice(0, MAX_ITEMS)
      persist(next)
      return next
    })
  }, [])

  const remove = useCallback((query: string) => {
    setItems((cur) => {
      const next = cur.filter((r) => r.query !== query)
      persist(next)
      return next
    })
  }, [])

  const clear = useCallback(() => {
    persist([])
    setItems([])
  }, [])

  return { items, add, remove, clear }
}
