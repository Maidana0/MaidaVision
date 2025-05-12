"use client"

import { DialogHeader, DialogTitle } from "maidana07/components/ui/dialog"
import { Button } from "maidana07/components/ui/button"
import { Filter } from "lucide-react"
import { Modal } from "../ui/modal"
import useDialogStore from "maidana07/store/use-dialog-store"
import { useShallow } from "zustand/react/shallow"

export function FilterDialog() {

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
      className="sm:max-w-[425px]"
    >

      <DialogHeader>
        <DialogTitle>Filtrar películas</DialogTitle>
      </DialogHeader>
      {/* Aquí irían los filtros con checkboxes, radio buttons, etc */}



    </Modal>
  )
}