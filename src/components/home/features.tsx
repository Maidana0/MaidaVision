import { Section } from "../ui/section"

const features = [
  { title: "Streaming global", description: "Consulta disponibilidad por región" },
  { title: "Actualizado", description: "Información de películas y series en tiempo real" },
  { title: "Todo en uno", description: "Netflix, Prime Video, Disney+ y más" },
]

export function Features() {
  return (
    <Section>
      <div className="grid gap-8 md:grid-cols-3 text-center">
        {features.map((f) => (
          <div key={f.title}>
            <h3 className="text-xl font-semibold">{f.title}</h3>
            <p className="text-muted-foreground">{f.description}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}
