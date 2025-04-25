
import Link from "next/link"
import { NavigationMenu, NavigationMenuList, NavigationMenuItem } from "maidana07/components/ui/navigation-menu"
import { Button } from "maidana07/components/ui/button"
import { LogIn, UserPlus } from "lucide-react"
import { auth } from "maidana07/lib/prisma/auth"
import LogoutButton from "maidana07/layouts/header/user/button-logout"
import MobileMenu from "./mobile-menu"
import links from "./links.json"
import ActiveLink from "./active-link"
import { ModeToggle } from "maidana07/components/mode-toggle"

const Header = async () => {
  const session = await auth()

  return (
    <header className="w-full bg-muted/30 sticky top-0 z-50 backdrop-blur">
      <div className="flex items-center justify-between px-3 py-1">
        <div className="flex items-center">

          <MobileMenu />

          <Link href="/" className="text-xl font-bold tracking-tight ml-5">
            Maida<span className="text-primary">Vision</span>
          </Link>
        </div>


        <NavigationMenu>
          <NavigationMenuList className="hidden md:flex gap-4">
            {links.map((link) => (
              <NavigationMenuItem key={link.href}>
                <ActiveLink href={link.href}>
                  {link.label}
                </ActiveLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-2">
          {session ?
            <LogoutButton />
            : (
              <>
                <Link href="/login">
                  <Button variant="outline" size="sm" className="h-[30px]">
                    <LogIn className="w-3 h-3" />
                    Iniciar sesión
                  </Button>
                </Link>
                <Link href="/register" className="lg:block hidden">
                  <Button variant="default" size="sm" className="h-[30px]">
                    <UserPlus className="w-3 h-3" />
                    Registrarse
                  </Button>
                </Link>
              </>
            )}
          <ModeToggle />
        </div>


      </div>
    </header>
  )
}

export default Header