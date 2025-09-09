"use client"

import { UserCircle, BellIcon } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "maidana07/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "maidana07/components/ui/dropdown-menu"
import LogoutButton from "./button-logout"
import { Button } from "maidana07/components/ui/button"
import { ModeToggle } from "maidana07/components/mode-toggle"

export function NavUser({
  user: { name, email, avatar }
}: {
  user: {
    name: string
    email: string
    avatar: string | null | undefined
  }
}) {

  return (
    <DropdownMenu>

      <Button className="w-fit h-fit p-[1px] rounded-full" variant={"outline"}>
        <DropdownMenuTrigger asChild>
          <Avatar className="h-8 w-8">
            {avatar ? <AvatarImage src={avatar} alt={name} /> : ""}
            <AvatarFallback className="rounded-lg uppercase">{name.slice(0, 2)}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
      </Button>

      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width) min-w-48 rounded-lg border-border"
        side={"bottom"}
        align="end"
        sideOffset={4}
        asChild
      >
        <nav>
          <DropdownMenuLabel className="p-0 font-normal">
            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <Avatar className="h-8 w-8 rounded-lg">
                {avatar ? <AvatarImage src={avatar} alt={name} /> : ""}
                <AvatarFallback className="rounded-lg uppercase">{name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{name}</span>
                <span className="text-muted-foreground truncate text-xs">
                  {email}
                </span>
              </div>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuItem>
              <UserCircle />
              Mi cuenta
            </DropdownMenuItem>
            <DropdownMenuItem>
              <BellIcon />
              Notificaciones
            </DropdownMenuItem>
            <ModeToggle variant="menuItem" />
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <LogoutButton />
        </nav>
      </DropdownMenuContent>

    </DropdownMenu>
  )
}
