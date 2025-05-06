"use client"
import { Button } from "maidana07/components/ui/button"
import { Section } from "../ui/section"
import { Play, Search } from "lucide-react"

export function Hero() {
  return (
    <Section className="relative overflow-hidden">

      <div className="relative max-w-5xl mx-auto text-center pt-24">

        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50 p-3">
          Tu guía definitiva de streaming
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Descubre dónde ver tus películas y series favoritas en un solo lugar.
          Búsqueda inteligente en todas las plataformas.
        </p>

        <div className="flex gap-4 justify-center">
          <Button size="lg" className="gap-2">
            <Search className="w-5 h-5" />
            Comenzar búsqueda
          </Button>
          <Button size="lg" variant="outline" className="gap-2">
            <Play className="w-5 h-5" />
            Ver demo
          </Button>
        </div>

      </div>

    </Section>
  )
}