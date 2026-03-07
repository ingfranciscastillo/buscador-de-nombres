import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-display transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 pixel-shadow-sm active:translate-y-0.5 active:shadow-none",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 pixel-border",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 pixel-border",
        outline: "border-2 border-border bg-transparent hover:bg-secondary hover:text-secondary-foreground pixel-border",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 pixel-border",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        retro: "bg-gradient-to-r from-[#6b5fff] to-[#ff6b9d] text-white hover:from-[#5b4fef] hover:to-[#ff5b8d] pixel-border pixel-glow",
        success: "bg-[#00ff88] text-black hover:bg-[#00e677] pixel-border",
        warning: "bg-[#ffcc00] text-black hover:bg-[#e6b800] pixel-border",
      },
      size: {
        default: "h-10 px-4 py-2 text-xs",
        sm: "h-8 px-3 text-xs",
        lg: "h-12 px-6 text-sm",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
