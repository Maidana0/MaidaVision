import HeroSection from "maidana07/components/hero-section"
import { Section } from "maidana07/components/ui/section"
import { Input } from "maidana07/components/ui/input"
import { Search } from "lucide-react"
import { Skeleton } from "maidana07/components/ui/skeleton"
import { redirect } from "next/navigation"
import { Metadata } from "next"
import tmdbFetcher from "maidana07/lib/api/tmdb"
import dynamic from "next/dynamic"
import SkeletonMediaGrid from "maidana07/components/media/skeleton-media-grid"

const MediaGridClient = dynamic(() => import("maidana07/components/media/dynamic-media-grid"), { loading: SkeletonMediaGrid })

const FilterDialog = dynamic(() => import("maidana07/components/media/filter/filter-dialog"), {
  loading: () => <Skeleton className="h-9 w-[89px] dark:bg-input/30 bg-background rounded-md border border-input" />
})

const SortSelect = dynamic(() => import("maidana07/components/media/sort-select"), {
  loading: () => <Skeleton className="h-9 w-[126px] dark:bg-input/30 bg-background rounded-md border border-input" />
})

interface MediaPageProps {
  searchParams: Promise<{ [key: string]: string | undefined }>,
  params: Promise<{ media_type: "pelicula" | "serie" }>
}
// Esta en modo de prueba y no se recomienda su uso en producción
export const experimental_ppr = true

export async function generateMetadata({ params }: MediaPageProps): Promise<Metadata> {
  const { media_type } = await params
  return {
    title: `${media_type === "pelicula" ? "Películas" : "Series"}`,
    description: `Explora nuestra colección de ${media_type === "pelicula" ? "películas" : "series"} y encuentra tu próxima historia favorita. Utiliza los filtros para personalizar tu búsqueda y descubrir lo último en entretenimiento.`,
  }
}

export default async function MediaPage({ params }: MediaPageProps) {
  const { media_type } = await params
  const initialData = media_type === "pelicula"
    ? tmdbFetcher.getTrendingMovies()
    : tmdbFetcher.getTrendingTV()

  if (media_type != "pelicula" && media_type != "serie") {
    redirect(`/pagina-no-encontrada/error/parametro?busqueda=${media_type}`)
  }

  return (
    <>
      <HeroSection
        title={`${media_type === "pelicula" ? "Películas" : "Series"}`}
        description={`Explora nuestra colección de ${media_type === "pelicula" ? "películas" : "series"} y encuentra tu próxima historia favorita`}
      />

      <Section className="md:bg-muted/30 md:pt-10">
        <div className="max-w-7xl mx-auto sm:px-5">

          {/* Barra de búsqueda y filtros */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder={`Buscar ${media_type === "pelicula" ? "películas" : "series"}...`}
                className="pl-10"
                disabled
              />
            </div>

            <div className="flex gap-2 ml-auto">
              <FilterDialog />
              <SortSelect />
            </div>
          </div>

          <MediaGridClient initialData={initialData} mediaType={media_type} />

        </div>
      </Section >
    </>
  )
}