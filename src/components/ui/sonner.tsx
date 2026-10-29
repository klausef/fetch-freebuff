import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "color-mix(in oklab, var(--border) 62%, transparent)",
          "--border-radius": "1.25rem",
          boxShadow:
            "0 1px 2px rgb(86 62 45 / 0.05), 0 4px 10px -4px rgb(86 62 45 / 0.06), 0 24px 48px -28px rgb(86 62 45 / 0.34), inset 0 1px 0 rgb(255 255 255 / 0.85)",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
