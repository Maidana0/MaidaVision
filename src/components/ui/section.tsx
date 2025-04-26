import cn from "maidana07/utils/cn"
import { HTMLAttributes } from "react"

export function Section({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLElement>) {
  return (
    <section className={cn("py-16 md:py-24", className)} {...props}>
      {children}
    </section>
  )
}
