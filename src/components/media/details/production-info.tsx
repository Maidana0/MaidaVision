import { Section } from 'maidana07/components/ui/section'
import { Company } from 'maidana07/types/TMDB/media/common/common-types'
import Image from 'next/image'

export default function ProductionInfo({ companies }: { companies: Company[] }) {
  return (
    <Section className="space-y-6 !py-10 max-w-5xl w-[calc(100%-2rem)] mx-auto">
      <h2 className="text-xl font-semibold">Producción</h2>

      <div className="flex flex-wrap gap-6 justify-center sm:justify-start">
        {companies.map((company) => (
          <div key={company.id} className="bg-white/90 flex rounded-full justify-center items-center gap-2 text-center w-[100px] h-[100px] p-1 hover:bg-" title={company.name}>
            {(company.logo_path && company.logo_path != null)
              ? (
                <Image
                  src={`https://image.tmdb.org/t/p/w92${company.logo_path}`}
                  alt={company.name}
                  width={80}
                  height={80}
                  className="object-contain max-h-[calc(100%-20px)] text-black/90"
                />
              )
              :
              <span className="text-sm text-black/90">{company.name}</span>
            }
          </div>
        ))}
      </div>
    </Section>
  )
}
