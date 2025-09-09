import { auth } from "maidana07/lib/prisma/auth"
import Link from "next/link"
import { Button } from "maidana07/components/ui/button"
import { LogIn, UserPlus } from "lucide-react"
import { NavUser } from "./nav-user"

export const revalidate = 60 * 30 // 30 minutes

const Session = async () => {
  const session = await auth()

  if (session) {
    const user = {
      name: session.user?.name ?? "Desconocido",
      email: session.user?.email ?? "Sin registrar",
      avatar: session.user?.image
    }

    return <NavUser user={user} />
  } else {
    return (
      <>
        <Link href="/login">
          <Button variant="outline" size="sm" className="h-[30px]">
            <LogIn className="w-3 h-3" />
            <span className="md:block hidden">
              Iniciar sesión
            </span>
          </Button>
        </Link>
        <Link href="/register" className="lg:block hidden">
          <Button variant="default" size="sm" className="h-[30px]">
            <UserPlus className="w-3 h-3" />
            Registrarse
          </Button>
        </Link>
      </>
    )
  }
}

export default Session