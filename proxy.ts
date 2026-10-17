import { NextResponse, type NextRequest } from "next/server"
import { createServerClient } from "@supabase/ssr"
import { getAdminStatus } from "@/lib/auth"

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (list) => {
          list.forEach(({ name, value }) => request.cookies.set(name, value))
          response = NextResponse.next({ request })
          list.forEach(({ name, value, options }) => response.cookies.set(name, value, options))
        },
      },
    }
  )

  const { user, isAdmin } = await getAdminStatus(supabase)
  const { pathname } = request.nextUrl

  const redirectTo = (path: string) => {
    const res = NextResponse.redirect(new URL(path, request.url))
    response.cookies.getAll().forEach((c) => res.cookies.set(c))
    return res
  }

  if (pathname.startsWith("/admin")) {
    if (!user) return redirectTo("/login")   // مش مسجل دخول
    if (!isAdmin) return redirectTo("/")      // مسجل بس مش أدمن
  }

  if (pathname === "/login" && isAdmin) return redirectTo("/admin")

  return response
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
}