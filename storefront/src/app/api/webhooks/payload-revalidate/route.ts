import { NextResponse } from "next/server"
import { revalidateTag, revalidatePath } from "next/cache"

const SECRET = process.env.PAYLOAD_REVALIDATE_TOKEN ?? ""

export async function POST(req: Request) {
  if (req.headers.get("x-revalidate-token") !== SECRET) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 })
  }
  const body = (await req.json()) as { collection?: string; slug?: string; tag?: string; path?: string }
  const collection = body.collection
  if (body.tag) revalidateTag(body.tag)
  if (body.path) revalidatePath(body.path)
  if (collection === "blog-articles" && body.slug) revalidatePath(`/blog/${body.slug}`)
  if (collection === "pages" && body.slug) revalidatePath(`/${body.slug}`)
  if (collection === "banners") revalidateTag("banners")
  if (collection === "navigation") revalidateTag("navigation")
  if (collection === "footer") revalidateTag("footer")
  if (collection === "site-settings") revalidateTag("site-settings")
  return NextResponse.json({ ok: true })
}
