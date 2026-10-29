import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground/80 selection:bg-primary selection:text-primary-foreground h-11 w-full min-w-0 rounded-2xl border border-border/50 bg-muted/55 px-4 py-2 text-base shadow-inset-soft transition-all duration-200 outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm sm:h-9 dark:border-white/[0.06] dark:bg-input/40",
        "focus-visible:border-ring/45 focus-visible:bg-card focus-visible:shadow-soft-sm focus-visible:ring-[3px] focus-visible:ring-ring/25",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Input }
