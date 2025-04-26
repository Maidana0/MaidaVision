import { Button } from "maidana07/components/ui/button"
import { Section } from "../ui/section"

export function Hero() {
  return (
    <Section className="text-center">
      <h1 className="text-4xl md:text-6xl font-bold mb-4 px-4">
        Encuentra dónde ver tus películas favoritas
      </h1>
      <p className="text-lg md:text-xl text-muted-foreground mb-6">
        Busca rápidamente en qué plataforma de streaming está disponible.
      </p>
      <Button size="lg">Comenzar ahora</Button>
    </Section>
  )
}
