import { Search } from "lucide-react"
import { Input } from "maidana07/components/ui/input"
import { Section } from "maidana07/components/ui/section"
import { Skeleton } from "maidana07/components/ui/skeleton"
import dynamic from "next/dynamic"
import { headers } from "next/headers"

const HeroSection = dynamic(() => import("maidana07/components/hero-section"), {})

const FilterDialog = dynamic(() => import("maidana07/components/media/filter/filter-dialog"), {
  loading: () => <Skeleton className="h-9 w-[89px] dark:bg-input/30 bg-background rounded-md border border-input" />
})

const SortSelect = dynamic(() => import("maidana07/components/media/sort-select"), {
  loading: () => <Skeleton className="h-9 w-[126px] dark:bg-input/30 bg-background rounded-md border border-input" />
})

export default async function MediaLayout({
  children }: { children: React.ReactNode }) {
  const headersList = await headers()
  const pathname = new URL(headersList.get("referer") || "").pathname
  const media = pathname.includes("pelicula") ? "películas" : "series"

  return <>
    <HeroSection
      title={`${media}`}
      h1ClassName="capitalize"
      description={`Explora nuestra colección de ${media} y encuentra tu próxima historia favorita`}
    />

    <Section className="md:bg-muted/30 md:pt-10">
      <div className="max-w-7xl mx-auto sm:px-5">

        {/* Barra de búsqueda y filtros */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder={`Buscar ${media}...`}
              className="pl-10"
              disabled
            />
          </div>

          <div className="flex gap-2 ml-auto">
            <FilterDialog />
            <SortSelect />
          </div>
        </div>

        {children}

      </div >
    </Section >
  </>
}