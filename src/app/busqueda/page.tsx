
import HeroSection from "maidana07/components/hero-section"
import SelectContent from "maidana07/components/search/page/select-content"
import { MediaTypes } from "maidana07/types/TMDB/search"
import SkeletonMediaGrid from "maidana07/components/media/list/skeleton-media-grid"
import { Suspense } from "react"
import SearchList from "maidana07/components/search/page/search-list"


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

      <Suspense fallback={
        <section className="space-y-4 py-10 min-h-[100dvh] max-w-6xl mx-auto">
          <SkeletonMediaGrid
            itemsLength={10}
            containClassName="gap-x-0.5 gap-y-3 sm:gap-3"
            cardClassName="mx-auto max-h-full h-[384px] aspect-auto rounded-xl shadow-sm"
          />
        </section>
      }>
        <SearchList type={type} q={q} page={page} />
      </Suspense>

    </>
  )
}


export default Busqueda