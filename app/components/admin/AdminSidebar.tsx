
"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import {
  Menu,
  X,
  PanelLeftClose,
  PanelLeftOpen,
  FolderKanban,
  ExternalLink,
  LogOut,
  Moon,
  Sun,
} from "lucide-react"
import { supabase } from "@/lib/supabase/client"

type AdminSidebarProps = {
  collapsed: boolean
  onToggleCollapse: () => void
}

export function AdminSidebar({
  collapsed,
  onToggleCollapse,
}: AdminSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [signingOut, setSigningOut] = useState(false)

  const signOut = async () => {
    if (signingOut) return

    setSigningOut(true)

    const { error } = await supabase.auth.signOut()

    if (error) {
      console.error(error)
      setSigningOut(false)
      return
    }

    router.replace("/login")
    router.refresh()
  }

  const projectsActive =
    pathname === "/admin" || pathname.startsWith("/admin/projects")

  const navLinkClass = (active: boolean) =>
    `flex min-h-11 items-center border-2 text-[11px] font-bold uppercase transition-colors ${active
      ? "border-ink bg-sand"
      : "border-transparent hover:border-ink hover:bg-sand/50"
    } ${collapsed
      ? "justify-center px-0 md:px-0"
      : "justify-start gap-3 px-3"
    }`

  const toggle = () => {
    const isDark = document.documentElement.classList.toggle("dark")

  }
  return (
    <>
      {/* Mobile top bar */}
      <header className="flex w-full items-center justify-between border-b-2 border-ink px-4 py-4 md:hidden">
        <Link
          href="/admin"
          className="font-display text-[30px] leading-none tracking-[-1px]"
          onClick={() => setMobileOpen(false)}
        >
          MW<span className="text-accent">.</span>
        </Link>

        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={mobileOpen}
          className="grid size-11 place-items-center border-2 border-ink"
        >
          {mobileOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </header>

      {/* Mobile backdrop */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex h-dvh w-[min(82vw,280px)]
          flex-col overflow-y-auto border-r-2 border-ink bg-paper
          px-5 py-6 transition-[transform,width,padding] duration-300
          ease-in-out md:sticky md:top-0 md:z-20 md:h-screen
          md:translate-x-0 md:py-7
          ${mobileOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
          }
          ${collapsed
            ? "md:w-[76px] md:px-2"
            : "md:w-60 md:px-[30px]"
          }
        `}
      >
        {/* Logo and collapse button */}
        <div
          className={`hidden md:flex ${collapsed
            ? "flex-col items-center gap-5"
            : "items-center justify-between gap-2"
            }`}
        >
          <Link
            href="/admin"
            title="Admin home"
            className="shrink-0 font-display text-[30px] leading-none tracking-[-1px]"
          >
            {collapsed ? (
              <>
                M<span className="text-accent">.</span>
              </>
            ) : (
              <>
                MW<span className="text-accent">.</span>
              </>
            )}
          </Link>

          <button
            type="button"
            onClick={onToggleCollapse}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="grid size-9 shrink-0 place-items-center border-2 border-ink transition-colors hover:bg-sand"
          >
            {collapsed ? (
              <PanelLeftOpen size={17} />
            ) : (
              <PanelLeftClose size={17} />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav
          className={`flex flex-col gap-2 ${collapsed ? "mt-8 md:mt-10" : "mt-8 md:mt-[72px]"
            }`}
        >
          <Link
            href="/admin"
            onClick={() => setMobileOpen(false)}
            title={collapsed ? "Projects" : undefined}
            aria-current={projectsActive ? "page" : undefined}
            className={navLinkClass(projectsActive)}
          >
            <FolderKanban size={18} className="shrink-0" />
            <span className={collapsed ? "md:hidden" : ""}>
              Projects
            </span>
          </Link>

          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            title={collapsed ? "View site" : undefined}
            className={navLinkClass(false)}
          >
            <ExternalLink size={18} className="shrink-0" />
            <span className={collapsed ? "md:hidden" : ""}>
              View site
            </span>
          </Link>
        </nav>


        <div className="mt-auto pt-8 flex gap-3 items-center flex-wrap">

          <button onClick={toggle} className="cursor-pointer rounded-md p-4">
            <Moon className="size-5 dark:hidden" />
            <Sun className="hidden size-5 dark:block" />
          </button>


          {/* Sign out */}
          <button
            type="button"
            onClick={signOut}
            disabled={signingOut}
            title={collapsed ? "Sign out" : undefined}
            className={`flex min-h-11 w-full items-center border-2 border-transparent text-left text-[11px] font-bold uppercase transition-colors hover:border-ink hover:bg-sand disabled:opacity-50 ${collapsed
              ? "justify-center px-0"
              : "justify-start gap-3 px-3"
              }`}
          >
            <LogOut size={18} className="shrink-0" />
            <span className={collapsed ? "md:hidden" : ""}>
              {signingOut ? "Signing out..." : "Sign out"}
            </span>
          </button>
        </div>
      </aside>
    </>
  )
}
