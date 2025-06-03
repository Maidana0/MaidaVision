import { Section } from "maidana07/components/ui/section";
import { TVStatus } from "maidana07/types/TMDB/media/common/common-types";
import { translateStatusMedia } from "maidana07/utils/transform/stringDto";

interface MediaInfoProps {
  firstAirDate: string
  lastAirDate: string
  voteAverage: number
  voteCount: number
  language: string
  status: TVStatus
  overview: string
}

export default function MediaInfo({
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
    { title: "Estado", content: translateStatusMedia(status) },
  ]

  return (
    <Section className="flex flex-col-reverse md:flex-col gap-6 !py-6 max-w-5xl w-[calc(100%-2rem)] mx-auto">

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

      <div>
        <h2 className="text-xl font-semibold">Descripción</h2>
        {
          overview.split("\n\n").map((paragraph, i) => (
            <p key={i} className="text-lg text-foreground leading-7 mt-4">
              {paragraph}
            </p>
          ))
        }
      </div>

    </Section>
  )
}
