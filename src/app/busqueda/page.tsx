
import HeroSection from "maidana07/components/hero-section"
import SelectContent from "maidana07/components/search/page/select-content"
import { MediaTypes } from "maidana07/types/TMDB/search"
import tmdbFetcher from "maidana07/lib/api/tmdb"
import dynamic from "next/dynamic"

const SearchList = dynamic(() => import("maidana07/components/search/page/search-list"), {
  loading: () => <div>Cargando...</div>
})

const types = [
  { label: "Películas", value: "movie" },
  { label: "Series", value: "tv" },
  { label: "Personas", value: "person" },
  { label: "Todo", value: "multi" },
]


export const metadata = {
  title: "Búsqueda"
}

const Busqueda = async ({ searchParams }: { searchParams: Promise<{ q: string, type: MediaTypes, page: number }> }) => {
  const { q, type, page } = await searchParams

  const data = tmdbFetcher.multiSearch(q, { type, page });

  return (
    <>
      <HeroSection>
        <div className="flex sm:flex-row flex-col sm:items-center items-start gap-3 justify-between">
          <h1 className="relative !text-xl font-medium">
            Resultados de búsqueda para:
            <span className="text-primary"> {q}</span>
          </h1>
          <SelectContent items={types} />
        </div>
      </HeroSection>

      <SearchList data={data} type={type} />

    </>
  )
}


export default Busqueda