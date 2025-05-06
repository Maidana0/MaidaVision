import { Section } from "../ui/section"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Card, CardContent, CardFooter } from "../ui/card"

const testimonials = [
  {
    quote: "Esta app me ayudó a encontrar mi serie favorita en segundos. ¡Increíble!",
    author: "María G.",
    role: "Usuario Premium",
    avatar: "https://i.pravatar.cc/150?img=1"
  },
  {
    quote: "Ya no pierdo tiempo buscando en cada plataforma. Todo está aquí.",
    author: "Carlos R.",
    role: "Cinéfilo",
    avatar: "https://i.pravatar.cc/150?img=2"
  },
  {
    quote: "La mejor herramienta para los amantes del streaming.",
    author: "Ana P.",
    role: "Crítica de cine",
    avatar: "https://i.pravatar.cc/150?img=3"
  }
]

export function Testimonials() {
  return (
    <Section className="bg-muted/80">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4">Lo que dicen nuestros usuarios</h2>
        <p className="text-muted-foreground text-lg">
          Miles de personas ya disfrutan de nuestra plataforma
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {testimonials.map((testimonial, index) => (
          <Card
            key={index}
            className="py-6 shadow-lg justify-between"
          >
            <CardContent className="text-lg italic mb-6">
              <blockquote>
                "{testimonial.quote}"
              </blockquote>
            </CardContent>

            <CardFooter className="gap-4">
              <Avatar>
                <AvatarImage src={testimonial.avatar} />
                <AvatarFallback>{testimonial.author[0]}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-semibold">{testimonial.author}</div>
                <div className="text-sm text-muted-foreground">{testimonial.role}</div>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </Section>
  )
}