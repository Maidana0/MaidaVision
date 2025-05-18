
import Link from "next/link"
import { NavigationMenu, NavigationMenuList, NavigationMenuItem } from "maidana07/components/ui/navigation-menu"
import MobileMenu from "./mobile-menu"
import links from "./links.json"
import ActiveLink from "./active-link"
import { ModeToggle } from "maidana07/components/mode-toggle"
import CommandTrigger from "maidana07/components/search/command-trigger"
import { Suspense } from "react"
import Session from "./user/session"
import { Skeleton } from "maidana07/components/ui/skeleton"

const Header = async () => {

  return (
    <header className="w-full sticky top-0 z-50 backdrop-blur-md">
      <div className="flex items-center justify-between px-3 py-2">
        <div className="flex items-center">
          <Suspense>
            <MobileMenu />
          </Suspense>

          <Link href="/" className="text-xl font-bold tracking-tight ml-5 sm:block hidden">
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

          <ModeToggle />
        </div>


      </div>
    </header>
  )
}

export default Header