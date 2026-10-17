import { getProjectIcon } from "@/lib/project-icons"

export function ProjectIcon({
  name,
  className = "size-7",
}: {
  name?: string | null
  className?: string
}) {
  const Icon = getProjectIcon(name)
  return <Icon className={className} aria-hidden />
}