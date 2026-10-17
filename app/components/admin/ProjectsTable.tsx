"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Pencil, Trash2 } from "lucide-react"
import { supabase } from "@/lib/supabase/client"
import { DeleteDialog } from "./DeleteDialog"
import type { Project } from "@/lib/types"

export type Row = Pick<
  Project,
  "id" | "title" | "tech_tags" | "status" | "updated_at"
>

const cols =
  "grid grid-cols-[minmax(180px,1.45fr)_minmax(160px,1.25fr)_minmax(100px,0.8fr)_minmax(130px,1fr)_90px] gap-4 px-4 py-4 sm:gap-5 sm:px-6 sm:py-[18px]"

const iconBtn =
  "grid size-[34px] shrink-0 place-items-center rounded-base border-2 border-ink bg-paper text-ink transition-colors hover:bg-ink hover:text-paper disabled:cursor-not-allowed disabled:opacity-50"

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  })

export function ProjectsTable({ projects }: { projects: Row[] }) {
  const router = useRouter()

  const [toDelete, setToDelete] = useState<Row | null>(null)
  const [deleting, setDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState("")

  const confirmDelete = async () => {
    if (!toDelete || deleting) return

    setDeleting(true)
    setDeleteError("")

    try {
      const { error } = await supabase
        .from("projects")
        .delete()
        .eq("id", toDelete.id)

      if (error) {
        console.error(error)
        setDeleteError("Could not delete the project.")
        return
      }

      setToDelete(null)
      router.refresh()
    } catch (error) {
      console.error(error)
      setDeleteError("An unexpected error occurred.")
    } finally {
      setDeleting(false)
    }
  }

  return (
    <>
      {/* الإطار والظل ثابتين، والسكرول جوه بس */}
      <div className="w-full min-w-0 rounded-base border-2 border-ink bg-paper shadow-card-sm md:shadow-card">
        {/* منطقة السكرول الأفقي */}
        <div
          role="region"
          aria-label="Projects table"
          tabIndex={0}
          className="overflow-x-auto overscroll-x-contain focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {/* الحد الأدنى للعرض: بيخلي الهيدر والخطوط تمتد مع الأعمدة */}
          <div className="min-w-[900px]">
            <div className={`${cols} bg-sand text-[10px] font-bold uppercase`}>
              <span>Title</span>
              <span>Tags</span>
              <span>Status</span>
              <span>Updated</span>
              <span>Actions</span>
            </div>

            {projects.length === 0 && (
              <p className="border-t-2 border-ink px-6 py-10 text-xs uppercase">
                No projects yet.
              </p>
            )}

            {projects.map((project) => (
              <div
                key={project.id}
                className={`${cols} items-center border-t-2 border-ink`}
              >
                <span className="break-words text-[13px] font-bold">
                  {project.title}
                </span>

                <ul className="flex flex-wrap gap-1.5">
                  {project.tech_tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-base border border-ink px-1.5 py-1 text-[10px] uppercase"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>

                <span>
                  <span
                    className={`inline-block rounded-base border-2 border-ink px-2 py-1.5 text-[10px] font-bold uppercase ${
                      project.status === "published"
                        ? "bg-ink text-paper"
                        : "bg-sand text-ink"
                    }`}
                  >
                    {project.status}
                  </span>
                </span>

                <span className="text-[11px] uppercase">
                  {formatDate(project.updated_at)}
                </span>

                <div className="flex gap-2">
                  <Link
                    href={`/admin/projects/${project.id}/edit`}
                    aria-label={`Edit ${project.title}`}
                    className={iconBtn}
                  >
                    <Pencil className="size-4" aria-hidden="true" />
                  </Link>

                  <button
                    type="button"
                    aria-label={`Delete ${project.title}`}
                    onClick={() => {
                      setDeleteError("")
                      setToDelete(project)
                    }}
                    className={iconBtn}
                    disabled={deleting}
                  >
                    <Trash2 className="size-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {toDelete && (
        <DeleteDialog
          title={toDelete.title}
          deleting={deleting}
          error={deleteError}
          onCancel={() => {
            if (!deleting) setToDelete(null)
          }}
          onConfirm={confirmDelete}
        />
      )}
    </>
  )
}