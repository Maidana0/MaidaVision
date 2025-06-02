import Image from 'next/image'

interface Company {
  id: number
  name: string
  logo_path: string | null
  origin_country: string
}

export default function ProductionInfo({ companies }: { companies: Company[] }) {
  return (
    <section className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Producción</h2>
      <div className="flex flex-wrap gap-6">
        {companies.map((company) => (
          <div key={company.id} className="flex flex-col items-center gap-2 text-center max-w-[100px]">
            {company.logo_path && (
              <Image
                src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                alt={company.name}
                width={80}
                height={40}
                className="object-contain"
              />
            )}
            <span className="text-xs text-muted-foreground">{company.name}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
