import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { getAdminStatus } from "@/lib/auth"
import { AdminSidebar } from "../components/admin/AdminSidebar"
import { AdminShell } from "../components/admin/AdminShell"
import { connection } from "next/server"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  await connection()

  const supabase = await createClient()
  const { user, isAdmin } = await getAdminStatus(supabase)

  if (!user) {
    redirect("/login")
  }

  if (!isAdmin) {
    redirect("/")
  }

  return (
    <AdminShell>
      {children}
    </AdminShell>
  )
}