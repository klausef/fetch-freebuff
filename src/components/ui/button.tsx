import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold tracking-tight transition-all duration-200 ease-soft disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/35 focus-visible:ring-[3px] focus-visible:ring-offset-2 focus-visible:ring-offset-background aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary bg-linear-to-b from-white/10 to-transparent text-primary-foreground shadow-soft-sm hover:-translate-y-px hover:bg-primary/95 hover:shadow-soft active:translate-y-0 active:shadow-inset-soft",
        destructive:
          "bg-destructive bg-linear-to-b from-white/10 to-transparent text-white shadow-soft-sm hover:-translate-y-px hover:bg-destructive/95 hover:shadow-soft focus-visible:ring-destructive/25 active:translate-y-0 active:shadow-inset-soft",
        outline:
          "border border-border/55 bg-card text-foreground shadow-soft-sm hover:-translate-y-px hover:border-border/80 hover:shadow-soft active:translate-y-0 active:shadow-inset-soft",
        secondary:
          "border border-border/40 bg-secondary text-secondary-foreground shadow-soft-sm hover:-translate-y-px hover:bg-secondary/90 hover:shadow-soft active:translate-y-0 active:shadow-inset-soft dark:border-white/5",
        ghost:
          "text-foreground hover:bg-foreground/[0.06] active:bg-foreground/[0.09]",
        link: "text-primary underline-offset-4 hover:underline",
      },
      // Touch targets are sized for the smallest screen first and then relaxed
      // from sm up: 44px is the smallest comfortable target for a thumb, while
      // a 36px control is right on a desktop with a mouse.
      size: {
        default: "h-11 px-4 py-2 has-[>svg]:px-3 sm:h-9",
        sm: "h-10 gap-1.5 px-3 has-[>svg]:px-2.5 sm:h-8",
        lg: "h-12 px-6 has-[>svg]:px-4 sm:h-10",
        icon: "size-11 sm:size-9",
        "icon-sm": "size-10 sm:size-8",
        "icon-lg": "size-12 sm:size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
