"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase/client"
import Header from "../components/Header"


const inputClass =
  "h-[52px] w-full rounded-base border-2 border-ink bg-paper px-4 text-[13px] text-ink outline-none placeholder:text-ink/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError("")

    const { data, error } = await supabase.auth.signInWithPassword({ email: email, password: password })

    if (error || !data.user) {
      console.log("LOGIN ERROR:", error?.status, error?.code, error?.message)
      setError("Email or password is incorrect.")
      setSubmitting(false)
      return
    }

    // الدخول صح، بس لازم يكون أدمن كمان
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", data.user.id)
      .maybeSingle()

    if (profile?.role !== "admin") {
      await supabase.auth.signOut()
      setError("This account has no admin access.")
      setSubmitting(false)
      return
    }

    router.replace("/admin")
    router.refresh()
  }

  return (
    <>
      <div className="flex-flex-col px-15">
        <Header />
        <main className="relative grid min-h-screen place-items-center px-5 py-24">


          <form
            onSubmit={handleSubmit}
            className="w-full max-w-[500px] rounded-base border-2 border-ink bg-paper px-6 py-[30px] md:p-12 shadow-card"
          >
            <p className="text-[10px] font-bold uppercase leading-none tracking-[0.12em] text-accent">Secure area</p>
            <h1 className="mt-[18px] mb-9 font-display text-[56px] font-normal uppercase leading-[0.9] md:mb-11 md:text-[76px]">
              Admin
            </h1>

            <div className="mb-[26px]">
              <label htmlFor="email" className="mb-2.5 block text-[11px] font-bold uppercase tracking-[0.08em]">Email</label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className={`${inputClass} ${error ? "border-accent" : ""}`}
              />
            </div>

            <div className="mb-[26px]">
              <label htmlFor="password" className="mb-2.5 block text-[11px] font-bold uppercase tracking-[0.08em]">Password</label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`${inputClass} ${error ? "border-accent" : ""}`}
              />
            </div>

            {error && (
              <p role="alert" className="-mt-1.5 mb-[22px] text-[11px] font-bold text-accent">{error}</p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="min-h-[54px] w-full rounded-base border-2 border-ink bg-ink px-6 text-[13px] font-bold uppercase text-paper shadow-btn-sm transition-[translate,box-shadow] hover:translate-x-1 hover:translate-y-1 hover:shadow-none disabled:opacity-50 md:shadow-btn md:hover:translate-x-1.5 md:hover:translate-y-1.5"
            >
              {submitting ? "Signing in..." : "Sign in"}
            </button>

            <Link href="/" className="mt-[34px] inline-block text-xs font-bold uppercase">
              ← Back to site
            </Link>
          </form>
        </main>
      </div>
    </>
  )
}