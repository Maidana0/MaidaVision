
import { NavigationMenu, NavigationMenuList, NavigationMenuItem } from "maidana07/components/ui/navigation-menu"
import MobileMenu from "./mobile-menu"
import links from "./links.json"
import ActiveLink from "./active-link"
import { ModeToggle } from "maidana07/components/mode-toggle"
import CommandTrigger from "maidana07/components/search/command-trigger"
import { Suspense } from "react"
import Session from "./user/session"
import { Skeleton } from "maidana07/components/ui/skeleton"
import Logo from "./logo"
import { auth } from "maidana07/lib/prisma/auth"

const Header = async () => {
  const session = auth()

  return (
    <header className="w-full sticky top-0 z-50">
      <div className="flex items-center justify-between px-3 py-2 bg-background border-b border-b-input">
        <div className="flex items-center">
          <Suspense>
            <MobileMenu />
          </Suspense>

          <Logo />
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

        <Suspense>
          <CommandTrigger />
        </Suspense>

        <div className="flex items-center gap-2">
          <Suspense
            fallback={<>
              <Skeleton className="md:w-[130px] w-10 h-[30px] dark:bg-input/30 bg-background rounded-md border border-input" />

              <Skeleton className="w-[116px] h-[30px] bg-primary rounded-md lg:block hidden" />
            </>}
          >
            <Session />
          </Suspense>

          <ModeToggle session={session} />
        </div>


      </div>
    </header >
  )
}

export default Header