import { Section } from 'maidana07/components/ui/section'
import { EpisodeToAir } from 'maidana07/types/TMDB/media/tv-detail'
import Image from 'next/image'

export default function EpisodeInfo({ episode, isNextEpisode }: { episode: EpisodeToAir, isNextEpisode?: boolean }) {
  return (
    <Section className="!py-6 max-w-5xl w-[calc(100%-2rem)] mx-auto">
      <h2 className="font-semibold text-xl mb-2">{isNextEpisode ? "Siguiente" : "Último"} episodio</h2>
      <div className="bg-card rounded-lg shadow-md grid md:grid-cols-3 overflow-hidden">
        <div className="md:col-span-1 w-full h-full aspect-video">
          <Image
            src={
              (episode.still_path && episode.still_path != null)
                ? `https://image.tmdb.org/t/p/w500${episode.still_path}`
                : "/images/image-not-found.png"
            }
            alt={episode.name}
            quality={100}
            width={328}
            height={185}
            className="object-cover h-full w-full"
          />
        </div>
        <div className="md:col-span-2 p-6">
          <h3 className="text-2xl font-bold">{episode.name}</h3>
          <p className="text-sm text-muted-foreground mb-2">
            Temporada {episode.season_number}, Episodio {episode.episode_number} – {episode.air_date}
          </p>
          <p>{episode.overview ? episode.overview : <span className="text-muted-foreground">Descripción no disponible.</span>}</p>
        </div>
      </div>
    </Section>
  )
}
