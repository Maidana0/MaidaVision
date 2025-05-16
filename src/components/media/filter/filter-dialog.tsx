"use client"

import { DialogHeader, DialogTitle } from "maidana07/components/ui/dialog"
import { Button } from "maidana07/components/ui/button"
import { Filter } from "lucide-react"
import { Modal } from "../../ui/modal"
import useDialogStore from "maidana07/store/use-dialog-store"
import { useShallow } from "zustand/react/shallow"
import GenresFilter from "./queries/genres-filter"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "maidana07/components/ui/select"

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
      className="sm:max-w-11/12 min-w-10/12 bg-muted sm:max-h-[85vh] max-h-[90vh] !overflow-y-auto"
    >

      <DialogHeader>
        <DialogTitle>Filtrar {isMovie ? "Películas" : "Series"}</DialogTitle>
      </DialogHeader>
      {/* Aquí irían los filtros con checkboxes, radio buttons, etc */}

      <GenresFilter isMovie={isMovie} />


      <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t my-5" />

      <div>
        <div className="flex justify-between">
          <h4 className="text-lg font-semibold mb-4">Disponibles en: </h4>
          <Select>
            <SelectTrigger className="gap-2" isButtonGhost>
              <SelectValue placeholder="País" />
            </SelectTrigger>


            <SelectContent>
              {Array.from({ length: 5 }).map((option, i) => (
                <SelectItem key={i} value={`${i}`}>
                  {i}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        Proveedores..
      </div>

      <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t my-5" />

      <div>
        <h4 className="text-lg font-semibold mb-4">Año de estreno: </h4>

      </div>

      <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t my-5" />

      <div className="flex flex-col sm:flex-row gap-2 justify-between">
        <div>
          <h4 className="text-lg font-semibold mb-4">País de origen:</h4>

        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Idioma original:</h4>

        </div>
      </div>


      <div className="flex flex-col gap-2 justify-evenly mx-auto mt-4 w-5/6 max-w-md">
        <Button variant="default" type="button" size="lg" className="text-md">
          Aplicar
        </Button>

        <Button variant="outline" type="button" size="lg" className="text-md">
          Limpiar
        </Button>
      </div>

    </Modal>
  )
}