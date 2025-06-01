import { Section } from "maidana07/components/ui/section"
import { ArrowLeft } from "lucide-react"
import { FC } from "react"
import CustomLink from "./ui/custom-link"
import cn from "maidana07/utils/cn"

interface HeroSectionProps {
  title: string
  description?: string
  showBackButton?: boolean
  className?: string
  h1ClassName?: string
  children?: React.ReactNode
}

const HeroSection: FC<HeroSectionProps> = ({
  title,
  description,
  showBackButton = true,
  className = "",
  h1ClassName = "",
  children
}) => {
  return (
    <Section className={cn("md:pt-10 md:pb-11 pt-8 pb-0", className)}>
      <div className="max-w-7xl mx-auto px-4">
        {showBackButton && (
          <CustomLink href="/" variant="ghost" className="mb-6 text-foreground/80 text-sm">
            <ArrowLeft className="mr-2 h-4 w-4" /> Ir al Inicio
          </CustomLink>
        )}

        <h1 className={`text-4xl md:text-6xl font-bold mb-6 ${h1ClassName}`}>
          {title}
        </h1>
        {description && (
          <p className="text-xl text-muted-foreground max-w-2xl">
            {description}
          </p>
        )}
        {children}
      </div>
    </Section>
  )
}

export default HeroSection;