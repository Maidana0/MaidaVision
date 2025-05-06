import cn from "maidana07/utils/cn"
import { HTMLAttributes } from "react"

export function Section({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLElement>) {
  return (
    <section className={cn("py-14 md:py-22 md:px-5 px-2.5", className)} {...props}>
      {children}
    </section>
  )
}
