"use client"

import { useState } from "react"
import { AdminSidebar } from "./AdminSidebar"

export function AdminShell({
  children,
}: {
  children: React.ReactNode
}) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="flex min-h-screen w-full min-w-0 flex-col bg-paper md:h-screen md:flex-row md:overflow-hidden">
      <AdminSidebar
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((value) => !value)}
      />

      <main className="min-w-0 flex-1 overflow-x-hidden px-4 py-6 sm:px-6 sm:py-8 md:overflow-y-auto md:px-8 md:py-10 lg:px-10">
        {children}
      </main>
    </div>
  )
}