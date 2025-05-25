"use client"
import useDialogStore from "maidana07/store/use-dialog-store";
import { Button } from "../ui/button";
import { Search } from "lucide-react"
import { useShallow } from "zustand/react/shallow";


const CallToActionButton = () => {
  const openDialog = useDialogStore(useShallow(state => state.openDialog))

  return (
    <Button size="lg" className="gap-2" onClick={() => openDialog("search")}>
      <Search className="w-5 h-5" />
      Comenzar ahora
    </Button>
  )
}

export default CallToActionButton