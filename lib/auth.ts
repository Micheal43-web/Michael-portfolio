import type { SupabaseClient } from "@supabase/supabase-js"

export async function getAdminStatus(supabase: SupabaseClient) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { user: null, isAdmin: false }

  const { data } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle()

  return { user, isAdmin: data?.role === "admin" }
}