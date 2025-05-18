"use client"

import { Button } from "maidana07/components/ui/button"
import { Home, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { Suspense } from "react"

export default function NotFound() {
  const router = useRouter()
  const path = usePathname()
  const search = useSearchParams()

  return (
    <Suspense>
      <AnimatePresence>
        <div className="bg-muted/30 h-[100vh] min-h-[420px] absolute py-8 inset-0 flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-2xl mx-auto text-center md:space-y-12 space-y-6"
          >
            <p className="text-accent-foreground/50">
              Dirección:
              <span className="underline underline-offset-2 ml-1"> {
                search?.get("busqueda") ? search.get("busqueda") : path.toString()
              }</span>
            </p>

            <div className="space-y-6">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                <span className="text-primary"> 404 </span>
                - Página no encontrada
              </h1>
              <p className="text-muted-foreground md:text-lg">
                Lo sentimos, la página que estás buscando no existe o ha sido movida.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button
                variant="outline"
                onClick={() => router.back()}
                className="gap-2 w-28"
              >
                <ArrowLeft className="h-4 w-4" />
                Volver
              </Button>

              <Link href="/">
                <Button variant="default" className="gap-2 w-28">
                  <Home className="h-4 w-4" />
                  Inicio
                </Button>
              </Link>

            </div>

            <div className="pt-8">
              <p className="text-sm text-muted-foreground">
                ¿Necesitas ayuda? {" "}
                <Link
                  href="/contact"
                  className="text-primary hover:underline underline-offset-4"
                >
                  Contáctanos
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </AnimatePresence>
    </Suspense>
  )
}