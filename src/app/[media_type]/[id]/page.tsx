import { MaintenanceNotice } from "maidana07/components/maintenance-notice"
import { redirect } from "next/navigation";
import { FC } from "react"

interface MediaDetailsPageProps {
  params: Promise<{ media_type: "pelicula" | "serie", id: string }>
}

const page: FC<MediaDetailsPageProps> = async ({ params }) => {
  const { media_type, id } = await params;

  if (media_type != "pelicula" && media_type != "serie" && media_type != "persona") {
    redirect(`/pagina-no-encontrada/error/parametro?busqueda=${media_type}-${id}`)
  }

  const mediaID = id.split("-")[0]


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