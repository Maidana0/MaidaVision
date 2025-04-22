"use client"
import { LogOut } from "lucide-react"
import { Button } from "../../ui/button"
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
       <LogOut className="w-4 h-4 mr-1" />
      {isPending ? "Cerrando sesión..." : "Cerrar sesión"}
    </Button>
  )
}



export default LogoutButton