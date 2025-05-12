import cn from 'maidana07/utils/cn'
import Link from 'next/link'
import { ComponentProps, FC } from 'react'
import { cva, type VariantProps } from "class-variance-authority"


interface customLinkProps extends ComponentProps<"a">, VariantProps<typeof linkVariants> {

}

const linkVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
  {
    variants: {
      variant: {
        default:
          "text-accent-foreground hover:text-primary transition-colors text-md px-2 py-1",
        button:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md px-3 gap-1.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)







const CustomLink: FC<customLinkProps> = ({ variant, size, href = "#", className = "", ...props }) => {
  return (
    <Link
      href={href}
      data-slot={"link"}
      className={cn(linkVariants({ variant, size, className }))}

      // className={cn("text-accent-foreground hover:text-primary transition-colors text-md px-2 py-1", className)}
      {...props}
    />
  )
}

export default CustomLink