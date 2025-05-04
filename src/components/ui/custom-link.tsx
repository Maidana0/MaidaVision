import cn from 'maidana07/utils/cn'
import Link from 'next/link'
import React, { FC } from 'react'

interface customLinkProps {
  children: React.ReactNode
  href: string
  className?: string
}

const CustomLink: FC<customLinkProps> = ({ href, children, className = "" }) => {
  return (
    <Link href={href}
      className={cn("text-accent-foreground hover:text-primary transition-colors text-md px-2 py-1", className)}
    >
      {children}
    </Link>)
}

export default CustomLink