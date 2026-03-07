import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border-2 px-2 py-0.5 text-xs font-display transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-border bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-border bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-border bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        tierno: "border-[#ff9ecd] bg-[#ff9ecd]/20 text-[#ff6b9d] pixel-border-light",
        epico: "border-[#8b5cf6] bg-[#8b5cf6]/20 text-[#a78bfa] pixel-border-light",
        ridiculo: "border-[#fbbf24] bg-[#fbbf24]/20 text-[#fbbf24] pixel-border-light",
        elegante: "border-[#06b6d4] bg-[#06b6d4]/20 text-[#22d3ee] pixel-border-light",
        anime: "border-[#f472c6] bg-[#f472c6]/20 text-[#f9a8d4] pixel-border-light",
        medieval: "border-[#a3e635] bg-[#a3e635]/20 text-[#bef264] pixel-border-light",
        oscuro: "border-[#6366f1] bg-[#6366f1]/20 text-[#818cf8] pixel-border-light",
        magico: "border-[#c084fc] bg-[#c084fc]/20 text-[#d8b4fe] pixel-border-light",
        futurista: "border-[#38bdf8] bg-[#38bdf8]/20 text-[#7dd3fc] pixel-border-light",
        noble: "border-[#fbbf24] bg-[#fbbf24]/20 text-[#fcd34d] pixel-border-light",
        comic: "border-[#fb923c] bg-[#fb923c]/20 text-[#fdba74] pixel-border-light",
        misterioso: "border-[#64748b] bg-[#64748b]/20 text-[#94a3b8] pixel-border-light",
        salvaje: "border-[#ef4444] bg-[#ef4444]/20 text-[#f87171] pixel-border-light",
        mascota: "border-[#10b981] bg-[#10b981]/20 text-[#34d399] pixel-border-light",
        personaje: "border-[#3b82f6] bg-[#3b82f6]/20 text-[#60a5fa] pixel-border-light",
        npc: "border-[#8b5cf6] bg-[#8b5cf6]/20 text-[#a78bfa] pixel-border-light",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
