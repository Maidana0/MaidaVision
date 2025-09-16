"use client"

import { DialogHeader, DialogTitle } from "maidana07/components/ui/dialog"
import { Button } from "maidana07/components/ui/button"
import { Filter } from "lucide-react"
import { Modal } from "../../ui/modal"
import useDialogStore from "maidana07/store/use-dialog-store"
import { useShallow } from "zustand/react/shallow"
import GenresFilter from "./queries/genres-filter"
import ReleaseYearFilter from "./queries/release-year-filter"
import CountryFilter from "./queries/country-filter"
import LanguageFilter from "./queries/language-filter"
import { useFilterActions } from "maidana07/hooks/use-filters"
import WatchProvidersFilter from "./queries/watch-providers-filter"

export default function FilterDialog({ isMovie = true }: { isMovie?: boolean }) {

  const { isOpen, onOpenChange } = useDialogStore(useShallow(state => ({
    isOpen: state.filter,
    onOpenChange: state.setIsOpen
  })))

  const { clearFilters } = useFilterActions()

  const handleApplyFilters = () => {
    // Close the dialog after applying filters
    onOpenChange("filter", false)
    // The filters are already applied through the store
    // Here you could trigger a refetch or other side effects
  }

  const handleClearFilters = () => {
    clearFilters()
  }

  return (
    <Modal
      title="Filtro de busqueda"
      description="Realizar filtrados de busqueda para optimizar resultados"
      isOpen={isOpen}
      onOpenChange={(open) => onOpenChange("filter", open)}
      withTrigger
      trigger={
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filtros
        </Button>
      }
      className="sm:max-w-11/12 min-w-10/12 bg-muted sm:max-h-[85vh] max-h-[90vh] !overflow-y-auto"
    >

      <DialogHeader>
        <DialogTitle>Filtrar {isMovie ? "Películas" : "Series"}</DialogTitle>
      </DialogHeader>

      {/* Genres Filter */}
      <GenresFilter isMovie={isMovie} />

      <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t my-5" />

      {/* Watch Providers Section */}
      <WatchProvidersFilter />

      <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t my-5" />

      {/* Release Year Filter */}
      <ReleaseYearFilter />

      <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t my-5" />

      {/* Country and Language Filters */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div>
          <CountryFilter />
        </div>
        <div>
          <LanguageFilter />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-2 justify-evenly mx-auto mt-6 w-5/6 max-w-md">
        <Button
          variant="default"
          type="button"
          size="lg"
          className="text-md"
          onClick={handleApplyFilters}
        >
          Aplicar Filtros
        </Button>

        <Button
          variant="outline"
          type="button"
          size="lg"
          className="text-md"
          onClick={handleClearFilters}
        >
          Limpiar Filtros
        </Button>
      </div>

    </Modal>
  )
}