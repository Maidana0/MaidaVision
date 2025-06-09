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
      <div className="flex flex-wrap gap-4 mt-3">
        {list.map((prov) => (
          <div key={prov.provider_name} className="w-9 h-9 relative" title={prov.provider_name}>
            <Image
              src={(prov.logo_path && prov.logo_path != null)
                ? `https://image.tmdb.org/t/p/w45${prov.logo_path}`
                : `https://placehold.co/45?text=${prov.provider_name}`
              }
              alt={prov.provider_name}
              width={45}
              height={45}
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
    <div className="space-y-4 sm:px-0 px-2.5 sm:text-white text-foreground flex gap-x-12 gap-y-4 flex-wrap">
      {section('Disponible en', providers.flatrate)}
      {section('Comprar', providers.buy)}
      {section('Alquilar', providers.rent)}
    </div>
  )
}
