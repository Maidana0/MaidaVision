import { Section } from "maidana07/components/ui/section"
import { AlertTriangle, Clock, Shovel, Construction } from "lucide-react"
import CustomLink from "./ui/custom-link"

interface MaintenanceNoticeProps {
  title?: string
  description?: string
  type?: 'maintenance' | 'construction' | 'updates'
  estimatedTime?: string
}

export function MaintenanceNotice({
  title = "Página en mantenimiento",
  description = "Estamos realizando mejoras para brindarte una mejor experiencia",
  type = 'maintenance',
  estimatedTime = "30 minutos"
}: MaintenanceNoticeProps) {
  const notices = {
    maintenance: {
      icon: <Shovel className="w-16 h-16" />,
      message: "Realizando mantenimiento"
    },
    construction: {
      icon: <Construction className="w-16 h-16" />,
      message: "Página en construcción"
    },
    updates: {
      icon: <AlertTriangle className="w-16 h-16" />,
      message: "Actualizando sistemas"
    }
  }

  return (
    <Section className="min-h-[50vh] flex items-center justify-center">
      <div className="max-w-2xl mx-auto text-center p-8">
        <div className="flex flex-col items-center gap-6">
          <div className="p-4 rounded-full bg-primary/10 text-primary">
            {notices[type].icon}
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl font-bold">{title}</h1>
            <p className="text-xl text-muted-foreground">{description}</p>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="w-5 h-5" />
            <span>Tiempo estimado: {estimatedTime}</span>
          </div>

          <CustomLink href={"/"} className="mt-4">
            Ir al inicio
          </CustomLink>
        </div>
      </div>
    </Section >
  )
}