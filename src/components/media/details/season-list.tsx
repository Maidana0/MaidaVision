import Image from 'next/image'

export default function SeasonList({ seasons }: { seasons: Season[] }) {
  return (
    <section className="space-y-6">
      <h2 className="text-xl font-semibold">Temporadas</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {seasons.map((s) => (
          <div key={s.id} className="flex gap-4 bg-card rounded-lg p-4 shadow">
            <Image
              src={`https://image.tmdb.org/t/p/w200${s.poster_path}`}
              alt={s.name}
              width={100}
              height={150}
              className="rounded"
            />
            <div>
              <h3 className="font-bold text-lg">{s.name}</h3>
              <p className="text-muted-foreground text-sm mb-2">Episodios: {s.episode_count}</p>
              <p className="text-sm">{s.overview}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
