import CustomLink from "maidana07/components/ui/custom-link"
import { LogIn, UserPlus } from "lucide-react"
import { auth } from "maidana07/lib/prisma/auth"
import dynamic from "next/dynamic"
const NavUser = dynamic(() => import("maidana07/layouts/header/user/nav-user"))
const ModeToggle = dynamic(() => import("maidana07/components/mode-toggle"))
const Button = dynamic(() => import("maidana07/components/ui/button").then(mod => mod.Button))

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
        <CustomLink href="/login">
          <Button variant="outline" size="sm" className="h-[30px]">
            <LogIn className="w-3 h-3" />
            <span className="md:block hidden">
              Iniciar sesión
            </span>
          </Button>
        </CustomLink>
        <CustomLink href="/register" className="lg:block hidden">
          <Button variant="default" size="sm" className="h-[30px]">
            <UserPlus className="w-3 h-3" />
            Registrarse
          </Button>
        </CustomLink>
        <ModeToggle />
      </>
    )
  }
}

export default Session