import HeroSection from "maidana07/components/hero-section"
import { Section } from "maidana07/components/ui/section"
import { Button } from "maidana07/components/ui/button"
import { Input } from "maidana07/components/ui/input"
import { Filter, Search, SlidersHorizontal } from "lucide-react"
import { FilterDialog } from "maidana07/components/media/filter-dialog"

export default function MoviesPage() {
  // Estos datos serían dinámicos en la implementación final
  const genres = [
    "Acción", "Aventura", "Comedia", "Drama", "Ciencia Ficción",
    "Terror", "Romance", "Animación", "Documental"
  ]

  const years = ["2024", "2023", "2022", "2021", "2020"]

  return (
    <>
      <HeroSection
        title="Películas"
        description="Explora nuestra colección de películas y encuentra tu próxima historia favorita"
        showBackButton={false}
      />

      <Section className="bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          {/* Barra de búsqueda y filtros */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Buscar películas..."
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <FilterDialog />
              {/* <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filtros
              </Button> */}
              <Button variant="outline" className="gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                Ordenar
              </Button>
            </div>
          </div>

          {/* Filtros rápidos */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Géneros populares</h3>
            <div className="flex flex-wrap gap-2">
              {genres.map((genre) => (
                <Button
                  key={genre}
                  variant="outline"
                  size="sm"
                  className="rounded-full"
                >
                  {genre}
                </Button>
              ))}
            </div>
          </div>

          {/* Grid de películas (placeholder) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[2/3] rounded-lg bg-card animate-pulse"
              />
            ))}
          </div>
        </div>
      </Section>
    </>
  )
}