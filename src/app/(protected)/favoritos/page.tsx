import { MaintenanceNotice } from "maidana07/components/maintenance-notice"
import { auth } from "maidana07/lib/prisma/auth"
import { redirect } from "next/navigation"

export const metadata = {
  title: "Favoritos",
  description: "Tu lista de películas y series favoritas en Maidanavision",
  keywords: ["Maidanavision", "Favoritos", "Películas", "Series", "Lista de Favoritos"],
  openGraph: {
    title: "Favoritos",
    description: "Tu lista de películas y series favoritas en Maidanavision"
  }
}

const Page = async () => {
  const session = await auth()
  if (!!(session?.user)) {
    redirect("/login")
  }

  return <MaintenanceNotice
    title="Página de Favoritos en Construcción"
    description="Estamos trabajando para crear la funcionalidad de Favoritos. ¡Pronto estará disponible!"
    type="construction"
    estimatedTime="Hasta octubre"
  />
}

export default Page