"use client"

import { ICON_KEYS, PROJECT_ICONS, type IconKey } from "@/lib/project-icons"

export function IconPicker({
  value,
  onChange,
}: {
  value: string
  onChange: (key: IconKey) => void
}) {
  return (
    <div role="radiogroup" aria-label="Project icon" className="grid grid-cols-6 gap-2">
      {ICON_KEYS.map((key) => {
        const Icon = PROJECT_ICONS[key]
        const selected = value === key
        const label = key.replace(/-/g, " ")

        return (
          <button
            key={key}
            type="button"
            role="radio"
            aria-checked={selected}
            aria-label={label}
            title={label}
            onClick={() => onChange(key)}
            className={`grid aspect-square place-items-center rounded-base border-2 border-ink transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
              selected ? "bg-ink text-paper" : "bg-sand text-ink hover:bg-paper"
            }`}
          >
            <Icon className="size-5" aria-hidden />
          </button>
        )
      })}
    </div>
  )
}