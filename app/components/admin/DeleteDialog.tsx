"use client"

import { useEffect } from "react"
import { btnDanger, btnOutline } from "@/lib/styles"

type Props = {
  title: string
  deleting: boolean
  error: string
  onCancel: () => void
  onConfirm: () => void
}

export function DeleteDialog({ title, deleting, error, onCancel, onConfirm }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [onCancel])

  return (
    <div
      onClick={onCancel}
      className="fixed inset-0 z-[60] grid place-items-center bg-paper/35 p-5 backdrop-blur-[2px]"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-title"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[520px] rounded-base border-2 border-ink bg-paper p-8 shadow-card-sm md:p-[42px] md:shadow-card"
      >
        <h2
          id="delete-title"
          className="font-display text-[40px] font-normal uppercase leading-[0.95] md:text-[48px]"
        >
          Delete project?
        </h2>

        <p className="mb-8 mt-6 text-[13px] leading-[1.7]">
          <strong>{title}</strong> will be removed permanently. This cannot be undone.
        </p>

        {error && <p role="alert" className="mb-5 text-[11px] font-bold text-accent">{error}</p>}

        <div className="flex flex-wrap gap-3">
          <button type="button" autoFocus onClick={onCancel} className={btnOutline}>Cancel</button>
          <button type="button" onClick={onConfirm} disabled={deleting} className={btnDanger}>
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  )
}