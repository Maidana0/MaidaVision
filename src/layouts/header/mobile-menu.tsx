"use client"

import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "maidana07/components/ui/sheet"
import { Button } from "maidana07/components/ui/button"
import links from "./links.json"
import Logo from "./logo"

export default function MobileMenu() {

  return (
    <div className="md:hidden">
      <Sheet >
        <SheetTrigger asChild>
          <Button variant="outline" aria-label="Abrir menú">
            <Menu className="w-6 h-6" />
          </Button>
        </SheetTrigger>

        <SheetContent side="left" asChild>
          <nav>
            <SheetHeader className="flex items-center flex-row">
              <SheetClose className="inline" asChild>
                <Button variant="outline" aria-label="Cerrar menú">
                  <X className="w-6 h-6" />
                </Button>
              </SheetClose>
            </SheetHeader>

            {links.map((link) => (
              <SheetClose asChild key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm px-6 py-2.5 hover:bg-muted rounded-md"
                >
                  {link.label}
                </Link>
              </SheetClose>
            ))}
            <SheetTitle className="sr-only">
              Mobile Hamburger Menu
            </SheetTitle>

            <SheetFooter className="w-fit mx-auto">
              <Logo notHidden />
            </SheetFooter>

          </nav>
        </SheetContent>
      </Sheet>
    </div >
  )
}
