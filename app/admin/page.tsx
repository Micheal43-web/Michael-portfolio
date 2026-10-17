import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { ProjectsTable, type Row } from "../components/admin/ProjectsTable"
import { btnSolid } from "@/lib/styles"

export default async function AdminPage() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("projects")
    .select("id, title, tech_tags, status, updated_at")
    .order("updated_at", { ascending: false })

  if (error) console.error(error)

  const projects = (data ?? []) as Row[]
  const published = projects.filter(
    (project) => project.status === "published"
  ).length

  const stats = [
    { label: "Total", value: projects.length },
    { label: "Published", value: published },
    { label: "Drafts", value: projects.length - published },
  ]

  return (
    <div className="w-full min-w-0">
      <div className="flex flex-col gap-6 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between">
        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase leading-none tracking-[0.12em] text-accent">
            Content
          </p>

          <h1 className="mt-3 break-words font-display text-4xl font-normal uppercase leading-[0.95] sm:text-6xl md:text-7xl lg:text-8xl">
            Projects
          </h1>
        </div>

        <Link
          href="/admin/projects/new"
          className={`${btnSolid} inline-flex w-full items-center justify-center self-start sm:w-auto sm:self-auto`}
        >
          + Add project
        </Link>
      </div>

      <div className="mt-8 grid w-full max-w-[540px] grid-cols-3 divide-x-2 divide-ink rounded-base border-2 border-ink sm:mt-12 md:mt-16">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="min-w-0 px-2 py-3 sm:px-4 sm:py-4 md:px-6 md:py-[22px]"
          >
            <p className="break-words text-[9px] uppercase opacity-60 sm:text-[10px]">
              {stat.label}
            </p>

            <p className="mt-2 text-sm font-bold sm:mt-2.5">
              {String(stat.value).padStart(2, "0")}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 min-w-0 sm:mt-10">
        {error ? (
          <p role="alert" className="text-xs font-bold text-accent">
            Could not load projects.
          </p>
        ) : (
          <ProjectsTable projects={projects} />
        )}
      </div>
    </div>
  )
}