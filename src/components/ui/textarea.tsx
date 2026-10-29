import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "placeholder:text-muted-foreground/80 flex field-sizing-content min-h-20 w-full rounded-2xl border border-border/50 bg-muted/55 px-4 py-3 text-base shadow-inset-soft transition-all duration-200 outline-none focus-visible:border-ring/45 focus-visible:bg-card focus-visible:shadow-soft-sm focus-visible:ring-[3px] focus-visible:ring-ring/25 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:border-white/[0.06] dark:bg-input/40",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
