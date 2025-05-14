"use client"

import { DialogHeader, DialogTitle } from "maidana07/components/ui/dialog"
import { Button } from "maidana07/components/ui/button"
import { Filter } from "lucide-react"
import { Modal } from "../ui/modal"
import useDialogStore from "maidana07/store/use-dialog-store"
import { useShallow } from "zustand/react/shallow"
import genres from "maidana07/lib/api/genres.json"

export function FilterDialog({ isMovie = true }: { isMovie?: boolean }) {

  const { isOpen, onOpenChange } = useDialogStore(useShallow(state => ({
    isOpen: state.filter,
    onOpenChange: state.setIsOpen
  })))

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
      className="min-w-10/12 bg-muted max-h-[85vh] !overflow-y-auto"
    >

      <DialogHeader>
        <DialogTitle>Filtrar {isMovie ? "Películas" : "Series"}</DialogTitle>
      </DialogHeader>
      {/* Aquí irían los filtros con checkboxes, radio buttons, etc */}

      <div>
        <h4 className="text-lg font-semibold mb-4">Géneros:</h4>
        <div className="flex flex-wrap gap-2">
          {(isMovie ? genres.movie : genres.tv).map((genre) => (
            <Button
              key={genre.id}
              variant="outline"
              size="sm"
              className="rounded-full"
            >
              {genre.name}
            </Button>
          ))}
        </div>
      </div>

      <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t my-5" />

      <div>
        <h4 className="text-lg font-semibold mb-4">Disponibles en: </h4>
        Desde el País:

        Proveedores..
      </div>


      <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t my-5" />

      <div>
        <h4 className="text-lg font-semibold mb-4">País de origen:</h4>

        <h4 className="text-lg font-semibold mb-4">Idioma original:</h4>
      </div>


    </Modal>
  )
}