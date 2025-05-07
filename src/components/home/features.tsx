import { Card, CardContent } from "../ui/card"
import { Section } from "../ui/section"
import { Search, Tv, Heart, Mail } from "lucide-react"

const features = [
  {
    icon: <Search className="md:w-9 w-6 md:h-9 h-6" />,
    title: "Búsqueda Universal",
    description: "Encuentra contenido en todas las plataformas de streaming."
  },
  {
    icon: <Tv className="md:w-9 w-6 md:h-9 h-6" />,
    title: "Multiplataforma",
    description: "Compatibilidad con Netflix, HBO, Disney+, Prime Video y más."
  },
  {
    icon: <Heart className="md:w-9 w-6 md:h-9 h-6" />,
    title: "Listas Personalizadas",
    description: "Guarda tus películas y series favoritas para verlas más tarde."
  },
  {
    icon: <Mail className="md:w-9 w-6 md:h-9 h-6" />,
    title: "Notificaciones",
    description: "Recibe alertas cuando tus títulos favoritos estén disponibles."
  }
]

export function Features() {
  return (
    <Section>
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4">Todo lo que necesitas</h2>
        <p className="text-muted-foreground text-lg">
          Características diseñadas para mejorar tu experiencia de streaming
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 md:max-w-7xl max-w-11/12 mx-auto">

        {features.map((feature, index) => (
          <Card
            key={index}
            className="items-center text-center justify-evenly gap-2 p-6 transition-all border border-muted hover:border-primary/40"
          >
            <div className="md:p-4 p-3 rounded-full bg-primary/10 text-primary">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold">{feature.title}</h3>
            <CardContent className="text-muted-foreground p-0">
              <p>{feature.description}</p>
            </CardContent>
          </Card>
        ))}

      </div>
    </Section>
  )
}