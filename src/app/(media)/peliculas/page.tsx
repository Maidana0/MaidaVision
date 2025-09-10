import SkeletonMediaGrid from "maidana07/components/media/list/skeleton-media-grid"
import dynamic from "next/dynamic"
import { Section } from "maidana07/components/ui/section"
import { Skeleton } from "maidana07/components/ui/skeleton"
import HeroSection from "maidana07/components/hero-section"
import { Suspense } from "react"
import MovieList from "maidana07/components/media/details/pages/movie-list"

// una semana de revalidación
export const revalidate = 86400 * 6

const FilterDialog = dynamic(() => import("maidana07/components/media/filter/filter-dialog"), {
  loading: () => <Skeleton className="h-9 w-[89px] dark:bg-input/30 bg-background rounded-md border border-input" />
})
const SortSelect = dynamic(() => import("maidana07/components/media/sort-select"), {
  loading: () => <Skeleton className="h-9 w-[126px] dark:bg-input/30 bg-background rounded-md border border-input" />
})

export const metadata = {
  title: "Películas",
  description: `Explora nuestra colección de películas y encuentra tu próxima historia favorita`
}

const MoviePage = () => {
  return <>
    <HeroSection
      title="Películas"
      description={`Explora nuestra colección de películas y encuentra tu próxima historia favorita`}
    />

    <Section className="md:bg-muted/30 md:pt-10">
      <div className="max-w-7xl mx-auto sm:px-5">

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex gap-2 ml-auto">
            <FilterDialog />
            <SortSelect />
          </div>
        </div>

        <Suspense fallback={<SkeletonMediaGrid />}>
          <MovieList />
        </Suspense>

      </div >
    </Section >
  </>
}

export default MoviePage