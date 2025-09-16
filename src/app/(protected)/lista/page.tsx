import { MaintenanceNotice } from "maidana07/components/maintenance-notice"
import { auth } from "maidana07/lib/prisma/auth"
import { redirect } from "next/navigation"

export const metadata = {
  title: "Lista",
  description: "Tu lista personalizada de películas y series en Maidanavision",
  keywords: ["Maidanavision", "Lista", "Películas", "Series", "Favoritos"],
  openGraph: {
    title: "Lista",
    description: "Tu lista personalizada de películas y series en Maidanavision"
  }
}

const Page = async () => {
  const session = await auth()
  if (!!(session?.user)) {
    redirect("/login")
  }
  return <MaintenanceNotice
    title="Página de Lista en Construcción"
    description="Estamos trabajando para crear la funcionalidad de Mi Lista. ¡Pronto estará disponible!"
    type="construction"
    estimatedTime="Hasta octubre"
  />
}

export default Page