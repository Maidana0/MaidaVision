'use client'

interface TrailerEmbedProps {
  videos: {
    key: string
    site: string
    type: string
    name: string
  }[]
}

export function TrailerEmbed({ videos }: TrailerEmbedProps) {
  const trailer = videos.find((v) => v.site === 'YouTube' && v.type === 'Trailer')

  if (!trailer) return null

  return (
    <section className="my-8">
      <h2 className="text-xl font-semibold mb-4">Tráiler</h2>
      <div className="aspect-video w-full rounded-lg overflow-hidden shadow-lg">
        <iframe
          title={trailer.name}
          src={`https://www.youtube.com/embed/${trailer.key}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      </div>
    </section>
  )
}
