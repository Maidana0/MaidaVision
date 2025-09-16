"use client"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "maidana07/components/ui/button"
import { DropdownMenuItem } from "./ui/dropdown-menu"

interface ModeToggleProps {
  variant?: "button" | "menuItem",
}

const icons = [<Sun key={"sun"}
  className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
/>,
<Moon key={"moon"}
  className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
/>]

const ModeToggle = ({ variant = "button" }: ModeToggleProps) => {
  const { setTheme, theme } = useTheme()

  const handleThemeChange = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }


  if (variant === "menuItem") {
    return (
      <DropdownMenuItem
        onClick={handleThemeChange}
        onSelect={(e) => e.preventDefault()}
        className="relative"
        aria-label="Cambiar tema"
      >
        {icons}
        Cambiar tema
      </DropdownMenuItem>
    )
  }
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleThemeChange}
      className="relative rounded-full transition-all"
      aria-label="Cambiar tema"
    >
      {icons}
    </Button>
  )
}

export default ModeToggle;