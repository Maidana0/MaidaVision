import { Section } from "maidana07/components/ui/section";
import { MovieStatus, TVStatus } from "maidana07/types/TMDB/media/common/common-types";
import { translateStatusMedia } from "maidana07/utils/transform/stringDto";

interface MediaInfoProps {
  dates: {
    firstAirDate?: string;
    lastAirDate?: string;
    release_date?: string;
  };
  voteAverage: number;
  voteCount: number;
  language: string;
  status: TVStatus | MovieStatus;
  overview: string;
  type?: "movie" | "tv";
}

function statusToDate(status: TVStatus | MovieStatus, dates: { firstAirDate: string, lastAirDate: string }) {
  const firstDate = new Date(dates.firstAirDate).toLocaleDateString()
  const lastDate = new Date(dates.lastAirDate).toLocaleDateString()

  switch (status) {
    case TVStatus["Returning Series"]:
      return "Desde " + firstDate;
    case TVStatus.Ended:
      return "Desde " + firstDate + " hasta " + lastDate;
    case TVStatus["In Production"]:
      return "En producción desde " + firstDate;
    case TVStatus.Planned:
      return "Planeada para " + firstDate;
    case TVStatus.Pilot:
      return "Piloto emitido en " + firstDate;
    default:
      return firstDate + " - " + lastDate;
  }
}

export default function MediaInfo({
  dates: {
    firstAirDate = "Desconocido",
    lastAirDate = "Desconocido",
    release_date = "Desconocido"
  },
  voteAverage,
  voteCount,
  language,
  status,
  overview,
  type = "tv"
}: MediaInfoProps) {
  const itemsInfo = [
    { title: "Idioma Original", content: language.toUpperCase() },
    { title: "Valoración", content: `${voteAverage.toFixed(1)} (${voteCount} votos)` },
    { title: "Estado", content: translateStatusMedia(status, type) },
    { title: type === "movie" ? "Estreno" : "Fechas", content: type === "movie" ? new Date(release_date).toLocaleDateString() : statusToDate(status, { firstAirDate, lastAirDate }) },
  ]

  return (
    <Section className="flex flex-col-reverse md:flex-col gap-6 !py-6 max-w-5xl w-[calc(100%-2rem)] mx-auto">

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {
          itemsInfo.map(({ title, content }) => (
            <div className="bg-card rounded-lg shadow-md p-5" key={title}>
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
