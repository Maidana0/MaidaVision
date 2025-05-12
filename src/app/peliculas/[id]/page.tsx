import { MaintenanceNotice } from "maidana07/components/maintenance-notice"
import { FC } from "react"

const page: FC<{ params: { id: string } }> = ({ params }) => {
  return (
    <div>
      <MaintenanceNotice
        title="Página en construcción"
        description="Estamos construyendo algo asombroso"
        type="construction"
        estimatedTime="Indefinido"
      />
    </div>
  )
}

export default page