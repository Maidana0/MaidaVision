import SkeletonMediaGrid from "maidana07/components/media/list/skeleton-media-grid"
import tmdbFetcher from "maidana07/lib/api/tmdb"
import dynamic from "next/dynamic"
import { Section } from "maidana07/components/ui/section"
import { Skeleton } from "maidana07/components/ui/skeleton"
import HeroSection from "maidana07/components/hero-section"


const FilterDialog = dynamic(() => import("maidana07/components/media/filter/filter-dialog"), {
  loading: () => <Skeleton className="h-9 w-[89px] dark:bg-input/30 bg-background rounded-md border border-input" />
})
const SortSelect = dynamic(() => import("maidana07/components/media/sort-select"), {
  loading: () => <Skeleton className="h-9 w-[126px] dark:bg-input/30 bg-background rounded-md border border-input" />
})
const DynamicMediaGrid = dynamic(() => import("maidana07/components/media/list/dynamic-media-grid"), { loading: SkeletonMediaGrid })

export const metadata = {
  title: "Series"
}

const TVPage = () => {
  const initialData = tmdbFetcher.getTrendingTV()

  return <>
    <HeroSection
      title={"Series"}
      description={"Explora una amplia variedad de series, encuentra tus programas favoritos y descubre nuevos títulos."}
    />

    <Section className="md:bg-muted/30 md:pt-10">
      <div className="max-w-7xl mx-auto sm:px-5">

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex gap-2 ml-auto">
            <FilterDialog />
            <SortSelect />
          </div>
        </div>

        <DynamicMediaGrid
          initialData={initialData}
          mediaType={"serie"}
        />

      </div >
    </Section >
  </>
}

export default TVPage