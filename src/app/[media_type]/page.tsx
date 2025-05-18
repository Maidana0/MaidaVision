import HeroSection from "maidana07/components/hero-section"
import { Section } from "maidana07/components/ui/section"
import { Input } from "maidana07/components/ui/input"
import { Search } from "lucide-react"
import { FilterDialog } from "maidana07/components/media/filter/filter-dialog"
import SortSelect from "maidana07/components/media/sort-select"
import { Suspense } from "react"
import MediaGrid from "maidana07/components/media/media-grid"
import { Skeleton } from "maidana07/components/ui/skeleton"
import { redirect } from "next/navigation"
import { Metadata } from "next"


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

export default async function MoviesPage({ searchParams, params }: MediaPageProps) {
  const { media_type } = await params

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

              <Suspense fallback={
                <Skeleton className="h-9 w-[89px] dark:bg-input/30 bg-background rounded-md border border-input" />
              }>
                <FilterDialog />
              </Suspense>

              <Suspense fallback={
                <Skeleton className="h-9 w-[126px] dark:bg-input/30 bg-background rounded-md border border-input" />
              }>
                <SortSelect />
              </Suspense>

            </div>
          </div>

          <Suspense
            fallback={
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {Array.from({ length: 10 }).map((_, i) => (
                  <Skeleton
                    key={i}
                    className="aspect-[2/3] bg-card"
                  />
                ))}
              </div>
            }
          >
            <MediaGrid media_type={media_type} searchParams={searchParams} />
          </Suspense>

        </div>
      </Section >

    </>
  )
}