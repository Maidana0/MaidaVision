import { Section } from "maidana07/components/ui/section";

interface MediaInfoProps {
  firstAirDate: string
  lastAirDate: string
  voteAverage: number
  voteCount: number
  language: string
  status: string
  overview: string
}

export function MediaInfo({
  firstAirDate,
  lastAirDate,
  voteAverage,
  voteCount,
  language,
  status,
  overview
}: MediaInfoProps) {
  const itemsInfo = [
    { title: "Idioma Original", content: language.toUpperCase() },
    { title: "Valoración", content: `${voteAverage.toFixed(1)} (${voteCount} votos)` },
    { title: "Fechas", content: `${firstAirDate} → ${lastAirDate}` },
    { title: "Estado", content: status },
  ]

  return (
    <Section className="flex flex-col-reverse md:flex-col gap-6 !py-6 max-w-5xl mx-auto">

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {
          itemsInfo.map(({ title, content }) => (
            <div className="bg-card rounded-lg shadow-md p-6" key={title}>
              <h3 className="font-semibold">{title}</h3>
              <p className="text-muted-foreground">{content}</p>
            </div>
          ))
        }
      </div>

      <div className="px-6">
        <h3 className="text-xl font-semibold">Descripción</h3>
        {
          overview.split("\n\n").map((paragraph, i) => (
            <p key={i} className="text-lg text-foreground leading-7 shadow-md mt-4">
              {paragraph}
            </p>
          ))
        }
      </div>

    </Section>
  )
}
