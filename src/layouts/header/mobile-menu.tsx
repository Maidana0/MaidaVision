"use client"

import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "maidana07/components/ui/sheet"
import { Button } from "maidana07/components/ui/button"
import links from "./links.json"

export default function MobileMenu() {

  return (
    <div className="md:hidden">
      <Sheet >
        <SheetTrigger asChild>
          <Button variant="outline" aria-label="Abrir menú" className="opacity-70 transition-opacity hover:opacity-100">
            <Menu className="w-6 h-6" />
          </Button>
        </SheetTrigger>


        <SheetContent side="left">
          <SheetHeader className="flex items-center flex-row">
            <SheetClose className="inline" asChild>
              <Button variant="outline" aria-label="Cerrar menú" className="opacity-70 transition-opacity hover:opacity-100">
                <X className="w-6 h-6" />
              </Button>
            </SheetClose>
            <SheetTitle className="text-xl font-bold tracking-tight ml-5">
              Maida<span className="text-primary">Vision</span>
            </SheetTitle>
          </SheetHeader>

          {links.map((link) => (
            <SheetClose asChild key={link.href}>
              <Link
                href={link.href}
                className="text-sm px-4 py-2 hover:bg-muted rounded-md"
              >
                {link.label}
              </Link>
            </SheetClose>
          ))}
        </SheetContent>
      </Sheet>
    </div>
  )
}
