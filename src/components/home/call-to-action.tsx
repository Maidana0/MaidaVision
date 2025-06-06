import { Section } from "../ui/section"
import { ArrowRight } from "lucide-react"
import CustomLink from "../ui/custom-link"
import CallToActionButton from "./call-to-action-button"

export function CallToAction() {
  return (
    <Section>
      <div className="max-w-11/12 md:max-w-8/12 mx-auto text-center" >
        <div className="md:bg-gradient-to-r dark:bg-gradient-to-b 
        from-primary/10 via-primary/30 to-primary/10
         bg-gradient-to-br
         md:p-12 p-10 rounded-2xl">
          <h2 className="text-4xl font-bold mb-6">
            ¿Listo para revolucionar tu experiencia de streaming?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Únete a miles de usuarios que ya disfrutan encontrando su contenido favorito de manera rápida y sencilla.
          </p>
          <div className="flex gap-4 justify-center">

            <CallToActionButton />
            <CustomLink href="/nosotros" size="lg" variant="outline" className="gap-2">
              Saber más
              <ArrowRight className="w-5 h-5" />
            </CustomLink>
          </div>
        </div>
      </div>
    </Section>
  )
}