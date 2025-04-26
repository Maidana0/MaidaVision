import { Button } from "maidana07/components/ui/button"
import { Section } from "../ui/section"

export function CallToAction() {
  return (
    <Section className="text-center">
      <h2 className="text-2xl font-bold mb-2">¿Listo para descubrir dónde ver tus películas?</h2>
      <Button size="lg">Buscar ahora</Button>
    </Section>
  )
}
