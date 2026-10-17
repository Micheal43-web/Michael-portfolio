"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ImageUp, X } from "lucide-react"
import { supabase } from "@/lib/supabase/client"
import { btnOutline, btnSolid, inputClass, labelClass, textareaClass } from "@/lib/styles"
import type { Project } from "@/lib/types"
import { IconPicker } from "./IconPicker"
import { DEFAULT_ICON } from "@/lib/project-icons"

type Status = Project["status"]
const MAX_COVER = 5 * 1024 * 1024

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: ReactNode }) {
  return (
    <div className="mb-[26px]">
      <label htmlFor={htmlFor} className={labelClass}>{label}</label>
      {children}
    </div>
  )
}

export function ProjectForm({ project }: { project?: Project }) {
  const router = useRouter()
  const intent = useRef<Status>("draft")

  const [title, setTitle] = useState(project?.title ?? "")
  const [shortDescription, setShortDescription] = useState(project?.short_description ?? "")
  const [overview, setOverview] = useState(project?.overview ?? "")
  const [tags, setTags] = useState<string[]>(project?.tech_tags ?? [])
  const [tagInput, setTagInput] = useState("")
  const [liveUrl, setLiveUrl] = useState(project?.live_url ?? "")
  const [githubUrl, setGithubUrl] = useState(project?.github_url ?? "")
  const [coverFile, setCoverFile] = useState<File | null>(null)
  const [coverPreview, setCoverPreview] = useState<string | null>(project?.cover_url ?? null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [icon, setIcon] = useState<string>(project?.icon ?? DEFAULT_ICON)

  // تنظيف الـblob URLs اللي إحنا عملناها بس
  useEffect(() => {
    return () => {
      if (coverPreview?.startsWith("blob:")) URL.revokeObjectURL(coverPreview)
    }
  }, [coverPreview])

  const addTag = () => {
    const value = tagInput.trim()
    if (!value) return
    if (!tags.some((t) => t.toLowerCase() === value.toLowerCase())) setTags([...tags, value])
    setTagInput("")
  }

  const removeTag = (tag: string) => setTags(tags.filter((t) => t !== tag))

  const onCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    e.target.value = ""
    if (!file) return

    if (file.size > MAX_COVER) {
      setError("Cover image must be under 5 MB.")
      return
    }

    setError("")
    setCoverFile(file)
    setCoverPreview(URL.createObjectURL(file))
  }

  const removeCover = () => {
    setCoverFile(null)
    setCoverPreview(null)
  }

  const uploadCover = async (file: File) => {
    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg"
    const path = `${crypto.randomUUID()}.${ext}`

    const { error } = await supabase.storage
      .from("project-covers")
      .upload(path, file, { contentType: file.type })
    if (error) throw error

    return supabase.storage.from("project-covers").getPublicUrl(path).data.publicUrl
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError("")

    try {
      // لو مفيش ملف جديد، يفضل الغلاف القديم (أو null لو اتشال)
      let coverUrl: string | null = coverPreview && !coverFile ? project?.cover_url ?? null : null
      if (coverFile) coverUrl = await uploadCover(coverFile)

      const payload = {
        title: title.trim(),
        short_description: shortDescription.trim() || null,
        overview: overview.trim() || null,
        tech_tags: tags,
        icon,                                   // ← جديد
        live_url: liveUrl.trim() || null,
        github_url: githubUrl.trim() || null,
        cover_url: coverUrl,
        status: intent.current,
      }

      const { error } = project
        ? await supabase.from("projects").update(payload).eq("id", project.id)
        : await supabase.from("projects").insert(payload)

      if (error) throw error

      router.push("/admin")
      router.refresh()
    } catch (err) {
      console.log(err)
      setError("Something went wrong. Check the console for details.")
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-[1200px]">
      <div className="flex flex-wrap items-end justify-between gap-6 border-b-2 border-ink pb-10">
        <div>
          <Link href="/admin" className="text-xs font-bold uppercase">← Back</Link>
          <h1 className="mt-8 font-display text-[56px] font-normal uppercase leading-[0.9] md:text-[76px]">
            {project ? "Edit project" : "New project"}
          </h1>
        </div>

        <div className="flex flex-wrap gap-3.5">
          <button type="submit" disabled={submitting} onClick={() => (intent.current = "draft")} className={btnOutline}>
            Save draft
          </button>
          <button type="submit" disabled={submitting} onClick={() => (intent.current = "published")} className={btnSolid}>
            {submitting ? "Saving..." : "Publish"}
          </button>
        </div>
      </div>

      {error && <p role="alert" className="mt-6 text-[11px] font-bold text-accent">{error}</p>}

      <div className="mt-[58px] grid gap-x-[72px] md:grid-cols-[1.15fr_0.85fr]">
        {/* العمود الأيسر */}
        <div>
          <Field label="Title" htmlFor="title">
            <input id="title" required value={title} onChange={(e) => setTitle(e.target.value)}
              placeholder="Inventory Management" className={inputClass} />
          </Field>

          <Field label="Short description" htmlFor="short">
            <textarea id="short" value={shortDescription} onChange={(e) => setShortDescription(e.target.value)}
              placeholder="A concise one-line project summary" className={textareaClass} />
          </Field>

          <Field label="Overview" htmlFor="overview">
            <textarea id="overview" value={overview} onChange={(e) => setOverview(e.target.value)}
              placeholder="What it does, and the hardest part you solved." className={`${textareaClass} min-h-[200px]`} />
          </Field>
        </div>

        {/* العمود الأيمن */}
        <div>
          <p className={labelClass}>Cover image</p>
          <div className="mb-[26px]">
            {coverPreview ? (
              <div className="relative overflow-hidden rounded-base border-2 border-ink bg-sand">
                <img src={coverPreview} alt="Cover preview" className="aspect-[4/3] w-full object-cover" />
                <button type="button" onClick={removeCover}
                  className="absolute right-3 top-3 rounded-base border-2 border-ink bg-paper px-2.5 py-2 text-[10px] font-bold uppercase">
                  Remove
                </button>
              </div>
            ) : (
              <label htmlFor="cover"
                className="grid min-h-[230px] cursor-pointer place-items-center rounded-base border-2 border-dashed border-ink bg-sand text-center">
                <span className="flex flex-col items-center gap-3">
                  <ImageUp className="size-6" aria-hidden />
                  <span className="text-xs font-semibold uppercase">Upload cover</span>
                  <span className="text-[10px] uppercase opacity-60">PNG, JPG or WEBP / max 5 MB</span>
                </span>
              </label>
            )}
            <input id="cover" type="file" accept="image/png,image/jpeg,image/webp"
              onChange={onCoverChange} className="sr-only" />
          </div>

          <div className="mb-[26px]">
            <p className={labelClass}>Icon</p>
            <IconPicker value={icon} onChange={setIcon} />
          </div>

          <Field label="Tech tags" htmlFor="tags">
            <div className="rounded-base border-2 border-ink p-3">
              {tags.length > 0 && (
                <ul className="mb-3 flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <li key={tag}
                      className="flex items-center gap-1.5 rounded-base border-2 border-ink bg-sand py-1.5 pl-2 pr-1.5 text-[11px] font-semibold uppercase">
                      {tag}
                      <button type="button" onClick={() => removeTag(tag)} aria-label={`Remove ${tag}`}>
                        <X className="size-3" aria-hidden />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              <div className={`flex items-center gap-2 ${tags.length > 0 ? "border-t border-ink pt-2.5" : ""}`}>
                <input id="tags" value={tagInput} onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === ",") {
                      e.preventDefault()
                      addTag()
                    }
                  }}
                  placeholder="Type a tag"
                  className="h-10 min-w-0 flex-1 bg-transparent px-1 text-[13px] outline-none placeholder:text-ink/40" />
                <button type="button" onClick={addTag}
                  className="h-10 rounded-base bg-ink px-4 text-[10px] font-bold uppercase text-paper">
                  Add
                </button>
              </div>
            </div>
          </Field>

          <Field label="Live URL" htmlFor="live">
            <input id="live" type="url" value={liveUrl} onChange={(e) => setLiveUrl(e.target.value)}
              placeholder="https://" className={inputClass} />
          </Field>

          <Field label="GitHub URL" htmlFor="github">
            <input id="github" type="url" value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)}
              placeholder="https://github.com/" className={inputClass} />
          </Field>
        </div>
      </div>
    </form>
  )
}