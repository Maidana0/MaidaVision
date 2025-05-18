import { auth } from "maidana07/lib/prisma/auth"
import LogoutButton from "./button-logout"
import Link from "next/link"
import { Button } from "maidana07/components/ui/button"
import { LogIn, UserPlus } from "lucide-react"

const Session = async () => {
  const session = await auth()

  return session ?
    <LogoutButton />
    : (
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

export default Session