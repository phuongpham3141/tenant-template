import { Pool, type PoolClient, type QueryResultRow } from "pg"

let pool: Pool | null = null

export function getPool(): Pool {
  if (pool) return pool
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    max: Number(process.env.PG_POOL_MAX ?? 20),
    idleTimeoutMillis: 30_000,
    application_name: "medusa-app",
  })
  pool.on("error", (err) => {
    console.error("PG pool error", err)
  })
  return pool
}

export async function withClient<T>(fn: (c: PoolClient) => Promise<T>): Promise<T> {
  const client = await getPool().connect()
  try {
    return await fn(client)
  } finally {
    client.release()
  }
}

export interface TenantContext {
  tenantId: string
  userId?: string | null
  bypassRls?: boolean
}

export async function withTenant<T>(ctx: TenantContext, fn: (c: PoolClient) => Promise<T>): Promise<T> {
  return withClient(async (client) => {
    await client.query("BEGIN")
    try {
      await client.query("SET LOCAL app.current_tenant = $1", [ctx.tenantId])
      if (ctx.userId) {
        await client.query("SET LOCAL app.current_user = $1", [ctx.userId])
      }
      if (ctx.bypassRls) {
        await client.query("SET LOCAL role = 'csr_admin'")
      }
      const result = await fn(client)
      await client.query("COMMIT")
      return result
    } catch (err) {
      await client.query("ROLLBACK")
      throw err
    }
  })
}

export async function queryT<R extends QueryResultRow>(
  ctx: TenantContext,
  text: string,
  params: unknown[] = []
): Promise<R[]> {
  return withTenant(ctx, async (client) => {
    const res = await client.query<R>(text, params)
    return res.rows
  })
}
