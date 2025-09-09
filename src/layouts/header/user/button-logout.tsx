"use client"
import { LogOut } from "lucide-react"
import { logoutAction } from "maidana07/actions/logout-action"
import { useTransition } from "react"
import { DropdownMenuItem } from "maidana07/components/ui/dropdown-menu"
import Loader from "maidana07/components/ui/loader"

function LogoutButton() {
  const [isPending, startTransition] = useTransition()

  const handleLogout = () => {
    startTransition(async () => {
      await logoutAction()
    })
  }

  return (
    <DropdownMenuItem
      onClick={handleLogout}
      onSelect={(e) => e.preventDefault()}
      disabled={isPending}
    >
      {
        isPending
          ? <Loader size="sm" text="Cerrando sesión..." className="!p-0" />
          : <LogOut />
      }
      {isPending
        ? ""
        : "Cerrar sesión"}
    </DropdownMenuItem>
  )
}



export default LogoutButton