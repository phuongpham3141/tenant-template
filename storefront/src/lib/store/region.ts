import { store } from "./sdk"

export type StoreRegion = { id: string; currency_code: string; name: string }

let cache: Promise<StoreRegion> | null = null

// Lấy region VND (theo currency, không hardcode id để dùng chung staging/prod).
export function getRegion(): Promise<StoreRegion> {
  if (!cache) {
    cache = store.region
      .list()
      .then(({ regions }: any) => {
        const vnd = regions.find((r: any) => r.currency_code === "vnd")
        return (vnd ?? regions[0]) as StoreRegion
      })
      .catch((e: unknown) => {
        cache = null
        throw e
      })
  }
  return cache
}
