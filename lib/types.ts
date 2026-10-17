export type Project = {
  id: string
  title: string
  short_description: string | null
  overview: string | null
  tech_tags: string[]
  live_url: string | null
  github_url: string | null
  cover_url: string | null
  status: "draft" | "published"
  created_at: string
  updated_at: string
  icon: string
}

export type PreviewProject = {
  id: string
  title: string

  tech_tags: string[]
  icon: string
  short_description: string
}