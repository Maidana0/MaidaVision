import Image from 'next/image'

interface Episode {
  name: string
  overview: string
  still_path: string
  air_date: string
  episode_number: number
  season_number: number
}

export function EpisodeInfo({ episode }: { episode: Episode }) {
  return (
    <div className="bg-card rounded-lg p-6 shadow-md grid md:grid-cols-3 gap-6">
      <div className="md:col-span-1">
        <Image
          src={`https://image.tmdb.org/t/p/w500${episode.still_path}`}
          alt={episode.name}
          width={500}
          height={280}
          className="rounded"
        />
      </div>
      <div className="md:col-span-2">
        <h3 className="text-2xl font-bold">{episode.name}</h3>
        <p className="text-sm text-muted-foreground mb-2">
          Temporada {episode.season_number}, Episodio {episode.episode_number} – {episode.air_date}
        </p>
        <p>{episode.overview}</p>
      </div>
    </div>
  )
}
