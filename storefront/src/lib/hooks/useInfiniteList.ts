"use client"

import { useState, useCallback, useEffect } from "react"

interface InfiniteOpts<T> {
  fetchPage: (offset: number, limit: number) => Promise<{ items: T[]; total: number }>
  initial?: T[]
  pageSize?: number
}

export function useInfiniteList<T>({ fetchPage, initial = [], pageSize = 20 }: InfiniteOpts<T>) {
  const [items, setItems] = useState<T[]>(initial)
  const [total, setTotal] = useState<number>(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const hasMore = total > items.length

  const load = useCallback(async () => {
    if (loading || !hasMore) return
    setLoading(true)
    try {
      const res = await fetchPage(items.length, pageSize)
      setItems((prev) => [...prev, ...res.items])
      setTotal(res.total)
    } catch (e: any) {
      setError(e)
    } finally {
      setLoading(false)
    }
  }, [loading, hasMore, items.length, pageSize, fetchPage])

  const reset = useCallback(() => {
    setItems([])
    setTotal(0)
    setError(null)
  }, [])

  useEffect(() => {
    if (items.length === 0 && !loading) load()
  }, [items.length, loading, load])

  return { items, total, loading, error, hasMore, load, reset }
}
