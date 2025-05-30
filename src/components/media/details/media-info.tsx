interface MediaInfoProps {
  genres: { id: number; name: string }[]
  firstAirDate: string
  lastAirDate: string
  voteAverage: number
  voteCount: number
  language: string
  status: string
}

export function MediaInfo({
  genres,
  firstAirDate,
  lastAirDate,
  voteAverage,
  voteCount,
  language,
  status,
}: MediaInfoProps) {
  return (
    <section className="grid md:grid-cols-3 gap-6 p-6 bg-card rounded-lg shadow-md">
      <div>
        <h3 className="font-semibold">Géneros</h3>
        <p className="text-muted-foreground">{genres.map((g) => g.name).join(', ')}</p>
      </div>
      <div>
        <h3 className="font-semibold">Idioma Original</h3>
        <p className="text-muted-foreground uppercase">{language}</p>
      </div>
      <div>
        <h3 className="font-semibold">Fechas</h3>
        <p className="text-muted-foreground">{firstAirDate} → {lastAirDate}</p>
      </div>
      <div>
        <h3 className="font-semibold">Estado</h3>
        <p className="text-muted-foreground">{status}</p>
      </div>
      <div>
        <h3 className="font-semibold">Valoración</h3>
        <p className="text-muted-foreground">{voteAverage.toFixed(1)} ({voteCount} votos)</p>
      </div>
    </section>
  )
}
