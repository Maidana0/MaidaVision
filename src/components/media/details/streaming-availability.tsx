import Image from 'next/image'

interface Provider {
  provider_name: string
  logo_path: string
}

interface StreamingAvailabilityProps {
  providers: {
    buy?: Provider[]
    rent?: Provider[]
    flatrate?: Provider[]
  }
}

export function StreamingAvailability({ providers }: StreamingAvailabilityProps) {
  const section = (title: string, list?: Provider[]) => (
    list && list.length > 0 && (
      <div>
        <h4 className="font-medium text-lg">{title}</h4>
        <div className="flex flex-wrap gap-4 mt-2">
          {list.map((prov) => (
            <div key={prov.provider_name} className="w-12 h-12">
              <Image
                src={`https://image.tmdb.org/t/p/original${prov.logo_path}`}
                alt={prov.provider_name}
                width={48}
                height={48}
                className="rounded"
              />
            </div>
          ))}
        </div>
      </div>
    )
  )

  return (
    <section className="p-6 bg-card rounded-lg shadow-md space-y-4">
      <h2 className="text-xl font-semibold">Dónde ver</h2>
      {section('Streaming', providers.flatrate)}
      {section('Comprar', providers.buy)}
      {section('Alquilar', providers.rent)}
    </section>
  )
}
