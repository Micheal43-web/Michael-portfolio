// app/api/health/route.ts
import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET() {
  const env = {
    url: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    key: !!process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  }
  if (!env.url || !env.key) return NextResponse.json({ ok: false, env })

  try {
    const supabase = await createClient()
    const { data, error } = await supabase.from("projects").select("id").limit(5)
    return NextResponse.json({ ok: !error, env, error: error?.message ?? null, rows: data?.length ?? 0 })
  } catch (e) {
    return NextResponse.json({ ok: false, env, thrown: String(e) })
  }
}