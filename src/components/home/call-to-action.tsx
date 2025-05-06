import { Button } from "maidana07/components/ui/button"
import { Section } from "../ui/section"
import { ArrowRight, Search } from "lucide-react"

export function CallToAction() {
  return (
    <Section>
      <div className="max-w-5xl mx-auto text-center" >
        <div className="bg-gradient-to-r from-primary/10 via-primary/30 to-primary/10 p-12 rounded-2xl">
          <h2 className="text-4xl font-bold mb-6">
            ¿Listo para revolucionar tu experiencia de streaming?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Únete a miles de usuarios que ya disfrutan encontrando su contenido favorito de manera rápida y sencilla.
          </p>
          <div className="flex gap-4 justify-center">

            <Button size="lg" className="gap-2">
              <Search className="w-5 h-5" />
              Comenzar ahora
            </Button>
            <Button size="lg" variant="outline" className="gap-2">
              Saber más
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </Section>
  )
}