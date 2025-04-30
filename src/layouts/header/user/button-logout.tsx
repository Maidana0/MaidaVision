"use client"
import { LogOut, Loader2 } from "lucide-react"
import { Button } from "../../../components/ui/button"
import { logoutAction } from "maidana07/actions/logout-action"
import { useTransition } from "react"

function LogoutButton() {
  const [isPending, startTransition] = useTransition()

  const handleLogout = () => {
    startTransition(async () => {
      await logoutAction()
    })
  }

  return (
    <Button
      onClick={handleLogout}
      disabled={isPending}
      variant="outline"
      size={"sm"}
    >
      {
        isPending
          ? <Loader2 className="w-4 h-4 mr-1" />
          : <LogOut className="w-4 h-4 mr-1" />
      }
      <span className="md:block hidden">
        {isPending 
        ? "Cerrando sesión..." 
        : "Cerrar sesión"}
      </span>
    </Button>
  )
}



export default LogoutButton