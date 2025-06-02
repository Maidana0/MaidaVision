import Image from 'next/image'

interface Provider {
  provider_name: string
  logo_path: string
}

export interface ProvidersTypes {
  buy?: Provider[]
  rent?: Provider[]
  flatrate?: Provider[]
}

interface StreamingAvailabilityProps {
  providers: ProvidersTypes
}

const section = (title: string, list?: Provider[]) => (
  list && list.length > 0 && (
    <div className="text-left">
      <h3 className="text-xl font-semibold">{title}</h3>
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

export default function StreamingAvailability({ providers }: StreamingAvailabilityProps) {
  return (
    <div className="space-y-4 sm:px-0 px-2.5 sm:text-white text-foreground">
      {section('Disponible en', providers.flatrate)}
      {section('Comprar', providers.buy)}
      {section('Alquilar', providers.rent)}
    </div>
  )
}
