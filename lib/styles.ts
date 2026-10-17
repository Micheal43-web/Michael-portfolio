const btn =
  "inline-flex min-h-[54px] items-center justify-center gap-2 rounded-base border-2 border-ink px-6 text-[13px] font-bold uppercase shadow-btn-sm transition-[translate,box-shadow] hover:translate-x-1 hover:translate-y-1 hover:shadow-none disabled:pointer-events-none disabled:opacity-50 md:shadow-btn md:hover:translate-x-1.5 md:hover:translate-y-1.5"

export const btnSolid = `${btn} bg-ink text-paper`
export const btnOutline = `${btn} bg-paper text-ink`
export const btnDanger = `${btn} bg-accent text-[#1A1A1A]`

const field =
  "w-full rounded-base border-2 border-ink bg-paper px-4 text-[13px] text-ink outline-none placeholder:text-ink/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"

export const inputClass = `h-[52px] ${field}`
export const textareaClass = `min-h-[120px] resize-y py-4 leading-normal ${field}`
export const labelClass = "mb-2.5 block text-[11px] font-bold uppercase tracking-[0.08em]"