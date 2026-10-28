import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      // Neumorphic buttons: a filled action is a coloured pad lit from the
      // top-left, and an unfilled one is the page colour extruded out of it.
      // Both press inward on `:active` (see the .neu-* utilities in
      // src/index.css), so the control responds to the thumb, not just hover.
      variant: {
        default:
          "neu-extrude neu-gloss bg-primary text-primary-foreground hover:brightness-[1.06]",
        destructive:
          "neu-extrude neu-gloss bg-destructive text-white hover:brightness-[1.06] focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
        outline:
          "neu-raised-sm text-foreground hover:text-primary",
        secondary: "neu-raised-sm text-secondary-foreground",
        ghost:
          "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      // Touch targets are sized for the smallest screen first and then relaxed
      // from sm up: 44px is the smallest comfortable target for a thumb, while
      // a 36px control is right on a desktop with a mouse.
      size: {
        default: "h-11 px-4 py-2 has-[>svg]:px-3 sm:h-9",
        sm: "h-10 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5 sm:h-8",
        lg: "h-12 rounded-md px-6 has-[>svg]:px-4 sm:h-10",
        icon: "size-11 sm:size-9",
        "icon-sm": "size-10 sm:size-8",
        "icon-lg": "size-12 sm:size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
