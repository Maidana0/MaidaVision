
import HeroSection from "maidana07/components/hero-section"
import { Section } from "maidana07/components/ui/section"
import SelectContent from "maidana07/components/search/page/select-content"

const types = [
  {label: "Películas",value: "movie"},
  {label: "Series",value: "tv"},
  {label: "Personas",value: "person"},
  {label: "Todo",value: "all"},
]


const Busqueda = async ({ searchParams }: { searchParams: Promise<{ q: string, type: string }> }) => {
  const { q, type } = await searchParams

  return (
    <>
      <HeroSection>
        <div className="flex items-center justify-between">
          <h1 className="relative !text-xl font-medium">
            Resultados de búsqueda para: 
            <span className="text-primary"> {q}</span>
          </h1>
          <SelectContent  items={types} />
        </div>          
      </HeroSection>


      <Section>

      </Section>
    </>
  )
}


export default Busqueda