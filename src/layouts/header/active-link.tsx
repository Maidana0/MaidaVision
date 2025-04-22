"use client"

import { NavigationMenuLink } from "maidana07/components/ui/navigation-menu"
import { navigationMenuTriggerStyle } from "maidana07/components/ui/navigation-menu"
import { usePathname } from "next/navigation"
import cn from "maidana07/utils/cn"

interface ActiveLinkProps {
  href: string
  children: React.ReactNode
}

export default function ActiveLink({ href, children }: ActiveLinkProps) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <NavigationMenuLink
      href={href}
      className={cn(
        navigationMenuTriggerStyle(),
        isActive && "text-primary font-medium"
      )}
    >
      {children}
    </NavigationMenuLink>
  )
}