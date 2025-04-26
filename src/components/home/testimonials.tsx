import { Section } from "../ui/section"

export function Testimonials() {
  return (
    <Section className="bg-muted rounded-lg p-6 text-center">
      <blockquote className="text-xl italic font-light">
        “Esta app me ayudó a encontrar mi serie favorita en segundos.”
      </blockquote>
      <p className="mt-4 text-muted-foreground">— Usuario feliz</p>
    </Section>
  )
}
