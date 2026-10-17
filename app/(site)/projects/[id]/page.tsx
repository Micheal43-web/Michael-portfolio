import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { btnOutline, btnSolid } from "@/lib/styles"
import type { Project } from "@/lib/types"
import SkillTag from "@/app/components/SkillTag"

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .eq("status", "published")
    .maybeSingle()

  if (!data) notFound()
  const project = data as Project

  return (
    <main className="mx-auto w-[calc(100%-40px)] max-w-[1280px] py-10 md:w-[calc(100%-80px)] md:py-16">
      <Link href="/#work" className="inline-flex items-center gap-2 text-xs font-bold uppercase">
        <ArrowLeft className="size-4" aria-hidden /> Back to work
      </Link>

      <h1 className="mt-16 font-display text-[56px] font-normal uppercase leading-[0.92] tracking-[-0.025em] md:mt-24 md:text-[clamp(88px,10vw,146px)] md:leading-[0.9]">
        {project.title}
      </h1>

      {project.short_description && (
        <p className="mt-8 max-w-[750px] text-sm leading-[1.65] md:text-lg">{project.short_description}</p>
      )}

      {project.tech_tags.length > 0 && (
        <ul className="mt-8 flex flex-wrap gap-2">
          {project.tech_tags.map((tag) => (
            <SkillTag title={tag} key={tag}/>
          ))}
        </ul>
      )}

      {(project.live_url || project.github_url) && (
        <div className="mt-10 flex flex-wrap gap-3.5">
          {project.live_url && (
            <a href={project.live_url} target="_blank" rel="noopener noreferrer" className={btnSolid}>
              Live demo <ArrowUpRight className="size-4" aria-hidden />
            </a>
          )}
          {project.github_url && (
            <a href={project.github_url} target="_blank" rel="noopener noreferrer" className={btnOutline}>
              GitHub <ArrowUpRight className="size-4" aria-hidden />
            </a>
          )}
        </div>
      )}

      {project.cover_url && (
        <img
          src={project.cover_url}
          alt={project.title}
          className="mt-16 w-full rounded-base border-2 border-ink shadow-card-sm md:mt-24 md:shadow-card"
        />
      )}

      {project.overview && (
        <section className="mt-16 border-t-2 border-ink pt-12 md:mt-24 md:pt-16">
          <h2 className="font-display text-[48px] font-normal uppercase leading-[0.9] md:text-[54px]">Overview</h2>
          <p className="mt-8 max-w-[700px] whitespace-pre-line text-sm leading-[1.75] md:text-base">
            {project.overview}
          </p>
        </section>
      )}
      {project.short_description && (
        <section className="mt-16 border-t-2 border-ink pt-12 md:mt-24 md:pt-16">
          <h2 className="font-display text-[48px] font-normal uppercase leading-[0.9] md:text-[54px]">SHORT DESCRIPTION</h2>
          <p className="mt-8 max-w-[700px] whitespace-pre-line text-sm leading-[1.75] md:text-base">
            {project.short_description}
          </p>
        </section>
      )}
    </main>
  )
}