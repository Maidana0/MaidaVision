import { Section } from 'maidana07/components/ui/section'
import { Season } from 'maidana07/types/TMDB/media/tv-detail'
import Image from 'next/image'

export default function SeasonList({ seasons }: { seasons: Season[] }) {
  return (
    <Section className="space-y-6 !py-6 max-w-5xl w-[calc(100%-2rem)] mx-auto">
      <h2 className="text-xl font-semibold">Temporadas</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {seasons.map((s) => (
          <div key={s.id} className="flex bg-card rounded-lg overflow-hidden shadow">
            <div className="aspect-[2/3] min-w-[113px] max-h-[171px] bg-red-500">
              <Image
                src={s.poster_path && s.poster_path != null
                  ? `https://image.tmdb.org/t/p/w154${s.poster_path}`
                  : "https://placehold.co/113x171?text=No+Image"}
                alt={s.name}
                width={113}
                height={171}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="p-4 pl-3 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-lg">{s.name}</h3>
                <p className="text-muted-foreground text-sm mb-2">Episodios: {s.episode_count}</p>
              </div>
              <p className="text-sm line-clamp-4">{s.overview}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
