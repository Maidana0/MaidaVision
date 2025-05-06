import { MaintenanceNotice } from "maidana07/components/maintenance-notice"

const page = () => {
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