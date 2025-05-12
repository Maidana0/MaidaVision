import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "maidana07/components/ui/dialog"
import { Button } from "maidana07/components/ui/button"
import { Filter } from "lucide-react"

export function FilterDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filtros
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Filtrar películas</DialogTitle>
        </DialogHeader>
        {/* Aquí irían los filtros con checkboxes, radio buttons, etc */}
      </DialogContent>
    </Dialog>
  )
}