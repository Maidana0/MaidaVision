import { Section } from "maidana07/components/ui/section"
import { PlayCircle, Users, Zap, Github } from "lucide-react"
import FeatureCard from "maidana07/components/cards/feature-card"
import HeroSection from "maidana07/components/hero-section"
import CustomLink from "maidana07/components/ui/custom-link"

const features = [
  {
    icon: <PlayCircle className="w-10 h-10" />,
    title: "Streaming Unificado",
    description: "Accede a todo el contenido de streaming desde una única plataforma intuitiva."
  },
  {
    icon: <Users className="w-10 h-10" />,
    title: "Comunidad Activa",
    description: "Únete a miles de usuarios que comparten recomendaciones y reseñas."
  },
  {
    icon: <Zap className="w-10 h-10" />,
    title: "Búsqueda Instantánea",
    description: "Encuentra el contenido que buscas en segundos, no en minutos."
  }
]

const stats = [
  { value: "10K+", label: "Usuarios activos" },
  { value: "50K+", label: "Títulos indexados" },
  { value: "15+", label: "Plataformas" },
  { value: "99%", label: "Satisfacción" }
]

export const metadata = {
  title: "Sobre MaidaVision",
  description: "Descubre cómo MaidaVision está revolucionando el streaming, unificando tus plataformas favoritas en una sola experiencia. Conoce nuestra misión, valores y el equipo detrás de esta innovación."
}

export default function AboutPage() {

  return (
    <>
      {/* Hero Section */}
      <HeroSection
        title={"Sobre MaidaVision"}
        description={"Simplificamos tu experiencia de streaming unificando todas tus plataformas favoritas en un solo lugar."}
      />

      {/* Features Grid */}
      <Section className="bg-muted/30">
        <div className="grid md:grid-cols-3 gap-5 max-w-11/12 mx-auto px-4">
          {features.map((feature, index) => (
            <FeatureCard feature={feature} key={index} />
          ))}
        </div>
      </Section>

      {/* Stats Section */}
      <Section>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-11/12 mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">
                {stat.value}
              </div>
              <div className="text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Mission Section */}
      <Section className="py-20 bg-muted/30">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-6">Nuestra Misión</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Facilitar el descubrimiento y acceso al entretenimiento digital,
            ahorrándote tiempo y mejorando tu experiencia de streaming.
          </p>
          <CustomLink variant={"button"} href="https://github.com/Maidana0/MaidaVision" target="_blank" className="gap-2">
            <Github className="w-5 h-5" />
            Contribuir al Proyecto
          </CustomLink>
        </div>
      </Section>
    </>
  )
}