"use client"
import { LogOut, Loader2 } from "lucide-react"
import { logoutAction } from "maidana07/actions/logout-action"
import { useTransition } from "react"
import { DropdownMenuItem } from "maidana07/components/ui/dropdown-menu"

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
          ? <Loader2 />
          : <LogOut />
      }
      {isPending
        ? "Cerrando sesión..."
        : "Cerrar sesión"}
    </DropdownMenuItem>
  )
}



export default LogoutButton