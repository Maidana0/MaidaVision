
import Link from "next/link"
import { NavigationMenu, NavigationMenuList, NavigationMenuItem } from "maidana07/components/ui/navigation-menu"
import { Button } from "maidana07/components/ui/button"
import { LogIn, UserPlus } from "lucide-react"
import { auth } from "maidana07/lib/prisma/auth"
import LogoutButton from "maidana07/components/auth/buttons/button-logout"
import MobileMenu from "./mobile-menu"
import links from "./links.json"
import ActiveLink from "./active-link"

const Header = async () => {
  const session = await auth()

  return (
    <header className="w-full bg-muted/30 sticky top-0 z-50">
      <div className="flex items-center justify-between px-3 py-3">
        <Link href="/" className="text-xl font-bold tracking-tight hidden md:block">
          Maida<span className="text-primary">Vision</span>
        </Link>


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
                  <Button variant="outline" size="sm" className="h-[33px]">
                    <LogIn className="w-4 h-4 mr-1" />
                    Iniciar sesión
                  </Button>
                </Link>
                <Link href="/register">
                  <Button variant="default" size="sm" className="h-[33px]">
                    <UserPlus className="w-4 h-4 mr-1" />
                    Registrarse
                  </Button>
                </Link>
              </>
            )}
        </div>

        <MobileMenu />

      </div>
    </header>
  )
}

export default Header